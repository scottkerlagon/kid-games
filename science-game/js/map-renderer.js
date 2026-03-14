/**
 * Science Town Builder — Map Renderer & Player Movement
 * Renders the 16x16 CSS Grid map, manages player character position,
 * handles movement with collision detection, and manages build-mode
 * tile highlighting.
 *
 * Registers on window.ScienceGame.MapRenderer namespace.
 *
 * Dependencies (available at runtime):
 *   - window.ScienceGame.MapData  — tile map data and helper functions
 *   - window.ScienceGame.Sound    — playStep(), playEnterBuilding()
 *   - window.ScienceGame.Profiles — getActive(), getPlacedBuildings()
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.MapRenderer = (function() {
    'use strict';

    // ── Shorthand references (set once, used everywhere) ──────────────
    var MapData  = window.ScienceGame.MapData;
    var Sound    = window.ScienceGame.Sound;

    // ── Constants ─────────────────────────────────────────────────────
    var GRID_SIZE  = 16;
    var MOVE_DELAY = 150;   // ms — matches CSS transition duration

    // ── Tile-type → CSS class mapping ─────────────────────────────────
    var TILE_CLASS_MAP = {};
    TILE_CLASS_MAP[MapData.TILE_TYPES.GRASS]       = 'tile-grass';
    TILE_CLASS_MAP[MapData.TILE_TYPES.PATH]        = 'tile-path';
    TILE_CLASS_MAP[MapData.TILE_TYPES.WATER]       = 'tile-water';
    TILE_CLASS_MAP[MapData.TILE_TYPES.TREE]        = 'tile-tree';
    TILE_CLASS_MAP[MapData.TILE_TYPES.SCIENCE_BLDG] = 'tile-science';
    TILE_CLASS_MAP[MapData.TILE_TYPES.TOWN_BLDG]   = 'tile-building';
    TILE_CLASS_MAP[MapData.TILE_TYPES.BLOCKED]     = 'tile-blocked';

    // ── Internal state ────────────────────────────────────────────────
    var playerX      = 8;
    var playerY      = 8;
    var tileElements = [];   // 2D array [y][x] of DOM elements
    var isMoving     = false; // debounce flag

    // ── Cached DOM references ─────────────────────────────────────────
    var mapGrid;
    var playerEl;
    var interactionPrompt;

    // ──────────────────────────────────────────────────────────────────
    //  TILE RENDERING
    // ──────────────────────────────────────────────────────────────────

    /**
     * Determine the emoji to display inside a tile div, if any.
     * @param {number} tileType — MapData.TILE_TYPES value
     * @param {number} x — column
     * @param {number} y — row
     * @returns {string} Emoji string or empty string
     */
    function _tileEmoji(tileType, x, y) {
        if (tileType === MapData.TILE_TYPES.TREE) {
            return '\uD83C\uDF32';  // 🌲
        }
        if (tileType === MapData.TILE_TYPES.SCIENCE_BLDG) {
            var bldg = MapData.getScienceBuildingAt(x, y);
            return bldg ? bldg.emoji : '\uD83C\uDFE2';  // fallback 🏢
        }
        if (tileType === MapData.TILE_TYPES.TOWN_BLDG) {
            // Check placed buildings for the emoji
            var placed = _getPlacedBuildings();
            for (var i = 0; i < placed.length; i++) {
                if (placed[i].x === x && placed[i].y === y) {
                    return placed[i].emoji || '\uD83C\uDFE0';  // fallback 🏠
                }
            }
            return '\uD83C\uDFE0';  // 🏠
        }
        return '';
    }

    /**
     * Get the CSS class for a tile type value.
     * @param {number} tileType
     * @returns {string} CSS class name
     */
    function _tileClass(tileType) {
        return TILE_CLASS_MAP[tileType] || 'tile-grass';
    }

    /**
     * Return the placed buildings array from the active profile.
     * Safe to call when no profile is active (returns empty array).
     * @returns {Array}
     */
    function _getPlacedBuildings() {
        if (window.ScienceGame.Profiles) {
            var buildings = window.ScienceGame.Profiles.getPlacedBuildings();
            if (buildings) return buildings;
        }
        return [];
    }

    /**
     * Check if a placed building occupies a given tile.
     * @param {number} x
     * @param {number} y
     * @returns {Object|null} The placed building object, or null
     */
    function _getPlacedBuildingAt(x, y) {
        var placed = _getPlacedBuildings();
        for (var i = 0; i < placed.length; i++) {
            if (placed[i].x === x && placed[i].y === y) {
                return placed[i];
            }
        }
        return null;
    }

    // ──────────────────────────────────────────────────────────────────
    //  INIT
    // ──────────────────────────────────────────────────────────────────

    /**
     * Render the initial 16x16 map grid.
     * Creates tile divs inside #map-grid, assigns classes and data
     * attributes, and stores references in tileElements[][].
     */
    function init() {
        mapGrid           = document.getElementById('map-grid');
        playerEl          = document.getElementById('player');
        interactionPrompt = document.getElementById('interaction-prompt');

        // Clear any previous tiles (but keep the player div)
        var existingTiles = mapGrid.querySelectorAll('.tile');
        for (var t = 0; t < existingTiles.length; t++) {
            mapGrid.removeChild(existingTiles[t]);
        }

        tileElements = [];

        for (var y = 0; y < GRID_SIZE; y++) {
            tileElements[y] = [];
            for (var x = 0; x < GRID_SIZE; x++) {
                var tileType = MapData.getTile(x, y);
                var div = document.createElement('div');

                div.className = 'tile ' + _tileClass(tileType);
                div.setAttribute('data-x', x);
                div.setAttribute('data-y', y);

                var emoji = _tileEmoji(tileType, x, y);
                if (emoji) {
                    div.textContent = emoji;
                }

                // Insert tiles before the player div so player renders on top
                mapGrid.insertBefore(div, playerEl);
                tileElements[y][x] = div;
            }
        }

        // Overlay placed town buildings from the active profile
        var placed = _getPlacedBuildings();
        for (var p = 0; p < placed.length; p++) {
            var b = placed[p];
            var bEl = tileElements[b.y] && tileElements[b.y][b.x];
            if (bEl) {
                bEl.className = 'tile tile-building';
                bEl.textContent = b.emoji || '\uD83C\uDFE0';
            }
        }

        // Set initial player emoji
        playerEl.textContent = '\uD83E\uDDD1\u200D\uD83D\uDD2C';  // 🧑‍🔬

        // Render player at starting position
        renderPlayer(playerX, playerY);
    }

    // ──────────────────────────────────────────────────────────────────
    //  PLAYER POSITIONING
    // ──────────────────────────────────────────────────────────────────

    /**
     * Position the #player div at tile (x, y) using CSS percentage
     * positioning.  The CSS transition on #player will animate the move.
     *
     * @param {number} x — column (0-15)
     * @param {number} y — row (0-15)
     */
    function renderPlayer(x, y) {
        playerEl.style.left = (x / GRID_SIZE * 100) + '%';
        playerEl.style.top  = (y / GRID_SIZE * 100) + '%';
    }

    /**
     * Set the player position directly, without collision checks.
     * Used when loading a saved position from a profile.
     *
     * @param {number} x
     * @param {number} y
     */
    function setPlayerPosition(x, y) {
        playerX = x;
        playerY = y;
        renderPlayer(playerX, playerY);
    }

    /**
     * Get the current player grid position.
     * @returns {{ x: number, y: number }}
     */
    function getPlayerPosition() {
        return { x: playerX, y: playerY };
    }

    // ──────────────────────────────────────────────────────────────────
    //  MOVEMENT
    // ──────────────────────────────────────────────────────────────────

    /**
     * Attempt to move the player by (dx, dy).
     *
     * @param {number} dx — horizontal offset (-1, 0, or 1)
     * @param {number} dy — vertical offset (-1, 0, or 1)
     * @returns {{ moved: boolean, x: number, y: number }}
     */
    function movePlayer(dx, dy) {
        // Debounce — prevent movement during transition
        if (isMoving) {
            return { moved: false, x: playerX, y: playerY };
        }

        var newX = playerX + dx;
        var newY = playerY + dy;

        // Bounds check
        if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
            return { moved: false, x: playerX, y: playerY };
        }

        // Walkability check (handles GRASS, PATH, SCIENCE_BLDG)
        if (!MapData.isWalkable(newX, newY)) {
            return { moved: false, x: playerX, y: playerY };
        }

        // Also block movement onto placed town buildings
        if (_getPlacedBuildingAt(newX, newY)) {
            return { moved: false, x: playerX, y: playerY };
        }

        // Movement is valid — update state
        playerX = newX;
        playerY = newY;

        // Start debounce
        isMoving = true;
        setTimeout(function() {
            isMoving = false;
        }, MOVE_DELAY);

        // Add walking animation class
        playerEl.classList.add('player-walking');
        setTimeout(function() {
            playerEl.classList.remove('player-walking');
        }, MOVE_DELAY);

        // Render new position
        renderPlayer(playerX, playerY);

        // Play step sound
        if (Sound) {
            Sound.playStep();
        }

        // Check for nearby science buildings and show/hide interaction prompt
        checkNearbyBuilding();

        return { moved: true, x: playerX, y: playerY };
    }

    // ──────────────────────────────────────────────────────────────────
    //  BUILDING PROXIMITY
    // ──────────────────────────────────────────────────────────────────

    /**
     * Check if the player is standing on or adjacent to a SCIENCE_BLDG tile.
     * If so, show the interaction prompt and return the building object.
     * If not, hide the prompt and return null.
     *
     * Adjacent means within 1 tile in any direction (8-directional).
     *
     * @returns {Object|null} The nearby science building, or null
     */
    function checkNearbyBuilding() {
        // First check if standing directly on a science building
        var standing = MapData.getScienceBuildingAt(playerX, playerY);
        if (standing) {
            _showInteractionPrompt(playerX, playerY);
            return standing;
        }

        // Check all 8 adjacent tiles
        var offsets = [
            [-1, -1], [0, -1], [1, -1],
            [-1,  0],          [1,  0],
            [-1,  1], [0,  1], [1,  1]
        ];

        for (var i = 0; i < offsets.length; i++) {
            var checkX = playerX + offsets[i][0];
            var checkY = playerY + offsets[i][1];
            var bldg = MapData.getScienceBuildingAt(checkX, checkY);
            if (bldg) {
                _showInteractionPrompt(checkX, checkY);
                return bldg;
            }
        }

        // No building nearby — hide prompt
        _hideInteractionPrompt();
        return null;
    }

    /**
     * Return the science building the player is standing ON, or null.
     * Used when the player presses Enter/interact — only triggers if
     * the player is directly on the SCIENCE_BLDG tile.
     *
     * @returns {Object|null}
     */
    function getAdjacentBuilding() {
        // Check standing on
        var standing = MapData.getScienceBuildingAt(playerX, playerY);
        if (standing) return standing;

        // Also check adjacent tiles so the player can interact from beside a building
        var offsets = [
            [-1, -1], [0, -1], [1, -1],
            [-1,  0],          [1,  0],
            [-1,  1], [0,  1], [1,  1]
        ];

        for (var i = 0; i < offsets.length; i++) {
            var checkX = playerX + offsets[i][0];
            var checkY = playerY + offsets[i][1];
            var bldg = MapData.getScienceBuildingAt(checkX, checkY);
            if (bldg) return bldg;
        }

        return null;
    }

    /**
     * Show the interaction prompt above the player's position.
     * Position is set relative to the map container.
     *
     * @param {number} bldgX — building tile column (for positioning reference)
     * @param {number} bldgY — building tile row
     */
    function _showInteractionPrompt(bldgX, bldgY) {
        if (!interactionPrompt) return;
        interactionPrompt.style.display = 'block';
    }

    /**
     * Hide the interaction prompt.
     */
    function _hideInteractionPrompt() {
        if (!interactionPrompt) return;
        interactionPrompt.style.display = 'none';
    }

    // ──────────────────────────────────────────────────────────────────
    //  BUILD MODE HIGHLIGHTING
    // ──────────────────────────────────────────────────────────────────

    /**
     * In build mode, add class 'tile-buildable' to all GRASS tiles
     * that do not already have a placed building on them.
     * This shows the player which tiles they can build on.
     */
    function highlightBuildableTiles() {
        var placed = _getPlacedBuildings();

        for (var y = 0; y < GRID_SIZE; y++) {
            for (var x = 0; x < GRID_SIZE; x++) {
                if (!MapData.isBuildable(x, y)) continue;

                // Skip tiles that already have a placed building
                var occupied = false;
                for (var i = 0; i < placed.length; i++) {
                    if (placed[i].x === x && placed[i].y === y) {
                        occupied = true;
                        break;
                    }
                }
                if (occupied) continue;

                tileElements[y][x].classList.add('tile-buildable');
            }
        }
    }

    /**
     * Remove the 'tile-buildable' class from all tiles.
     */
    function clearBuildableHighlight() {
        for (var y = 0; y < GRID_SIZE; y++) {
            for (var x = 0; x < GRID_SIZE; x++) {
                tileElements[y][x].classList.remove('tile-buildable');
            }
        }
    }

    // ──────────────────────────────────────────────────────────────────
    //  TILE UPDATES
    // ──────────────────────────────────────────────────────────────────

    /**
     * Visually place a building on a tile.
     *  - Changes the tile's classes to 'tile tile-building'
     *  - Sets the tile's text to the building emoji
     *  - Plays a brief placement animation via CSS class
     *
     * @param {number} x     — tile column
     * @param {number} y     — tile row
     * @param {string} emoji — building emoji to display
     */
    function placeBuildingOnTile(x, y, emoji) {
        var el = tileElements[y][x];
        if (!el) return;

        el.className = 'tile tile-building';
        el.textContent = emoji;

        // Trigger placement animation
        el.classList.add('building-place-animation');
        setTimeout(function() {
            el.classList.remove('building-place-animation');
        }, 500);
    }

    /**
     * Re-render a single tile based on the current MapData.
     * Useful after placing a building or modifying the map.
     *
     * @param {number} x — tile column
     * @param {number} y — tile row
     */
    function updateTile(x, y) {
        if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;

        var el = tileElements[y][x];
        if (!el) return;

        var tileType = MapData.getTile(x, y);
        el.className = 'tile ' + _tileClass(tileType);

        var emoji = _tileEmoji(tileType, x, y);
        el.textContent = emoji;
    }

    // ──────────────────────────────────────────────────────────────────
    //  HIT TESTING
    // ──────────────────────────────────────────────────────────────────

    /**
     * Convert a click/tap pixel position to tile coordinates.
     * Uses the map-grid's bounding rect divided into 16ths.
     *
     * @param {number} clientX — mouse/touch clientX
     * @param {number} clientY — mouse/touch clientY
     * @returns {{ x: number, y: number }|null} Tile coords, or null if outside grid
     */
    function getTileAtPixel(clientX, clientY) {
        if (!mapGrid) return null;

        var rect = mapGrid.getBoundingClientRect();

        var relX = clientX - rect.left;
        var relY = clientY - rect.top;

        // Out of bounds
        if (relX < 0 || relY < 0 || relX >= rect.width || relY >= rect.height) {
            return null;
        }

        var tileW = rect.width  / GRID_SIZE;
        var tileH = rect.height / GRID_SIZE;

        var tileX = Math.floor(relX / tileW);
        var tileY = Math.floor(relY / tileH);

        // Clamp to valid range (safety)
        if (tileX < 0) tileX = 0;
        if (tileX >= GRID_SIZE) tileX = GRID_SIZE - 1;
        if (tileY < 0) tileY = 0;
        if (tileY >= GRID_SIZE) tileY = GRID_SIZE - 1;

        return { x: tileX, y: tileY };
    }

    // ──────────────────────────────────────────────────────────────────
    //  PUBLIC API
    // ──────────────────────────────────────────────────────────────────

    return {
        init:                   init,
        renderPlayer:           renderPlayer,
        movePlayer:             movePlayer,
        getPlayerPosition:      getPlayerPosition,
        setPlayerPosition:      setPlayerPosition,
        checkNearbyBuilding:    checkNearbyBuilding,
        getAdjacentBuilding:    getAdjacentBuilding,
        highlightBuildableTiles: highlightBuildableTiles,
        clearBuildableHighlight: clearBuildableHighlight,
        placeBuildingOnTile:    placeBuildingOnTile,
        updateTile:             updateTile,
        getTileAtPixel:         getTileAtPixel
    };
})();
