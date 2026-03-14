/**
 * Science Town Builder — Profile CRUD System
 * Manages player profiles with localStorage persistence.
 * Registers on window.ScienceGame.Profiles namespace.
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Profiles = (function() {
    'use strict';

    var STORAGE_KEY = 'scienceGame';
    var MAX_PROFILES = 5;
    var MAX_NAME_LENGTH = 20;
    var VALID_GRADES = ['K-2', '3-5', '6-8'];
    var VALID_DOMAINS = ['earth', 'biology', 'chemistry', 'physics', 'engineering'];
    var VALID_RESOURCES = ['stone', 'wood', 'glass', 'energy', 'metal'];

    var data = {
        profiles: [],
        activeProfileId: null,
        soundEnabled: true
    };

    /**
     * Generate a unique ID safe for file:// protocol.
     * @returns {string} A unique identifier string.
     */
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    /**
     * Build a fresh resources object with all resource types set to zero.
     * @returns {Object} Default resources object.
     */
    function buildDefaultResources() {
        return { stone: 0, wood: 0, glass: 0, energy: 0, metal: 0 };
    }

    /**
     * Build a fresh questionsAnswered object with totals and per-domain counters.
     * @returns {Object} Default questionsAnswered object.
     */
    function buildDefaultQuestionsAnswered() {
        var byDomain = {};
        for (var i = 0; i < VALID_DOMAINS.length; i++) {
            byDomain[VALID_DOMAINS[i]] = { total: 0, correct: 0 };
        }
        return {
            total: 0,
            correct: 0,
            byDomain: byDomain
        };
    }

    /**
     * Ensure a profile has all expected fields with correct types.
     * Handles data from older versions that may be missing newer fields.
     * @param {Object} profile - The profile object to migrate.
     * @returns {Object} The migrated profile with all fields present.
     */
    function migrateProfile(profile) {
        if (!profile.id) {
            profile.id = generateId();
        }
        if (typeof profile.name !== 'string') {
            profile.name = 'Player';
        }

        // Ensure grade is valid
        if (VALID_GRADES.indexOf(profile.grade) === -1) {
            profile.grade = 'K-2';
        }

        // Ensure resources object exists with all resource types
        if (!profile.resources || typeof profile.resources !== 'object') {
            profile.resources = buildDefaultResources();
        } else {
            for (var r = 0; r < VALID_RESOURCES.length; r++) {
                var resName = VALID_RESOURCES[r];
                if (typeof profile.resources[resName] !== 'number' || isNaN(profile.resources[resName])) {
                    profile.resources[resName] = 0;
                }
            }
        }

        // Ensure placedBuildings is an array
        if (!Array.isArray(profile.placedBuildings)) {
            profile.placedBuildings = [];
        }

        // Ensure questionsAnswered exists with proper structure
        if (!profile.questionsAnswered || typeof profile.questionsAnswered !== 'object') {
            profile.questionsAnswered = buildDefaultQuestionsAnswered();
        } else {
            if (typeof profile.questionsAnswered.total !== 'number' || isNaN(profile.questionsAnswered.total)) {
                profile.questionsAnswered.total = 0;
            }
            if (typeof profile.questionsAnswered.correct !== 'number' || isNaN(profile.questionsAnswered.correct)) {
                profile.questionsAnswered.correct = 0;
            }
            if (!profile.questionsAnswered.byDomain || typeof profile.questionsAnswered.byDomain !== 'object') {
                profile.questionsAnswered.byDomain = {};
            }
            for (var d = 0; d < VALID_DOMAINS.length; d++) {
                var domain = VALID_DOMAINS[d];
                if (!profile.questionsAnswered.byDomain[domain] || typeof profile.questionsAnswered.byDomain[domain] !== 'object') {
                    profile.questionsAnswered.byDomain[domain] = { total: 0, correct: 0 };
                } else {
                    var domainData = profile.questionsAnswered.byDomain[domain];
                    if (typeof domainData.total !== 'number' || isNaN(domainData.total)) {
                        domainData.total = 0;
                    }
                    if (typeof domainData.correct !== 'number' || isNaN(domainData.correct)) {
                        domainData.correct = 0;
                    }
                }
            }
        }

        // Ensure townLevel is a valid number
        if (typeof profile.townLevel !== 'number' || isNaN(profile.townLevel)) {
            profile.townLevel = 0;
        }

        // Ensure playerPosition exists with x and y
        if (!profile.playerPosition || typeof profile.playerPosition !== 'object') {
            profile.playerPosition = { x: 8, y: 8 };
        } else {
            if (typeof profile.playerPosition.x !== 'number' || isNaN(profile.playerPosition.x)) {
                profile.playerPosition.x = 8;
            }
            if (typeof profile.playerPosition.y !== 'number' || isNaN(profile.playerPosition.y)) {
                profile.playerPosition.y = 8;
            }
        }

        return profile;
    }

    /**
     * Load profile data from localStorage. Safe against corrupt data.
     */
    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var saved = JSON.parse(raw);
            if (saved && typeof saved === 'object') {
                if (Array.isArray(saved.profiles)) {
                    data.profiles = saved.profiles.map(migrateProfile);
                }
                data.activeProfileId = saved.activeProfileId || null;
                if (typeof saved.soundEnabled === 'boolean') {
                    data.soundEnabled = saved.soundEnabled;
                }
                // Verify the active profile still exists
                if (data.activeProfileId !== null) {
                    var found = false;
                    for (var i = 0; i < data.profiles.length; i++) {
                        if (data.profiles[i].id === data.activeProfileId) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        data.activeProfileId = null;
                    }
                }
            }
        } catch (e) {
            data.profiles = [];
            data.activeProfileId = null;
        }
    }

    /**
     * Persist current data to localStorage.
     */
    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            // localStorage full or unavailable — fail silently
        }
    }

    /**
     * Create a new profile with the given name and grade level.
     * Returns the new profile object, or null if creation failed.
     * @param {string} name - The player's display name.
     * @param {string} grade - The grade level ('K-2', '3-5', or '6-8').
     * @returns {Object|null} The new profile object, or null on failure.
     */
    function createProfile(name, grade) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            return null;
        }

        var trimmedName = name.trim().substring(0, MAX_NAME_LENGTH);

        if (data.profiles.length >= MAX_PROFILES) {
            return null;
        }

        // Validate grade, default to 'K-2' if invalid
        var validGrade = (VALID_GRADES.indexOf(grade) !== -1) ? grade : 'K-2';

        var profile = {
            id: generateId(),
            name: trimmedName,
            grade: validGrade,
            resources: buildDefaultResources(),
            placedBuildings: [],
            questionsAnswered: buildDefaultQuestionsAnswered(),
            townLevel: 0,
            playerPosition: { x: 8, y: 8 }
        };

        data.profiles.push(profile);
        data.activeProfileId = profile.id;
        save();
        return profile;
    }

    /**
     * Delete a profile by id. Updates active profile if the deleted one was active.
     * @param {string} id - The profile ID to delete.
     */
    function deleteProfile(id) {
        data.profiles = data.profiles.filter(function(p) { return p.id !== id; });
        if (data.activeProfileId === id) {
            data.activeProfileId = data.profiles.length > 0 ? data.profiles[0].id : null;
        }
        save();
    }

    /**
     * Get the currently active profile, or null if none.
     * @returns {Object|null} The active profile object, or null.
     */
    function getActive() {
        if (data.activeProfileId === null) return null;
        for (var i = 0; i < data.profiles.length; i++) {
            if (data.profiles[i].id === data.activeProfileId) {
                return data.profiles[i];
            }
        }
        return null;
    }

    /**
     * Set the active profile by id. Verifies the profile exists before setting.
     * @param {string} id - The profile ID to activate.
     * @returns {boolean} True if successful, false if profile not found.
     */
    function setActive(id) {
        for (var i = 0; i < data.profiles.length; i++) {
            if (data.profiles[i].id === id) {
                data.activeProfileId = id;
                save();
                return true;
            }
        }
        return false;
    }

    /**
     * Return all profiles.
     * @returns {Array} Array of all profile objects.
     */
    function getAll() {
        return data.profiles;
    }

    /**
     * Get a profile by id.
     * @param {string} id - The profile ID to look up.
     * @returns {Object|null} The profile object, or null if not found.
     */
    function getProfile(id) {
        for (var i = 0; i < data.profiles.length; i++) {
            if (data.profiles[i].id === id) {
                return data.profiles[i];
            }
        }
        return null;
    }

    /**
     * Check if sound is enabled (global setting, not per-profile).
     * @returns {boolean} True if sound is enabled.
     */
    function isSoundEnabled() {
        return data.soundEnabled;
    }

    /**
     * Set the global sound enabled flag.
     * @param {boolean} val - Whether sound should be enabled.
     */
    function setSoundEnabled(val) {
        data.soundEnabled = !!val;
        save();
    }

    /**
     * Get the number of profiles.
     * @returns {number} The current profile count.
     */
    function getProfileCount() {
        return data.profiles.length;
    }

    /**
     * Check if more profiles can be created.
     * @returns {boolean} True if the profile count is below the maximum.
     */
    function canCreateProfile() {
        return data.profiles.length < MAX_PROFILES;
    }

    /**
     * Add a specified amount of a resource to the active profile.
     * @param {string} resourceName - The resource type (stone, wood, glass, energy, metal).
     * @param {number} amount - The amount to add (must be positive).
     */
    function addResource(resourceName, amount) {
        var profile = getActive();
        if (!profile) return;
        if (VALID_RESOURCES.indexOf(resourceName) === -1) return;
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) return;
        profile.resources[resourceName] += amount;
        save();
    }

    /**
     * Get the resources object for the active profile.
     * @returns {Object|null} The resources object, or null if no active profile.
     */
    function getResources() {
        var profile = getActive();
        if (!profile) return null;
        return profile.resources;
    }

    /**
     * Deduct resources from the active profile based on a cost object.
     * Only deducts if the player can afford all costs.
     * @param {Object} costObj - An object mapping resource names to amounts (e.g., {wood: 3, stone: 2}).
     * @returns {boolean} True if deduction was successful, false if insufficient resources.
     */
    function deductResources(costObj) {
        var profile = getActive();
        if (!profile) return false;
        if (!costObj || typeof costObj !== 'object') return false;

        // First verify the player can afford everything
        for (var res in costObj) {
            if (costObj.hasOwnProperty(res)) {
                if (VALID_RESOURCES.indexOf(res) === -1) return false;
                if (typeof costObj[res] !== 'number' || isNaN(costObj[res])) return false;
                if (profile.resources[res] < costObj[res]) return false;
            }
        }

        // Deduct all resources
        for (var res2 in costObj) {
            if (costObj.hasOwnProperty(res2)) {
                profile.resources[res2] -= costObj[res2];
            }
        }

        save();
        return true;
    }

    /**
     * Check if the active profile can afford a given cost.
     * @param {Object} costObj - An object mapping resource names to amounts.
     * @returns {boolean} True if the active profile has enough of every resource.
     */
    function canAfford(costObj) {
        var profile = getActive();
        if (!profile) return false;
        if (!costObj || typeof costObj !== 'object') return false;

        for (var res in costObj) {
            if (costObj.hasOwnProperty(res)) {
                if (VALID_RESOURCES.indexOf(res) === -1) return false;
                if (typeof costObj[res] !== 'number' || isNaN(costObj[res])) return false;
                if (profile.resources[res] < costObj[res]) return false;
            }
        }

        return true;
    }

    /**
     * Add a placed building to the active profile's town.
     * @param {string} type - The building type identifier.
     * @param {number} x - The x grid coordinate.
     * @param {number} y - The y grid coordinate.
     * @param {string} [emoji] - The building's emoji for map rendering.
     */
    function addPlacedBuilding(type, x, y, emoji) {
        var profile = getActive();
        if (!profile) return;
        profile.placedBuildings.push({ type: type, x: x, y: y, emoji: emoji || '' });
        save();
    }

    /**
     * Get all placed buildings for the active profile.
     * @returns {Array|null} Array of placed building objects, or null if no active profile.
     */
    function getPlacedBuildings() {
        var profile = getActive();
        if (!profile) return null;
        return profile.placedBuildings;
    }

    /**
     * Record the result of a science question answer for the active profile.
     * Increments both overall and per-domain counters.
     * @param {string} domain - The science domain (earth, biology, chemistry, physics, engineering).
     * @param {boolean} correct - Whether the answer was correct.
     */
    function recordAnswer(domain, correct) {
        var profile = getActive();
        if (!profile) return;

        // Increment overall totals
        profile.questionsAnswered.total++;
        if (correct) {
            profile.questionsAnswered.correct++;
        }

        // Increment domain-specific totals if valid domain
        if (VALID_DOMAINS.indexOf(domain) !== -1) {
            var domainData = profile.questionsAnswered.byDomain[domain];
            domainData.total++;
            if (correct) {
                domainData.correct++;
            }
        }

        save();
    }

    /**
     * Update the player's position on the town grid.
     * @param {number} x - The new x coordinate.
     * @param {number} y - The new y coordinate.
     */
    function updatePlayerPosition(x, y) {
        var profile = getActive();
        if (!profile) return;
        profile.playerPosition.x = x;
        profile.playerPosition.y = y;
        save();
    }

    /**
     * Get the player's current position on the town grid.
     * @returns {Object|null} The playerPosition object {x, y}, or null if no active profile.
     */
    function getPlayerPosition() {
        var profile = getActive();
        if (!profile) return null;
        return profile.playerPosition;
    }

    /**
     * Update the town level for the active profile.
     * @param {number} level - The new town level value.
     */
    function updateTownLevel(level) {
        var profile = getActive();
        if (!profile) return;
        if (typeof level !== 'number' || isNaN(level)) return;
        profile.townLevel = level;
        save();
    }

    return {
        generateId: generateId,
        load: load,
        save: save,
        createProfile: createProfile,
        deleteProfile: deleteProfile,
        getActive: getActive,
        setActive: setActive,
        getAll: getAll,
        getProfile: getProfile,
        isSoundEnabled: isSoundEnabled,
        setSoundEnabled: setSoundEnabled,
        getProfileCount: getProfileCount,
        canCreateProfile: canCreateProfile,
        addResource: addResource,
        getResources: getResources,
        deductResources: deductResources,
        canAfford: canAfford,
        addPlacedBuilding: addPlacedBuilding,
        getPlacedBuildings: getPlacedBuildings,
        recordAnswer: recordAnswer,
        updatePlayerPosition: updatePlayerPosition,
        getPlayerPosition: getPlayerPosition,
        updateTownLevel: updateTownLevel,
        MAX_PROFILES: MAX_PROFILES,
        MAX_NAME_LENGTH: MAX_NAME_LENGTH
    };
})();
