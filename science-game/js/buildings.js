/**
 * Science Town Builder — Building Catalog & Build Logic
 *
 * Provides the building catalog (types, costs, unlock thresholds)
 * and helper functions for checking affordability, availability,
 * and rendering cost displays.
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Buildings = (function() {
    'use strict';

    // ── Constants ──────────────────────────────────────────────

    /** @type {Object.<string, string>} Emoji for each resource type */
    var RESOURCE_EMOJIS = {
        stone: '\u{1FAA8}',
        wood: '\u{1FAB5}',
        glass: '\u{1F52C}',
        energy: '\u{1F50B}',
        metal: '\u2699\uFE0F'
    };

    // ── Catalog ────────────────────────────────────────────────

    /** @type {Array.<Object>} Read-only building definitions */
    var catalog = [
        {
            type: 'house',
            name: 'House',
            emoji: '\u{1F3E0}',
            description: 'A cozy home for your town residents!',
            cost: { wood: 3, stone: 2 },
            unlockAt: 0
        },
        {
            type: 'garden',
            name: 'Garden',
            emoji: '\u{1F33B}',
            description: 'A beautiful garden with flowers!',
            cost: { wood: 2, stone: 1 },
            unlockAt: 0
        },
        {
            type: 'school',
            name: 'School',
            emoji: '\u{1F3EB}',
            description: 'Where young minds learn and grow!',
            cost: { wood: 5, stone: 3, glass: 2 },
            unlockAt: 0
        },
        {
            type: 'hospital',
            name: 'Hospital',
            emoji: '\u{1F3E5}',
            description: 'Keeps everyone healthy and strong!',
            cost: { stone: 4, glass: 3, metal: 2 },
            unlockAt: 3
        },
        {
            type: 'library',
            name: 'Library',
            emoji: '\u{1F4DA}',
            description: 'A treasure trove of books and knowledge!',
            cost: { wood: 4, glass: 2, energy: 1 },
            unlockAt: 3
        },
        {
            type: 'park',
            name: 'Park',
            emoji: '\u{1F3DE}\uFE0F',
            description: 'A peaceful place to relax and play!',
            cost: { wood: 3, stone: 2, energy: 1 },
            unlockAt: 5
        }
    ];

    // ── Public API ─────────────────────────────────────────────

    /**
     * Return the full building catalog.
     * @returns {Array.<Object>} All building definitions.
     */
    function getCatalog() {
        return catalog;
    }

    /**
     * Return only the buildings that are unlocked at the given
     * number of buildings placed.
     * @param {number} buildingsPlaced — Total buildings placed so far.
     * @returns {Array.<Object>} Buildings where unlockAt <= buildingsPlaced.
     */
    function getAvailable(buildingsPlaced) {
        return catalog.filter(function(b) {
            return b.unlockAt <= buildingsPlaced;
        });
    }

    /**
     * Look up a single building definition by its type string.
     * @param {string} type — e.g. 'house', 'school'.
     * @returns {Object|undefined} The building object, or undefined.
     */
    function getBuilding(type) {
        for (var i = 0; i < catalog.length; i++) {
            if (catalog[i].type === type) {
                return catalog[i];
            }
        }
        return undefined;
    }

    /**
     * Check whether the player can afford a building.
     * @param {string} type — Building type to check.
     * @param {Object} resources — Player's current resources
     *        e.g. { stone: 5, wood: 3, glass: 0, energy: 0, metal: 0 }
     * @returns {boolean} True if every cost entry is covered.
     */
    function canAfford(type, resources) {
        var building = getBuilding(type);
        if (!building) { return false; }

        var cost = building.cost;
        for (var resource in cost) {
            if (cost.hasOwnProperty(resource)) {
                if ((resources[resource] || 0) < cost[resource]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Return the cost object for a building type.
     * @param {string} type — Building type.
     * @returns {Object|undefined} Cost map, e.g. { wood: 3, stone: 2 }.
     */
    function getCost(type) {
        var building = getBuilding(type);
        return building ? building.cost : undefined;
    }

    /**
     * Produce an HTML string showing the cost of a building, with
     * insufficient resources highlighted in red.
     *
     * Example output: <span>🪵 3</span> <span style="color:red">🪨 2</span>
     *
     * @param {string} type — Building type.
     * @param {Object} resources — Player's current resources.
     * @returns {string} Safe HTML snippet (no user input is interpolated).
     */
    function getCostDisplay(type, resources) {
        var building = getBuilding(type);
        if (!building) { return ''; }

        var cost = building.cost;
        var parts = [];

        for (var resource in cost) {
            if (cost.hasOwnProperty(resource)) {
                var amount = cost[resource];
                var emoji = RESOURCE_EMOJIS[resource] || resource;
                var have = resources[resource] || 0;

                if (have < amount) {
                    parts.push('<span style="color:red">' + emoji + ' ' + amount + '</span>');
                } else {
                    parts.push('<span>' + emoji + ' ' + amount + '</span>');
                }
            }
        }

        return parts.join(' ');
    }

    /**
     * Check whether a building type is unlocked given the number
     * of buildings the player has placed.
     * @param {string} type — Building type.
     * @param {number} buildingsPlaced — Total buildings placed so far.
     * @returns {boolean} True if unlocked.
     */
    function isUnlocked(type, buildingsPlaced) {
        var building = getBuilding(type);
        if (!building) { return false; }
        return building.unlockAt <= buildingsPlaced;
    }

    /**
     * Find the next building(s) that will unlock and how many more
     * placements are needed.
     * @param {number} buildingsPlaced — Total buildings placed so far.
     * @returns {{ buildings: Array.<string>, needed: number }|null}
     *          The next unlock tier, or null if everything is unlocked.
     */
    function getNextUnlock(buildingsPlaced) {
        // Find the smallest unlockAt that is still greater than buildingsPlaced
        var nextThreshold = null;

        for (var i = 0; i < catalog.length; i++) {
            var threshold = catalog[i].unlockAt;
            if (threshold > buildingsPlaced) {
                if (nextThreshold === null || threshold < nextThreshold) {
                    nextThreshold = threshold;
                }
            }
        }

        if (nextThreshold === null) {
            return null; // all buildings are already unlocked
        }

        // Collect every building at that threshold
        var buildings = [];
        for (var j = 0; j < catalog.length; j++) {
            if (catalog[j].unlockAt === nextThreshold) {
                buildings.push(catalog[j].type);
            }
        }

        return {
            buildings: buildings,
            needed: nextThreshold - buildingsPlaced
        };
    }

    // ── Expose public interface ────────────────────────────────

    return {
        getCatalog: getCatalog,
        getAvailable: getAvailable,
        getBuilding: getBuilding,
        canAfford: canAfford,
        getCost: getCost,
        getCostDisplay: getCostDisplay,
        isUnlocked: isUnlocked,
        getNextUnlock: getNextUnlock
    };
})();
