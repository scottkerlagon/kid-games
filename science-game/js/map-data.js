'use strict';

window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.MapData = (function () {
    var TILE_TYPES = {
        GRASS: 0,
        PATH: 1,
        WATER: 2,
        TREE: 3,
        SCIENCE_BLDG: 4,
        TOWN_BLDG: 5,
        BLOCKED: 6
    };

    var G = TILE_TYPES.GRASS;
    var P = TILE_TYPES.PATH;
    var W = TILE_TYPES.WATER;
    var T = TILE_TYPES.TREE;
    var S = TILE_TYPES.SCIENCE_BLDG;

    // 16x16 tile map — accessed as tiles[y][x]
    // Legend:  G=Grass  P=Path  W=Water  T=Tree  S=ScienceBuilding
    //
    //  Columns: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
    var tiles = [
        // Row 0  — top border: water corners, trees between
        [W, W, T, T, T, T, T, W, W, T, T, T, T, T, W, W],
        // Row 1  — near-border: trees on edges, grass interior with a couple trees
        [T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, T],
        // Row 2  — science buildings row: Quarry(3,2), Workshop(7,2), Greenhouse(12,2)
        [T, G, G, S, G, G, G, S, G, G, G, G, S, G, G, T],
        // Row 3  — paths leading down from buildings to the horizontal path
        [T, G, G, P, G, G, G, P, P, G, G, G, P, G, G, T],
        // Row 4  — horizontal path connecting top buildings
        [T, G, P, P, P, P, P, P, P, P, P, P, P, P, G, T],
        // Row 5  — transition: trees on sides, grass opening to town square, vertical path
        [T, G, T, G, G, G, G, P, P, G, G, G, G, T, G, T],
        // Row 6  — town square starts (cols 5-10), vertical path through col 7-8
        [T, G, G, G, G, G, G, P, P, G, G, G, G, G, G, T],
        // Row 7  — town square row, path runs through center
        [W, G, G, G, G, G, G, P, P, G, G, G, G, G, G, T],
        // Row 8  — town square center, player starts at (8,8)
        [T, G, G, G, G, G, G, P, G, G, G, G, G, G, G, W],
        // Row 9  — town square row, small decorative pond at (13,9)-(14,9)
        [T, G, G, G, G, G, G, P, P, G, G, G, G, W, W, T],
        // Row 10 — town square ends, vertical path continues
        [T, G, T, G, G, G, G, P, P, G, G, G, G, G, T, T],
        // Row 11 — paths leading down to bottom buildings
        [T, G, G, P, G, G, G, P, P, G, G, G, P, G, G, T],
        // Row 12 — horizontal path connecting bottom buildings
        [T, G, P, P, P, P, P, P, P, P, P, P, P, P, G, T],
        // Row 13 — science buildings row: Lab(3,13), Power Station(12,13)
        [T, G, G, S, G, G, G, G, G, G, G, G, S, G, G, T],
        // Row 14 — near-border: grass with scattered trees
        [T, G, G, G, G, T, G, G, G, G, T, G, G, G, G, T],
        // Row 15 — bottom border: water corners, trees between
        [W, W, T, T, T, T, W, T, T, W, T, T, T, T, W, W]
    ];

    var scienceBuildings = [
        { id: 'quarry', domain: 'earth', name: 'The Quarry', emoji: '\u26F0\uFE0F', resource: 'stone', x: 3, y: 2 },
        { id: 'workshop', domain: 'engineering', name: 'The Workshop', emoji: '\uD83D\uDD27', resource: 'metal', x: 7, y: 2 },
        { id: 'greenhouse', domain: 'biology', name: 'The Greenhouse', emoji: '\uD83C\uDF3F', resource: 'wood', x: 12, y: 2 },
        { id: 'lab', domain: 'chemistry', name: 'The Laboratory', emoji: '\uD83E\uDDEA', resource: 'glass', x: 3, y: 13 },
        { id: 'powerstation', domain: 'physics', name: 'Power Station', emoji: '\u26A1', resource: 'energy', x: 12, y: 13 }
    ];

    var width = 16;
    var height = 16;
    var playerStart = { x: 8, y: 8 };
    var townSquare = { x: 5, y: 6, width: 6, height: 5 };

    /**
     * Get the tile type at a given position.
     * @param {number} x - Column index (0-15)
     * @param {number} y - Row index (0-15)
     * @returns {number} Tile type constant, or -1 if out of bounds
     */
    function getTile(x, y) {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return -1;
        }
        return tiles[y][x];
    }

    /**
     * Check whether a tile is walkable (GRASS, PATH, or SCIENCE_BLDG).
     * @param {number} x - Column index
     * @param {number} y - Row index
     * @returns {boolean}
     */
    function isWalkable(x, y) {
        var t = getTile(x, y);
        return t === TILE_TYPES.GRASS || t === TILE_TYPES.PATH || t === TILE_TYPES.SCIENCE_BLDG;
    }

    /**
     * Check whether a tile can have a town building placed on it (GRASS only).
     * @param {number} x - Column index
     * @param {number} y - Row index
     * @returns {boolean}
     */
    function isBuildable(x, y) {
        return getTile(x, y) === TILE_TYPES.GRASS;
    }

    /**
     * Return the science building object at a given position, or null.
     * @param {number} x - Column index
     * @param {number} y - Row index
     * @returns {object|null}
     */
    function getScienceBuildingAt(x, y) {
        if (getTile(x, y) !== TILE_TYPES.SCIENCE_BLDG) {
            return null;
        }
        for (var i = 0; i < scienceBuildings.length; i++) {
            if (scienceBuildings[i].x === x && scienceBuildings[i].y === y) {
                return scienceBuildings[i];
            }
        }
        return null;
    }

    return {
        TILE_TYPES: TILE_TYPES,
        tiles: tiles,
        width: width,
        height: height,
        playerStart: playerStart,
        townSquare: townSquare,
        scienceBuildings: scienceBuildings,
        getTile: getTile,
        isWalkable: isWalkable,
        isBuildable: isBuildable,
        getScienceBuildingAt: getScienceBuildingAt
    };
})();
