/**
 * Robot Brain Builder — Profile CRUD System
 * Manages player profiles with localStorage persistence.
 * Registers on window.LogicGame.Profiles namespace.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Profiles = (function() {
    'use strict';

    var STORAGE_KEY = 'logicGame';
    var MAX_PROFILES = 5;
    var MAX_NAME_LENGTH = 20;

    var data = {
        profiles: [],
        activeProfileId: null,
        soundEnabled: true
    };

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    /**
     * Build a fresh levelProgress object for all 24 levels.
     */
    function buildDefaultLevelProgress() {
        var levelProgress = {};
        for (var i = 1; i <= 24; i++) {
            levelProgress[String(i)] = {
                bestStars: 0,
                completed: false,
                attempts: 0,
                bestScore: 0
            };
        }
        return levelProgress;
    }

    /**
     * Ensure a profile has all expected fields.
     * Handles data from older versions that may be missing newer fields.
     */
    function migrateProfile(profile) {
        if (!profile.id) {
            profile.id = generateId();
        }
        if (typeof profile.name !== 'string') {
            profile.name = 'Player';
        }
        if (typeof profile.coins !== 'number' || isNaN(profile.coins)) {
            profile.coins = 0;
        }
        if (typeof profile.totalStarsEarned !== 'number' || isNaN(profile.totalStarsEarned)) {
            profile.totalStarsEarned = 0;
        }

        // Ensure levelProgress exists and has entries for all 24 levels
        if (!profile.levelProgress || typeof profile.levelProgress !== 'object') {
            profile.levelProgress = buildDefaultLevelProgress();
        } else {
            for (var i = 1; i <= 24; i++) {
                var key = String(i);
                if (!profile.levelProgress[key] || typeof profile.levelProgress[key] !== 'object') {
                    profile.levelProgress[key] = { bestStars: 0, completed: false, attempts: 0, bestScore: 0 };
                } else {
                    var lp = profile.levelProgress[key];
                    if (typeof lp.bestStars !== 'number') lp.bestStars = 0;
                    if (typeof lp.completed !== 'boolean') lp.completed = false;
                    if (typeof lp.attempts !== 'number') lp.attempts = 0;
                    if (typeof lp.bestScore !== 'number') lp.bestScore = 0;
                }
            }
        }

        // Ensure robotCustomization has all parts
        if (!profile.robotCustomization || typeof profile.robotCustomization !== 'object') {
            profile.robotCustomization = { antenna: 'default', eyes: 'default', body: 'default', accessory: 'none' };
        } else {
            if (!profile.robotCustomization.antenna) profile.robotCustomization.antenna = 'default';
            if (!profile.robotCustomization.eyes) profile.robotCustomization.eyes = 'default';
            if (!profile.robotCustomization.body) profile.robotCustomization.body = 'default';
            if (!profile.robotCustomization.accessory) profile.robotCustomization.accessory = 'none';
        }

        if (!Array.isArray(profile.unlockedCosmetics)) {
            profile.unlockedCosmetics = ['default_antenna', 'default_eyes', 'default_body'];
        } else {
            // Ensure default cosmetics are always present
            var defaults = ['default_antenna', 'default_eyes', 'default_body'];
            for (var d = 0; d < defaults.length; d++) {
                if (profile.unlockedCosmetics.indexOf(defaults[d]) === -1) {
                    profile.unlockedCosmetics.push(defaults[d]);
                }
            }
        }

        if (!Array.isArray(profile.achievements)) {
            profile.achievements = [];
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
     * Create a new profile with the given name.
     * Returns the new profile object, or null if creation failed.
     */
    function createProfile(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            return null;
        }

        var trimmedName = name.trim().substring(0, MAX_NAME_LENGTH);

        if (data.profiles.length >= MAX_PROFILES) {
            return null;
        }

        var profile = {
            id: generateId(),
            name: trimmedName,
            coins: 0,
            totalStarsEarned: 0,
            levelProgress: buildDefaultLevelProgress(),
            robotCustomization: {
                antenna: 'default',
                eyes: 'default',
                body: 'default',
                accessory: 'none'
            },
            unlockedCosmetics: ['default_antenna', 'default_eyes', 'default_body'],
            achievements: []
        };

        data.profiles.push(profile);
        data.activeProfileId = profile.id;
        save();
        return profile;
    }

    /**
     * Delete a profile by id.
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
     * Set the active profile by id.
     */
    function setActive(id) {
        // Verify the profile exists before setting
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
     */
    function getAll() {
        return data.profiles;
    }

    /**
     * Get a profile by id.
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
     * Rename a profile.
     */
    function renameProfile(id, newName) {
        if (typeof newName !== 'string' || newName.trim().length === 0) return false;
        var profile = getProfile(id);
        if (!profile) return false;
        profile.name = newName.trim().substring(0, MAX_NAME_LENGTH);
        save();
        return true;
    }

    /**
     * Check if sound is enabled (global setting, not per-profile).
     */
    function isSoundEnabled() {
        return data.soundEnabled;
    }

    /**
     * Set the global sound enabled flag.
     */
    function setSoundEnabled(val) {
        data.soundEnabled = !!val;
        save();
    }

    /**
     * Compute total stars across all levels for a profile.
     */
    function getTotalStars(profile) {
        if (!profile || !profile.levelProgress) return 0;
        var total = 0;
        var lp = profile.levelProgress;
        for (var k in lp) {
            if (lp.hasOwnProperty(k)) {
                total += (lp[k].bestStars || 0);
            }
        }
        return total;
    }

    /**
     * Get the number of completed levels for a profile.
     */
    function getCompletedLevelCount(profile) {
        if (!profile || !profile.levelProgress) return 0;
        var count = 0;
        var lp = profile.levelProgress;
        for (var k in lp) {
            if (lp.hasOwnProperty(k) && lp[k].completed) {
                count++;
            }
        }
        return count;
    }

    /**
     * Update level progress after completing a level.
     * Updates bestStars, bestScore, completed, attempts, coins, and totalStarsEarned.
     * Returns an object describing what changed (for UI feedback).
     */
    function updateLevelProgress(levelId, stars, score) {
        var profile = getActive();
        if (!profile) return null;

        var key = String(levelId);
        var lp = profile.levelProgress[key];
        if (!lp) return null;

        var result = {
            previousBestStars: lp.bestStars,
            previousBestScore: lp.bestScore,
            newBestStars: false,
            newBestScore: false,
            firstCompletion: !lp.completed,
            starsAwarded: 0,
            coinsAwarded: 0
        };

        lp.attempts++;
        lp.completed = true;

        // Update best stars (only increase, never decrease)
        if (stars > lp.bestStars) {
            var starDiff = stars - lp.bestStars;
            result.starsAwarded = starDiff;
            result.newBestStars = true;
            lp.bestStars = stars;
            profile.totalStarsEarned += starDiff;
        }

        // Update best score
        if (score > lp.bestScore) {
            result.newBestScore = true;
            lp.bestScore = score;
        }

        // Award coins: base 10 per star earned, bonus 5 for first completion
        var coinsAwarded = result.starsAwarded * 10;
        if (result.firstCompletion) {
            coinsAwarded += 5;
        }
        result.coinsAwarded = coinsAwarded;
        profile.coins += coinsAwarded;

        save();
        return result;
    }

    /**
     * Spend coins from the active profile. Returns true if successful.
     */
    function spendCoins(amount) {
        var profile = getActive();
        if (!profile) return false;
        if (typeof amount !== 'number' || amount <= 0) return false;
        if (profile.coins < amount) return false;
        profile.coins -= amount;
        save();
        return true;
    }

    /**
     * Unlock a cosmetic item for the active profile.
     */
    function unlockCosmetic(cosmeticId) {
        var profile = getActive();
        if (!profile) return false;
        if (profile.unlockedCosmetics.indexOf(cosmeticId) !== -1) return false;
        profile.unlockedCosmetics.push(cosmeticId);
        save();
        return true;
    }

    /**
     * Check if the active profile has a cosmetic unlocked.
     */
    function hasCosmeticUnlocked(cosmeticId) {
        var profile = getActive();
        if (!profile) return false;
        return profile.unlockedCosmetics.indexOf(cosmeticId) !== -1;
    }

    /**
     * Set a robot customization slot for the active profile.
     */
    function setRobotPart(slot, cosmeticId) {
        var profile = getActive();
        if (!profile) return false;
        var validSlots = ['antenna', 'eyes', 'body', 'accessory'];
        if (validSlots.indexOf(slot) === -1) return false;
        profile.robotCustomization[slot] = cosmeticId;
        save();
        return true;
    }

    /**
     * Add an achievement to the active profile (no duplicates).
     */
    function addAchievement(achievementId) {
        var profile = getActive();
        if (!profile) return false;
        if (profile.achievements.indexOf(achievementId) !== -1) return false;
        profile.achievements.push(achievementId);
        save();
        return true;
    }

    /**
     * Check if the active profile has a specific achievement.
     */
    function hasAchievement(achievementId) {
        var profile = getActive();
        if (!profile) return false;
        return profile.achievements.indexOf(achievementId) !== -1;
    }

    /**
     * Determine the highest level a profile can access.
     * Level 1 is always unlocked. Each subsequent level requires the previous
     * level to be completed (at least 1 star).
     */
    function getHighestUnlockedLevel(profile) {
        if (!profile) return 1;
        for (var i = 1; i <= 24; i++) {
            var lp = profile.levelProgress[String(i)];
            if (!lp || !lp.completed) {
                return i;
            }
        }
        return 24;
    }

    /**
     * Check if a specific level is unlocked for a profile.
     */
    function isLevelUnlocked(profile, levelId) {
        if (!profile) return levelId === 1;
        if (levelId <= 1) return true;
        // Previous level must be completed
        var prevLp = profile.levelProgress[String(levelId - 1)];
        return prevLp && prevLp.completed;
    }

    /**
     * Get the count of profiles.
     */
    function getProfileCount() {
        return data.profiles.length;
    }

    /**
     * Check if more profiles can be created.
     */
    function canCreateProfile() {
        return data.profiles.length < MAX_PROFILES;
    }

    /**
     * Reset a profile's progress (keep the profile, wipe progress).
     */
    function resetProgress(id) {
        var profile = getProfile(id);
        if (!profile) return false;
        profile.coins = 0;
        profile.totalStarsEarned = 0;
        profile.levelProgress = buildDefaultLevelProgress();
        profile.robotCustomization = { antenna: 'default', eyes: 'default', body: 'default', accessory: 'none' };
        profile.unlockedCosmetics = ['default_antenna', 'default_eyes', 'default_body'];
        profile.achievements = [];
        save();
        return true;
    }

    return {
        load: load,
        save: save,
        createProfile: createProfile,
        deleteProfile: deleteProfile,
        getActive: getActive,
        setActive: setActive,
        getAll: getAll,
        getProfile: getProfile,
        renameProfile: renameProfile,
        isSoundEnabled: isSoundEnabled,
        setSoundEnabled: setSoundEnabled,
        getTotalStars: getTotalStars,
        getCompletedLevelCount: getCompletedLevelCount,
        updateLevelProgress: updateLevelProgress,
        spendCoins: spendCoins,
        unlockCosmetic: unlockCosmetic,
        hasCosmeticUnlocked: hasCosmeticUnlocked,
        setRobotPart: setRobotPart,
        addAchievement: addAchievement,
        hasAchievement: hasAchievement,
        getHighestUnlockedLevel: getHighestUnlockedLevel,
        isLevelUnlocked: isLevelUnlocked,
        getProfileCount: getProfileCount,
        canCreateProfile: canCreateProfile,
        resetProgress: resetProgress,
        generateId: generateId,
        MAX_PROFILES: MAX_PROFILES,
        MAX_NAME_LENGTH: MAX_NAME_LENGTH
    };
})();
