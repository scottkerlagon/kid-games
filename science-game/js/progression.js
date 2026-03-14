/**
 * Science Town Builder — Town Progression System
 * Pure logic module for tracking town levels, domain stats, and player progress.
 * Registers on window.ScienceGame.Progression namespace.
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Progression = (function() {
    'use strict';

    /** @type {Array<{name: string, minBuildings: number, emoji: string}>} */
    var TOWN_LEVELS = [
        { name: 'Village', minBuildings: 0, emoji: '\uD83C\uDFD8\uFE0F' },
        { name: 'Town', minBuildings: 3, emoji: '\uD83C\uDFD9\uFE0F' },
        { name: 'City', minBuildings: 5, emoji: '\uD83C\uDF06' }
    ];

    /** @type {Object<string, {name: string, emoji: string, resource: string, resourceEmoji: string}>} */
    var DOMAIN_INFO = {
        earth: { name: 'Earth Science', emoji: '\u26F0\uFE0F', resource: 'stone', resourceEmoji: '\uD83E\uDEA8' },
        biology: { name: 'Biology', emoji: '\uD83C\uDF3F', resource: 'wood', resourceEmoji: '\uD83E\uDEB5' },
        chemistry: { name: 'Chemistry', emoji: '\uD83E\uDDEA', resource: 'glass', resourceEmoji: '\uD83D\uDD2C' },
        physics: { name: 'Physics', emoji: '\u26A1', resource: 'energy', resourceEmoji: '\uD83D\uDD0B' },
        engineering: { name: 'Engineering', emoji: '\uD83D\uDD27', resource: 'metal', resourceEmoji: '\u2699\uFE0F' }
    };

    var DOMAIN_KEYS = ['earth', 'biology', 'chemistry', 'physics', 'engineering'];

    /**
     * Get the town level object for the given number of placed buildings.
     * Iterates TOWN_LEVELS in reverse to find the highest qualifying level.
     * @param {number} buildingsPlaced - The number of buildings the player has placed.
     * @returns {{name: string, minBuildings: number, emoji: string, index: number}} The matching town level.
     */
    function getTownLevel(buildingsPlaced) {
        for (var i = TOWN_LEVELS.length - 1; i >= 0; i--) {
            if (buildingsPlaced >= TOWN_LEVELS[i].minBuildings) {
                return {
                    name: TOWN_LEVELS[i].name,
                    minBuildings: TOWN_LEVELS[i].minBuildings,
                    emoji: TOWN_LEVELS[i].emoji,
                    index: i
                };
            }
        }
        // Fallback (should never happen since level 0 requires 0 buildings)
        return {
            name: TOWN_LEVELS[0].name,
            minBuildings: TOWN_LEVELS[0].minBuildings,
            emoji: TOWN_LEVELS[0].emoji,
            index: 0
        };
    }

    /**
     * Get the next town level the player can reach.
     * Returns null if the player is already at the maximum level.
     * @param {number} buildingsPlaced - The number of buildings the player has placed.
     * @returns {{name: string, minBuildings: number, emoji: string, buildingsNeeded: number}|null}
     *          The next level info with how many more buildings are needed, or null at max level.
     */
    function getNextTownLevel(buildingsPlaced) {
        var current = getTownLevel(buildingsPlaced);
        var nextIndex = current.index + 1;

        if (nextIndex >= TOWN_LEVELS.length) {
            return null;
        }

        var next = TOWN_LEVELS[nextIndex];
        return {
            name: next.name,
            minBuildings: next.minBuildings,
            emoji: next.emoji,
            buildingsNeeded: next.minBuildings - buildingsPlaced
        };
    }

    /**
     * Check if placing a building caused a level up by comparing old and new building counts.
     * @param {number} oldBuildingsCount - The number of buildings before placement.
     * @param {number} newBuildingsCount - The number of buildings after placement.
     * @returns {{leveledUp: boolean, newLevel?: {name: string, minBuildings: number, emoji: string, index: number}}}
     *          An object indicating whether a level up occurred, and the new level if so.
     */
    function checkLevelUp(oldBuildingsCount, newBuildingsCount) {
        var oldLevel = getTownLevel(oldBuildingsCount);
        var newLevel = getTownLevel(newBuildingsCount);

        if (newLevel.index > oldLevel.index) {
            return {
                leveledUp: true,
                newLevel: newLevel
            };
        }

        return { leveledUp: false };
    }

    /**
     * Build a progress summary object for displaying player stats.
     * @param {Object} profile - A player profile object from the Profiles module.
     * @param {Array} profile.placedBuildings - Array of placed building objects.
     * @param {Object} profile.questionsAnswered - Questions answered data with total, correct, and byDomain.
     * @param {Object} profile.resources - Resource counts (stone, wood, glass, energy, metal).
     * @returns {{
     *   townLevel: {name: string, emoji: string},
     *   buildingsPlaced: number,
     *   totalQuestionsAnswered: number,
     *   totalCorrect: number,
     *   accuracy: number,
     *   resources: {stone: number, wood: number, glass: number, energy: number, metal: number},
     *   domainStats: Array<{domain: string, name: string, emoji: string, total: number, correct: number, accuracy: number}>,
     *   nextLevel: {name: string, buildingsNeeded: number}|null
     * }} A summary object with all player progress data.
     */
    function getProgressSummary(profile) {
        var buildingsPlaced = profile.placedBuildings ? profile.placedBuildings.length : 0;
        var townLevel = getTownLevel(buildingsPlaced);
        var nextLevel = getNextTownLevel(buildingsPlaced);

        var totalAnswered = profile.questionsAnswered ? profile.questionsAnswered.total : 0;
        var totalCorrect = profile.questionsAnswered ? profile.questionsAnswered.correct : 0;
        var accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        var resources = profile.resources || { stone: 0, wood: 0, glass: 0, energy: 0, metal: 0 };

        var domainStats = [];
        for (var i = 0; i < DOMAIN_KEYS.length; i++) {
            var key = DOMAIN_KEYS[i];
            var info = DOMAIN_INFO[key];
            var domainData = (profile.questionsAnswered && profile.questionsAnswered.byDomain && profile.questionsAnswered.byDomain[key])
                ? profile.questionsAnswered.byDomain[key]
                : { total: 0, correct: 0 };

            var domainAccuracy = domainData.total > 0 ? Math.round((domainData.correct / domainData.total) * 100) : 0;

            domainStats.push({
                domain: key,
                name: info.name,
                emoji: info.emoji,
                total: domainData.total,
                correct: domainData.correct,
                accuracy: domainAccuracy
            });
        }

        return {
            townLevel: { name: townLevel.name, emoji: townLevel.emoji },
            buildingsPlaced: buildingsPlaced,
            totalQuestionsAnswered: totalAnswered,
            totalCorrect: totalCorrect,
            accuracy: accuracy,
            resources: {
                stone: resources.stone || 0,
                wood: resources.wood || 0,
                glass: resources.glass || 0,
                energy: resources.energy || 0,
                metal: resources.metal || 0
            },
            domainStats: domainStats,
            nextLevel: nextLevel ? { name: nextLevel.name, buildingsNeeded: nextLevel.buildingsNeeded } : null
        };
    }

    /**
     * Get display info for a single science domain.
     * @param {string} domain - The domain key (earth, biology, chemistry, physics, engineering).
     * @returns {{name: string, emoji: string, resource: string, resourceEmoji: string}|null}
     *          The domain info object, or null if the domain key is invalid.
     */
    function getDomainInfo(domain) {
        if (DOMAIN_INFO.hasOwnProperty(domain)) {
            return DOMAIN_INFO[domain];
        }
        return null;
    }

    /**
     * Get the full DOMAIN_INFO object containing info for all science domains.
     * @returns {Object<string, {name: string, emoji: string, resource: string, resourceEmoji: string}>}
     *          The complete domain info mapping.
     */
    function getAllDomainInfo() {
        return DOMAIN_INFO;
    }

    return {
        TOWN_LEVELS: TOWN_LEVELS,
        getTownLevel: getTownLevel,
        getNextTownLevel: getNextTownLevel,
        checkLevelUp: checkLevelUp,
        getProgressSummary: getProgressSummary,
        getDomainInfo: getDomainInfo,
        getAllDomainInfo: getAllDomainInfo
    };
})();
