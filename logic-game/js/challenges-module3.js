/**
 * Robot Brain Builder — Challenge Bank: Module 3 (Levels 13-18)
 * Logic Processor — Boolean logic, truth tables, reasoning, conditionals,
 * fallacies, and advanced spatial reasoning. Grades 6-8.
 * Registers on window.LogicGame.ChallengesModule3 namespace.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.ChallengesModule3 = {

    // ── Level 13: Boolean Core (8 challenges, Type D) ───────────────────
    // Topics: Boolean Logic (AND/OR/NOT)
    // Each challenge shows a boolean expression; student toggles result to T or F.

    13: [
        {
            type: 'D',
            prompt: 'Evaluate: True AND True',
            headers: { columns: ['Result'], rows: ['True AND True'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'AND is true only when BOTH sides are true.',
            professorIntro: 'Let\'s evaluate this boolean expression! AND needs both inputs to be true.',
            professorCorrect: 'That\'s right! True AND True is True because both sides are true.',
            professorWrong: 'Not quite. Remember, AND is true only when BOTH sides are true.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: True AND False',
            headers: { columns: ['Result'], rows: ['True AND False'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'AND requires BOTH sides to be true. Is that the case here?',
            professorIntro: 'What happens when one side of AND is false?',
            professorCorrect: 'Correct! True AND False is False because AND needs both sides to be true.',
            professorWrong: 'Not quite. AND is only true when BOTH sides are true. One side is false here.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: False OR True',
            headers: { columns: ['Result'], rows: ['False OR True'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'OR is true when AT LEAST ONE side is true.',
            professorIntro: 'Now let\'s try the OR operator! It works differently from AND.',
            professorCorrect: 'Excellent! False OR True is True because OR only needs one side to be true.',
            professorWrong: 'Remember, OR is true if at least one side is true. One side IS true here!'
        },
        {
            type: 'D',
            prompt: 'Evaluate: NOT True',
            headers: { columns: ['Result'], rows: ['NOT True'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'NOT flips the value: true becomes false, false becomes true.',
            professorIntro: 'The NOT operator is the simplest one -- it just flips the value!',
            professorCorrect: 'That\'s right! NOT True is False. NOT just flips the value.',
            professorWrong: 'Remember, NOT flips the value. NOT True becomes False.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: NOT False',
            headers: { columns: ['Result'], rows: ['NOT False'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'NOT flips false to true and true to false.',
            professorIntro: 'Let\'s flip another value with NOT!',
            professorCorrect: 'Perfect! NOT False is True. You\'ve got the NOT operator down!',
            professorWrong: 'NOT flips the value. If the input is False, NOT makes it True.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: True OR False',
            headers: { columns: ['Result'], rows: ['True OR False'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'OR is true when at least one side is true.',
            professorIntro: 'Another OR expression! Remember, OR is the generous operator.',
            professorCorrect: 'Correct! True OR False is True. OR only needs one true input.',
            professorWrong: 'OR needs at least one side to be true. The left side is True here!'
        },
        {
            type: 'D',
            prompt: 'Evaluate: False AND False',
            headers: { columns: ['Result'], rows: ['False AND False'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'AND needs BOTH sides to be true. Are both sides true here?',
            professorIntro: 'What happens when both sides of AND are false?',
            professorCorrect: 'Right! False AND False is False. Neither side is true, so AND gives False.',
            professorWrong: 'AND needs both sides to be true. Here both sides are false, so the result is False.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: NOT (True AND False)',
            headers: { columns: ['Result'], rows: ['NOT (True AND False)'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'First evaluate the inside: True AND False = ?. Then apply NOT to that result.',
            professorIntro: 'Now let\'s combine operators! Solve the inside first, then apply NOT.',
            professorCorrect: 'Brilliant! True AND False = False, then NOT False = True. You handled the combo!',
            professorWrong: 'Work from the inside out: True AND False = False. Then NOT False = True.'
        }
    ],

    // ── Level 14: Truth Matrix (7 challenges, Type D) ───────────────────
    // Topics: Truth Tables
    // Student fills in missing columns of truth tables.

    14: [
        {
            type: 'D',
            prompt: 'Complete the truth table for P AND Q',
            headers: { columns: ['P', 'Q', 'P AND Q'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'T', '1,2': 'F', '2,2': 'F', '3,2': 'F' },
            hint: 'AND is only True when BOTH inputs are True.',
            professorIntro: 'Fill in the result column. For each row, ask: are BOTH P and Q true?',
            professorCorrect: 'Perfect truth table! AND is only true when both inputs are true.',
            professorWrong: 'Check each row carefully. AND only gives True when BOTH P and Q are True.'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for P OR Q',
            headers: { columns: ['P', 'Q', 'P OR Q'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'T', '1,2': 'T', '2,2': 'T', '3,2': 'F' },
            hint: 'OR is True when AT LEAST ONE input is True. Only False when both are False.',
            professorIntro: 'Now let\'s build the OR truth table. OR is more generous than AND!',
            professorCorrect: 'Excellent! OR is true whenever at least one input is true.',
            professorWrong: 'Remember, OR is only False when BOTH inputs are False. Check each row again.'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for NOT P',
            headers: { columns: ['P', 'NOT P'], rows: ['Row 1', 'Row 2'] },
            prefilled: {
                '0,0': 'T',
                '1,0': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,1': 'F', '1,1': 'T' },
            hint: 'NOT just flips each value: True becomes False, False becomes True.',
            professorIntro: 'The NOT truth table is the simplest -- just two rows. Flip each value!',
            professorCorrect: 'That\'s right! NOT just flips every value. Simple but powerful!',
            professorWrong: 'NOT flips True to False and False to True. Try flipping each P value.'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for P AND (NOT Q)',
            headers: { columns: ['P', 'Q', 'P AND (NOT Q)'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'F', '1,2': 'T', '2,2': 'F', '3,2': 'F' },
            hint: 'First compute NOT Q for each row, then AND that result with P.',
            professorIntro: 'This one combines AND with NOT! First flip Q, then AND with P.',
            professorCorrect: 'Great work! You correctly applied NOT first, then AND. Step by step!',
            professorWrong: 'Try it in steps: first find NOT Q for each row, then check P AND (NOT Q).'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for (NOT P) OR Q',
            headers: { columns: ['P', 'Q', '(NOT P) OR Q'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'T', '1,2': 'F', '2,2': 'T', '3,2': 'T' },
            hint: 'First compute NOT P, then OR it with Q.',
            professorIntro: 'Flip P first with NOT, then combine with Q using OR. Take it step by step!',
            professorCorrect: 'Excellent! NOT P flips P, then OR combines it with Q. You nailed it!',
            professorWrong: 'Step 1: find NOT P for each row. Step 2: check (NOT P) OR Q. Only row 2 is False.'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for P OR (NOT Q)',
            headers: { columns: ['P', 'Q', 'P OR (NOT Q)'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'T', '1,2': 'T', '2,2': 'F', '3,2': 'T' },
            hint: 'First compute NOT Q, then OR it with P.',
            professorIntro: 'This time we flip Q and OR with P. Work through each row carefully!',
            professorCorrect: 'Perfect! You correctly computed NOT Q first, then applied OR with P.',
            professorWrong: 'Compute NOT Q for each row first: F, T, F, T. Then OR each with P.'
        },
        {
            type: 'D',
            prompt: 'Complete the truth table for (NOT P) AND (NOT Q)',
            headers: { columns: ['P', 'Q', '(NOT P) AND (NOT Q)'], rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4'] },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,2': 'F', '1,2': 'F', '2,2': 'F', '3,2': 'T' },
            hint: 'Flip BOTH P and Q with NOT, then AND the results together. Only True when both originals are False.',
            professorIntro: 'The ultimate combo: NOT both inputs, then AND them! When is this true?',
            professorCorrect: 'Brilliant! (NOT P) AND (NOT Q) is only True when BOTH P and Q are False.',
            professorWrong: 'NOT P: F,F,T,T. NOT Q: F,T,F,T. AND them: only the last row gives T.'
        }
    ],

    // ── Level 15: Reason Engine (8 challenges, Type A) ──────────────────
    // Topics: Deductive vs Inductive, Syllogisms

    15: [
        {
            type: 'A',
            prompt: 'All mammals are warm-blooded. Dogs are mammals. Therefore...',
            options: [
                { text: 'Dogs are cold-blooded', image: null },
                { text: 'Dogs are warm-blooded', image: null },
                { text: 'Dogs might be warm-blooded', image: null },
                { text: 'Not enough information', image: null }
            ],
            correctAnswer: 1,
            hint: 'If ALL mammals are warm-blooded and dogs ARE mammals, what must be true?',
            professorIntro: 'This is a classic syllogism! Use the two premises to draw a conclusion.',
            professorCorrect: 'Correct! Since all mammals are warm-blooded and dogs are mammals, dogs MUST be warm-blooded. That\'s deductive reasoning!',
            professorWrong: 'Think carefully: if ALL mammals are warm-blooded and dogs ARE mammals, the conclusion is certain, not just possible.'
        },
        {
            type: 'A',
            prompt: 'Every time I water the plant, it grows. Is this deductive or inductive reasoning?',
            options: [
                { text: 'Deductive', image: null },
                { text: 'Inductive', image: null },
                { text: 'Neither', image: null },
                { text: 'Both', image: null }
            ],
            correctAnswer: 1,
            hint: 'Inductive reasoning draws general conclusions from specific observations.',
            professorIntro: 'Two types of reasoning: one goes from general rules to specific conclusions, the other from observations to general patterns.',
            professorCorrect: 'That\'s right! Observing a pattern and concluding it will always happen is inductive reasoning.',
            professorWrong: 'This is based on repeated observations leading to a general conclusion -- that\'s inductive, not deductive.'
        },
        {
            type: 'A',
            prompt: 'All squares are rectangles. This shape is a square. Therefore...',
            options: [
                { text: 'It\'s a circle', image: null },
                { text: 'It\'s a rectangle', image: null },
                { text: 'It might be a rectangle', image: null },
                { text: 'We can\'t tell', image: null }
            ],
            correctAnswer: 1,
            hint: 'If all squares are rectangles, and this is a square, what follows logically?',
            professorIntro: 'Another syllogism! Apply the rule to the specific case.',
            professorCorrect: 'Correct! All squares are rectangles + this is a square = this is definitely a rectangle.',
            professorWrong: 'The first statement says ALL squares are rectangles. Since this IS a square, it must be a rectangle.'
        },
        {
            type: 'A',
            prompt: 'The sun has risen every day of recorded history. Therefore the sun will rise tomorrow. This is...',
            options: [
                { text: 'Deductive reasoning', image: null },
                { text: 'Inductive reasoning', image: null },
                { text: 'A guess', image: null },
                { text: 'A proven fact', image: null }
            ],
            correctAnswer: 1,
            hint: 'When we use past observations to predict the future, what type of reasoning is that?',
            professorIntro: 'Is this conclusion guaranteed by logic, or is it based on patterns we\'ve observed?',
            professorCorrect: 'Right! Using past observations to predict the future is inductive reasoning. It\'s very likely, but not logically guaranteed.',
            professorWrong: 'We\'re predicting the future based on past patterns. That\'s inductive reasoning -- probable but not certain.'
        },
        {
            type: 'A',
            prompt: 'No fish can fly. Salmon is a fish. Therefore...',
            options: [
                { text: 'Salmon can fly', image: null },
                { text: 'Salmon cannot fly', image: null },
                { text: 'Salmon might fly', image: null },
                { text: 'We don\'t know', image: null }
            ],
            correctAnswer: 1,
            hint: 'If NO fish can fly and salmon IS a fish, what must follow?',
            professorIntro: 'This syllogism uses a negative premise. "No fish can fly" is a strong statement!',
            professorCorrect: 'Exactly! No fish can fly + salmon is a fish = salmon cannot fly. Clean deduction!',
            professorWrong: 'If NO fish can fly and salmon IS a fish, then salmon definitely cannot fly.'
        },
        {
            type: 'A',
            prompt: 'If all A are B, and all B are C, then all A are...',
            options: [
                { text: 'D', image: null },
                { text: 'B', image: null },
                { text: 'C', image: null },
                { text: 'Not C', image: null }
            ],
            correctAnswer: 2,
            hint: 'Follow the chain: A are inside B, and B are inside C. So where does A end up?',
            professorIntro: 'This is a chain of logic. If A is inside B, and B is inside C, then where is A?',
            professorCorrect: 'Correct! It\'s a logical chain: all A are B, all B are C, so all A must be C.',
            professorWrong: 'Think of it like nested boxes: A fits inside B, B fits inside C. So A must be inside C!'
        },
        {
            type: 'A',
            prompt: 'Some birds can swim. Penguins are birds. Therefore...',
            options: [
                { text: 'All penguins can swim', image: null },
                { text: 'No penguins can swim', image: null },
                { text: 'Penguins might be able to swim', image: null },
                { text: 'Penguins definitely can\'t swim', image: null }
            ],
            correctAnswer: 2,
            hint: '"Some birds" doesn\'t tell us WHICH birds. We can\'t be certain about penguins specifically.',
            professorIntro: 'Watch out! "Some" is different from "all." What can we conclude about penguins?',
            professorCorrect: 'Right! "Some birds can swim" only means SOME, not all. We can\'t be certain penguins are in that group, so they MIGHT swim.',
            professorWrong: '"Some birds" doesn\'t guarantee which birds. We can only say penguins MIGHT swim -- not that they definitely do or don\'t.'
        },
        {
            type: 'A',
            prompt: 'All triangles have 3 sides. This shape has 4 sides. Therefore...',
            options: [
                { text: 'It\'s a triangle', image: null },
                { text: 'It\'s not a triangle', image: null },
                { text: 'It might be a triangle', image: null },
                { text: 'Not enough information', image: null }
            ],
            correctAnswer: 1,
            hint: 'If all triangles have 3 sides and this shape has 4, can it be a triangle?',
            professorIntro: 'This one uses a negative conclusion. If triangles MUST have 3 sides, what about a 4-sided shape?',
            professorCorrect: 'Correct! Triangles must have 3 sides. A shape with 4 sides cannot be a triangle. Solid deduction!',
            professorWrong: 'All triangles have 3 sides. This has 4 sides, so it CANNOT be a triangle.'
        }
    ],

    // ── Level 16: Condition Matrix (8 challenges, Type D) ───────────────
    // Topics: Advanced Conditionals, Propositional Logic

    16: [
        {
            type: 'D',
            prompt: 'IF (raining AND no umbrella) THEN get wet.\nIt IS raining. You DON\'T have an umbrella.\nWill you get wet?',
            headers: { columns: ['Result'], rows: ['Get wet?'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'Check both conditions: Is it raining? (Yes) Do you lack an umbrella? (Yes) Both true means AND is true.',
            professorIntro: 'Let\'s evaluate a real-world conditional! Check each condition one by one.',
            professorCorrect: 'Correct! Raining = True, no umbrella = True. Both true, so AND is True, and you get wet!',
            professorWrong: 'Both conditions are met: it IS raining AND you DON\'T have an umbrella. So the result is True -- you get wet.'
        },
        {
            type: 'D',
            prompt: 'IF (hungry AND food available) THEN eat.\nYou ARE hungry. There is NO food available.\nWill you eat?',
            headers: { columns: ['Result'], rows: ['Eat?'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'AND needs BOTH conditions true. Is food available?',
            professorIntro: 'Both conditions must be true for AND. Check each one carefully!',
            professorCorrect: 'Right! Hungry = True BUT food available = False. AND needs both, so the result is False.',
            professorWrong: 'You\'re hungry (True) but no food is available (False). AND needs both to be true, so you won\'t eat.'
        },
        {
            type: 'D',
            prompt: 'IF (weekend OR holiday) THEN no school.\nIt\'s Tuesday and NOT a holiday.\nNo school?',
            headers: { columns: ['Result'], rows: ['No school?'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'OR needs at least one to be true. Is it a weekend? Is it a holiday?',
            professorIntro: 'OR needs at least one condition to be true. What\'s the situation here?',
            professorCorrect: 'Correct! Tuesday is not a weekend (False) and it\'s not a holiday (False). False OR False = False. School is on!',
            professorWrong: 'Weekend = False (it\'s Tuesday), holiday = False. False OR False = False. There IS school today.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: (A AND B) OR C\nA = True, B = False, C = True',
            headers: { columns: ['Result'], rows: ['(A AND B) OR C'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'First evaluate A AND B, then OR the result with C.',
            professorIntro: 'Work from the inside out: solve the parentheses first, then OR with C.',
            professorCorrect: 'Excellent! A AND B = True AND False = False. Then False OR C = False OR True = True!',
            professorWrong: 'Step 1: A AND B = True AND False = False. Step 2: False OR C = False OR True = True.'
        },
        {
            type: 'D',
            prompt: 'IF NOT (raining OR snowing) THEN go outside.\nIt\'s NOT raining and NOT snowing.\nGo outside?',
            headers: { columns: ['Result'], rows: ['Go outside?'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'First evaluate (raining OR snowing), then apply NOT to the result.',
            professorIntro: 'Evaluate the inside first: is it raining OR snowing? Then flip with NOT.',
            professorCorrect: 'Right! Raining OR snowing = False OR False = False. NOT False = True. Go outside!',
            professorWrong: 'Raining = False, snowing = False. False OR False = False. NOT False = True. You can go outside!'
        },
        {
            type: 'D',
            prompt: 'IF (age >= 13) AND (has permission) THEN can watch movie.\nAge = 14, no permission.\nCan watch?',
            headers: { columns: ['Result'], rows: ['Can watch?'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'AND needs both conditions. Is the age condition met? Is the permission condition met?',
            professorIntro: 'Two conditions to check: age and permission. Both must be true!',
            professorCorrect: 'Correct! Age >= 13 is True (14 >= 13), but has permission is False. True AND False = False.',
            professorWrong: 'Age >= 13 is True (14 >= 13), but there\'s no permission (False). True AND False = False.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: (A OR B) AND (NOT C)\nA = False, B = True, C = False',
            headers: { columns: ['Result'], rows: ['(A OR B) AND (NOT C)'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'Evaluate (A OR B) and (NOT C) separately, then AND them together.',
            professorIntro: 'Break this into parts: solve each group in parentheses, then combine with AND.',
            professorCorrect: 'Great! A OR B = False OR True = True. NOT C = NOT False = True. True AND True = True!',
            professorWrong: 'Part 1: A OR B = False OR True = True. Part 2: NOT C = NOT False = True. True AND True = True.'
        },
        {
            type: 'D',
            prompt: 'Evaluate: (NOT A) AND (B OR C)\nA = True, B = False, C = True',
            headers: { columns: ['Result'], rows: ['(NOT A) AND (B OR C)'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'Evaluate NOT A first. Then evaluate B OR C. Then AND the results.',
            professorIntro: 'Three steps: evaluate NOT A, evaluate B OR C, then AND the two results!',
            professorCorrect: 'Correct! NOT A = NOT True = False. B OR C = False OR True = True. False AND True = False.',
            professorWrong: 'NOT A = NOT True = False. B OR C = True. But False AND True = False. The NOT A kills it!'
        }
    ],

    // ── Level 17: Fallacy Filter (8 challenges, Type A) ─────────────────
    // Topics: Logical Fallacies, Proofs & Justification

    17: [
        {
            type: 'A',
            prompt: '"Everyone is buying this game, so it must be good!" This is...',
            options: [
                { text: 'A fact', image: null },
                { text: 'Bandwagon fallacy', image: null },
                { text: 'Good logic', image: null },
                { text: 'A proof', image: null }
            ],
            correctAnswer: 1,
            hint: 'Just because many people do something, does that make it good?',
            professorIntro: 'The fallacy filter catches bad logic! Is popularity the same as quality?',
            professorCorrect: 'Correct! This is the bandwagon fallacy -- assuming something is good just because it\'s popular.',
            professorWrong: 'Popularity doesn\'t equal quality. "Everyone does it" is the bandwagon fallacy.'
        },
        {
            type: 'A',
            prompt: '"You can\'t prove ghosts DON\'T exist, so they must be real." This is...',
            options: [
                { text: 'Good reasoning', image: null },
                { text: 'Appeal to ignorance', image: null },
                { text: 'Scientific proof', image: null },
                { text: 'Deduction', image: null }
            ],
            correctAnswer: 1,
            hint: 'Can\'t disprove something doesn\'t mean it\'s true. What fallacy is that?',
            professorIntro: 'Just because we can\'t disprove something, does that make it true?',
            professorCorrect: 'Right! Appeal to ignorance says "you can\'t disprove it, so it must be true." That\'s flawed logic!',
            professorWrong: 'Not being able to disprove something doesn\'t prove it\'s true. That\'s the appeal to ignorance fallacy.'
        },
        {
            type: 'A',
            prompt: '"My friend said it\'s true, so it must be." This is...',
            options: [
                { text: 'A fact', image: null },
                { text: 'Appeal to authority', image: null },
                { text: 'Good logic', image: null },
                { text: 'Deduction', image: null }
            ],
            correctAnswer: 1,
            hint: 'Is your friend an expert? Does someone saying something make it true?',
            professorIntro: 'Does one person claiming something is true make it actually true?',
            professorCorrect: 'Correct! Believing something just because someone said it is an appeal to authority -- especially when they\'re not an expert.',
            professorWrong: 'Just because someone says something doesn\'t make it true. That\'s the appeal to authority fallacy.'
        },
        {
            type: 'A',
            prompt: '"I wore my lucky socks and won the game. The socks caused the win." This is...',
            options: [
                { text: 'Cause and effect', image: null },
                { text: 'False cause fallacy', image: null },
                { text: 'Good reasoning', image: null },
                { text: 'Scientific proof', image: null }
            ],
            correctAnswer: 1,
            hint: 'Just because two things happened together, does one cause the other?',
            professorIntro: 'Two things happened at the same time. Does that mean one caused the other?',
            professorCorrect: 'Right! This is the false cause fallacy -- assuming that because two things happened together, one caused the other.',
            professorWrong: 'Wearing socks and winning happened at the same time, but that doesn\'t mean the socks caused the win. False cause!'
        },
        {
            type: 'A',
            prompt: '"Either you agree with me or you\'re wrong." This is...',
            options: [
                { text: 'A fair argument', image: null },
                { text: 'False dilemma', image: null },
                { text: 'Good logic', image: null },
                { text: 'A proof', image: null }
            ],
            correctAnswer: 1,
            hint: 'Are there really only two options here? What about partial agreement or other views?',
            professorIntro: 'This argument presents only two choices. But are those really the only options?',
            professorCorrect: 'Correct! A false dilemma presents only two options when there are actually more possibilities.',
            professorWrong: 'There are more options than just "agree or be wrong." Presenting only two choices is a false dilemma.'
        },
        {
            type: 'A',
            prompt: '"We\'ve always done it this way, so we should keep doing it." This is...',
            options: [
                { text: 'Good reasoning', image: null },
                { text: 'Appeal to tradition', image: null },
                { text: 'Scientific proof', image: null },
                { text: 'Deduction', image: null }
            ],
            correctAnswer: 1,
            hint: 'Is something good just because it\'s been done for a long time?',
            professorIntro: 'Does doing something for a long time automatically make it the right thing to do?',
            professorCorrect: 'Right! Appeal to tradition assumes old ways are best just because they\'re old. But traditions can be wrong!',
            professorWrong: 'Just because something has been done a long time doesn\'t mean it\'s the best way. That\'s appeal to tradition.'
        },
        {
            type: 'A',
            prompt: '"You\'re too young to understand." This is...',
            options: [
                { text: 'A fact', image: null },
                { text: 'Ad hominem', image: null },
                { text: 'Good reasoning', image: null },
                { text: 'Induction', image: null }
            ],
            correctAnswer: 1,
            hint: 'This attacks the person rather than addressing their argument. What fallacy is that?',
            professorIntro: 'Instead of addressing the argument, this attacks the person. Is that fair?',
            professorCorrect: 'Correct! Ad hominem means attacking the person instead of their argument. Age doesn\'t determine if an idea is valid!',
            professorWrong: 'Dismissing someone because of who they are (too young, too old, etc.) instead of addressing their point is ad hominem.'
        },
        {
            type: 'A',
            prompt: 'Which is a valid argument?\nA) All cats purr. Felix purrs. Therefore Felix is a cat.\nB) All cats purr. Felix is a cat. Therefore Felix purrs.',
            options: [
                { text: 'A is valid', image: null },
                { text: 'B is valid', image: null },
                { text: 'Both are valid', image: null },
                { text: 'Neither is valid', image: null }
            ],
            correctAnswer: 1,
            hint: 'In argument A, could Felix be a non-cat that also purrs? In B, the conclusion follows directly from the premises.',
            professorIntro: 'One of these arguments is logically valid and one has a hidden flaw. Can you spot which is which?',
            professorCorrect: 'Excellent! B is valid: all cats purr + Felix is a cat = Felix purrs. A is flawed because other things might purr too (affirming the consequent).',
            professorWrong: 'Argument A is flawed: just because all cats purr doesn\'t mean everything that purrs is a cat. B follows the rules correctly.'
        }
    ],

    // ── Level 18: Dimension Shifter (8 challenges, Type A) ──────────────
    // Topics: Advanced Spatial, Abstraction

    18: [
        {
            type: 'A',
            prompt: 'A cube has ___ faces.',
            options: [
                { text: '4', image: null },
                { text: '6', image: null },
                { text: '8', image: null },
                { text: '12', image: null }
            ],
            correctAnswer: 1,
            hint: 'Think of a die (a standard dice). How many sides does it have?',
            professorIntro: 'Let\'s explore 3D shapes! Picture a cube -- like a dice or a box. Count the flat surfaces.',
            professorCorrect: 'Correct! A cube has 6 faces: top, bottom, front, back, left, and right.',
            professorWrong: 'A cube has 6 faces. Think of a box: top, bottom, front, back, left, right.'
        },
        {
            type: 'A',
            prompt: 'If you unfold a cube, how many squares do you see?',
            options: [
                { text: '4', image: null },
                { text: '5', image: null },
                { text: '6', image: null },
                { text: '8', image: null }
            ],
            correctAnswer: 2,
            hint: 'Each face of the cube becomes one square when unfolded. How many faces does a cube have?',
            professorIntro: 'Imagine cutting a box along its edges and flattening it out. How many squares would you see?',
            professorCorrect: 'Right! A cube has 6 faces, so unfolding it gives you 6 squares arranged in a cross-like pattern.',
            professorWrong: 'An unfolded cube (called a "net") has 6 squares -- one for each face of the cube.'
        },
        {
            type: 'A',
            prompt: 'Which net folds into a cube?',
            options: [
                { text: 'Cross shape (t-shape with 6 squares)', image: null },
                { text: 'L shape (3 squares)', image: null },
                { text: 'Straight line of 6 squares', image: null },
                { text: 'T shape (4 squares)', image: null }
            ],
            correctAnswer: 0,
            hint: 'A cube net needs exactly 6 squares arranged so they can fold up without overlapping.',
            professorIntro: 'A "net" is a flat pattern that folds into a 3D shape. Which one makes a cube?',
            professorCorrect: 'Correct! The cross shape with 6 squares is the classic cube net. It folds perfectly into a box!',
            professorWrong: 'A cube net needs 6 squares arranged so they fold without overlapping. The cross shape works!'
        },
        {
            type: 'A',
            prompt: 'A pyramid with a square base has ___ faces.',
            options: [
                { text: '3', image: null },
                { text: '4', image: null },
                { text: '5', image: null },
                { text: '6', image: null }
            ],
            correctAnswer: 2,
            hint: 'Count the square base (1 face) plus the triangular sides. How many triangles meet at the top?',
            professorIntro: 'Think about the Egyptian pyramids! They have a square base and triangular sides.',
            professorCorrect: 'Right! A square pyramid has 5 faces: 1 square base + 4 triangular sides.',
            professorWrong: 'A square pyramid has 1 square base plus 4 triangular sides = 5 faces total.'
        },
        {
            type: 'A',
            prompt: 'Looking at a cylinder from directly above (bird\'s eye view), you see a...',
            options: [
                { text: 'Rectangle', image: null },
                { text: 'Circle', image: null },
                { text: 'Triangle', image: null },
                { text: 'Square', image: null }
            ],
            correctAnswer: 1,
            hint: 'A cylinder is like a can. What shape is the top of a can?',
            professorIntro: 'Imagine looking straight down at a soup can. What shape do you see?',
            professorCorrect: 'Correct! Looking down at a cylinder, you see its circular top. The same shape as a can lid!',
            professorWrong: 'A cylinder has circular ends. Looking straight down, you\'d see a circle!'
        },
        {
            type: 'A',
            prompt: 'A 3D shape has a circular base and comes to a point at the top. It\'s a...',
            options: [
                { text: 'Cylinder', image: null },
                { text: 'Cone', image: null },
                { text: 'Sphere', image: null },
                { text: 'Pyramid', image: null }
            ],
            correctAnswer: 1,
            hint: 'Think of an ice cream cone -- circular base, pointed top.',
            professorIntro: 'Picture this shape: flat circular bottom, sides that slope up to a single point at the top.',
            professorCorrect: 'Right! A cone has a circular base and comes to a point. Like an ice cream cone!',
            professorWrong: 'Circular base + comes to a point = a cone. A pyramid has a polygonal base, not circular.'
        },
        {
            type: 'A',
            prompt: 'If you slice a sphere perfectly in half, the cross-section is a...',
            options: [
                { text: 'Square', image: null },
                { text: 'Triangle', image: null },
                { text: 'Circle', image: null },
                { text: 'Oval', image: null }
            ],
            correctAnswer: 2,
            hint: 'A sphere is perfectly round in every direction. What shape do you get when you cut something round in half?',
            professorIntro: 'Imagine cutting an orange in half. What shape is the flat surface where you cut?',
            professorCorrect: 'Correct! Slicing a sphere through the center gives a perfect circle. Just like cutting an orange in half!',
            professorWrong: 'A sphere is round in all directions. Cutting it in half creates a flat circular surface -- a circle!'
        },
        {
            type: 'A',
            prompt: 'A 3D shape has 8 vertices (corners), 12 edges, and 6 faces. It\'s a...',
            options: [
                { text: 'Pyramid', image: null },
                { text: 'Cube', image: null },
                { text: 'Cylinder', image: null },
                { text: 'Cone', image: null }
            ],
            correctAnswer: 1,
            hint: 'Count the features: 8 corners, 12 edges, 6 faces. Which 3D shape has those numbers?',
            professorIntro: 'Use the numbers as clues! 8 vertices, 12 edges, 6 faces. Which shape matches?',
            professorCorrect: 'Correct! A cube (or rectangular prism) has exactly 8 vertices, 12 edges, and 6 faces. You know your shapes!',
            professorWrong: 'A cube has 8 corners, 12 edges, and 6 faces. Pyramids have fewer vertices and faces.'
        }
    ]
};
