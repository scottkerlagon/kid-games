/**
 * Science Town Builder — Application Entry Point
 * Wires all subsystems together: profile management, map rendering,
 * quiz sessions, build mode, HUD updates, keyboard/touch input,
 * and screen navigation.
 *
 * Registers on window.ScienceGame.App namespace.
 *
 * Dependencies (all must be loaded before this file):
 *   - window.ScienceGame.Profiles
 *   - window.ScienceGame.Sound
 *   - window.ScienceGame.MapData
 *   - window.ScienceGame.MapRenderer
 *   - window.ScienceGame.Buildings
 *   - window.ScienceGame.QuestionsK2
 *   - window.ScienceGame.Questions35
 *   - window.ScienceGame.Questions68
 *   - window.ScienceGame.QuizEngine
 *   - window.ScienceGame.Progression
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.App = (function() {
    'use strict';

    // -- Module shorthand references ------------------------------------------
    var Profiles    = window.ScienceGame.Profiles;
    var Sound       = window.ScienceGame.Sound;
    var MapData     = window.ScienceGame.MapData;
    var MapRenderer = window.ScienceGame.MapRenderer;
    var Buildings   = window.ScienceGame.Buildings;
    var QuizEngine  = window.ScienceGame.QuizEngine;
    var Progression = window.ScienceGame.Progression;

    // -- Internal state -------------------------------------------------------
    var placementMode      = null;   // building type string while placing, null otherwise
    var buildOverlayOpen   = false;
    var soundInitialized   = false;
    var mapClickHandler    = null;   // reference for removal during placement mode

    // -- Cached DOM references ------------------------------------------------
    var els = {};

    /**
     * Cache all DOM element references. Called once during init.
     */
    function cacheElements() {
        // Screens
        els.profileScreen     = document.getElementById('profile-screen');
        els.mapScreen         = document.getElementById('map-screen');
        els.quizOverlay       = document.getElementById('quiz-overlay');
        els.buildOverlay      = document.getElementById('build-overlay');

        // Profile screen
        els.profileList       = document.getElementById('profile-list');
        els.profileNameInput  = document.getElementById('profile-name-input');
        els.profileGradeSelect = document.getElementById('profile-grade-select');
        els.createProfileBtn  = document.getElementById('create-profile-btn');

        // Map screen - HUD
        els.playerNameDisplay = document.getElementById('player-name-display');
        els.townLevelDisplay  = document.getElementById('town-level-display');
        els.resourceStone     = document.getElementById('resource-stone');
        els.resourceWood      = document.getElementById('resource-wood');
        els.resourceGlass     = document.getElementById('resource-glass');
        els.resourceEnergy    = document.getElementById('resource-energy');
        els.resourceMetal     = document.getElementById('resource-metal');
        els.buildBtn          = document.getElementById('build-btn');
        els.soundToggleBtn    = document.getElementById('sound-toggle-btn');
        els.changeProfileBtn  = document.getElementById('change-profile-btn');

        // Map
        els.mapGrid           = document.getElementById('map-grid');

        // Build overlay
        els.buildResourcesDisplay = document.getElementById('build-resources-display');
        els.buildCatalog      = document.getElementById('build-catalog');
        els.buildStatus       = document.getElementById('build-status');
        els.buildCloseBtn     = document.getElementById('build-close-btn');

        // D-pad
        els.dPad              = document.getElementById('d-pad');
        els.dPadUp            = document.getElementById('d-pad-up');
        els.dPadDown          = document.getElementById('d-pad-down');
        els.dPadLeft          = document.getElementById('d-pad-left');
        els.dPadRight         = document.getElementById('d-pad-right');
        els.dPadInteract      = document.getElementById('d-pad-interact');
    }

    // =========================================================================
    //  1. INIT
    // =========================================================================

    /**
     * Main initialization. Called on DOMContentLoaded.
     * Loads profiles, sets up sound init on first user interaction,
     * renders the profile screen, and attaches all event listeners.
     */
    function init() {
        cacheElements();

        // Load saved profiles from localStorage
        Profiles.load();

        // Initialize Sound on the first user interaction (click anywhere)
        // to satisfy browser autoplay policy
        document.addEventListener('click', initSoundOnce, true);
        document.addEventListener('touchstart', initSoundOnce, true);

        // Render the profile screen
        renderProfiles();

        // Attach event listeners
        setupProfileScreenListeners();
        setupMapScreenListeners();
        setupKeyboardListeners();
        setupDPadListeners();
        detectTouchDevice();
    }

    /**
     * One-shot handler to initialize Sound on the first user interaction.
     */
    function initSoundOnce() {
        if (!soundInitialized) {
            Sound.init();
            soundInitialized = true;
        }
    }

    // =========================================================================
    //  2. PROFILE SCREEN LOGIC
    // =========================================================================

    /**
     * Render all profiles as clickable buttons inside #profile-list.
     * Each button shows name, grade, town level, and building count.
     * Includes a delete (X) button on each profile.
     */
    function renderProfiles() {
        var profiles = Profiles.getAll();
        els.profileList.innerHTML = '';

        if (profiles.length === 0) {
            var emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'No profiles yet. Create one below!';
            emptyMsg.style.color = '#B2DFDB';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.fontStyle = 'italic';
            els.profileList.appendChild(emptyMsg);
            return;
        }

        for (var i = 0; i < profiles.length; i++) {
            (function(profile) {
                var card = document.createElement('div');
                card.className = 'profile-card';
                card.style.display = 'flex';
                card.style.justifyContent = 'space-between';
                card.style.alignItems = 'center';
                card.style.padding = '12px 16px';
                card.style.marginBottom = '8px';
                card.style.background = '#E0F2F1';
                card.style.borderRadius = '12px';
                card.style.cursor = 'pointer';
                card.style.border = '2px solid transparent';
                card.style.transition = 'border-color 0.2s, background 0.2s';

                // Profile info section
                var info = document.createElement('div');
                info.style.flex = '1';

                var nameEl = document.createElement('strong');
                nameEl.textContent = profile.name;
                nameEl.style.fontSize = '20px';
                nameEl.style.color = '#004D40';
                info.appendChild(nameEl);

                var details = document.createElement('div');
                details.style.fontSize = '14px';
                details.style.color = '#00796B';
                details.style.marginTop = '4px';

                var buildingsCount = profile.placedBuildings ? profile.placedBuildings.length : 0;
                var townLevel = Progression.getTownLevel(buildingsCount);

                details.textContent = 'Grade ' + profile.grade +
                    ' \u2022 ' + townLevel.emoji + ' ' + townLevel.name +
                    ' \u2022 ' + buildingsCount + ' building' + (buildingsCount !== 1 ? 's' : '');

                info.appendChild(details);
                card.appendChild(info);

                // Delete button
                var deleteBtn = document.createElement('button');
                deleteBtn.textContent = '\u2715';
                deleteBtn.className = 'btn';
                deleteBtn.style.background = '#F44336';
                deleteBtn.style.color = 'white';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '50%';
                deleteBtn.style.width = '32px';
                deleteBtn.style.height = '32px';
                deleteBtn.style.minHeight = '32px';
                deleteBtn.style.padding = '0';
                deleteBtn.style.fontSize = '16px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.flexShrink = '0';
                deleteBtn.style.marginLeft = '8px';

                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    Sound.playClick();
                    if (confirm('Delete profile "' + profile.name + '"? This cannot be undone.')) {
                        Profiles.deleteProfile(profile.id);
                        renderProfiles();
                    }
                });

                card.appendChild(deleteBtn);

                // Hover effects
                card.addEventListener('mouseenter', function() {
                    card.style.borderColor = '#009688';
                    card.style.background = '#B2DFDB';
                });
                card.addEventListener('mouseleave', function() {
                    card.style.borderColor = 'transparent';
                    card.style.background = '#E0F2F1';
                });

                // Click profile to select and enter map
                card.addEventListener('click', function() {
                    Sound.playClick();
                    Profiles.setActive(profile.id);
                    enterMapScreen();
                });

                els.profileList.appendChild(card);
            })(profiles[i]);
        }
    }

    /**
     * Set up event listeners for the profile screen.
     */
    function setupProfileScreenListeners() {
        // Create profile button
        els.createProfileBtn.addEventListener('click', function() {
            Sound.playClick();

            var name = els.profileNameInput.value.trim();
            if (!name) {
                els.profileNameInput.focus();
                els.profileNameInput.style.outline = '2px solid #F44336';
                setTimeout(function() {
                    els.profileNameInput.style.outline = '';
                }, 1500);
                return;
            }

            var grade = els.profileGradeSelect.value;
            var profile = Profiles.createProfile(name, grade);

            if (profile) {
                els.profileNameInput.value = '';
                enterMapScreen();
            } else {
                // Max profiles reached or other error
                alert('Cannot create more profiles. Maximum is ' + Profiles.MAX_PROFILES + '.');
            }
        });

        // Allow Enter key to create profile
        els.profileNameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                els.createProfileBtn.click();
            }
        });
    }

    // =========================================================================
    //  3. MAP SCREEN LOGIC
    // =========================================================================

    /**
     * Transition from profile screen to map screen.
     * Initializes the map, loads saved player position, and sets up
     * the quiz engine callback.
     */
    function enterMapScreen() {
        var profile = Profiles.getActive();
        if (!profile) return;

        // Hide profile screen, show map screen
        els.profileScreen.style.display = 'none';
        els.mapScreen.style.display = 'block';

        // Initialize the map grid first (renders tiles, caches DOM refs)
        MapRenderer.init();

        // Load saved player position AFTER init so DOM refs are available
        var pos = Profiles.getPlayerPosition();
        if (pos) {
            MapRenderer.setPlayerPosition(pos.x, pos.y);
        }

        // Update the HUD with current profile data
        updateHUD();

        // Wire up the quiz engine end callback
        QuizEngine.setOnSessionEnd(onQuizEnd);

        // Check for nearby building at starting position
        MapRenderer.checkNearbyBuilding();

        // Ensure the page has keyboard focus (not stuck on the hidden input)
        document.body.focus();
    }

    // =========================================================================
    //  4. HUD UPDATES
    // =========================================================================

    /**
     * Update all HUD elements with the active profile's current data.
     * Updates player name, town level, resource counts, and sound toggle icon.
     */
    function updateHUD() {
        var profile = Profiles.getActive();
        if (!profile) return;

        // Player name
        els.playerNameDisplay.textContent = profile.name;

        // Town level
        var buildingsCount = profile.placedBuildings ? profile.placedBuildings.length : 0;
        var townLevel = Progression.getTownLevel(buildingsCount);
        els.townLevelDisplay.textContent = townLevel.emoji + ' ' + townLevel.name;

        // Resources
        var resources = Profiles.getResources();
        if (resources) {
            els.resourceStone.textContent  = resources.stone;
            els.resourceWood.textContent   = resources.wood;
            els.resourceGlass.textContent  = resources.glass;
            els.resourceEnergy.textContent = resources.energy;
            els.resourceMetal.textContent  = resources.metal;
        }

        // Sound toggle icon
        updateSoundToggleIcon();
    }

    /**
     * Update the sound toggle button icon based on current sound state.
     */
    function updateSoundToggleIcon() {
        if (Profiles.isSoundEnabled()) {
            els.soundToggleBtn.textContent = '\uD83D\uDD0A'; // speaker with high volume
        } else {
            els.soundToggleBtn.textContent = '\uD83D\uDD07'; // muted speaker
        }
    }

    // =========================================================================
    //  5. KEYBOARD INPUT
    // =========================================================================

    /**
     * Set up keyboard event listeners for movement and interaction.
     */
    function setupKeyboardListeners() {
        document.addEventListener('keydown', function(e) {
            // If we're on the profile screen, ignore game keys
            if (els.mapScreen.style.display === 'none') return;

            // If quiz is active, ignore movement keys
            if (QuizEngine.isActive()) return;

            // If build overlay is open, only handle Escape
            if (buildOverlayOpen) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    hideBuildOverlay();
                }
                return;
            }

            // If in placement mode, handle Escape to cancel
            if (placementMode) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    exitPlacementMode();
                }
                return;
            }

            // Movement: Arrow keys and WASD
            var dx = 0;
            var dy = 0;
            var isMovementKey = true;

            switch (e.key) {
                case 'ArrowUp':    case 'w': case 'W': dy = -1; break;
                case 'ArrowDown':  case 's': case 'S': dy =  1; break;
                case 'ArrowLeft':  case 'a': case 'A': dx = -1; break;
                case 'ArrowRight': case 'd': case 'D': dx =  1; break;
                default: isMovementKey = false;
            }

            if (isMovementKey) {
                e.preventDefault(); // prevent page scrolling
                var result = MapRenderer.movePlayer(dx, dy);
                if (result.moved) {
                    Profiles.updatePlayerPosition(result.x, result.y);
                }
                return;
            }

            // Interaction: Enter or Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInteraction();
                return;
            }
        });
    }

    /**
     * Handle player interaction (Enter/Space or D-pad interact).
     * Checks for an adjacent science building and starts a quiz session.
     */
    function handleInteraction() {
        var building = MapRenderer.getAdjacentBuilding();
        if (building) {
            Sound.playEnterBuilding();
            QuizEngine.startSession(building);
        }
    }

    // =========================================================================
    //  6. D-PAD (MOBILE) INPUT
    // =========================================================================

    /**
     * Set up D-pad button event listeners for mobile controls.
     * Uses both touchstart (for responsive mobile feel) and click (as fallback).
     */
    function setupDPadListeners() {
        attachDPadButton(els.dPadUp,    0, -1);
        attachDPadButton(els.dPadDown,  0,  1);
        attachDPadButton(els.dPadLeft, -1,  0);
        attachDPadButton(els.dPadRight, 1,  0);

        // Interact button
        var interactHandler = function(e) {
            e.preventDefault();
            if (QuizEngine.isActive() || buildOverlayOpen) return;
            if (placementMode) return;
            handleInteraction();
        };

        els.dPadInteract.addEventListener('touchstart', interactHandler);
        els.dPadInteract.addEventListener('click', interactHandler);
    }

    /**
     * Attach movement handlers to a single D-pad button.
     * @param {HTMLElement} btn - The D-pad button element.
     * @param {number} dx - Horizontal movement offset.
     * @param {number} dy - Vertical movement offset.
     */
    function attachDPadButton(btn, dx, dy) {
        var handler = function(e) {
            e.preventDefault();
            if (QuizEngine.isActive() || buildOverlayOpen || placementMode) return;
            var result = MapRenderer.movePlayer(dx, dy);
            if (result.moved) {
                Profiles.updatePlayerPosition(result.x, result.y);
            }
        };

        btn.addEventListener('touchstart', handler);
        btn.addEventListener('click', handler);
    }

    // =========================================================================
    //  7. QUIZ END CALLBACK
    // =========================================================================

    /**
     * Called when a quiz session ends (all questions answered or closed early).
     * @param {Object} data - Session result { resourcesEarned: number, domain: string }
     */
    function onQuizEnd(data) {
        // Update HUD to reflect new resource counts
        updateHUD();

        // Play exit building sound
        Sound.playExitBuilding();
    }

    // =========================================================================
    //  8. BUILD MODE
    // =========================================================================

    /**
     * Set up event listeners for the map screen (build, sound toggle, change profile).
     */
    function setupMapScreenListeners() {
        // Build button
        els.buildBtn.addEventListener('click', function() {
            Sound.playClick();
            showBuildOverlay();
        });

        // Build overlay close button
        els.buildCloseBtn.addEventListener('click', function() {
            Sound.playClick();
            hideBuildOverlay();
        });

        // Sound toggle
        els.soundToggleBtn.addEventListener('click', function() {
            var newState = !Profiles.isSoundEnabled();
            Profiles.setSoundEnabled(newState);
            updateSoundToggleIcon();
            if (newState) {
                Sound.playClick();
            }
        });

        // Change profile
        els.changeProfileBtn.addEventListener('click', function() {
            Sound.playClick();
            exitPlacementMode();
            els.mapScreen.style.display = 'none';
            els.profileScreen.style.display = 'block';
            renderProfiles();
        });
    }

    /**
     * Show the build overlay. Renders current resources and the building catalog.
     */
    function showBuildOverlay() {
        buildOverlayOpen = true;
        els.buildOverlay.style.display = 'flex';
        els.buildStatus.textContent = 'Select a building, then click a green tile!';
        renderBuildResources();
        renderBuildCatalog();
    }

    /**
     * Hide the build overlay.
     */
    function hideBuildOverlay() {
        buildOverlayOpen = false;
        els.buildOverlay.style.display = 'none';
    }

    /**
     * Render the player's current resources in the build overlay header.
     */
    function renderBuildResources() {
        var resources = Profiles.getResources();
        if (!resources) return;

        els.buildResourcesDisplay.innerHTML =
            '<span class="hud-resource">\uD83E\uDEA8 ' + resources.stone + '</span> ' +
            '<span class="hud-resource">\uD83E\uDEB5 ' + resources.wood + '</span> ' +
            '<span class="hud-resource">\uD83D\uDD2C ' + resources.glass + '</span> ' +
            '<span class="hud-resource">\uD83D\uDD0B ' + resources.energy + '</span> ' +
            '<span class="hud-resource">\u2699\uFE0F ' + resources.metal + '</span>';
    }

    // =========================================================================
    //  9. BUILD CATALOG RENDERING
    // =========================================================================

    /**
     * Render the building catalog inside the build overlay.
     * Shows each building with its emoji, name, description, cost,
     * and a Build button (or a locked/unaffordable indicator).
     */
    function renderBuildCatalog() {
        var resources = Profiles.getResources();
        var placedBuildings = Profiles.getPlacedBuildings();
        var placedCount = placedBuildings ? placedBuildings.length : 0;
        var catalog = Buildings.getCatalog();

        els.buildCatalog.innerHTML = '';

        for (var i = 0; i < catalog.length; i++) {
            (function(building) {
                var card = document.createElement('div');
                card.className = 'build-card';
                card.style.padding = '12px';
                card.style.marginBottom = '8px';
                card.style.borderRadius = '10px';
                card.style.background = '#E0F2F1';
                card.style.border = '2px solid #B2DFDB';

                var unlocked = Buildings.isUnlocked(building.type, placedCount);
                var affordable = unlocked && Buildings.canAfford(building.type, resources);

                if (!unlocked) {
                    card.style.opacity = '0.5';
                    card.classList.add('locked');
                }

                // Header row: emoji + name
                var header = document.createElement('div');
                header.style.display = 'flex';
                header.style.alignItems = 'center';
                header.style.marginBottom = '6px';

                var emoji = document.createElement('span');
                emoji.textContent = building.emoji;
                emoji.style.fontSize = '28px';
                emoji.style.marginRight = '8px';
                header.appendChild(emoji);

                var name = document.createElement('strong');
                name.textContent = building.name;
                name.style.fontSize = '18px';
                name.style.color = '#004D40';
                header.appendChild(name);

                card.appendChild(header);

                // Description
                var desc = document.createElement('p');
                desc.textContent = building.description;
                desc.style.fontSize = '14px';
                desc.style.color = '#00796B';
                desc.style.margin = '0 0 8px 0';
                card.appendChild(desc);

                // Cost display
                var costDiv = document.createElement('div');
                costDiv.style.fontSize = '14px';
                costDiv.style.marginBottom = '8px';
                costDiv.innerHTML = 'Cost: ' + Buildings.getCostDisplay(building.type, resources);
                card.appendChild(costDiv);

                // Action area
                if (!unlocked) {
                    var lockMsg = document.createElement('span');
                    lockMsg.textContent = '\uD83D\uDD12 Unlock at ' + building.unlockAt + ' buildings';
                    lockMsg.style.fontSize = '13px';
                    lockMsg.style.color = '#78909C';
                    card.appendChild(lockMsg);
                } else if (!affordable) {
                    var cantAffordBtn = document.createElement('button');
                    cantAffordBtn.textContent = 'Not enough resources';
                    cantAffordBtn.className = 'btn';
                    cantAffordBtn.disabled = true;
                    cantAffordBtn.style.opacity = '0.5';
                    cantAffordBtn.style.fontSize = '14px';
                    cantAffordBtn.style.padding = '8px 16px';
                    cantAffordBtn.style.cursor = 'not-allowed';
                    card.appendChild(cantAffordBtn);
                } else {
                    var buildBtn = document.createElement('button');
                    buildBtn.textContent = '\uD83D\uDD28 Build';
                    buildBtn.className = 'btn btn-primary';
                    buildBtn.style.fontSize = '14px';
                    buildBtn.style.padding = '8px 16px';
                    buildBtn.style.cursor = 'pointer';

                    buildBtn.addEventListener('click', function() {
                        Sound.playClick();
                        selectBuildingForPlacement(building.type);
                    });

                    card.appendChild(buildBtn);
                }

                els.buildCatalog.appendChild(card);
            })(catalog[i]);
        }
    }

    /**
     * Enter placement mode for a specific building type.
     * Hides the build overlay, highlights buildable tiles, and
     * attaches a click handler to the map grid for tile selection.
     * @param {string} type - The building type to place.
     */
    function selectBuildingForPlacement(type) {
        var building = Buildings.getBuilding(type);
        if (!building) return;

        // Close the build overlay
        hideBuildOverlay();

        // Enter placement mode
        placementMode = type;

        // Highlight buildable tiles on the map
        MapRenderer.highlightBuildableTiles();

        // Update build status text
        els.buildStatus.textContent = 'Click a green tile to place your ' + building.name + '!';

        // Attach click handler to map grid for placement
        mapClickHandler = function(e) {
            handleMapClick(e);
        };
        els.mapGrid.addEventListener('click', mapClickHandler);
    }

    /**
     * Handle a click on the map grid during placement mode.
     * Validates the clicked tile and places the building if valid.
     * @param {Event} e - The click event.
     */
    function handleMapClick(e) {
        if (!placementMode) return;

        // Get tile coordinates from click position
        var tile = MapRenderer.getTileAtPixel(e.clientX, e.clientY);
        if (!tile) return;

        var x = tile.x;
        var y = tile.y;

        // Validate: must be a buildable tile
        if (!MapData.isBuildable(x, y)) return;

        // Validate: no placed building already there
        var placedBuildings = Profiles.getPlacedBuildings();
        if (placedBuildings) {
            for (var i = 0; i < placedBuildings.length; i++) {
                if (placedBuildings[i].x === x && placedBuildings[i].y === y) {
                    return; // tile is occupied
                }
            }
        }

        // Validate: not on the player's current position
        var playerPos = MapRenderer.getPlayerPosition();
        if (playerPos.x === x && playerPos.y === y) return;

        // All checks passed -- place the building
        var building = Buildings.getBuilding(placementMode);
        if (!building) return;

        // Deduct resources
        var cost = Buildings.getCost(placementMode);
        if (!Profiles.deductResources(cost)) return;

        // Save the placed building to the profile (include emoji for map renderer)
        Profiles.addPlacedBuilding(placementMode, x, y, building.emoji);

        // Visually place the building on the map
        MapRenderer.placeBuildingOnTile(x, y, building.emoji);

        // Play build sound
        Sound.playBuild();

        // Check for level up
        var updatedPlaced = Profiles.getPlacedBuildings();
        var oldCount = updatedPlaced.length - 1;
        var newCount = updatedPlaced.length;
        var levelResult = Progression.checkLevelUp(oldCount, newCount);

        if (levelResult.leveledUp) {
            Profiles.updateTownLevel(levelResult.newLevel.index);
            Sound.playLevelUp();
            showLevelUpNotification(levelResult.newLevel);
        }

        // Update HUD with new resource counts and town level
        updateHUD();

        // Exit placement mode
        exitPlacementMode();
    }

    /**
     * Exit placement mode: remove highlights, remove map click handler,
     * and reset the placement state.
     */
    function exitPlacementMode() {
        if (placementMode) {
            MapRenderer.clearBuildableHighlight();
        }

        if (mapClickHandler) {
            els.mapGrid.removeEventListener('click', mapClickHandler);
            mapClickHandler = null;
        }

        placementMode = null;
    }

    // =========================================================================
    //  10. LEVEL UP NOTIFICATION
    // =========================================================================

    /**
     * Show a celebratory level-up notification overlay.
     * Auto-dismisses after 3 seconds, or click to dismiss.
     * @param {Object} levelObj - The new town level { name, emoji, index }.
     */
    function showLevelUpNotification(levelObj) {
        var overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '10000';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.cursor = 'pointer';
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.5s ease';

        var card = document.createElement('div');
        card.style.background = '#009688';
        card.style.color = 'white';
        card.style.padding = '40px 60px';
        card.style.borderRadius = '20px';
        card.style.textAlign = 'center';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        card.style.transform = 'scale(0.5)';
        card.style.transition = 'transform 0.5s ease-out';

        var emojiEl = document.createElement('div');
        emojiEl.textContent = levelObj.emoji;
        emojiEl.style.fontSize = '64px';
        emojiEl.style.marginBottom = '16px';
        card.appendChild(emojiEl);

        var textEl = document.createElement('div');
        textEl.textContent = 'Your town grew into a ' + levelObj.name + '!';
        textEl.style.fontSize = '28px';
        textEl.style.fontWeight = 'bold';
        textEl.style.fontFamily = "'Segoe UI', system-ui, sans-serif";
        card.appendChild(textEl);

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Trigger the scale-in animation on the next frame
        requestAnimationFrame(function() {
            card.style.transform = 'scale(1)';
        });

        // Dismiss function
        function dismiss() {
            overlay.style.opacity = '0';
            setTimeout(function() {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 500);
        }

        // Click to dismiss
        overlay.addEventListener('click', dismiss);

        // Auto-dismiss after 3 seconds
        setTimeout(dismiss, 3000);
    }

    // =========================================================================
    //  11. TOUCH DEVICE DETECTION
    // =========================================================================

    /**
     * Detect if the device supports touch input.
     * If so, show the D-pad and add a body class.
     */
    function detectTouchDevice() {
        var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (isTouch) {
            document.body.classList.add('touch-device');
            if (els.dPad) {
                els.dPad.style.display = 'grid';
            }
        }
    }

    // =========================================================================
    //  PUBLIC API
    // =========================================================================

    return {
        init: init,
        updateHUD: updateHUD,
        enterMapScreen: enterMapScreen
    };

})();

// ── Self-init on DOMContentLoaded ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    window.ScienceGame.App.init();
});
