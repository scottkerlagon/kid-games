/**
 * Science Town Builder — Quiz Session Engine
 * Manages quiz sessions when the player enters a science building.
 * Selects questions, renders them in the quiz overlay, handles
 * answer checking, and awards resources.
 * Registers on window.ScienceGame.QuizEngine namespace.
 *
 * Dependencies (available at runtime):
 *   - window.ScienceGame.QuestionsK2
 *   - window.ScienceGame.Questions35
 *   - window.ScienceGame.Questions68
 *   - window.ScienceGame.Profiles
 *   - window.ScienceGame.Sound
 *   - window.ScienceGame.Progression
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.QuizEngine = (function() {
    'use strict';

    // ── Constants ──────────────────────────────────────────────
    var QUESTIONS_PER_SESSION = 4;
    var ADVANCE_DELAY_MS = 1500;

    // ── Session state ──────────────────────────────────────────
    var session = {
        active: false,
        domain: '',
        buildingName: '',
        resourceName: '',
        questions: [],
        currentIndex: 0,
        resourcesEarned: 0,
        answered: false
    };

    /** @type {Function|null} Callback invoked when a session ends */
    var onSessionEndCallback = null;

    // ── DOM element references (cached on first use) ──────────
    var els = {};

    /**
     * Cache DOM element references. Safe to call multiple times;
     * only queries the DOM on the first invocation.
     */
    function cacheElements() {
        if (els.overlay) return;
        els.overlay        = document.getElementById('quiz-overlay');
        els.buildingName   = document.getElementById('quiz-building-name');
        els.progress       = document.getElementById('quiz-progress');
        els.questionText   = document.getElementById('quiz-question-text');
        els.options        = document.getElementById('quiz-options');
        els.feedback       = document.getElementById('quiz-feedback');
        els.resourceEarned = document.getElementById('quiz-resource-earned');
        els.closeBtn       = document.getElementById('quiz-close-btn');
    }

    // ── Helper functions ───────────────────────────────────────

    /**
     * Fisher-Yates shuffle. Returns a new array; does not mutate the input.
     * @param {Array} arr - The array to shuffle.
     * @returns {Array} A new shuffled copy of the array.
     */
    function shuffleArray(arr) {
        var shuffled = arr.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    /**
     * Return the question bank object for a given grade band.
     * The bank is keyed by domain: { earth: [...], biology: [...], ... }.
     * @param {string} grade - 'K-2', '3-5', or '6-8'.
     * @returns {Object} The matching question bank (keyed by domain).
     */
    function getQuestionsForGrade(grade) {
        switch (grade) {
            case '3-5': return window.ScienceGame.Questions35 || {};
            case '6-8': return window.ScienceGame.Questions68 || {};
            default:    return window.ScienceGame.QuestionsK2 || {};
        }
    }

    /**
     * Update #quiz-feedback with appropriate styling and text.
     * @param {boolean} correct - Whether the answer was correct.
     * @param {string} explanation - The explanation text to show.
     */
    function showFeedback(correct, explanation) {
        var prefix = correct ? 'Correct! ' : 'Not quite! ';
        els.feedback.textContent = prefix + explanation;
        els.feedback.style.color = correct ? '#2E7D32' : '#C62828';
        els.feedback.style.display = 'block';
    }

    /**
     * Trigger the "+1 emoji" popup animation on #quiz-resource-earned.
     * @param {string} emoji - The resource emoji to display.
     */
    function animateResourceEarned(emoji) {
        els.resourceEarned.textContent = '+1 ' + emoji;
        els.resourceEarned.style.display = 'block';
        els.resourceEarned.style.opacity = '1';
        els.resourceEarned.style.transform = 'translateY(0)';
        els.resourceEarned.style.transition = 'none';

        // Force a reflow so the transition replays
        void els.resourceEarned.offsetWidth;

        els.resourceEarned.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        els.resourceEarned.style.opacity = '0';
        els.resourceEarned.style.transform = 'translateY(-30px)';
    }

    /**
     * Reset session state to defaults.
     */
    function resetSession() {
        session.active = false;
        session.domain = '';
        session.buildingName = '';
        session.resourceName = '';
        session.questions = [];
        session.currentIndex = 0;
        session.resourcesEarned = 0;
        session.answered = false;
    }

    // ── Core functions ─────────────────────────────────────────

    /**
     * Start a quiz session for a science building.
     * Selects questions based on the active profile's grade and the
     * building's science domain, then shows the quiz overlay.
     *
     * @param {Object} building - A science building object from MapData.
     * @param {string} building.id - Building identifier.
     * @param {string} building.domain - Science domain (earth, biology, etc.).
     * @param {string} building.name - Display name (e.g. 'The Quarry').
     * @param {string} building.emoji - Building emoji.
     * @param {string} building.resource - Resource awarded (stone, wood, etc.).
     */
    function startSession(building) {
        cacheElements();

        var Profiles = window.ScienceGame.Profiles;
        var profile = Profiles.getActive();
        if (!profile) return;

        var grade = profile.grade || 'K-2';
        var bank = getQuestionsForGrade(grade);

        // Get questions for the building's science domain
        // Handle both formats: flat array (filter by domain) or domain-keyed object
        var domainQuestions;
        if (Array.isArray(bank)) {
            domainQuestions = bank.filter(function(q) { return q.domain === building.domain; });
        } else {
            domainQuestions = bank[building.domain];
        }
        if (!domainQuestions || !Array.isArray(domainQuestions)) {
            domainQuestions = [];
        }

        // Shuffle and take up to QUESTIONS_PER_SESSION
        var selected = shuffleArray(domainQuestions);
        if (selected.length > QUESTIONS_PER_SESSION) {
            selected = selected.slice(0, QUESTIONS_PER_SESSION);
        }

        // If no questions available at all, bail out gracefully
        if (selected.length === 0) return;

        // Set up session state
        session.active = true;
        session.domain = building.domain;
        session.buildingName = building.name + ' ' + building.emoji;
        session.resourceName = building.resource;
        session.questions = selected;
        session.currentIndex = 0;
        session.resourcesEarned = 0;
        session.answered = false;

        // Show the quiz overlay
        els.overlay.style.display = 'flex';

        // Wire up the close button
        els.closeBtn.onclick = closeSession;

        // Render the first question
        renderQuestion();
    }

    /**
     * Render the current question into the quiz overlay.
     * Updates building name, progress text, question text, and
     * creates fresh option buttons.
     */
    function renderQuestion() {
        var question = session.questions[session.currentIndex];
        var total = session.questions.length;

        // Update header and progress
        els.buildingName.textContent = session.buildingName;
        els.progress.textContent = 'Question ' + (session.currentIndex + 1) + ' of ' + total;
        els.questionText.textContent = question.question;

        // Clear previous options
        els.options.innerHTML = '';

        // Create option buttons
        for (var i = 0; i < question.options.length; i++) {
            var btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = question.options[i];
            btn.setAttribute('data-index', i);
            btn.onclick = (function(index) {
                return function() {
                    handleAnswer(index);
                };
            })(i);
            els.options.appendChild(btn);
        }

        // Hide feedback and resource earned areas
        els.feedback.style.display = 'none';
        els.feedback.textContent = '';
        els.resourceEarned.style.display = 'none';

        // Allow answering
        session.answered = false;
    }

    /**
     * Handle when the player selects an answer option.
     * Highlights the correct/wrong options, shows feedback,
     * awards resources on correct answers, and advances after a delay.
     *
     * @param {number} selectedIndex - The index of the option the player clicked.
     */
    function handleAnswer(selectedIndex) {
        if (session.answered) return;
        session.answered = true;

        var Profiles = window.ScienceGame.Profiles;
        var Sound = window.ScienceGame.Sound;
        var Progression = window.ScienceGame.Progression;

        var question = session.questions[session.currentIndex];
        var correct = (selectedIndex === question.correctIndex);

        // Get all option buttons
        var optionBtns = els.options.querySelectorAll('.quiz-option');

        // Highlight the selected option
        if (correct) {
            optionBtns[selectedIndex].classList.add('correct');
        } else {
            optionBtns[selectedIndex].classList.add('wrong');
            // Also highlight the correct answer
            optionBtns[question.correctIndex].classList.add('correct');
        }

        // Disable all options
        for (var i = 0; i < optionBtns.length; i++) {
            optionBtns[i].classList.add('disabled');
        }

        // Show feedback
        showFeedback(correct, question.explanation);

        if (correct) {
            session.resourcesEarned++;

            // Award the resource
            Profiles.addResource(session.resourceName, 1);

            // Record the answer as correct
            Profiles.recordAnswer(session.domain, true);

            // Play sounds
            if (Sound) {
                Sound.playCorrect();
                Sound.playResourceEarn();
            }

            // Get resource emoji from Progression
            var resourceEmoji = '';
            if (Progression) {
                var domainInfo = Progression.getDomainInfo(session.domain);
                if (domainInfo) {
                    resourceEmoji = domainInfo.resourceEmoji;
                }
            }

            // Animate resource earned popup
            animateResourceEarned(resourceEmoji);
        } else {
            // Record the answer as wrong
            Profiles.recordAnswer(session.domain, false);

            // Play wrong sound
            if (Sound) {
                Sound.playWrong();
            }
        }

        // Advance after a delay
        setTimeout(function() {
            advanceQuestion();
        }, ADVANCE_DELAY_MS);
    }

    /**
     * Move to the next question, or end the session if all questions
     * have been answered.
     */
    function advanceQuestion() {
        session.currentIndex++;

        if (session.currentIndex < session.questions.length) {
            renderQuestion();
        } else {
            endSession();
        }
    }

    /**
     * End the quiz session. Shows a brief summary of resources earned,
     * then hides the overlay and invokes the onSessionEnd callback.
     */
    function endSession() {
        var Progression = window.ScienceGame.Progression;

        // Build a summary message
        var resourceEmoji = '';
        if (Progression) {
            var domainInfo = Progression.getDomainInfo(session.domain);
            if (domainInfo) {
                resourceEmoji = domainInfo.resourceEmoji;
            }
        }

        var summaryText = 'You earned ' + session.resourcesEarned + ' ' + resourceEmoji + '!';

        // Show the summary in the question area
        els.questionText.textContent = summaryText;
        els.progress.textContent = 'Session Complete';
        els.options.innerHTML = '';
        els.feedback.style.display = 'none';
        els.resourceEarned.style.display = 'none';

        // Capture callback data before resetting
        var callbackData = {
            resourcesEarned: session.resourcesEarned,
            domain: session.domain
        };

        // Hide overlay after a brief delay to let the player read the summary
        setTimeout(function() {
            els.overlay.style.display = 'none';
            resetSession();

            // Invoke the onSessionEnd callback
            if (typeof onSessionEndCallback === 'function') {
                onSessionEndCallback(callbackData);
            }
        }, ADVANCE_DELAY_MS);
    }

    /**
     * Force close the quiz session immediately. Used when the player
     * clicks the X close button. Hides the overlay, resets state,
     * and invokes the onSessionEnd callback.
     */
    function closeSession() {
        // Capture callback data before resetting
        var callbackData = {
            resourcesEarned: session.resourcesEarned,
            domain: session.domain
        };

        // Immediately hide and reset
        els.overlay.style.display = 'none';
        resetSession();

        // Invoke the onSessionEnd callback
        if (typeof onSessionEndCallback === 'function') {
            onSessionEndCallback(callbackData);
        }
    }

    /**
     * Check whether a quiz session is currently active.
     * Used by app.js to block map movement during quizzes.
     * @returns {boolean} True if a session is in progress.
     */
    function isActive() {
        return session.active;
    }

    /**
     * Set a callback function to be invoked when a quiz session ends.
     * The callback receives an object: { resourcesEarned: number, domain: string }.
     * @param {Function} callback - The callback to invoke on session end.
     */
    function setOnSessionEnd(callback) {
        onSessionEndCallback = callback;
    }

    // ── Public API ─────────────────────────────────────────────

    return {
        startSession: startSession,
        isActive: isActive,
        setOnSessionEnd: setOnSessionEnd,
        closeSession: closeSession
    };
})();
