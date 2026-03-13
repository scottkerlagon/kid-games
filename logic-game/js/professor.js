/**
 * Robot Brain Builder — Professor Circuit NPC
 * Handles the Professor Circuit character: speech bubbles, expressions,
 * story intros, and encouragement messages.
 * Registers on window.LogicGame.Professor namespace.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Professor = (function() {
    'use strict';

    var LEVEL_INTROS = {
        1: "Time to install the Pattern Scanners! These circuits help the robot recognize shapes and patterns.",
        2: "Now for the Sort Circuits! Let's teach the robot to organize things into groups.",
        3: "Sequence Chips time! The robot needs to learn the right order for things.",
        4: "Installing the Cause Detector! Every action has a reaction.",
        5: "Logic Gate Alpha is up! True or false \u2014 let's find out!",
        6: "Shape Navigator online! Let's help the robot understand spatial relationships.",
        7: "Pattern Turbo engaged! These patterns are trickier than before.",
        8: "Deduction Drive activated! Use the clues to figure things out.",
        9: "Circle Sorter ready! Venn diagrams help us see what things have in common.",
        10: "Logic Gate Beta is more complex! Multiple conditions to check.",
        11: "Chain Reactor sequence! One thing leads to another.",
        12: "Space Mapper deployed! Let's navigate shapes and space.",
        13: "Boolean Core installation! AND, OR, NOT \u2014 the building blocks of logic.",
        14: "Truth Matrix calibration! Every combination has an answer.",
        15: "Reason Engine starting! Is it deductive or inductive?",
        16: "Condition Matrix active! Nested logic gets interesting.",
        17: "Fallacy Filter engaged! Not every argument is a good one.",
        18: "Dimension Shifter online! Think in three dimensions.",
        19: "Variable Vault open! Letters can represent values.",
        20: "Flow Controller connected! Follow the flowchart to the answer.",
        21: "Cipher Cracker activated! Can you break the code?",
        22: "Combo Calculator running! How many ways can you arrange things?",
        23: "Grid Master puzzle loaded! Fill in the logic grid.",
        24: "Full Activation sequence! This is the ultimate test of everything you've learned!"
    };

    var CORRECT_MESSAGES = [
        "Excellent! That's exactly right!",
        "Perfect! The robot's brain is getting stronger!",
        "Wonderful! You're a natural logician!",
        "Spot on! The circuits are connecting!",
        "Brilliant work! Keep it up!",
        "That's correct! The robot loves it!",
        "Amazing! You figured it out!",
        "Right on target! Great thinking!"
    ];

    var WRONG_MESSAGES = [
        "Hmm, not quite. Let's try that one again!",
        "Close, but not exactly. Give it another shot!",
        "The circuits aren't connecting yet. Try again!",
        "Not quite right. Think about it a bit more!",
        "Oops! That's not it. You can do this!",
        "Almost! Let's give it one more try.",
        "The robot needs a different answer. Try again!"
    ];

    var COMPLETE_MESSAGES = [
        "Fantastic! The brain module is installed!",
        "Outstanding work! The robot is getting smarter!",
        "You did it! Another module complete!",
        "Incredible! The robot's brain is really growing!"
    ];

    var FAIL_MESSAGES = [
        "Don't worry! Even the best robots need a reboot sometimes. Let's try again!",
        "The robot just needs a little more power. You'll get it next time!",
        "Not every circuit connects on the first try. Give it another go!",
        "That's okay! Every great scientist has to experiment a few times."
    ];

    /**
     * Valid expression classes that can be applied to the professor character.
     */
    var EXPRESSION_CLASSES = ['professor-neutral', 'professor-happy', 'professor-sad', 'professor-excited'];

    /**
     * Typewriter animation interval handle, so we can cancel an in-progress
     * animation when a new message arrives.
     */
    var typewriterInterval = null;

    /**
     * Return a random element from the given array.
     */
    function randomFrom(array) {
        if (!array || !array.length) return '';
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Show the professor with a speech bubble containing the given text.
     *
     * @param {string} text       The message to display in the speech bubble.
     * @param {string} expression One of 'happy', 'sad', 'excited', or 'neutral' (default).
     */
    function showMessage(text, expression) {
        var professorEl = document.getElementById('professor-character');
        var bubbleEl = document.getElementById('professor-bubble');
        var textEl = document.getElementById('professor-text');

        if (!professorEl || !bubbleEl || !textEl) return;

        // Normalize expression
        var expr = expression || 'neutral';
        var validExpressions = ['happy', 'sad', 'excited', 'neutral'];
        if (validExpressions.indexOf(expr) === -1) {
            expr = 'neutral';
        }

        // Update professor expression class
        for (var i = 0; i < EXPRESSION_CLASSES.length; i++) {
            professorEl.classList.remove(EXPRESSION_CLASSES[i]);
        }
        professorEl.classList.add('professor-' + expr);

        // Update the mouth sub-element if it exists
        var mouthEl = professorEl.querySelector('.professor-mouth');
        if (mouthEl) {
            mouthEl.classList.remove('professor-mouth-happy', 'professor-mouth-sad', 'professor-mouth-excited');
            if (expr === 'happy' || expr === 'excited') {
                mouthEl.classList.add('professor-mouth-happy');
            } else if (expr === 'sad') {
                mouthEl.classList.add('professor-mouth-sad');
            }
        }

        // Cancel any in-progress typewriter animation
        if (typewriterInterval !== null) {
            clearInterval(typewriterInterval);
            typewriterInterval = null;
        }

        // Animate the bubble appearance
        bubbleEl.classList.remove('bubble-visible');
        // Force reflow to restart animation
        void bubbleEl.offsetWidth;
        bubbleEl.classList.add('bubble-visible');

        // Typewriter effect: reveal text character by character
        var safeText = text || '';
        textEl.textContent = '';
        var charIndex = 0;

        if (safeText.length === 0) return;

        typewriterInterval = setInterval(function() {
            charIndex++;
            textEl.textContent = safeText.substring(0, charIndex);
            if (charIndex >= safeText.length) {
                clearInterval(typewriterInterval);
                typewriterInterval = null;
            }
        }, 25);
    }

    /**
     * Show the intro message for a given level.
     * Uses the LEVEL_INTROS dictionary. Falls back to a generic message.
     */
    function showLevelIntro(levelId) {
        var message = LEVEL_INTROS[levelId] || "Let's get started on this level!";
        showMessage(message, 'excited');
    }

    /**
     * Show a random "correct answer" message with a happy expression.
     */
    function showCorrect() {
        showMessage(randomFrom(CORRECT_MESSAGES), 'happy');
    }

    /**
     * Show a random "wrong answer" message with a sad expression.
     */
    function showWrong() {
        showMessage(randomFrom(WRONG_MESSAGES), 'sad');
    }

    /**
     * Show a level completion message with an excited expression.
     * Optionally mentions the star count.
     */
    function showComplete(stars) {
        var baseMessage = randomFrom(COMPLETE_MESSAGES);
        var starMessage = '';
        if (typeof stars === 'number' && stars > 0) {
            if (stars === 3) {
                starMessage = ' A perfect score!';
            } else if (stars === 2) {
                starMessage = ' Great job!';
            } else {
                starMessage = ' You made it through!';
            }
        }
        showMessage(baseMessage + starMessage, 'excited');
    }

    /**
     * Show a failure encouragement message with a sad expression.
     */
    function showFailed() {
        showMessage(randomFrom(FAIL_MESSAGES), 'sad');
    }

    return {
        showMessage: showMessage,
        showLevelIntro: showLevelIntro,
        showCorrect: showCorrect,
        showWrong: showWrong,
        showComplete: showComplete,
        showFailed: showFailed,
        LEVEL_INTROS: LEVEL_INTROS
    };
})();
