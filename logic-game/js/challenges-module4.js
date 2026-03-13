/**
 * Robot Brain Builder — Challenge Bank: Module 4 (Master Brain)
 * Levels 19-24, grades 6-8 part 2.
 * Topics: Variables, Probability, Flowcharts, Ciphers, Combinatorics,
 *         Grid Logic, and a mixed-type final review.
 *
 * Registers on window.LogicGame.ChallengesModule4 as an object keyed by level ID.
 * Each value is an array of challenge objects.
 *
 * Uses `var` (no let/const) for broad browser compatibility.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.ChallengesModule4 = {

    // ═════════════════════════════════════════════════════════════════════
    // Level 19 — Variable Vault (8 challenges, Type A)
    // Topics: Variables as Logic, Probability
    // ═════════════════════════════════════════════════════════════════════
    19: [
        {
            type: 'A',
            prompt: 'If x = 5, what is x + 3?',
            options: [
                { text: '7', image: null },
                { text: '8', image: null },
                { text: '9', image: null },
                { text: '10', image: null }
            ],
            correctAnswer: 1,
            hint: 'Replace x with 5, then add 3.',
            professorIntro: 'Variables are like boxes that hold values. Substitute and compute!',
            professorCorrect: 'Exactly! 5 + 3 = 8. Variables make math flexible!',
            professorWrong: 'Not quite — try replacing x with 5 first, then add 3.'
        },
        {
            type: 'A',
            prompt: 'If x = 3, is (x > 2) AND (x < 5) true?',
            options: [
                { text: 'True', image: null },
                { text: 'False', image: null },
                { text: 'Maybe', image: null },
                { text: 'Error', image: null }
            ],
            correctAnswer: 0,
            hint: 'Check each part: is 3 > 2? Is 3 < 5? Both must be true for AND.',
            professorIntro: 'Now combine variables with boolean logic. Check each condition!',
            professorCorrect: 'Right! 3 > 2 is true AND 3 < 5 is true, so the whole thing is true!',
            professorWrong: 'Check both parts separately. Is 3 greater than 2? Is 3 less than 5?'
        },
        {
            type: 'A',
            prompt: 'If x = 10, what is x / 2?',
            options: [
                { text: '3', image: null },
                { text: '4', image: null },
                { text: '5', image: null },
                { text: '6', image: null }
            ],
            correctAnswer: 2,
            hint: 'Divide 10 by 2.',
            professorIntro: 'Division with variables — substitute and solve!',
            professorCorrect: 'Perfect! 10 divided by 2 is 5!',
            professorWrong: 'Replace x with 10, then divide by 2. What do you get?'
        },
        {
            type: 'A',
            prompt: 'You flip a fair coin. What is the probability of getting heads?',
            options: [
                { text: '1/4', image: null },
                { text: '1/3', image: null },
                { text: '1/2', image: null },
                { text: '1', image: null }
            ],
            correctAnswer: 2,
            hint: 'A fair coin has two equally likely outcomes: heads or tails.',
            professorIntro: 'Probability tells us how likely something is. Think about all possible outcomes!',
            professorCorrect: 'Yes! One favorable outcome out of two possible outcomes = 1/2!',
            professorWrong: 'How many sides does a coin have? How many of those are heads?'
        },
        {
            type: 'A',
            prompt: 'If a = 2 and b = 3, what is a + b?',
            options: [
                { text: '4', image: null },
                { text: '5', image: null },
                { text: '6', image: null },
                { text: '7', image: null }
            ],
            correctAnswer: 1,
            hint: 'Replace a with 2 and b with 3, then add.',
            professorIntro: 'Two variables at once! Substitute both values and compute.',
            professorCorrect: 'Correct! 2 + 3 = 5. You handled two variables like a pro!',
            professorWrong: 'Substitute: a = 2 and b = 3. Now add them together.'
        },
        {
            type: 'A',
            prompt: 'A bag has 3 red and 2 blue marbles. What is the chance of picking a red marble?',
            options: [
                { text: '1/2', image: null },
                { text: '2/5', image: null },
                { text: '3/5', image: null },
                { text: '3/4', image: null }
            ],
            correctAnswer: 2,
            hint: 'Probability = favorable outcomes / total outcomes. How many marbles total?',
            professorIntro: 'Count the favorable outcomes and the total outcomes!',
            professorCorrect: 'Spot on! 3 red out of 5 total = 3/5!',
            professorWrong: 'There are 3 + 2 = 5 marbles total, and 3 are red. What fraction is that?'
        },
        {
            type: 'A',
            prompt: 'If x = 4 and y = 2, what is x * y?',
            options: [
                { text: '6', image: null },
                { text: '8', image: null },
                { text: '10', image: null },
                { text: '12', image: null }
            ],
            correctAnswer: 1,
            hint: 'Multiply the values: 4 times 2.',
            professorIntro: 'Multiplication with variables — substitute and multiply!',
            professorCorrect: 'Great work! 4 times 2 = 8!',
            professorWrong: 'Replace x with 4 and y with 2, then multiply them.'
        },
        {
            type: 'A',
            prompt: 'If n = 7, is (n > 5) OR (n < 3) true?',
            options: [
                { text: 'True', image: null },
                { text: 'False', image: null },
                { text: 'Both true', image: null },
                { text: 'Neither', image: null }
            ],
            correctAnswer: 0,
            hint: 'For OR, only ONE part needs to be true. Is 7 > 5?',
            professorIntro: 'OR logic with variables — remember, only one condition needs to be true!',
            professorCorrect: 'Yes! 7 > 5 is true, so the whole OR expression is true — even though 7 < 3 is false!',
            professorWrong: 'Check: is 7 > 5? That part is true. For OR, that is enough!'
        }
    ],

    // ═════════════════════════════════════════════════════════════════════
    // Level 20 — Flow Controller (8 challenges, Type C)
    // Topics: Flowcharts & Pseudocode
    // ═════════════════════════════════════════════════════════════════════
    20: [
        {
            type: 'C',
            prompt: 'Put the flowchart steps in order: Start, Read number, Is it > 0?, Print "positive", End',
            items: [
                { id: 'fc1_1', label: 'Start' },
                { id: 'fc1_2', label: 'Read number' },
                { id: 'fc1_3', label: 'Is it > 0?' },
                { id: 'fc1_4', label: 'Print "positive"' },
                { id: 'fc1_5', label: 'End' }
            ],
            correctAnswer: ['fc1_1', 'fc1_2', 'fc1_3', 'fc1_4', 'fc1_5'],
            hint: 'Flowcharts always begin with Start and end with End. What happens in between?',
            professorIntro: 'Flowcharts are step-by-step maps for decisions. Put these steps in the right order!',
            professorCorrect: 'Perfect flow! Start, read, decide, act, end — that is how algorithms work!',
            professorWrong: 'Think about what must happen first. You need to read a number before you can check it!'
        },
        {
            type: 'C',
            prompt: 'Arrange the counting algorithm: Start, Set count = 0, Add 1 to count, Is count = 5?, If no go back to Add, If yes stop',
            items: [
                { id: 'fc2_1', label: 'Start' },
                { id: 'fc2_2', label: 'Set count = 0' },
                { id: 'fc2_3', label: 'Add 1 to count' },
                { id: 'fc2_4', label: 'Is count = 5?' },
                { id: 'fc2_5', label: 'If no, go back to Add' },
                { id: 'fc2_6', label: 'If yes, stop' }
            ],
            correctAnswer: ['fc2_1', 'fc2_2', 'fc2_3', 'fc2_4', 'fc2_5', 'fc2_6'],
            hint: 'First initialize the counter, then loop: add, check, repeat or stop.',
            professorIntro: 'This is a loop algorithm! Loops repeat steps until a condition is met.',
            professorCorrect: 'Excellent! You built a counting loop — one of the most fundamental patterns in programming!',
            professorWrong: 'You need to set count to 0 before you can add to it. Initialize first, then loop!'
        },
        {
            type: 'C',
            prompt: 'Order the password check: Enter password, Compare to stored password, Does it match?, If yes grant access, If no show error',
            items: [
                { id: 'fc3_1', label: 'Enter password' },
                { id: 'fc3_2', label: 'Compare to stored password' },
                { id: 'fc3_3', label: 'Does it match?' },
                { id: 'fc3_4', label: 'If yes: grant access' },
                { id: 'fc3_5', label: 'If no: show error' }
            ],
            correctAnswer: ['fc3_1', 'fc3_2', 'fc3_3', 'fc3_4', 'fc3_5'],
            hint: 'You must enter a password before comparing it. Then decide what to do based on the result.',
            professorIntro: 'Every login system uses this kind of flowchart. Order the steps!',
            professorCorrect: 'Correct! Enter, compare, decide — this is how every password system works!',
            professorWrong: 'You cannot compare a password until the user has entered one. Start there!'
        },
        {
            type: 'C',
            prompt: 'Order the recipe algorithm: Gather ingredients, Measure amounts, Mix into batter, Pour into pan, Bake until done, Remove from oven',
            items: [
                { id: 'fc4_1', label: 'Gather ingredients' },
                { id: 'fc4_2', label: 'Measure amounts' },
                { id: 'fc4_3', label: 'Mix into batter' },
                { id: 'fc4_4', label: 'Pour into pan' },
                { id: 'fc4_5', label: 'Bake until done' },
                { id: 'fc4_6', label: 'Remove from oven' }
            ],
            correctAnswer: ['fc4_1', 'fc4_2', 'fc4_3', 'fc4_4', 'fc4_5', 'fc4_6'],
            hint: 'You need ingredients before measuring. You need measured ingredients before mixing. Each step uses the output of the previous one.',
            professorIntro: 'Recipes are algorithms too! Each step produces something the next step needs.',
            professorCorrect: 'Delicious logic! You followed the recipe algorithm perfectly!',
            professorWrong: 'Think about what each step produces — you can not measure ingredients you have not gathered yet!'
        },
        {
            type: 'C',
            prompt: 'Sort algorithm steps: Pick first item, Compare to next item, If smaller swap them, Move to next pair, Repeat until sorted',
            items: [
                { id: 'fc5_1', label: 'Pick first item' },
                { id: 'fc5_2', label: 'Compare to next item' },
                { id: 'fc5_3', label: 'If smaller, swap them' },
                { id: 'fc5_4', label: 'Move to next pair' },
                { id: 'fc5_5', label: 'Repeat until sorted' }
            ],
            correctAnswer: ['fc5_1', 'fc5_2', 'fc5_3', 'fc5_4', 'fc5_5'],
            hint: 'Start by picking an item, then compare, decide, advance, and repeat.',
            professorIntro: 'Sorting algorithms put things in order. This is called bubble sort!',
            professorCorrect: 'You sorted the sort algorithm! Bubble sort compares neighbors and swaps as needed.',
            professorWrong: 'You need to pick an item before comparing it to anything else.'
        },
        {
            type: 'C',
            prompt: 'Login flow: Open app, Load login page, Type credentials, Click login, Server verifies, Show home page',
            items: [
                { id: 'fc6_1', label: 'Open app' },
                { id: 'fc6_2', label: 'Load login page' },
                { id: 'fc6_3', label: 'Type credentials' },
                { id: 'fc6_4', label: 'Click login' },
                { id: 'fc6_5', label: 'Server verifies' },
                { id: 'fc6_6', label: 'Show home page' }
            ],
            correctAnswer: ['fc6_1', 'fc6_2', 'fc6_3', 'fc6_4', 'fc6_5', 'fc6_6'],
            hint: 'The app must open before it can load. The page must load before you can type. You must click login before the server checks.',
            professorIntro: 'Every app you use follows a login flow like this. Each step requires the previous one!',
            professorCorrect: 'Perfect! Open, load, type, click, verify, display — each step needs the one before it!',
            professorWrong: 'You must open the app before the login page can load. Start at the beginning!'
        },
        {
            type: 'C',
            prompt: 'Search algorithm: Start at beginning, Check current item, Is it the target?, If yes return found, If no move to next, If at end return not found',
            items: [
                { id: 'fc7_1', label: 'Start at beginning' },
                { id: 'fc7_2', label: 'Check current item' },
                { id: 'fc7_3', label: 'Is it the target?' },
                { id: 'fc7_4', label: 'If yes: return found' },
                { id: 'fc7_5', label: 'If no: move to next' },
                { id: 'fc7_6', label: 'If at end: return not found' }
            ],
            correctAnswer: ['fc7_1', 'fc7_2', 'fc7_3', 'fc7_4', 'fc7_5', 'fc7_6'],
            hint: 'Start at the beginning, check each item, and handle found/not-found cases.',
            professorIntro: 'This is called linear search — checking items one by one!',
            professorCorrect: 'Great! Linear search checks each element in order. Simple but effective!',
            professorWrong: 'You need to start at the beginning before you can check any items.'
        },
        {
            type: 'C',
            prompt: 'Calculator steps: Get first number, Get operator, Get second number, Calculate result, Display answer',
            items: [
                { id: 'fc8_1', label: 'Get first number' },
                { id: 'fc8_2', label: 'Get operator' },
                { id: 'fc8_3', label: 'Get second number' },
                { id: 'fc8_4', label: 'Calculate result' },
                { id: 'fc8_5', label: 'Display answer' }
            ],
            correctAnswer: ['fc8_1', 'fc8_2', 'fc8_3', 'fc8_4', 'fc8_5'],
            hint: 'You need both numbers and the operation before you can calculate.',
            professorIntro: 'Even a simple calculator follows an algorithm. Order these steps!',
            professorCorrect: 'Correct! Input, input, input, compute, output — the classic calculator flow!',
            professorWrong: 'You cannot calculate until you have all the inputs. Gather data first!'
        }
    ],

    // ═════════════════════════════════════════════════════════════════════
    // Level 21 — Cipher Cracker (7 challenges, Type E)
    // Topics: Code-Breaking / Ciphers
    // ═════════════════════════════════════════════════════════════════════
    21: [
        {
            type: 'E',
            prompt: 'If A=1, B=2, C=3 ... Z=26, decode this message: 8-5-12-12-15',
            correctAnswer: 'hello',
            acceptableAnswers: ['hello', 'HELLO', 'Hello'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'Each number is a letter position in the alphabet. H=8, E=5...',
            professorIntro: 'Number-to-letter ciphers are one of the simplest codes. Convert each number!',
            professorCorrect: 'You cracked it! 8=H, 5=E, 12=L, 12=L, 15=O spells HELLO!',
            professorWrong: 'Convert each number: 8th letter is H, 5th is E... what word do you get?'
        },
        {
            type: 'E',
            prompt: 'Each letter has been shifted forward by 1 (A becomes B, B becomes C, etc.). Decode: IFMMP',
            correctAnswer: 'hello',
            acceptableAnswers: ['hello', 'HELLO', 'Hello'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'Shift each letter back by 1. I becomes H, F becomes E...',
            professorIntro: 'Caesar ciphers shift each letter by a fixed amount. Reverse the shift!',
            professorCorrect: 'Decoded! Shifting back by 1: I→H, F→E, M→L, M→L, P→O = HELLO!',
            professorWrong: 'Move each letter one step back in the alphabet. I goes back to H...'
        },
        {
            type: 'E',
            prompt: 'The alphabet is reversed: A=Z, B=Y, C=X, D=W... Decode: SVOOL',
            correctAnswer: 'hello',
            acceptableAnswers: ['hello', 'HELLO', 'Hello'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'S maps to H (S is the 19th letter, H is the 8th; 19+8=27). Each pair adds to 27.',
            professorIntro: 'Atbash cipher! The alphabet is flipped — A↔Z, B↔Y, C↔X, and so on.',
            professorCorrect: 'Brilliant! S=H, V=E, O=L, O=L, L=O — that is HELLO in Atbash!',
            professorWrong: 'In the reversed alphabet, S becomes H, V becomes E... keep going!'
        },
        {
            type: 'E',
            prompt: 'If A=1, B=2, C=3 ... Z=26, what word is: 3-1-20?',
            correctAnswer: 'cat',
            acceptableAnswers: ['cat', 'CAT', 'Cat'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'Convert each number to its letter: C=3, A=1, T=20.',
            professorIntro: 'Another number cipher! Convert each number to a letter.',
            professorCorrect: 'Purrfect! 3=C, 1=A, 20=T spells CAT!',
            professorWrong: 'The 3rd letter is C, the 1st is A, and the 20th is T. Put them together!'
        },
        {
            type: 'E',
            prompt: 'Each letter has been shifted forward by 3. Decode: FDW',
            correctAnswer: 'cat',
            acceptableAnswers: ['cat', 'CAT', 'Cat'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'Shift each letter back by 3. F→E→D→C, D→C→B→A, W→V→U→T.',
            professorIntro: 'A shift-3 Caesar cipher! Julius Caesar actually used this one.',
            professorCorrect: 'Cracked! F→C, D→A, W→T = CAT. You broke Caesar\'s own cipher!',
            professorWrong: 'Count back 3 letters from each: F goes back to C, D goes back to A...'
        },
        {
            type: 'E',
            prompt: 'If A=1, B=2, C=3 ... Z=26, what word is: 4-15-7?',
            correctAnswer: 'dog',
            acceptableAnswers: ['dog', 'DOG', 'Dog'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'D=4, O=15, G=7.',
            professorIntro: 'One more number cipher. You are getting fast at these!',
            professorCorrect: 'Woof! 4=D, 15=O, 7=G spells DOG!',
            professorWrong: 'The 4th letter is D, the 15th is O, and the 7th is G.'
        },
        {
            type: 'E',
            prompt: 'Reverse cipher: read the word backwards. Decode: EKAC',
            correctAnswer: 'cake',
            acceptableAnswers: ['cake', 'CAKE', 'Cake'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'Read the letters from right to left: E-K-A-C becomes C-A-K-E.',
            professorIntro: 'The simplest cipher of all — just write the word backwards!',
            professorCorrect: 'Sweet! EKAC backwards is CAKE! Sometimes the simplest codes are the trickiest.',
            professorWrong: 'Read the letters from the last to the first: E, K, A, C → C, A, K, E.'
        }
    ],

    // ═════════════════════════════════════════════════════════════════════
    // Level 22 — Combo Calculator (7 challenges, Type A)
    // Topics: Combinatorial Reasoning
    // ═════════════════════════════════════════════════════════════════════
    22: [
        {
            type: 'A',
            prompt: 'How many ways can you arrange the letters A, B, C?',
            options: [
                { text: '3', image: null },
                { text: '4', image: null },
                { text: '6', image: null },
                { text: '9', image: null }
            ],
            correctAnswer: 2,
            hint: 'List them: ABC, ACB, BAC, BCA, CAB, CBA. Or calculate 3! = 3 × 2 × 1.',
            professorIntro: 'Permutations count the number of ways to arrange things in order!',
            professorCorrect: 'Exactly! 3! = 3 × 2 × 1 = 6 arrangements!',
            professorWrong: 'Try listing all possible orders: ABC, ACB, BAC... how many do you find?'
        },
        {
            type: 'A',
            prompt: 'You have 2 shirts (red, blue) and 2 pants (jeans, shorts). How many outfits can you make?',
            options: [
                { text: '2', image: null },
                { text: '3', image: null },
                { text: '4', image: null },
                { text: '6', image: null }
            ],
            correctAnswer: 2,
            hint: 'Multiply the number of choices: 2 shirts × 2 pants.',
            professorIntro: 'When you pick one from each category, multiply the choices!',
            professorCorrect: 'Right! 2 × 2 = 4 outfits. The multiplication principle in action!',
            professorWrong: 'List them: red+jeans, red+shorts, blue+jeans, blue+shorts. How many is that?'
        },
        {
            type: 'A',
            prompt: 'How many ways can 3 friends sit in 3 chairs?',
            options: [
                { text: '3', image: null },
                { text: '6', image: null },
                { text: '9', image: null },
                { text: '12', image: null }
            ],
            correctAnswer: 1,
            hint: 'The first chair has 3 choices, the second has 2, the third has 1. Multiply them.',
            professorIntro: 'Seating arrangements are a classic permutation problem!',
            professorCorrect: 'Perfect! 3 × 2 × 1 = 6 ways to seat 3 friends!',
            professorWrong: 'Think step by step: 3 choices for the first seat, then 2, then 1.'
        },
        {
            type: 'A',
            prompt: 'You pick 2 flavors from chocolate, vanilla, and strawberry. How many combinations?',
            options: [
                { text: '2', image: null },
                { text: '3', image: null },
                { text: '4', image: null },
                { text: '6', image: null }
            ],
            correctAnswer: 1,
            hint: 'List the pairs: choc+vanilla, choc+strawberry, vanilla+strawberry. Order does not matter.',
            professorIntro: 'Combinations are like permutations, but order does not matter!',
            professorCorrect: 'Yes! There are 3 ways to choose 2 from 3 items when order does not matter.',
            professorWrong: 'List all pairs: CV, CS, VS. That is 3 combinations.'
        },
        {
            type: 'A',
            prompt: 'How many ways can you arrange 4 books on a shelf?',
            options: [
                { text: '4', image: null },
                { text: '12', image: null },
                { text: '16', image: null },
                { text: '24', image: null }
            ],
            correctAnswer: 3,
            hint: '4! = 4 × 3 × 2 × 1. Calculate step by step.',
            professorIntro: 'More items means way more arrangements. Calculate 4 factorial!',
            professorCorrect: 'Correct! 4! = 4 × 3 × 2 × 1 = 24 arrangements. Factorials grow fast!',
            professorWrong: 'Multiply: 4 × 3 = 12, then 12 × 2 = 24, then 24 × 1 = 24.'
        },
        {
            type: 'A',
            prompt: '3 coin flips: how many possible outcomes?',
            options: [
                { text: '3', image: null },
                { text: '6', image: null },
                { text: '8', image: null },
                { text: '9', image: null }
            ],
            correctAnswer: 2,
            hint: 'Each flip has 2 outcomes. With 3 flips: 2 × 2 × 2.',
            professorIntro: 'Each coin flip doubles the number of possibilities!',
            professorCorrect: 'Right! 2³ = 2 × 2 × 2 = 8 possible outcomes (HHH, HHT, HTH, ...)!',
            professorWrong: 'Each flip has 2 outcomes. Multiply: 2 × 2 × 2. What do you get?'
        },
        {
            type: 'A',
            prompt: 'You pick 1 main dish (3 choices) and 1 drink (4 choices). How many meal combos?',
            options: [
                { text: '7', image: null },
                { text: '10', image: null },
                { text: '12', image: null },
                { text: '14', image: null }
            ],
            correctAnswer: 2,
            hint: 'Multiply the number of choices in each category: 3 × 4.',
            professorIntro: 'The multiplication principle: multiply the choices at each step!',
            professorCorrect: 'Delicious! 3 × 4 = 12 possible meal combinations!',
            professorWrong: 'For each of the 3 main dishes, you can pair it with any of the 4 drinks. Multiply!'
        }
    ],

    // ═════════════════════════════════════════════════════════════════════
    // Level 23 — Grid Master (6 challenges, Type D)
    // Topics: Grid Logic Puzzles (3×3 constraint grids)
    // ═════════════════════════════════════════════════════════════════════
    23: [
        {
            type: 'D',
            prompt: 'Ann does NOT have a cat. Ben has a dog. Each kid has exactly one pet. Place T for yes, F for no.',
            headers: {
                columns: ['Cat', 'Dog', 'Fish'],
                rows: ['Ann', 'Ben', 'Cal']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'F', '0,1': 'F', '0,2': 'T',
                '1,0': 'F', '1,1': 'T', '1,2': 'F',
                '2,0': 'T', '2,1': 'F', '2,2': 'F'
            },
            hint: 'Start with what you know for sure: Ben has a dog. Ann does NOT have a cat. Then eliminate.',
            professorIntro: 'Logic grids use clues to figure out who has what. Mark T or F in each cell!',
            professorCorrect: 'Brilliant deduction! Ben has the dog, Ann does not have a cat so she has the fish, and Cal gets the cat!',
            professorWrong: 'Start with the definite clue: Ben = Dog. Then Ann cannot have a cat, so what is left for her?'
        },
        {
            type: 'D',
            prompt: 'Mia likes Science. Ava does NOT like Art. Each student has a different favorite subject. Place T for yes, F for no.',
            headers: {
                columns: ['Math', 'Science', 'Art'],
                rows: ['Mia', 'Ava', 'Leo']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'F', '0,1': 'T', '0,2': 'F',
                '1,0': 'T', '1,1': 'F', '1,2': 'F',
                '2,0': 'F', '2,1': 'F', '2,2': 'T'
            },
            hint: 'Mia likes Science (given). Ava does NOT like Art, and Science is taken, so Ava likes Math. Leo gets Art.',
            professorIntro: 'Match each student with their favorite subject using the clues!',
            professorCorrect: 'Perfect logic! Mia→Science, Ava→Math, Leo→Art!',
            professorWrong: 'Mia likes Science — mark that first. Then Ava cannot like Art or Science, so what is left?'
        },
        {
            type: 'D',
            prompt: 'Zoe likes Green. Tom does NOT like Red. Each friend has a different favorite color. Place T for yes, F for no.',
            headers: {
                columns: ['Red', 'Green', 'Blue'],
                rows: ['Zoe', 'Tom', 'Lily']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'F', '0,1': 'T', '0,2': 'F',
                '1,0': 'F', '1,1': 'F', '1,2': 'T',
                '2,0': 'T', '2,1': 'F', '2,2': 'F'
            },
            hint: 'Zoe likes Green. Tom does NOT like Red, and Green is taken, so Tom likes Blue. Lily gets Red.',
            professorIntro: 'Use elimination to match each friend with their favorite color!',
            professorCorrect: 'Colorful logic! Zoe→Green, Tom→Blue, Lily→Red!',
            professorWrong: 'Start with Zoe→Green. Then Tom cannot have Red or Green. What is left for Tom?'
        },
        {
            type: 'D',
            prompt: 'Sam ate Pizza. Jen did NOT eat Soup. Each person ate something different. Place T for yes, F for no.',
            headers: {
                columns: ['Pizza', 'Salad', 'Soup'],
                rows: ['Sam', 'Jen', 'Max']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'T', '0,1': 'F', '0,2': 'F',
                '1,0': 'F', '1,1': 'T', '1,2': 'F',
                '2,0': 'F', '2,1': 'F', '2,2': 'T'
            },
            hint: 'Sam ate Pizza. Jen did NOT eat Soup, and Pizza is taken, so Jen ate Salad. Max gets Soup.',
            professorIntro: 'What did each person eat for lunch? Use the clues to figure it out!',
            professorCorrect: 'Tasty logic! Sam→Pizza, Jen→Salad, Max→Soup!',
            professorWrong: 'Sam ate Pizza — that is certain. Jen cannot eat Soup or Pizza. What is left?'
        },
        {
            type: 'D',
            prompt: 'Ella does Drawing. Dan does NOT do Dancing. Each kid has a different hobby. Place T for yes, F for no.',
            headers: {
                columns: ['Dancing', 'Drawing', 'Reading'],
                rows: ['Ella', 'Dan', 'Kai']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'F', '0,1': 'T', '0,2': 'F',
                '1,0': 'F', '1,1': 'F', '1,2': 'T',
                '2,0': 'T', '2,1': 'F', '2,2': 'F'
            },
            hint: 'Ella does Drawing. Dan does NOT do Dancing, and Drawing is taken, so Dan does Reading. Kai gets Dancing.',
            professorIntro: 'Match kids to their hobbies using logic!',
            professorCorrect: 'Well done! Ella→Drawing, Dan→Reading, Kai→Dancing!',
            professorWrong: 'Ella does Drawing. Dan cannot dance or draw. So Dan does what?'
        },
        {
            type: 'D',
            prompt: 'Nora plays Piano. Jay does NOT play Drums. Each friend plays a different instrument. Place T for yes, F for no.',
            headers: {
                columns: ['Guitar', 'Piano', 'Drums'],
                rows: ['Nora', 'Jay', 'Rin']
            },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,0': 'F', '0,1': 'T', '0,2': 'F',
                '1,0': 'T', '1,1': 'F', '1,2': 'F',
                '2,0': 'F', '2,1': 'F', '2,2': 'T'
            },
            hint: 'Nora plays Piano. Jay does NOT play Drums, and Piano is taken, so Jay plays Guitar. Rin gets Drums.',
            professorIntro: 'Who plays which instrument? Use the clues and eliminate!',
            professorCorrect: 'Music to my ears! Nora→Piano, Jay→Guitar, Rin→Drums!',
            professorWrong: 'Nora plays Piano — mark it. Jay cannot play Drums or Piano. What is left for Jay?'
        }
    ],

    // ═════════════════════════════════════════════════════════════════════
    // Level 24 — Full Activation (10 challenges, Mixed types A-E)
    // Topics: Mixed review from all modules
    // ═════════════════════════════════════════════════════════════════════
    24: [
        // 1. Type A — Pattern challenge (Module 1 topics)
        {
            type: 'A',
            prompt: 'What comes next in the pattern? 2, 4, 6, 8, __',
            options: [
                { text: '9', image: null },
                { text: '10', image: null },
                { text: '11', image: null },
                { text: '12', image: null }
            ],
            correctAnswer: 1,
            hint: 'The numbers increase by 2 each time.',
            professorIntro: 'Let us start with a pattern! Look at how the numbers change.',
            professorCorrect: 'Great start! The pattern adds 2 each time: 8 + 2 = 10!',
            professorWrong: 'Find the difference between each number. 4-2=2, 6-4=2, 8-6=2...'
        },
        // 2. Type B — Sorting challenge (Module 1-2 topics)
        {
            type: 'B',
            prompt: 'Sort these items into the correct categories: Living Things vs Non-Living Things.',
            items: [
                { id: 'fa_b1', label: 'Tree' },
                { id: 'fa_b2', label: 'Rock' },
                { id: 'fa_b3', label: 'Butterfly' },
                { id: 'fa_b4', label: 'Water' },
                { id: 'fa_b5', label: 'Mushroom' },
                { id: 'fa_b6', label: 'Cloud' }
            ],
            zones: [
                { id: 'living', label: 'Living Things' },
                { id: 'nonliving', label: 'Non-Living Things' }
            ],
            correctAnswer: {
                'fa_b1': 'living',
                'fa_b2': 'nonliving',
                'fa_b3': 'living',
                'fa_b4': 'nonliving',
                'fa_b5': 'living',
                'fa_b6': 'nonliving'
            },
            hint: 'Living things grow, eat, and reproduce. Trees, butterflies, and mushrooms are alive!',
            professorIntro: 'Sorting is a fundamental skill! Classify each item as living or non-living.',
            professorCorrect: 'Excellent classification! Trees, butterflies, and mushrooms are living. Rocks, water, and clouds are not.',
            professorWrong: 'Think about whether each item grows, needs food, or can reproduce.'
        },
        // 3. Type C — Sequencing challenge (Module 1-2 topics)
        {
            type: 'C',
            prompt: 'Put the steps of the water cycle in order.',
            items: [
                { id: 'fa_c1', label: 'Sun heats water' },
                { id: 'fa_c2', label: 'Water evaporates' },
                { id: 'fa_c3', label: 'Vapor forms clouds' },
                { id: 'fa_c4', label: 'Rain falls' },
                { id: 'fa_c5', label: 'Water collects in lakes' }
            ],
            correctAnswer: ['fa_c1', 'fa_c2', 'fa_c3', 'fa_c4', 'fa_c5'],
            hint: 'Start with what provides the energy: the sun. Then follow the water upward and back down.',
            professorIntro: 'The water cycle is a natural sequence. Put these steps in the right order!',
            professorCorrect: 'Perfect cycle! Heat → evaporate → clouds → rain → collect. Nature is logical!',
            professorWrong: 'What happens first? The sun must heat the water before it can evaporate.'
        },
        // 4. Type D — Boolean logic challenge (Module 3 topics)
        {
            type: 'D',
            prompt: 'Complete the truth table for P AND Q.',
            headers: {
                columns: ['P', 'Q', 'P AND Q'],
                rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4']
            },
            prefilled: {
                '0,0': 'T', '0,1': 'T',
                '1,0': 'T', '1,1': 'F',
                '2,0': 'F', '2,1': 'T',
                '3,0': 'F', '3,1': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,2': 'T',
                '1,2': 'F',
                '2,2': 'F',
                '3,2': 'F'
            },
            hint: 'AND is true only when BOTH P and Q are true. All other rows are false.',
            professorIntro: 'Truth tables map out every possibility. Fill in the AND column!',
            professorCorrect: 'Perfect truth table! AND is only true when both inputs are true!',
            professorWrong: 'Remember: P AND Q is true ONLY when both P=T and Q=T. Everything else is F.'
        },
        // 5. Type A — Deduction challenge (Module 2 topics)
        {
            type: 'A',
            prompt: 'Sam is taller than Kim. Kim is taller than Lee. Who is the shortest?',
            options: [
                { text: 'Sam', image: null },
                { text: 'Kim', image: null },
                { text: 'Lee', image: null },
                { text: 'Cannot tell', image: null }
            ],
            correctAnswer: 2,
            hint: 'If Sam > Kim and Kim > Lee, then the order from tallest to shortest is Sam, Kim, Lee.',
            professorIntro: 'Use deduction to figure out the order!',
            professorCorrect: 'Logical! Sam > Kim > Lee, so Lee is the shortest!',
            professorWrong: 'Build the chain: Sam is taller than Kim, Kim is taller than Lee. Who is at the bottom?'
        },
        // 6. Type E — Cipher challenge (Module 4 topics)
        {
            type: 'E',
            prompt: 'If A=1, B=2, C=3 ... Z=26, what word is: 19-21-14?',
            correctAnswer: 'sun',
            acceptableAnswers: ['sun', 'SUN', 'Sun'],
            inputPlaceholder: 'Type the decoded word...',
            hint: 'S=19, U=21, N=14.',
            professorIntro: 'Crack this number cipher! Convert each number to a letter.',
            professorCorrect: 'Brilliant! 19=S, 21=U, 14=N spells SUN!',
            professorWrong: 'The 19th letter is S, the 21st is U, the 14th is N. What word is that?'
        },
        // 7. Type A — Fallacy identification (Module 3 topics)
        {
            type: 'A',
            prompt: '"Everyone is buying this new toy, so it must be the best." What kind of reasoning error is this?',
            options: [
                { text: 'Bandwagon fallacy', image: null },
                { text: 'Straw man fallacy', image: null },
                { text: 'Valid reasoning', image: null },
                { text: 'False cause', image: null }
            ],
            correctAnswer: 0,
            hint: 'Just because something is popular does not mean it is the best. That is the bandwagon fallacy.',
            professorIntro: 'Can you spot the logical fallacy in this argument?',
            professorCorrect: 'Correct! Popularity does not equal quality. That is the bandwagon fallacy!',
            professorWrong: 'The argument says it must be good because everyone is buying it. Is popularity proof of quality?'
        },
        // 8. Type D — Truth table mini (Module 3 topics)
        {
            type: 'D',
            prompt: 'Complete the truth table for NOT P.',
            headers: {
                columns: ['P', 'NOT P'],
                rows: ['Row 1', 'Row 2']
            },
            prefilled: {
                '0,0': 'T',
                '1,0': 'F'
            },
            toggleOptions: ['T', 'F'],
            correctAnswer: {
                '0,1': 'F',
                '1,1': 'T'
            },
            hint: 'NOT flips the value. If P is True, NOT P is False. If P is False, NOT P is True.',
            professorIntro: 'NOT is the simplest boolean operation. It just flips the value!',
            professorCorrect: 'Right! NOT just flips: True becomes False, False becomes True!',
            professorWrong: 'NOT reverses the truth value. True becomes False, and False becomes True.'
        },
        // 9. Type A — Probability/variable (Module 4 topics)
        {
            type: 'A',
            prompt: 'A standard die has 6 faces (1-6). What is the probability of rolling a number greater than 4?',
            options: [
                { text: '1/6', image: null },
                { text: '1/3', image: null },
                { text: '1/2', image: null },
                { text: '2/3', image: null }
            ],
            correctAnswer: 1,
            hint: 'Numbers greater than 4 on a die are 5 and 6. That is 2 favorable outcomes out of 6.',
            professorIntro: 'Probability with dice! Count the favorable outcomes.',
            professorCorrect: 'Correct! 5 and 6 are greater than 4, so the probability is 2/6 = 1/3!',
            professorWrong: 'Which numbers on a die are greater than 4? Count those, then divide by 6.'
        },
        // 10. Type C — Flowchart ordering (Module 4 topics)
        {
            type: 'C',
            prompt: 'Order the steps to send a text message.',
            items: [
                { id: 'fa_s1', label: 'Pick up your phone' },
                { id: 'fa_s2', label: 'Open the messaging app' },
                { id: 'fa_s3', label: 'Choose who to send to' },
                { id: 'fa_s4', label: 'Type your message' },
                { id: 'fa_s5', label: 'Press send' }
            ],
            correctAnswer: ['fa_s1', 'fa_s2', 'fa_s3', 'fa_s4', 'fa_s5'],
            hint: 'You need your phone before opening an app. You need to choose a contact before typing a message to them.',
            professorIntro: 'One last algorithm! Each step requires the one before it. Put them in order!',
            professorCorrect: 'Full activation complete! You have mastered logic across all modules! The robot brain is fully built!',
            professorWrong: 'You can not open an app without picking up the phone first. What comes first?'
        }
    ]
};
