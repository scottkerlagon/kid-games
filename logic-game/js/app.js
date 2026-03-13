/**
 * Robot Brain Builder — Application Entry Point
 * Wires together all modules, manages screen navigation, and handles all
 * user-facing event listeners.
 * Loads LAST and has access to all other modules via window.LogicGame:
 *   LogicGame.Profiles, LogicGame.Sound, LogicGame.Levels,
 *   LogicGame.Interactions, LogicGame.Engine, LogicGame.Robot,
 *   LogicGame.Professor, LogicGame.ChallengesModule1-4
 *
 * Registers on window.LogicGame.App namespace.
 */
window.LogicGame = window.LogicGame || {};

(function() {
    'use strict';

    var Profiles = window.LogicGame.Profiles;
    var Sound = window.LogicGame.Sound;
    var Levels = window.LogicGame.Levels;
    var Engine = window.LogicGame.Engine;
    var Robot = window.LogicGame.Robot;

    // ── Screen Navigation ───────────────────────────────────────────────

    /**
     * Show a single screen by id, hiding all others.
     * Re-triggers any CSS entrance animation on the target.
     */
    function showScreen(screenId) {
        var screens = [
            'profile-screen',
            'level-screen',
            'shop-screen',
            'game-screen',
            'level-complete-screen',
            'level-failed-screen'
        ];
        for (var i = 0; i < screens.length; i++) {
            var el = document.getElementById(screens[i]);
            if (el) el.style.display = 'none';
        }
        var target = document.getElementById(screenId);
        if (target) {
            target.style.display = 'block';
            // Re-trigger CSS animation
            target.style.animation = 'none';
            target.offsetHeight; // force reflow
            target.style.animation = '';
        }
    }

    // ── Profile Screen ──────────────────────────────────────────────────

    /**
     * Render the profile selection screen. Lists all saved profiles with
     * star counts and coin totals. Provides create and delete controls.
     */
    function renderProfileScreen() {
        showScreen('profile-screen');
        var list = document.getElementById('profile-list');
        if (!list) return;
        list.innerHTML = '';

        var profiles = Profiles.getAll();

        if (profiles.length === 0) {
            var emptyMsg = document.createElement('p');
            emptyMsg.className = 'profile-empty-message';
            emptyMsg.textContent = 'No profiles yet. Create one to start playing!';
            list.appendChild(emptyMsg);
            return;
        }

        for (var i = 0; i < profiles.length; i++) {
            (function(p) {
                var item = document.createElement('div');
                item.className = 'profile-item';

                var btn = document.createElement('button');
                btn.className = 'btn profile-btn';

                var info = document.createElement('div');
                info.className = 'profile-info';

                var nameSpan = document.createElement('span');
                nameSpan.textContent = p.name;
                info.appendChild(nameSpan);

                var stats = document.createElement('span');
                stats.className = 'profile-stats';
                var totalStars = Profiles.getTotalStars(p);
                stats.textContent = '\u2B50 ' + totalStars + '  \uD83E\uDE99 ' + p.coins;
                info.appendChild(stats);

                btn.appendChild(info);

                btn.addEventListener('click', function() {
                    Profiles.setActive(p.id);
                    if (Sound && Sound.playClick) Sound.playClick();
                    showLevelScreen();
                });

                var del = document.createElement('button');
                del.className = 'btn profile-delete';
                del.textContent = '\u2715';
                del.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (confirm('Delete profile "' + p.name + '"?')) {
                        Profiles.deleteProfile(p.id);
                        renderProfileScreen();
                    }
                });

                item.appendChild(btn);
                item.appendChild(del);
                list.appendChild(item);
            })(profiles[i]);
        }
    }

    // ── Level Screen ────────────────────────────────────────────────────

    /**
     * Render the level selection screen. Shows the active profile's name,
     * total stars with a progress bar, coins, and all 24 level buttons
     * organized in 4 collapsible module sections.
     */
    function showLevelScreen() {
        showScreen('level-screen');
        refreshLevelScreen();
    }

    /**
     * Refresh the level screen data without changing screen visibility.
     * Called after completing/failing a level to update stars and coins.
     */
    function refreshLevelScreen() {
        var profile = Profiles.getActive();
        if (!profile) {
            renderProfileScreen();
            return;
        }

        // Update header info
        var nameEl = document.getElementById('level-profile-name');
        if (nameEl) nameEl.textContent = 'Player: ' + profile.name;

        // Update star progress
        var totalStars = Profiles.getTotalStars(profile);
        var maxStars = Levels ? Levels.getMaxPossibleStars() : 72;
        var starCountEl = document.getElementById('star-count');
        if (starCountEl) starCountEl.textContent = totalStars + ' / ' + maxStars + ' Stars';
        var bar = document.getElementById('star-progress-bar');
        if (bar) bar.style.width = Math.round(totalStars / maxStars * 100) + '%';

        // Update coins
        var coinEl = document.getElementById('coin-count-level');
        if (coinEl) coinEl.textContent = String(profile.coins);

        // Update level buttons
        var levelBtns = document.querySelectorAll('.level-btn[data-level]');
        for (var i = 0; i < levelBtns.length; i++) {
            var btn = levelBtns[i];
            var levelId = parseInt(btn.getAttribute('data-level'), 10);
            if (isNaN(levelId)) continue;

            var progress = profile.levelProgress[String(levelId)];
            var levelMeta = Levels ? Levels.getLevel(levelId) : null;

            // Update level name from metadata
            var nameSpan = btn.querySelector('.level-name');
            if (nameSpan && levelMeta) nameSpan.textContent = levelMeta.name;

            // Update stars display
            var starsEl = btn.querySelector('.level-stars');
            if (starsEl) {
                var stars = (progress && progress.bestStars) ? progress.bestStars : 0;
                var html = '';
                for (var s = 0; s < 3; s++) {
                    if (s < stars) {
                        html += '<span class="star-earned">\u2605</span>';
                    } else {
                        html += '<span class="star-empty">\u2606</span>';
                    }
                }
                starsEl.innerHTML = html;
            }

            // Update completed state
            if (progress && progress.completed) {
                btn.classList.add('completed');
            } else {
                btn.classList.remove('completed');
            }
        }
    }

    // ── Shop Screen ─────────────────────────────────────────────────────

    /**
     * Show the robot shop screen with the active profile's coins, the
     * robot preview, and the currently selected item category tab.
     */
    function showShopScreen() {
        showScreen('shop-screen');
        var profile = Profiles.getActive();
        if (!profile) {
            renderProfileScreen();
            return;
        }

        // Update coin display
        var coinEl = document.getElementById('coin-count-shop');
        if (coinEl) coinEl.textContent = String(profile.coins);

        // Update robot preview
        if (Robot && Robot.updateRobotPreview) {
            Robot.updateRobotPreview(profile);
        }

        // Render the active category
        var activeTab = document.querySelector('.shop-tab.active');
        var category = activeTab ? activeTab.getAttribute('data-category') : 'antennas';
        renderShopCategory(category, profile);
    }

    /**
     * Render items for a specific shop category tab.
     */
    function renderShopCategory(category, profile) {
        if (!Robot || !Robot.renderShopItems) return;
        Robot.renderShopItems(category, profile);

        // Update coin display after potential purchase
        var coinEl = document.getElementById('coin-count-shop');
        if (coinEl && profile) coinEl.textContent = String(profile.coins);
    }

    // ── Event Wiring ────────────────────────────────────────────────────

    /**
     * Attach all event listeners for buttons and interactive elements
     * across every screen.
     */
    function wireEvents() {
        // ── Profile Screen ──────────────────────────────────────────

        var createBtn = document.getElementById('create-profile-btn');
        var nameInput = document.getElementById('profile-name-input');

        if (createBtn && nameInput) {
            createBtn.addEventListener('click', function() {
                var name = nameInput.value.trim();
                if (!name) return;
                if (!Profiles.canCreateProfile()) {
                    alert('Maximum number of profiles reached (' + Profiles.MAX_PROFILES + '). Delete one to create a new one.');
                    return;
                }
                var newProfile = Profiles.createProfile(name);
                if (newProfile) {
                    nameInput.value = '';
                    if (Sound && Sound.playClick) Sound.playClick();
                    showLevelScreen();
                }
            });

            nameInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    createBtn.click();
                }
            });
        }

        // ── Level Screen ────────────────────────────────────────────

        // Change profile button
        var changeProfileBtn = document.getElementById('change-profile-btn');
        if (changeProfileBtn) {
            changeProfileBtn.addEventListener('click', function() {
                if (Sound && Sound.playNavigate) Sound.playNavigate();
                renderProfileScreen();
            });
        }

        // Open shop button
        var openShopBtn = document.getElementById('open-shop-btn');
        if (openShopBtn) {
            openShopBtn.addEventListener('click', function() {
                if (Sound && Sound.playClick) Sound.playClick();
                showShopScreen();
            });
        }

        // Level buttons
        var levelBtns = document.querySelectorAll('.level-btn[data-level]');
        for (var i = 0; i < levelBtns.length; i++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    var levelId = parseInt(btn.getAttribute('data-level'), 10);
                    if (isNaN(levelId)) return;
                    if (Sound && Sound.playClick) Sound.playClick();
                    showScreen('game-screen');
                    if (Engine && Engine.startLevel) {
                        Engine.startLevel(levelId);
                    }
                });
            })(levelBtns[i]);
        }

        // Module header toggles (collapsible sections)
        var moduleHeaders = document.querySelectorAll('.module-header');
        for (var m = 0; m < moduleHeaders.length; m++) {
            (function(header) {
                header.addEventListener('click', function() {
                    var moduleId = header.getAttribute('data-module');
                    var body = document.querySelector('.module-body[data-module="' + moduleId + '"]');
                    if (body) {
                        body.classList.toggle('collapsed');
                        header.classList.toggle('collapsed');
                    }
                });
            })(moduleHeaders[m]);
        }

        // ── Shop Screen ────────────────────────────────────────────

        // Shop back button
        var shopBackBtn = document.getElementById('shop-back-btn');
        if (shopBackBtn) {
            shopBackBtn.addEventListener('click', function() {
                if (Sound && Sound.playNavigate) Sound.playNavigate();
                showLevelScreen();
            });
        }

        // Shop category tabs
        var shopTabs = document.querySelectorAll('.shop-tab');
        for (var t = 0; t < shopTabs.length; t++) {
            (function(tab) {
                tab.addEventListener('click', function() {
                    // Deactivate all tabs
                    for (var j = 0; j < shopTabs.length; j++) {
                        shopTabs[j].classList.remove('active');
                    }
                    // Activate this tab
                    tab.classList.add('active');
                    if (Sound && Sound.playClick) Sound.playClick();

                    var category = tab.getAttribute('data-category');
                    var profile = Profiles.getActive();
                    if (profile) renderShopCategory(category, profile);
                });
            })(shopTabs[t]);
        }

        // ── Game Screen ─────────────────────────────────────────────

        // Back to levels button
        var backToLevelsBtn = document.getElementById('back-to-levels-btn');
        if (backToLevelsBtn) {
            backToLevelsBtn.addEventListener('click', function() {
                if (Sound && Sound.playNavigate) Sound.playNavigate();
                showLevelScreen();
            });
        }

        // Mute button
        var muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            // Set initial icon based on current state
            var initialEnabled = Profiles.isSoundEnabled();
            muteBtn.textContent = initialEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';

            muteBtn.addEventListener('click', function() {
                var enabled = Profiles.isSoundEnabled();
                Profiles.setSoundEnabled(!enabled);
                muteBtn.textContent = !enabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
            });
        }

        // Hint button
        var hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', function() {
                if (Engine && Engine.handleHint) {
                    Engine.handleHint();
                }
            });
        }

        // Submit answer button
        var submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                if (Engine && Engine.handleSubmit) {
                    Engine.handleSubmit();
                }
            });
        }

        // Level Complete and Level Failed screen buttons are wired by
        // Engine.wireCompleteButtons() and Engine.wireFailedButtons()
        // which are called dynamically when those screens are shown.
        // No duplicate wiring needed here.
    }

    // ── Initialization ──────────────────────────────────────────────────

    // Load saved profiles from localStorage
    Profiles.load();

    // Initialize sound on first user interaction (browser autoplay policy)
    document.addEventListener('click', function initSound() {
        if (Sound && Sound.init) Sound.init();
        document.removeEventListener('click', initSound);
    }, { once: true });

    // Render the profile screen as the starting view
    renderProfileScreen();

    // Wire up all event listeners
    wireEvents();

    // ── Expose App API for Engine callbacks ─────────────────────────────

    window.LogicGame.App = {
        showScreen: showScreen,
        showLevelScreen: showLevelScreen,
        refreshLevelScreen: refreshLevelScreen,
        renderProfileScreen: renderProfileScreen,
        showShopScreen: showShopScreen
    };
})();
