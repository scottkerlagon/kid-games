/**
 * Robot Brain Builder — Level & Module Metadata
 * Defines all 24 levels across 4 modules with topics, interaction types,
 * and challenge counts. Registers on window.LogicGame.Levels namespace.
 *
 * Interaction Types:
 *   A — Multiple choice (select one answer from options)
 *   B — Drag-and-drop sorting / categorization
 *   C — Sequence ordering (arrange items in correct order)
 *   D — Interactive logic gate / truth table builder
 *   E — Text input (ciphers, code-breaking)
 *   F — Mixed (combination of all types)
 *
 * Star thresholds per level:
 *   3 stars: >= 90% score
 *   2 stars: >= 70% score
 *   1 star:  >= 50% score (minimum to pass)
 *   0 stars: < 50% (fail, must retry)
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Levels = (function() {
    'use strict';

    var STAR_THRESHOLDS = {
        three: 0.9,
        two: 0.7,
        one: 0.5
    };

    var MODULES = [
        {
            id: 1,
            name: 'Perception Core',
            icon: '\uD83D\uDC41\uFE0F',
            description: 'Basic pattern recognition and sorting',
            gradeRange: 'K-2',
            levelRange: [1, 6],
            color: '#4CAF50',
            starsToUnlock: 0
        },
        {
            id: 2,
            name: 'Analysis Engine',
            icon: '\uD83D\uDD0D',
            description: 'Advanced patterns and deduction',
            gradeRange: '3-5',
            levelRange: [7, 12],
            color: '#2196F3',
            starsToUnlock: 12
        },
        {
            id: 3,
            name: 'Logic Processor',
            icon: '\u26A1',
            description: 'Boolean logic and formal reasoning',
            gradeRange: '6-8',
            levelRange: [13, 18],
            color: '#9C27B0',
            starsToUnlock: 24
        },
        {
            id: 4,
            name: 'Master Brain',
            icon: '\uD83E\uDDE0',
            description: 'Variables, flowcharts, and puzzles',
            gradeRange: '6-8',
            levelRange: [19, 24],
            color: '#FF5722',
            starsToUnlock: 36
        }
    ];

    var LEVELS = [
        // ── Module 1: Perception Core (K-2) ──────────────────────────

        {
            id: 1,
            name: 'Pattern Scanners',
            module: 1,
            topics: ['Pattern Recognition', 'Matching'],
            description: 'Find the pattern and pick the next shape!',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 0,
            professorIntro: 'Welcome, young engineer! Your robot needs to learn to see patterns. Help it scan each sequence and predict what comes next.',
            professorHint: 'Look carefully at how the shapes repeat. What comes after the last one?'
        },
        {
            id: 2,
            name: 'Sort Circuits',
            module: 1,
            topics: ['Sorting & Classifying', 'Odd One Out'],
            description: 'Sort items into groups and spot the odd one out.',
            interactionType: 'B',
            challengeCount: 8,
            timeLimit: 0,
            professorIntro: 'Time to wire up the sorting circuits! Drag each item into the right group. One doesn\'t belong — can you find it?',
            professorHint: 'Think about what the items have in common. Which one is different?'
        },
        {
            id: 3,
            name: 'Sequence Chips',
            module: 1,
            topics: ['Sequencing', 'Following Algorithms'],
            description: 'Put the steps in the right order.',
            interactionType: 'C',
            challengeCount: 8,
            timeLimit: 0,
            professorIntro: 'These instruction chips got all scrambled! Drag them into the correct order so the robot knows what to do first, second, and third.',
            professorHint: 'Think about what has to happen first before the next step can start.'
        },
        {
            id: 4,
            name: 'Cause Detector',
            module: 1,
            topics: ['Cause & Effect (Basic)'],
            description: 'Match causes with their effects.',
            interactionType: 'A',
            challengeCount: 7,
            timeLimit: 0,
            professorIntro: 'The robot\'s cause detector needs calibration! For each event, figure out what happens because of it.',
            professorHint: 'Ask yourself: "If this happens, then what would happen next?"'
        },
        {
            id: 5,
            name: 'Logic Gate Alpha',
            module: 1,
            topics: ['Simple If/Then'],
            description: 'Learn basic if/then rules.',
            interactionType: 'D',
            challengeCount: 7,
            timeLimit: 0,
            professorIntro: 'Logic gates are the building blocks of robot thinking! If something is true, what happens? Let\'s find out!',
            professorHint: 'Read the rule carefully. "IF the light is green, THEN the robot moves." Is the light green?'
        },
        {
            id: 6,
            name: 'Shape Navigator',
            module: 1,
            topics: ['Spatial Reasoning', 'Analogies'],
            description: 'Rotate, flip, and find shape relationships.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 0,
            professorIntro: 'The robot needs help navigating through shapes! Can you figure out which shape completes the pattern?',
            professorHint: 'Try rotating the shape in your mind. Does it match if you flip it?'
        },

        // ── Module 2: Analysis Engine (3-5) ──────────────────────────

        {
            id: 7,
            name: 'Pattern Turbo',
            module: 2,
            topics: ['Advanced Patterns', 'Number Puzzles'],
            description: 'Decode tricky number and shape patterns.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 90,
            professorIntro: 'Time to turbocharge the pattern engine! These patterns are trickier — numbers, shapes, and even colors might all change at once.',
            professorHint: 'Look at how each element changes from one step to the next. Is there a rule?'
        },
        {
            id: 8,
            name: 'Deduction Drive',
            module: 2,
            topics: ['Deductive Reasoning', 'Process of Elimination'],
            description: 'Use clues to eliminate wrong answers.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 120,
            professorIntro: 'The deduction drive helps the robot think like a detective! Use each clue to rule out impossibilities until only the truth remains.',
            professorHint: 'Cross off answers that can\'t be right based on the clues. What\'s left?'
        },
        {
            id: 9,
            name: 'Circle Sorter',
            module: 2,
            topics: ['Venn Diagrams', 'Sets & Categorization'],
            description: 'Sort items into overlapping Venn diagram regions.',
            interactionType: 'B',
            challengeCount: 8,
            timeLimit: 120,
            professorIntro: 'Venn diagrams show how groups overlap! Drag each item to the correct region — some items belong to more than one group.',
            professorHint: 'Check each item against both group rules. Does it fit in one circle, both, or neither?'
        },
        {
            id: 10,
            name: 'Logic Gate Beta',
            module: 2,
            topics: ['Complex If/Then', 'Complex Analogies'],
            description: 'Handle multi-step conditionals and analogies.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 120,
            professorIntro: 'These logic gates have more conditions! "If A AND B, then C." Can you trace the chain of reasoning?',
            professorHint: 'Check each condition one at a time. Are ALL of them true?'
        },
        {
            id: 11,
            name: 'Chain Reactor',
            module: 2,
            topics: ['Cause & Effect Chains', 'Algorithmic Thinking'],
            description: 'Trace multi-step cause and effect chains.',
            interactionType: 'C',
            challengeCount: 7,
            timeLimit: 120,
            professorIntro: 'In the chain reactor, one thing leads to another, which leads to another! Order the whole chain from start to finish.',
            professorHint: 'Find the very first event — the one nothing else causes. Build from there.'
        },
        {
            id: 12,
            name: 'Space Mapper',
            module: 2,
            topics: ['Spatial Reasoning Intermediate', 'Decomposition'],
            description: 'Unfold shapes and break problems into parts.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 120,
            professorIntro: 'The space mapper helps the robot understand 3D from 2D! Unfold boxes, rotate shapes, and break complex figures into simple parts.',
            professorHint: 'Try to picture the shape folding up in your mind. Which faces connect?'
        },

        // ── Module 3: Logic Processor (6-8 Part 1) ───────────────────

        {
            id: 13,
            name: 'Boolean Core',
            module: 3,
            topics: ['Boolean Logic (AND/OR/NOT)'],
            description: 'Master AND, OR, and NOT operations.',
            interactionType: 'D',
            challengeCount: 8,
            timeLimit: 150,
            professorIntro: 'Welcome to formal logic! Boolean operations — AND, OR, NOT — are how computers make every decision. Let\'s wire them up!',
            professorHint: 'AND means both must be true. OR means at least one. NOT flips true to false.'
        },
        {
            id: 14,
            name: 'Truth Matrix',
            module: 3,
            topics: ['Truth Tables'],
            description: 'Complete truth tables for logical expressions.',
            interactionType: 'D',
            challengeCount: 7,
            timeLimit: 180,
            professorIntro: 'Truth tables show every possible combination of inputs and outputs. Fill in each cell to map the complete logic!',
            professorHint: 'Work through each row systematically. What are the inputs? Apply the rule to get the output.'
        },
        {
            id: 15,
            name: 'Reason Engine',
            module: 3,
            topics: ['Deductive vs Inductive', 'Syllogisms'],
            description: 'Identify valid syllogisms and reasoning types.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 150,
            professorIntro: 'The reason engine processes arguments! "All dogs are animals. Rex is a dog. Therefore..." Can you spot valid and invalid reasoning?',
            professorHint: 'Check: does the conclusion HAVE to be true if the premises are true? That\'s deduction.'
        },
        {
            id: 16,
            name: 'Condition Matrix',
            module: 3,
            topics: ['Advanced Conditionals', 'Propositional Logic'],
            description: 'Evaluate compound conditional statements.',
            interactionType: 'D',
            challengeCount: 8,
            timeLimit: 180,
            professorIntro: 'Now we combine conditions! "IF (A AND B) OR (NOT C) THEN D." Evaluate these step by step.',
            professorHint: 'Break compound statements into smaller parts. Solve the inner parentheses first.'
        },
        {
            id: 17,
            name: 'Fallacy Filter',
            module: 3,
            topics: ['Logical Fallacies', 'Proofs & Justification'],
            description: 'Spot bad reasoning and logical fallacies.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 150,
            professorIntro: 'The fallacy filter catches bad logic! Not every argument that sounds convincing is actually valid. Can you spot the tricks?',
            professorHint: 'Ask: does the conclusion really follow from the evidence? Or is something sneaky going on?'
        },
        {
            id: 18,
            name: 'Dimension Shifter',
            module: 3,
            topics: ['Advanced Spatial', 'Abstraction'],
            description: 'Abstract spatial reasoning and transformations.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 180,
            professorIntro: 'The dimension shifter bends space! Rotate 3D objects, track transformations, and think abstractly about shape relationships.',
            professorHint: 'Track one specific feature (like a corner or color) through each transformation step.'
        },

        // ── Module 4: Master Brain (6-8 Part 2) ──────────────────────

        {
            id: 19,
            name: 'Variable Vault',
            module: 4,
            topics: ['Variables as Logic', 'Probability'],
            description: 'Use variables and calculate simple probabilities.',
            interactionType: 'A',
            challengeCount: 8,
            timeLimit: 180,
            professorIntro: 'Variables store values that can change! In the variable vault, you\'ll track changing values and figure out the odds.',
            professorHint: 'Substitute the values in and compute step by step. For probability, count favorable outcomes over total outcomes.'
        },
        {
            id: 20,
            name: 'Flow Controller',
            module: 4,
            topics: ['Flowcharts & Pseudocode'],
            description: 'Trace paths through flowcharts and pseudocode.',
            interactionType: 'C',
            challengeCount: 8,
            timeLimit: 180,
            professorIntro: 'Flowcharts are maps for decision-making! Follow the arrows, check the conditions, and trace the path to the output.',
            professorHint: 'At each diamond (decision), check the condition. Go YES or NO and keep following the arrows.'
        },
        {
            id: 21,
            name: 'Cipher Cracker',
            module: 4,
            topics: ['Code-Breaking / Ciphers'],
            description: 'Decode messages using substitution and shift ciphers.',
            interactionType: 'E',
            challengeCount: 7,
            timeLimit: 240,
            professorIntro: 'Secret messages need cracking! Use pattern analysis and letter frequency to break these ciphers.',
            professorHint: 'Look for common short words (a, the, is) and common letters (E, T, A) to start cracking the code.'
        },
        {
            id: 22,
            name: 'Combo Calculator',
            module: 4,
            topics: ['Combinatorial Reasoning'],
            description: 'Figure out how many combinations are possible.',
            interactionType: 'A',
            challengeCount: 7,
            timeLimit: 180,
            professorIntro: 'The combo calculator explores possibilities! If you have 3 shirts and 4 pants, how many outfits can you make? Think systematically!',
            professorHint: 'Try listing possibilities systematically, or multiply the number of choices at each step.'
        },
        {
            id: 23,
            name: 'Grid Master',
            module: 4,
            topics: ['Grid Logic Puzzles'],
            description: 'Solve constraint-based grid puzzles.',
            interactionType: 'D',
            challengeCount: 6,
            timeLimit: 300,
            professorIntro: 'Grid puzzles require pure logic! Use the clues to figure out which items go where. No guessing — only deduction!',
            professorHint: 'Start with clues that give definite answers. Mark X for impossible and O for confirmed. Check rows and columns.'
        },
        {
            id: 24,
            name: 'Full Activation',
            module: 4,
            topics: ['Mixed review from all modules'],
            description: 'The ultimate challenge — everything you\'ve learned!',
            interactionType: 'F',
            challengeCount: 10,
            timeLimit: 360,
            professorIntro: 'This is it — full brain activation! You\'ll face challenges from every module. Show me everything you\'ve learned, engineer!',
            professorHint: 'Take your time and think carefully. You have all the skills you need.'
        }
    ];

    /**
     * Get a level definition by its id.
     * @param {number} id - Level id (1-24)
     * @returns {Object|null} Level metadata or null if not found
     */
    function getLevel(id) {
        for (var i = 0; i < LEVELS.length; i++) {
            if (LEVELS[i].id === id) return LEVELS[i];
        }
        return null;
    }

    /**
     * Get all levels belonging to a module.
     * @param {number} moduleId - Module id (1-4)
     * @returns {Array} Array of level objects
     */
    function getLevelsForModule(moduleId) {
        return LEVELS.filter(function(l) { return l.module === moduleId; });
    }

    /**
     * Get a module definition by its id.
     * @param {number} moduleId - Module id (1-4)
     * @returns {Object|null} Module metadata or null if not found
     */
    function getModule(moduleId) {
        for (var i = 0; i < MODULES.length; i++) {
            if (MODULES[i].id === moduleId) return MODULES[i];
        }
        return null;
    }

    /**
     * Get all modules.
     * @returns {Array} Array of module objects
     */
    function getAllModules() {
        return MODULES;
    }

    /**
     * Get the module that a given level belongs to.
     * @param {number} levelId - Level id (1-24)
     * @returns {Object|null} Module metadata or null
     */
    function getModuleForLevel(levelId) {
        var level = getLevel(levelId);
        if (!level) return null;
        return getModule(level.module);
    }

    /**
     * Get the next level id after the given one, or null if this is the last.
     * @param {number} levelId - Current level id
     * @returns {number|null}
     */
    function getNextLevelId(levelId) {
        if (levelId >= 24) return null;
        return levelId + 1;
    }

    /**
     * Get the previous level id, or null if this is the first.
     * @param {number} levelId - Current level id
     * @returns {number|null}
     */
    function getPreviousLevelId(levelId) {
        if (levelId <= 1) return null;
        return levelId - 1;
    }

    /**
     * Check if a level is the first in its module.
     * @param {number} levelId
     * @returns {boolean}
     */
    function isFirstInModule(levelId) {
        var level = getLevel(levelId);
        if (!level) return false;
        var mod = getModule(level.module);
        return mod && levelId === mod.levelRange[0];
    }

    /**
     * Check if a level is the last in its module.
     * @param {number} levelId
     * @returns {boolean}
     */
    function isLastInModule(levelId) {
        var level = getLevel(levelId);
        if (!level) return false;
        var mod = getModule(level.module);
        return mod && levelId === mod.levelRange[1];
    }

    /**
     * Calculate stars earned based on score percentage.
     * @param {number} score - Points earned
     * @param {number} maxScore - Maximum possible points
     * @returns {number} Stars (0-3)
     */
    function calculateStars(score, maxScore) {
        if (maxScore <= 0) return 0;
        var ratio = score / maxScore;
        if (ratio >= STAR_THRESHOLDS.three) return 3;
        if (ratio >= STAR_THRESHOLDS.two) return 2;
        if (ratio >= STAR_THRESHOLDS.one) return 1;
        return 0;
    }

    /**
     * Check if a module is unlocked based on total stars.
     * @param {number} moduleId
     * @param {number} totalStars - Player's total star count
     * @returns {boolean}
     */
    function isModuleUnlocked(moduleId, totalStars) {
        var mod = getModule(moduleId);
        if (!mod) return false;
        return totalStars >= mod.starsToUnlock;
    }

    /**
     * Get the total number of possible stars across all levels.
     * @returns {number}
     */
    function getMaxPossibleStars() {
        return LEVELS.length * 3;
    }

    /**
     * Get the total number of challenges across all levels.
     * @returns {number}
     */
    function getTotalChallengeCount() {
        var total = 0;
        for (var i = 0; i < LEVELS.length; i++) {
            total += LEVELS[i].challengeCount;
        }
        return total;
    }

    return {
        MODULES: MODULES,
        LEVELS: LEVELS,
        STAR_THRESHOLDS: STAR_THRESHOLDS,
        getLevel: getLevel,
        getLevelsForModule: getLevelsForModule,
        getModule: getModule,
        getAllModules: getAllModules,
        getModuleForLevel: getModuleForLevel,
        getNextLevelId: getNextLevelId,
        getPreviousLevelId: getPreviousLevelId,
        isFirstInModule: isFirstInModule,
        isLastInModule: isLastInModule,
        calculateStars: calculateStars,
        isModuleUnlocked: isModuleUnlocked,
        getMaxPossibleStars: getMaxPossibleStars,
        getTotalChallengeCount: getTotalChallengeCount
    };
})();
