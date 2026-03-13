/**
 * Robot Brain Builder — Game Engine
 * Runs levels: challenge presentation, answer checking, hearts, coins, stars,
 * level complete/failed flow, hints, confetti, and feedback overlays.
 * Registers on window.LogicGame.Engine namespace.
 *
 * Dependencies:
 *   window.LogicGame.Profiles      — profile data, saving progress
 *   window.LogicGame.Sound          — playing sounds
 *   window.LogicGame.Levels         — level metadata
 *   window.LogicGame.Interactions   — rendering challenges, getting/checking answers
 *   window.LogicGame.Professor      — showing professor messages
 *   window.LogicGame.ChallengesModule1 through ChallengesModule4 — challenge data
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Engine = (function() {
    'use strict';

    // ── State ──────────────────────────────────────────────────────────
    var currentLevelId = null;
    var challenges = [];
    var currentChallengeIndex = 0;
    var hearts = 3;
    var coinsEarned = 0;
    var challengeAttempts = {};
    var submitting = false;  // guard against double-submit

    // ── Helpers ────────────────────────────────────────────────────────

    /**
     * Safely get a DOM element by id. Returns null if missing.
     */
    function $(id) {
        return document.getElementById(id);
    }

    /**
     * Show one screen and hide all others.
     */
    function showScreen(screenId) {
        var screens = document.querySelectorAll('.screen');
        for (var i = 0; i < screens.length; i++) {
            screens[i].style.display = 'none';
        }
        var target = $(screenId);
        if (target) target.style.display = 'block';
    }

    // ── getChallenges ──────────────────────────────────────────────────

    /**
     * Combine all four challenge module banks and return the challenge
     * array for the requested level. Returns [] if the level has no data.
     */
    function getChallenges(levelId) {
        var all = {};
        var m1 = window.LogicGame.ChallengesModule1 || {};
        var m2 = window.LogicGame.ChallengesModule2 || {};
        var m3 = window.LogicGame.ChallengesModule3 || {};
        var m4 = window.LogicGame.ChallengesModule4 || {};
        var k;
        for (k in m1) { if (m1.hasOwnProperty(k)) all[k] = m1[k]; }
        for (k in m2) { if (m2.hasOwnProperty(k)) all[k] = m2[k]; }
        for (k in m3) { if (m3.hasOwnProperty(k)) all[k] = m3[k]; }
        for (k in m4) { if (m4.hasOwnProperty(k)) all[k] = m4[k]; }
        return all[levelId] || [];
    }

    // ── startLevel ─────────────────────────────────────────────────────

    /**
     * Called when a level button is clicked. Initialises game state,
     * transitions to the game screen, and presents the first challenge.
     */
    function startLevel(levelId) {
        var Levels = window.LogicGame.Levels;
        var Sound = window.LogicGame.Sound;
        var Professor = window.LogicGame.Professor;

        currentLevelId = levelId;
        challenges = getChallenges(levelId);
        currentChallengeIndex = 0;
        hearts = 3;
        coinsEarned = 0;
        challengeAttempts = {};
        submitting = false;

        // Edge case: no challenges for this level
        if (!challenges || challenges.length === 0) {
            if (Professor && Professor.showMessage) {
                Professor.showMessage('Hmm, this level has no challenges yet. Check back soon!', 'sad');
            }
            return;
        }

        // Show the game screen
        showScreen('game-screen');

        // Set level title
        var levelMeta = Levels ? Levels.getLevel(levelId) : null;
        var titleEl = $('level-title');
        if (titleEl) {
            titleEl.textContent = levelMeta ? levelMeta.name : ('Level ' + levelId);
        }

        // Reset hearts display
        updateHeartsDisplay(3);

        // Reset coin display
        var coinEl = $('coin-count-game');
        if (coinEl) coinEl.textContent = '0';

        // Reset progress bar
        var progressFill = $('progress-bar-fill');
        if (progressFill) progressFill.style.width = '0%';

        var progressText = $('progress-text');
        if (progressText) progressText.textContent = '0 / ' + challenges.length;

        // Clear any leftover hint text
        var oldHint = document.querySelector('#challenge-area .hint-text');
        if (oldHint) oldHint.remove();

        // Enable submit button
        var submitBtn = $('submit-btn');
        if (submitBtn) submitBtn.disabled = false;

        // Play navigate sound
        if (Sound && Sound.playNavigate) Sound.playNavigate();

        // Show professor level intro
        var introText = (levelMeta && levelMeta.professorIntro)
            ? levelMeta.professorIntro
            : 'Let\'s get started!';
        if (Professor && Professor.showMessage) {
            Professor.showMessage(introText, 'excited');
        }

        // Small delay so the player can read the intro, then show first challenge
        setTimeout(function() {
            presentChallenge(0);
        }, 800);
    }

    // ── presentChallenge ───────────────────────────────────────────────

    /**
     * Render the challenge at the given index into the challenge area.
     */
    function presentChallenge(index) {
        var Interactions = window.LogicGame.Interactions;
        var Professor = window.LogicGame.Professor;

        currentChallengeIndex = index;
        submitting = false;

        // Bounds check
        if (index < 0 || index >= challenges.length) {
            completeLevel();
            return;
        }

        var challenge = challenges[index];
        if (!challenge) {
            // Skip missing challenge data — move to next
            presentChallenge(index + 1);
            return;
        }

        // Update progress display
        var progressText = $('progress-text');
        if (progressText) {
            progressText.textContent = (index + 1) + ' / ' + challenges.length;
        }

        // Update progress bar fill
        var progressFill = $('progress-bar-fill');
        if (progressFill) {
            var pct = challenges.length > 0
                ? ((index) / challenges.length) * 100
                : 0;
            progressFill.style.width = pct + '%';
        }

        // Initialise attempts for this challenge if not set
        if (typeof challengeAttempts[index] !== 'number') {
            challengeAttempts[index] = 0;
        }

        // Show professor intro for this specific challenge
        if (challenge.professorIntro && Professor && Professor.showMessage) {
            Professor.showMessage(challenge.professorIntro, 'neutral');
        }

        // Render the challenge via Interactions module
        var container = $('challenge-area');
        if (container && Interactions && Interactions.render) {
            Interactions.render(challenge, container);
        }

        // Enable submit button
        var submitBtn = $('submit-btn');
        if (submitBtn) submitBtn.disabled = false;

        // Reset hint state: remove old hint, enable hint button
        var oldHint = container ? container.querySelector('.hint-text') : null;
        if (oldHint) oldHint.remove();
        var hintBtn = document.querySelector('.hint-btn');
        if (hintBtn) hintBtn.disabled = false;
    }

    // ── handleSubmit ───────────────────────────────────────────────────

    /**
     * Called when the submit / "Check Answer" button is clicked.
     */
    function handleSubmit() {
        if (submitting) return;

        var Interactions = window.LogicGame.Interactions;
        var Sound = window.LogicGame.Sound;
        var Professor = window.LogicGame.Professor;

        if (!Interactions) return;

        // Get the player's answer
        var answer = Interactions.getAnswer ? Interactions.getAnswer() : undefined;
        if (answer === null || answer === undefined) return; // nothing selected

        // Prevent double-submit during feedback
        submitting = true;

        var submitBtn = $('submit-btn');
        if (submitBtn) submitBtn.disabled = true;

        var challenge = challenges[currentChallengeIndex];
        if (!challenge) {
            submitting = false;
            return;
        }

        // Track attempts
        if (typeof challengeAttempts[currentChallengeIndex] !== 'number') {
            challengeAttempts[currentChallengeIndex] = 0;
        }
        challengeAttempts[currentChallengeIndex]++;

        // Check answer
        var isCorrect = Interactions.checkAnswer
            ? Interactions.checkAnswer(challenge, answer)
            : false;

        if (isCorrect) {
            handleCorrect(challenge);
        } else {
            handleWrong(challenge);
        }
    }

    /**
     * Handle a correct answer.
     */
    function handleCorrect(challenge) {
        var Sound = window.LogicGame.Sound;
        var Professor = window.LogicGame.Professor;
        var Interactions = window.LogicGame.Interactions;

        // Calculate coins for this challenge
        var attempts = challengeAttempts[currentChallengeIndex] || 1;
        var coins;
        if (attempts === 1) {
            coins = 10;
        } else if (attempts === 2) {
            coins = 5;
        } else {
            coins = 2;
        }
        coinsEarned += coins;

        // Update coin display
        var coinEl = $('coin-count-game');
        if (coinEl) coinEl.textContent = String(coinsEarned);

        // Play correct sound
        if (Sound && Sound.playCorrect) Sound.playCorrect();

        // Mark options visually (if Interactions supports it)
        if (Interactions && Interactions.markCorrect) {
            Interactions.markCorrect(challenge);
        }

        // Show professor correct message
        var correctMsg = (challenge && challenge.professorCorrect)
            ? challenge.professorCorrect
            : 'Great job! That\'s correct!';
        if (Professor && Professor.showMessage) {
            Professor.showMessage(correctMsg, 'happy');
        }

        // Show feedback overlay, then advance
        showFeedback(true, function() {
            var nextIndex = currentChallengeIndex + 1;
            if (nextIndex >= challenges.length) {
                completeLevel();
            } else {
                presentChallenge(nextIndex);
            }
        });
    }

    /**
     * Handle a wrong answer.
     */
    function handleWrong(challenge) {
        var Sound = window.LogicGame.Sound;
        var Professor = window.LogicGame.Professor;
        var Interactions = window.LogicGame.Interactions;

        // Lose a heart
        hearts--;
        updateHeartsDisplay(hearts);

        // Play wrong sound
        if (Sound && Sound.playWrong) Sound.playWrong();

        // Mark selected option as wrong visually (if Interactions supports it)
        if (Interactions && Interactions.markWrong) {
            Interactions.markWrong(challenge);
        }

        // Show professor wrong message
        var wrongMsg = (challenge && challenge.professorWrong)
            ? challenge.professorWrong
            : 'Not quite! Try again.';
        if (Professor && Professor.showMessage) {
            Professor.showMessage(wrongMsg, 'sad');
        }

        // Show feedback overlay
        showFeedback(false, function() {
            if (hearts <= 0) {
                failLevel();
            } else {
                // Re-present the same challenge for retry
                submitting = false;
                var submitBtn = $('submit-btn');
                if (submitBtn) submitBtn.disabled = false;

                // Re-render the challenge so the player can try again cleanly
                var Interactions2 = window.LogicGame.Interactions;
                var container = $('challenge-area');
                if (container && Interactions2 && Interactions2.render) {
                    Interactions2.render(challenge, container);
                }

                // Preserve hint if already shown
                // (hint-text was removed by render; re-add if hint was used)
                var hintBtn = document.querySelector('.hint-btn');
                if (hintBtn && hintBtn.disabled && challenge && challenge.hint) {
                    var hintEl = document.createElement('div');
                    hintEl.className = 'hint-text';
                    hintEl.textContent = 'Hint: ' + challenge.hint;
                    if (container) container.appendChild(hintEl);
                }
            }
        });
    }

    // ── showFeedback ───────────────────────────────────────────────────

    /**
     * Show the feedback overlay (green check or red X) for ~1 second,
     * then call the callback.
     */
    function showFeedback(isCorrect, callback) {
        var overlay = $('feedback-overlay');
        var content = $('feedback-content');
        var icon = $('feedback-icon');
        var text = $('feedback-text');

        if (!overlay || !content || !icon || !text) {
            // DOM elements missing — skip overlay and call back immediately
            if (callback) callback();
            return;
        }

        content.className = 'feedback-content ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong');
        icon.textContent = '';  // CSS ::before handles the icon
        text.textContent = isCorrect ? 'Correct!' : 'Try Again!';
        overlay.style.display = 'flex';

        setTimeout(function() {
            overlay.style.display = 'none';
            if (callback) callback();
        }, 1000);
    }

    // ── completeLevel ──────────────────────────────────────────────────

    /**
     * Called when all challenges have been answered correctly.
     * Calculates stars and bonus, updates the profile, and shows the
     * Level Complete screen.
     */
    function completeLevel() {
        var Profiles = window.LogicGame.Profiles;
        var Sound = window.LogicGame.Sound;
        var Levels = window.LogicGame.Levels;
        var Professor = window.LogicGame.Professor;

        // Calculate stars based on hearts remaining
        var heartsLost = 3 - hearts;
        var stars;
        if (heartsLost === 0) {
            stars = 3;
        } else if (heartsLost === 1) {
            stars = 2;
        } else {
            stars = 1;
        }

        // Completion bonus
        var bonus;
        if (stars === 3) {
            bonus = 30;
        } else if (stars === 2) {
            bonus = 15;
        } else {
            bonus = 5;
        }
        coinsEarned += bonus;

        // Update profile
        var profile = Profiles ? Profiles.getActive() : null;
        if (profile && Profiles) {
            var key = String(currentLevelId);
            var lp = profile.levelProgress[key];
            if (lp) {
                lp.completed = true;
                lp.attempts = (lp.attempts || 0) + 1;

                // Update bestStars (only increase)
                if (stars > lp.bestStars) {
                    var starDiff = stars - lp.bestStars;
                    lp.bestStars = stars;
                    profile.totalStarsEarned = (profile.totalStarsEarned || 0) + starDiff;
                }

                // Update bestScore (only increase)
                if (coinsEarned > lp.bestScore) {
                    lp.bestScore = coinsEarned;
                }

                // Add coins earned to profile total
                profile.coins = (profile.coins || 0) + coinsEarned;

                // Recalculate totalStarsEarned from scratch for safety
                var totalStars = 0;
                for (var lvl in profile.levelProgress) {
                    if (profile.levelProgress.hasOwnProperty(lvl)) {
                        totalStars += (profile.levelProgress[lvl].bestStars || 0);
                    }
                }
                profile.totalStarsEarned = totalStars;

                Profiles.save();
            }
        }

        // Play level complete sound
        if (Sound && Sound.playLevelComplete) Sound.playLevelComplete(stars);

        // Show Level Complete screen
        showScreen('level-complete-screen');

        // Populate star display with animation
        var resultStars = $('result-stars');
        if (resultStars) {
            var starEls = resultStars.querySelectorAll('.result-star');
            for (var s = 0; s < starEls.length; s++) {
                (function(starEl, starIndex, earned) {
                    // Reset
                    starEl.classList.remove('earned', 'pop');
                    starEl.style.opacity = '0.3';
                    starEl.style.transform = 'scale(0.5)';
                    starEl.style.transition = 'none';

                    if (starIndex < earned) {
                        setTimeout(function() {
                            starEl.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
                            starEl.style.opacity = '1';
                            starEl.style.transform = 'scale(1)';
                            starEl.classList.add('earned', 'pop');
                            // Play star sound for each
                            if (Sound && Sound.playStarEarn) Sound.playStarEarn();
                        }, 300 + starIndex * 400);
                    } else {
                        // Unearned star — show dimmed
                        setTimeout(function() {
                            starEl.style.transition = 'opacity 0.3s ease';
                            starEl.style.opacity = '0.25';
                            starEl.style.transform = 'scale(1)';
                        }, 300 + starIndex * 400);
                    }
                })(starEls[s], s, stars);
            }
        }

        // Score breakdown
        var scoreChallenges = $('score-challenges');
        if (scoreChallenges) {
            scoreChallenges.textContent = challenges.length + '/' + challenges.length;
        }

        var scoreHearts = $('score-hearts');
        if (scoreHearts) {
            var heartStr = '';
            for (var h = 0; h < 3; h++) {
                heartStr += (h < hearts) ? '\u2764' : '\uD83E\uDE76';  // filled heart or empty
            }
            scoreHearts.textContent = heartStr;
        }

        var scoreCoins = $('score-coins');
        if (scoreCoins) {
            scoreCoins.textContent = '+' + coinsEarned;
        }

        // Professor celebration message
        var celebrationMessages = [
            'Absolutely brilliant! The robot brain is getting stronger!',
            'Outstanding work, engineer! You\'re a natural!',
            'Fantastic! That brain module is running perfectly!',
            'Incredible! You make this look easy!',
            'Superb! The robot is learning so much from you!'
        ];
        var celebMsg;
        if (stars === 3) {
            celebMsg = 'PERFECT SCORE! You are a logic superstar! The robot\'s brain has never been this powerful!';
        } else if (stars === 2) {
            celebMsg = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
        } else {
            celebMsg = 'Good job completing the level! Try again to earn more stars!';
        }

        var professorCompleteText = $('professor-complete-text');
        if (professorCompleteText) {
            professorCompleteText.textContent = celebMsg;
        }

        // Trigger confetti on 3-star completion
        if (stars === 3) {
            spawnConfetti();
        }

        // Wire up buttons
        wireCompleteButtons();
    }

    /**
     * Wire the Next Level, Replay, and Back to Levels buttons on the
     * Level Complete screen.
     */
    function wireCompleteButtons() {
        var Levels = window.LogicGame.Levels;

        var nextBtn = $('next-level-btn');
        var replayBtn = $('replay-level-btn');
        var backBtn = $('back-to-levels-complete-btn');

        // Next Level button
        if (nextBtn) {
            var nextId = Levels ? Levels.getNextLevelId(currentLevelId) : null;
            if (nextId !== null && nextId !== undefined) {
                nextBtn.style.display = '';
                nextBtn.onclick = function() {
                    var Sound = window.LogicGame.Sound;
                    if (Sound && Sound.playClick) Sound.playClick();
                    startLevel(nextId);
                };
            } else {
                // Last level — hide next button
                nextBtn.style.display = 'none';
            }
        }

        // Replay button
        if (replayBtn) {
            replayBtn.onclick = function() {
                var Sound = window.LogicGame.Sound;
                if (Sound && Sound.playClick) Sound.playClick();
                startLevel(currentLevelId);
            };
        }

        // Back to Levels button
        if (backBtn) {
            backBtn.onclick = function() {
                var Sound = window.LogicGame.Sound;
                if (Sound && Sound.playNavigate) Sound.playNavigate();
                showScreen('level-screen');
                // Refresh level screen to show updated stars/coins
                if (window.LogicGame.App && window.LogicGame.App.refreshLevelScreen) {
                    window.LogicGame.App.refreshLevelScreen();
                }
            };
        }
    }

    // ── failLevel ──────────────────────────────────────────────────────

    /**
     * Called when hearts reach 0. Shows the Level Failed screen with
     * encouragement and retry/back options.
     */
    function failLevel() {
        var Profiles = window.LogicGame.Profiles;
        var Sound = window.LogicGame.Sound;
        var Professor = window.LogicGame.Professor;

        // Play level failed sound
        if (Sound && Sound.playLevelFailed) Sound.playLevelFailed();

        // Update profile attempts count (but do NOT mark completed, do NOT award coins)
        var profile = Profiles ? Profiles.getActive() : null;
        if (profile && Profiles) {
            var key = String(currentLevelId);
            var lp = profile.levelProgress[key];
            if (lp) {
                lp.attempts = (lp.attempts || 0) + 1;
                Profiles.save();
            }
        }

        // Show Level Failed screen
        showScreen('level-failed-screen');

        // Partial score text
        var failedScoreText = $('failed-score-text');
        if (failedScoreText) {
            failedScoreText.textContent = 'You got ' + currentChallengeIndex + ' out of ' + challenges.length + ' challenges right.';
        }

        // Professor encouragement
        var encouragements = [
            'Don\'t give up! Every great engineer learns from mistakes!',
            'Almost there! Let\'s try again — I know you can do it!',
            'The robot believes in you! One more try!',
            'Mistakes are how robots learn! Let\'s reboot and try again!',
            'That was a tough one! But I\'ve seen what you can do — let\'s go again!'
        ];
        var encourageMsg = encouragements[Math.floor(Math.random() * encouragements.length)];

        var professorFailedText = $('professor-failed-text');
        if (professorFailedText) {
            professorFailedText.textContent = encourageMsg;
        }

        // Wire up buttons
        wireFailedButtons();
    }

    /**
     * Wire the Retry and Back to Levels buttons on the Level Failed screen.
     */
    function wireFailedButtons() {
        var retryBtn = $('retry-level-btn');
        var backBtn = $('back-to-levels-failed-btn');

        if (retryBtn) {
            retryBtn.onclick = function() {
                var Sound = window.LogicGame.Sound;
                if (Sound && Sound.playClick) Sound.playClick();
                startLevel(currentLevelId);
            };
        }

        if (backBtn) {
            backBtn.onclick = function() {
                var Sound = window.LogicGame.Sound;
                if (Sound && Sound.playNavigate) Sound.playNavigate();
                showScreen('level-screen');
                if (window.LogicGame.App && window.LogicGame.App.refreshLevelScreen) {
                    window.LogicGame.App.refreshLevelScreen();
                }
            };
        }
    }

    // ── updateHeartsDisplay ────────────────────────────────────────────

    /**
     * Update the heart icons in the game header to reflect the current
     * number of remaining hearts.
     */
    function updateHeartsDisplay(currentHearts) {
        var heartsContainer = $('hearts-display');
        if (!heartsContainer) return;

        var heartElements = heartsContainer.querySelectorAll('.heart');
        for (var i = 0; i < heartElements.length; i++) {
            var el = heartElements[i];
            if (i >= currentHearts) {
                el.classList.add('lost');
                if (!el.classList.contains('was-lost')) {
                    el.classList.add('breaking');
                    el.classList.add('was-lost');
                    // Remove breaking class after animation completes
                    (function(element) {
                        setTimeout(function() {
                            element.classList.remove('breaking');
                        }, 600);
                    })(el);
                }
            } else {
                el.classList.remove('lost', 'breaking', 'was-lost');
            }
        }
    }

    // ── spawnConfetti ──────────────────────────────────────────────────

    /**
     * Create confetti particles for 3-star level completion.
     * Particles are appended to #confetti-container and self-remove
     * after their animation completes.
     */
    function spawnConfetti() {
        var container = $('confetti-container');
        if (!container) return;

        // Clear any leftover confetti
        container.innerHTML = '';

        var colors = ['#FFD700', '#9C27B0', '#4CAF50', '#2196F3', '#FF4081', '#FF9800'];
        var totalPieces = 60;

        for (var i = 0; i < totalPieces; i++) {
            (function(index) {
                setTimeout(function() {
                    var piece = document.createElement('div');
                    piece.className = 'confetti-piece';
                    piece.style.left = Math.random() * 100 + '%';
                    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                    piece.style.animationDuration = (Math.random() * 1 + 1) + 's';
                    piece.style.animationDelay = Math.random() * 0.5 + 's';
                    // Randomise size slightly
                    var size = Math.random() * 6 + 6;
                    piece.style.width = size + 'px';
                    piece.style.height = size + 'px';
                    // Random rotation
                    piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                    container.appendChild(piece);

                    // Self-remove after animation
                    setTimeout(function() {
                        if (piece.parentNode) piece.remove();
                    }, 3000);
                }, index * 30);
            })(i);
        }
    }

    // ── handleHint ─────────────────────────────────────────────────────

    /**
     * Show the hint for the current challenge. Disables the hint button
     * after first use.
     */
    function handleHint() {
        var Sound = window.LogicGame.Sound;
        var challenge = challenges[currentChallengeIndex];

        if (!challenge || !challenge.hint) return;

        var container = $('challenge-area');
        if (!container) return;

        // Check if hint is already showing
        var existing = container.querySelector('.hint-text');
        if (existing) return;

        // Create and append hint element
        var hintEl = document.createElement('div');
        hintEl.className = 'hint-text';
        hintEl.textContent = 'Hint: ' + challenge.hint;
        container.appendChild(hintEl);

        // Disable hint button
        var hintBtn = document.querySelector('.hint-btn');
        if (hintBtn) hintBtn.disabled = true;

        // Play hint sound
        if (Sound && Sound.playHint) Sound.playHint();
    }

    // ── Public API ─────────────────────────────────────────────────────

    return {
        startLevel: startLevel,
        handleSubmit: handleSubmit,
        handleHint: handleHint,
        getCurrentLevelId: function() { return currentLevelId; }
    };
})();
