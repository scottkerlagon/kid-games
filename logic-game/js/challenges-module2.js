/**
 * Robot Brain Builder — Challenge Bank: Module 2 (Analysis Engine)
 * Levels 7-12, grades 3-5.
 * Topics: Advanced Patterns, Deduction, Venn Diagrams, Complex If/Then,
 *         Cause & Effect Chains, Spatial Reasoning Intermediate.
 *
 * Registers on window.LogicGame.ChallengesModule2 as an object keyed by level ID.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.ChallengesModule2 = {

    // ═══════════════════════════════════════════════════════════════════
    // Level 7 — Pattern Turbo (8 challenges, Type A)
    // Topics: Advanced Patterns, Number Puzzles
    // ═══════════════════════════════════════════════════════════════════

    7: [
        {
            type: 'A',
            prompt: 'What comes next in the pattern: 2, 4, 8, 16, ?',
            options: [
                { text: '20', image: null },
                { text: '24', image: null },
                { text: '32', image: null },
                { text: '18', image: null }
            ],
            correctAnswer: 2,
            hint: 'Each number is doubled (multiplied by 2) to get the next one.',
            professorIntro: 'Look at how each number changes to get the next one. Is there a multiplication pattern?',
            professorCorrect: 'Exactly! Each number doubles: 2, 4, 8, 16, 32!',
            professorWrong: 'Not quite. Try multiplying each number by 2 and see what happens.'
        },
        {
            type: 'A',
            prompt: 'What comes next in the pattern: 1, 4, 9, 16, ?',
            options: [
                { text: '20', image: null },
                { text: '25', image: null },
                { text: '21', image: null },
                { text: '36', image: null }
            ],
            correctAnswer: 1,
            hint: 'These are perfect squares: 1x1, 2x2, 3x3, 4x4 ...',
            professorIntro: 'This is a famous number pattern. What do you get when you multiply a number by itself?',
            professorCorrect: 'Perfect! These are square numbers: 1, 4, 9, 16, 25. The next is 5 times 5!',
            professorWrong: 'Hmm, think about it: 1=1x1, 4=2x2, 9=3x3, 16=4x4. What is 5x5?'
        },
        {
            type: 'A',
            prompt: 'Complete the pattern: 3, 6, 9, 12, ?',
            options: [
                { text: '13', image: null },
                { text: '14', image: null },
                { text: '15', image: null },
                { text: '18', image: null }
            ],
            correctAnswer: 2,
            hint: 'The numbers go up by the same amount each time. What is being added?',
            professorIntro: 'Look at the gap between each pair of numbers. Is it always the same?',
            professorCorrect: 'That\'s right! Adding 3 each time: 3, 6, 9, 12, 15!',
            professorWrong: 'Not quite. Find the difference between each pair: 6-3=3, 9-6=3, 12-9=3. So what is 12+3?'
        },
        {
            type: 'A',
            prompt: 'What comes next: 1, 1, 2, 3, 5, ?',
            options: [
                { text: '6', image: null },
                { text: '7', image: null },
                { text: '8', image: null },
                { text: '10', image: null }
            ],
            correctAnswer: 2,
            hint: 'Add the two previous numbers together to get the next one.',
            professorIntro: 'This is a very special pattern! Look at how each number relates to the TWO numbers before it.',
            professorCorrect: 'Excellent! This is the Fibonacci sequence! Each number is the sum of the two before it: 3 + 5 = 8!',
            professorWrong: 'Try adding the last two numbers: 3 + 5 = ?'
        },
        {
            type: 'A',
            prompt: 'Find the pattern: A1, B2, C3, D?',
            options: [
                { text: '4', image: null },
                { text: '5', image: null },
                { text: '3', image: null },
                { text: 'D', image: null }
            ],
            correctAnswer: 0,
            hint: 'The letter goes up by one, and so does the number.',
            professorIntro: 'This pattern mixes letters and numbers. How do the letters change? How do the numbers change?',
            professorCorrect: 'You got it! The letters go A, B, C, D and the numbers go 1, 2, 3, 4!',
            professorWrong: 'Look closely: A goes with 1, B with 2, C with 3 ... D goes with ?'
        },
        {
            type: 'A',
            prompt: 'What comes next: 100, 90, 80, 70, ?',
            options: [
                { text: '65', image: null },
                { text: '60', image: null },
                { text: '50', image: null },
                { text: '75', image: null }
            ],
            correctAnswer: 1,
            hint: 'The numbers are going down. By how much each time?',
            professorIntro: 'The numbers are getting smaller. What is being subtracted each time?',
            professorCorrect: 'Spot on! Subtract 10 each time: 100, 90, 80, 70, 60!',
            professorWrong: 'Try subtracting: 100-90=10, 90-80=10. So 70 minus 10 is ...?'
        },
        {
            type: 'A',
            prompt: 'Complete the pattern: 2, 6, 18, 54, ?',
            options: [
                { text: '108', image: null },
                { text: '162', image: null },
                { text: '72', image: null },
                { text: '100', image: null }
            ],
            correctAnswer: 1,
            hint: 'Each number is multiplied by the same value to get the next. What is 6 divided by 2?',
            professorIntro: 'This pattern grows fast! What do you multiply each number by to get the next one?',
            professorCorrect: 'Brilliant! Each number is multiplied by 3: 2, 6, 18, 54, 162!',
            professorWrong: 'Each number is tripled: 2x3=6, 6x3=18, 18x3=54. So 54x3=?'
        },
        {
            type: 'A',
            prompt: 'What comes next: 1, 3, 5, 7, ?',
            options: [
                { text: '8', image: null },
                { text: '9', image: null },
                { text: '10', image: null },
                { text: '11', image: null }
            ],
            correctAnswer: 1,
            hint: 'These are all odd numbers. What odd number comes after 7?',
            professorIntro: 'What do all these numbers have in common? And what number follows the pattern?',
            professorCorrect: 'Great job! These are odd numbers, going up by 2 each time: 1, 3, 5, 7, 9!',
            professorWrong: 'These are odd numbers. Add 2 to the last number: 7 + 2 = ?'
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // Level 8 — Deduction Drive (8 challenges, Type A)
    // Topics: Deductive Reasoning, Process of Elimination
    // ═══════════════════════════════════════════════════════════════════

    8: [
        {
            type: 'A',
            prompt: 'Sam is taller than Kim. Kim is taller than Lee. Who is the shortest?',
            options: [
                { text: 'Sam', image: null },
                { text: 'Kim', image: null },
                { text: 'Lee', image: null },
                { text: 'They\'re equal', image: null }
            ],
            correctAnswer: 2,
            hint: 'Put them in order from tallest to shortest using the clues.',
            professorIntro: 'Use each clue to figure out the order. Who is at the bottom?',
            professorCorrect: 'Correct! Sam > Kim > Lee, so Lee is the shortest!',
            professorWrong: 'Think step by step: Sam is tallest, then Kim, then Lee.'
        },
        {
            type: 'A',
            prompt: 'All dogs have tails. Rex is a dog. Does Rex have a tail?',
            options: [
                { text: 'Yes', image: null },
                { text: 'No', image: null },
                { text: 'Maybe', image: null },
                { text: 'Not enough info', image: null }
            ],
            correctAnswer: 0,
            hint: 'If ALL dogs have tails, and Rex IS a dog, then ...',
            professorIntro: 'This is classic deduction! If a rule applies to ALL members of a group, does it apply to one specific member?',
            professorCorrect: 'Exactly! Since all dogs have tails and Rex is a dog, Rex must have a tail!',
            professorWrong: 'Remember: ALL dogs have tails. Rex IS a dog. So Rex definitely has a tail.'
        },
        {
            type: 'A',
            prompt: 'Amy has more coins than Bob. Bob has more coins than Cal. Who has the most coins?',
            options: [
                { text: 'Bob', image: null },
                { text: 'Cal', image: null },
                { text: 'Amy', image: null },
                { text: 'Can\'t tell', image: null }
            ],
            correctAnswer: 2,
            hint: 'Arrange them from most to fewest coins using the two clues.',
            professorIntro: 'Compare them one pair at a time. Can you figure out who\'s on top?',
            professorCorrect: 'That\'s right! Amy has more than Bob, and Bob has more than Cal, so Amy has the most!',
            professorWrong: 'Amy > Bob > Cal. Who is at the top of the list?'
        },
        {
            type: 'A',
            prompt: 'The red house is between the blue and green houses. The blue house is on the left. Where is the green house?',
            options: [
                { text: 'Left', image: null },
                { text: 'Middle', image: null },
                { text: 'Right', image: null },
                { text: 'On top', image: null }
            ],
            correctAnswer: 2,
            hint: 'Draw it out: blue is on the left, red is in the middle ...',
            professorIntro: 'Try to picture the three houses in a row. Where does each one go?',
            professorCorrect: 'Perfect! Blue on the left, red in the middle, green on the right!',
            professorWrong: 'If blue is on the left and red is between them, the green house must be on the ...'
        },
        {
            type: 'A',
            prompt: 'If it rained today, the grass is wet. The grass IS wet. Did it rain?',
            options: [
                { text: 'Yes, definitely', image: null },
                { text: 'Maybe', image: null },
                { text: 'No', image: null },
                { text: 'Impossible', image: null }
            ],
            correctAnswer: 1,
            hint: 'Could the grass be wet for another reason, like a sprinkler?',
            professorIntro: 'This one is tricky! Just because rain makes the grass wet, does wet grass always mean it rained?',
            professorCorrect: 'Great thinking! The grass could be wet from a sprinkler or morning dew. Rain is possible but not certain!',
            professorWrong: 'Be careful! The grass could be wet from other things besides rain. So the answer is maybe.'
        },
        {
            type: 'A',
            prompt: 'There are 3 pets: a cat, a dog, and a fish. Maria doesn\'t have the dog. Tom has the fish. Who has the dog?',
            options: [
                { text: 'Maria', image: null },
                { text: 'Tom', image: null },
                { text: 'The third person', image: null },
                { text: 'Nobody', image: null }
            ],
            correctAnswer: 2,
            hint: 'Tom has the fish. Maria doesn\'t have the dog. So who is left to have the dog?',
            professorIntro: 'Use process of elimination! Cross off what you know to find what\'s left.',
            professorCorrect: 'Correct! Tom has the fish, Maria doesn\'t have the dog, so the third person must have the dog!',
            professorWrong: 'Tom has the fish, so he doesn\'t have the dog. Maria doesn\'t have the dog either. That leaves ...'
        },
        {
            type: 'A',
            prompt: 'All birds have feathers. A penguin is a bird. Does a penguin have feathers?',
            options: [
                { text: 'Yes', image: null },
                { text: 'No', image: null },
                { text: 'Maybe', image: null },
                { text: 'Only in winter', image: null }
            ],
            correctAnswer: 0,
            hint: 'If ALL birds have feathers, and a penguin IS a bird, then ...',
            professorIntro: 'Even though penguins can\'t fly, they are still birds. What does that mean for feathers?',
            professorCorrect: 'Yes! Penguins are birds, and all birds have feathers, so penguins definitely have feathers!',
            professorWrong: 'The rule says ALL birds have feathers. Penguins are birds. So penguins have feathers!'
        },
        {
            type: 'A',
            prompt: 'Five friends are in a line. Jo is ahead of Kim. Kim is ahead of Pat. Who could be first in line?',
            options: [
                { text: 'Kim', image: null },
                { text: 'Pat', image: null },
                { text: 'Jo', image: null },
                { text: 'Any of them', image: null }
            ],
            correctAnswer: 2,
            hint: 'Jo is ahead of Kim, who is ahead of Pat. Who is the farthest in front?',
            professorIntro: 'Think about the order. If Jo is ahead of Kim and Kim is ahead of Pat, could Pat or Kim be first?',
            professorCorrect: 'Right! Jo is ahead of everyone we know about, so Jo could be first!',
            professorWrong: 'Jo is ahead of Kim, and Kim is ahead of Pat. Jo is the farthest forward, so Jo could be first.'
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // Level 9 — Circle Sorter (8 challenges, Type B)
    // Topics: Venn Diagrams, Sets & Categorization
    // ═══════════════════════════════════════════════════════════════════

    9: [
        {
            type: 'B',
            prompt: 'Sort into "Has Wings" and "Lives in Water"',
            items: [
                { id: 'duck', label: 'Duck' },
                { id: 'eagle', label: 'Eagle' },
                { id: 'fish', label: 'Fish' },
                { id: 'dolphin', label: 'Dolphin' },
                { id: 'penguin', label: 'Penguin' },
                { id: 'butterfly', label: 'Butterfly' }
            ],
            zones: [
                { id: 'zoneA', label: 'Has Wings' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Lives in Water' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'duck': 'zoneBoth',
                'eagle': 'zoneA',
                'fish': 'zoneB',
                'dolphin': 'zoneB',
                'penguin': 'zoneBoth',
                'butterfly': 'zoneA'
            },
            hint: 'Think about which animals have wings AND live in water. Ducks swim and fly! Penguins have wings and live near water.',
            professorIntro: 'Some animals have wings, some live in water, and some do both! Sort each one into the right region.',
            professorCorrect: 'Fantastic sorting! You really understand how Venn diagrams work!',
            professorWrong: 'Check each animal carefully. Does it have wings? Does it live in water? If both, put it in the overlap!'
        },
        {
            type: 'B',
            prompt: 'Sort into "Even Numbers" and "Greater than 5"',
            items: [
                { id: 'n2', label: '2' },
                { id: 'n4', label: '4' },
                { id: 'n6', label: '6' },
                { id: 'n8', label: '8' },
                { id: 'n3', label: '3' },
                { id: 'n7', label: '7' }
            ],
            zones: [
                { id: 'zoneA', label: 'Even Numbers' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Greater than 5' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'n2': 'zoneA',
                'n4': 'zoneA',
                'n6': 'zoneBoth',
                'n8': 'zoneBoth',
                'n3': 'zoneNeither',
                'n7': 'zoneB'
            },
            hint: 'Even numbers divide evenly by 2. Check each number: is it even? Is it greater than 5? Could it be both?',
            professorIntro: 'Numbers can be even, greater than 5, both, or neither! Check each one against both rules.',
            professorCorrect: 'Perfect! You sorted every number correctly!',
            professorWrong: 'Check each number: Is 6 even? Yes. Is 6 greater than 5? Yes. So 6 goes in "Both".'
        },
        {
            type: 'B',
            prompt: 'Sort into "Fruits" and "Red Things"',
            items: [
                { id: 'apple', label: 'Apple' },
                { id: 'banana', label: 'Banana' },
                { id: 'firetruck', label: 'Fire truck' },
                { id: 'strawberry', label: 'Strawberry' },
                { id: 'lemon', label: 'Lemon' },
                { id: 'rose', label: 'Rose' }
            ],
            zones: [
                { id: 'zoneA', label: 'Fruits' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Red Things' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'apple': 'zoneBoth',
                'banana': 'zoneA',
                'firetruck': 'zoneB',
                'strawberry': 'zoneBoth',
                'lemon': 'zoneA',
                'rose': 'zoneB'
            },
            hint: 'Apples and strawberries are fruits AND red. Bananas and lemons are fruits but not red.',
            professorIntro: 'Some things are fruits, some are red, and some are both! Think about each item carefully.',
            professorCorrect: 'Excellent work! You nailed the overlaps!',
            professorWrong: 'Remember: an apple is both a fruit AND red, so it goes in the overlap section.'
        },
        {
            type: 'B',
            prompt: 'Sort into "Has Legs" and "Can Fly"',
            items: [
                { id: 'dog', label: 'Dog' },
                { id: 'bird', label: 'Bird' },
                { id: 'spider', label: 'Spider' },
                { id: 'butterfly', label: 'Butterfly' },
                { id: 'snake', label: 'Snake' },
                { id: 'fish', label: 'Fish' }
            ],
            zones: [
                { id: 'zoneA', label: 'Has Legs' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Can Fly' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'dog': 'zoneA',
                'bird': 'zoneBoth',
                'spider': 'zoneA',
                'butterfly': 'zoneBoth',
                'snake': 'zoneNeither',
                'fish': 'zoneNeither'
            },
            hint: 'Birds and butterflies both have legs AND can fly. Snakes and fish have neither legs nor flight.',
            professorIntro: 'Does it have legs? Can it fly? Some animals can do both, and some can do neither!',
            professorCorrect: 'Amazing! Every creature is in the right spot!',
            professorWrong: 'A bird has legs AND can fly, so it goes in "Both". A snake has no legs and can\'t fly, so it goes in "Neither".'
        },
        {
            type: 'B',
            prompt: 'Sort into "Starts with S" and "Has 4+ letters"',
            items: [
                { id: 'sun', label: 'Sun' },
                { id: 'star', label: 'Star' },
                { id: 'cat', label: 'Cat' },
                { id: 'ship', label: 'Ship' },
                { id: 'sit', label: 'Sit' },
                { id: 'moon', label: 'Moon' }
            ],
            zones: [
                { id: 'zoneA', label: 'Starts with S' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Has 4+ letters' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'sun': 'zoneA',
                'star': 'zoneBoth',
                'cat': 'zoneNeither',
                'ship': 'zoneBoth',
                'sit': 'zoneA',
                'moon': 'zoneB'
            },
            hint: '"Star" starts with S AND has 4 letters, so it goes in Both. "Cat" doesn\'t start with S and has only 3 letters.',
            professorIntro: 'Check two things for each word: Does it start with the letter S? Does it have 4 or more letters?',
            professorCorrect: 'Great job sorting words by two different rules at once!',
            professorWrong: 'Count the letters carefully. "Star" has 4 letters and starts with S, so it goes in "Both".'
        },
        {
            type: 'B',
            prompt: 'Sort into "Cold Things" and "White Things"',
            items: [
                { id: 'snow', label: 'Snow' },
                { id: 'milk', label: 'Milk' },
                { id: 'sun', label: 'Sun' },
                { id: 'ice', label: 'Ice' },
                { id: 'paper', label: 'Paper' },
                { id: 'fire', label: 'Fire' }
            ],
            zones: [
                { id: 'zoneA', label: 'Cold Things' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'White Things' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'snow': 'zoneBoth',
                'milk': 'zoneB',
                'sun': 'zoneNeither',
                'ice': 'zoneA',
                'paper': 'zoneB',
                'fire': 'zoneNeither'
            },
            hint: 'Snow is both cold AND white. Ice is cold but not usually white. Milk and paper are white but not cold.',
            professorIntro: 'Is it cold? Is it white? Some things are both, and some are neither!',
            professorCorrect: 'Wonderful! You sorted every item perfectly!',
            professorWrong: 'Snow is cold AND white, so it goes in "Both". The sun is hot and not white, so it goes in "Neither".'
        },
        {
            type: 'B',
            prompt: 'Sort into "Round" and "Can Eat"',
            items: [
                { id: 'ball', label: 'Ball' },
                { id: 'apple', label: 'Apple' },
                { id: 'orange', label: 'Orange' },
                { id: 'book', label: 'Book' },
                { id: 'coin', label: 'Coin' },
                { id: 'pizza', label: 'Pizza' }
            ],
            zones: [
                { id: 'zoneA', label: 'Round' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Can Eat' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'ball': 'zoneA',
                'apple': 'zoneBoth',
                'orange': 'zoneBoth',
                'book': 'zoneNeither',
                'coin': 'zoneA',
                'pizza': 'zoneB'
            },
            hint: 'Apples and oranges are round AND edible. A ball is round but you can\'t eat it. Pizza is edible but not round (usually a slice!).',
            professorIntro: 'Is it round? Can you eat it? Some things are both, and some are neither!',
            professorCorrect: 'Superb! Every item landed in the right zone!',
            professorWrong: 'An apple is round AND you can eat it, so it goes in "Both". A book is not round and you can\'t eat it, so it goes in "Neither".'
        },
        {
            type: 'B',
            prompt: 'Sort into "Made of Wood" and "Found Indoors"',
            items: [
                { id: 'table', label: 'Table' },
                { id: 'tree', label: 'Tree' },
                { id: 'chair', label: 'Chair' },
                { id: 'fence', label: 'Fence' },
                { id: 'pencil', label: 'Pencil' },
                { id: 'rock', label: 'Rock' }
            ],
            zones: [
                { id: 'zoneA', label: 'Made of Wood' },
                { id: 'zoneBoth', label: 'Both' },
                { id: 'zoneB', label: 'Found Indoors' },
                { id: 'zoneNeither', label: 'Neither' }
            ],
            correctAnswer: {
                'table': 'zoneBoth',
                'tree': 'zoneA',
                'chair': 'zoneBoth',
                'fence': 'zoneA',
                'pencil': 'zoneBoth',
                'rock': 'zoneNeither'
            },
            hint: 'Tables, chairs, and pencils are made of wood AND found indoors. Trees and fences are wooden but outdoors.',
            professorIntro: 'Is it made of wood? Would you find it inside a house? Some items fit both categories!',
            professorCorrect: 'Excellent sorting! You\'re a Venn diagram pro!',
            professorWrong: 'A table is made of wood AND found indoors, so it goes in "Both". A tree is wood but lives outdoors.'
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // Level 10 — Logic Gate Beta (8 challenges, Type A)
    // Topics: Complex If/Then, Complex Analogies
    // ═══════════════════════════════════════════════════════════════════

    10: [
        {
            type: 'A',
            prompt: 'IF it is a weekend AND sunny, go to the park. IF it is a weekend AND rainy, stay home. It is Saturday and rainy. What do you do?',
            options: [
                { text: 'Go to the park', image: null },
                { text: 'Stay home', image: null },
                { text: 'Go to school', image: null },
                { text: 'Go shopping', image: null }
            ],
            correctAnswer: 1,
            hint: 'Saturday is a weekend day. It\'s rainy. Which rule matches "weekend AND rainy"?',
            professorIntro: 'There are two rules here! Check each condition carefully to find the right one.',
            professorCorrect: 'Correct! Saturday is a weekend and it\'s rainy, so the second rule applies: stay home!',
            professorWrong: 'Check the conditions: Is it a weekend? Yes (Saturday). Is it sunny or rainy? Rainy. Which rule matches?'
        },
        {
            type: 'A',
            prompt: 'Dog is to puppy as cat is to ___',
            options: [
                { text: 'Kitten', image: null },
                { text: 'Cub', image: null },
                { text: 'Fawn', image: null },
                { text: 'Calf', image: null }
            ],
            correctAnswer: 0,
            hint: 'A puppy is a baby dog. What is a baby cat called?',
            professorIntro: 'This is an analogy! Find the relationship between the first pair, then apply it to the second.',
            professorCorrect: 'Exactly! A puppy is a baby dog, and a kitten is a baby cat!',
            professorWrong: 'The pattern is: adult animal to baby animal. Dog to puppy. Cat to ...?'
        },
        {
            type: 'A',
            prompt: 'IF temperature > 30\u00B0C THEN wear shorts, ELSE wear pants. Temperature is 25\u00B0C. What do you wear?',
            options: [
                { text: 'Shorts', image: null },
                { text: 'Pants', image: null },
                { text: 'Both', image: null },
                { text: 'Neither', image: null }
            ],
            correctAnswer: 1,
            hint: 'Is 25 greater than 30? If not, which branch do you follow?',
            professorIntro: 'Read the condition carefully: is the temperature above 30 degrees?',
            professorCorrect: 'Right! 25 is NOT greater than 30, so you go to the ELSE branch and wear pants!',
            professorWrong: '25 is less than 30, so the IF condition is false. That means you follow the ELSE rule.'
        },
        {
            type: 'A',
            prompt: 'Pen is to writing as hammer is to ___',
            options: [
                { text: 'Cutting', image: null },
                { text: 'Nailing', image: null },
                { text: 'Painting', image: null },
                { text: 'Drawing', image: null }
            ],
            correctAnswer: 1,
            hint: 'A pen is a tool used FOR writing. A hammer is a tool used FOR ...',
            professorIntro: 'What is the relationship? A pen is USED FOR writing. What is a hammer used for?',
            professorCorrect: 'Perfect! A pen is used for writing, and a hammer is used for nailing!',
            professorWrong: 'Think about what you DO with a hammer. You use it to hit nails. That\'s called ...'
        },
        {
            type: 'A',
            prompt: 'IF (has homework AND it\'s not done) THEN do homework. You have homework and it\'s not done. What do you do?',
            options: [
                { text: 'Play games', image: null },
                { text: 'Do homework', image: null },
                { text: 'Watch TV', image: null },
                { text: 'Sleep', image: null }
            ],
            correctAnswer: 1,
            hint: 'Check both conditions: Do you have homework? Yes. Is it done? No. Both conditions are met!',
            professorIntro: 'Both conditions in the IF statement need to be true. Check each one!',
            professorCorrect: 'That\'s right! You have homework (true) AND it\'s not done (true), so both conditions are met: do homework!',
            professorWrong: 'Has homework? Yes! Not done? Yes! Both parts of the AND are true, so the rule activates.'
        },
        {
            type: 'A',
            prompt: 'Doctor is to hospital as teacher is to ___',
            options: [
                { text: 'Library', image: null },
                { text: 'School', image: null },
                { text: 'Office', image: null },
                { text: 'Park', image: null }
            ],
            correctAnswer: 1,
            hint: 'A doctor works at a hospital. Where does a teacher work?',
            professorIntro: 'Think about the relationship: where does each person work?',
            professorCorrect: 'Correct! A doctor works at a hospital, and a teacher works at a school!',
            professorWrong: 'The pattern is: person to their workplace. Doctor works at a hospital. Teacher works at a ...'
        },
        {
            type: 'A',
            prompt: 'IF you\'re hungry AND there\'s food, THEN eat. IF you\'re hungry AND there\'s no food, THEN go shopping. You\'re hungry and the fridge is empty.',
            options: [
                { text: 'Eat', image: null },
                { text: 'Go shopping', image: null },
                { text: 'Cook', image: null },
                { text: 'Sleep', image: null }
            ],
            correctAnswer: 1,
            hint: 'Are you hungry? Yes. Is there food? No (fridge is empty). Which rule matches?',
            professorIntro: 'Two rules again! Check each condition against the situation described.',
            professorCorrect: 'Exactly! You\'re hungry (true) and there\'s no food (fridge is empty), so you go shopping!',
            professorWrong: 'The fridge is empty means there\'s no food. So the second rule applies: hungry AND no food = go shopping.'
        },
        {
            type: 'A',
            prompt: 'Eye is to seeing as ear is to ___',
            options: [
                { text: 'Smelling', image: null },
                { text: 'Hearing', image: null },
                { text: 'Tasting', image: null },
                { text: 'Touching', image: null }
            ],
            correctAnswer: 1,
            hint: 'Eyes are used for seeing. What are ears used for?',
            professorIntro: 'Each body part has a job. What sense does each one handle?',
            professorCorrect: 'Right! Eyes are for seeing and ears are for hearing!',
            professorWrong: 'The pattern is: body part to its sense. Eyes see. Ears ...'
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // Level 11 — Chain Reactor (7 challenges, Type C)
    // Topics: Cause & Effect Chains, Algorithmic Thinking
    // ═══════════════════════════════════════════════════════════════════

    11: [
        {
            type: 'C',
            prompt: 'How does a book get made? Put the steps in order.',
            items: [
                { id: 'write', label: 'Author writes the story' },
                { id: 'edit', label: 'Editor fixes mistakes' },
                { id: 'print', label: 'Printer prints the pages' },
                { id: 'bind', label: 'Pages are bound into a book' },
                { id: 'sell', label: 'Book is sold in a store' }
            ],
            correctAnswer: ['write', 'edit', 'print', 'bind', 'sell'],
            hint: 'You need a story before you can fix mistakes in it. You need pages before you can bind them.',
            professorIntro: 'A book goes through many steps from idea to bookshelf! Each step needs the one before it.',
            professorCorrect: 'Perfect chain! Write, edit, print, bind, sell — each step needs the previous one!',
            professorWrong: 'You can not edit a story that has not been written yet. Start at the beginning!'
        },
        {
            type: 'C',
            prompt: 'Put the water cycle in the correct order.',
            items: [
                { id: 'evap', label: 'Evaporation' },
                { id: 'cond', label: 'Condensation' },
                { id: 'precip', label: 'Precipitation' },
                { id: 'collect', label: 'Collection' }
            ],
            correctAnswer: ['evap', 'cond', 'precip', 'collect'],
            hint: 'Water heats up and rises (evaporation), forms clouds (condensation), falls as rain (precipitation), and gathers in lakes (collection).',
            professorIntro: 'The water cycle repeats endlessly! But in what order do the steps happen?',
            professorCorrect: 'Excellent! Evaporation, condensation, precipitation, collection. The water cycle in perfect order!',
            professorWrong: 'Start with the sun heating water (evaporation). Then water vapor rises and becomes clouds (condensation).'
        },
        {
            type: 'C',
            prompt: 'How does a letter get delivered? Put the steps in order.',
            items: [
                { id: 'write', label: 'Write letter' },
                { id: 'envelope', label: 'Put in envelope' },
                { id: 'stamp', label: 'Add stamp' },
                { id: 'mailbox', label: 'Put in mailbox' },
                { id: 'carrier', label: 'Mail carrier picks up' },
                { id: 'delivered', label: 'Delivered to recipient' }
            ],
            correctAnswer: ['write', 'envelope', 'stamp', 'mailbox', 'carrier', 'delivered'],
            hint: 'First you write the letter. Then you prepare it for mailing. Then it gets picked up and delivered.',
            professorIntro: 'Sending a letter involves many steps. Think about what you do first, and what happens after.',
            professorCorrect: 'Perfect! From writing to delivery, every step is in the right place!',
            professorWrong: 'You have to write the letter before you can put it in an envelope. Start there!'
        },
        {
            type: 'C',
            prompt: 'How do you make a sandwich? Put the steps in order.',
            items: [
                { id: 'bread', label: 'Get two slices of bread' },
                { id: 'filling', label: 'Add filling' },
                { id: 'top', label: 'Put bread on top' },
                { id: 'cut', label: 'Cut in half' },
                { id: 'eat', label: 'Eat the sandwich' }
            ],
            correctAnswer: ['bread', 'filling', 'top', 'cut', 'eat'],
            hint: 'You need bread before you can add filling. You need to finish making it before you can eat it!',
            professorIntro: 'Making a sandwich is like following an algorithm! Each step depends on the one before it.',
            professorCorrect: 'Delicious logic! Every step in the right order!',
            professorWrong: 'You can\'t add filling without bread first. Start with getting the bread!'
        },
        {
            type: 'C',
            prompt: 'Put this food chain in order from the energy source to the top predator.',
            items: [
                { id: 'sun', label: 'Sun' },
                { id: 'grass', label: 'Grass' },
                { id: 'rabbit', label: 'Rabbit' },
                { id: 'fox', label: 'Fox' }
            ],
            correctAnswer: ['sun', 'grass', 'rabbit', 'fox'],
            hint: 'Energy starts with the sun. Plants use sunlight. Animals eat plants. Predators eat those animals.',
            professorIntro: 'In a food chain, energy flows from one thing to the next. Where does all energy start?',
            professorCorrect: 'Great work! Sun feeds grass, grass feeds rabbit, rabbit feeds fox!',
            professorWrong: 'All food chains start with the sun. The sun gives energy to plants like grass.'
        },
        {
            type: 'C',
            prompt: 'How is a cake made? Put the steps in order.',
            items: [
                { id: 'measure', label: 'Measure ingredients' },
                { id: 'mix', label: 'Mix into batter' },
                { id: 'pour', label: 'Pour batter into pan' },
                { id: 'bake', label: 'Bake in the oven' },
                { id: 'frost', label: 'Add frosting after cooling' }
            ],
            correctAnswer: ['measure', 'mix', 'pour', 'bake', 'frost'],
            hint: 'You need measured ingredients before mixing. You need batter before pouring. The cake must bake and cool before frosting.',
            professorIntro: 'Baking is an algorithm! Each step produces something the next step needs.',
            professorCorrect: 'Delicious logic! Measure, mix, pour, bake, frost — each step feeds the next!',
            professorWrong: 'You can not mix ingredients you have not measured yet. What must come first?'
        },
        {
            type: 'C',
            prompt: 'How do you use a computer? Put the steps in order.',
            items: [
                { id: 'turnon', label: 'Turn on computer' },
                { id: 'password', label: 'Enter password' },
                { id: 'open', label: 'Open program' },
                { id: 'work', label: 'Do your work' },
                { id: 'save', label: 'Save your work' },
                { id: 'turnoff', label: 'Turn off computer' }
            ],
            correctAnswer: ['turnon', 'password', 'open', 'work', 'save', 'turnoff'],
            hint: 'First the computer needs to be on. Then you log in. Then you use it. Always save before turning off!',
            professorIntro: 'Using a computer follows a logical sequence. What must happen before you can type your password?',
            professorCorrect: 'Perfect algorithm! You even remembered to save before shutting down!',
            professorWrong: 'You can\'t enter a password until the computer is on. And always save before turning off!'
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // Level 12 — Space Mapper (8 challenges, Type A)
    // Topics: Spatial Reasoning Intermediate, Decomposition
    // ═══════════════════════════════════════════════════════════════════

    12: [
        {
            type: 'A',
            prompt: 'A cross-shaped piece of paper has a star on the center square. When folded into a cube, which face is OPPOSITE the star?',
            options: [
                { text: 'The top square of the cross', image: null },
                { text: 'The bottom square of the cross', image: null },
                { text: 'The left square of the cross', image: null },
                { text: 'The right square of the cross', image: null }
            ],
            correctAnswer: 1,
            hint: 'In a cross shape, the center is surrounded by 4 squares. The top and bottom squares become opposite faces when folded.',
            professorIntro: 'Imagine folding a flat cross shape into a box. Which face ends up on the opposite side from the star?',
            professorCorrect: 'Amazing spatial thinking! The bottom of the cross folds to become the face opposite the center!',
            professorWrong: 'Picture the cross: the center has a star. When you fold up the sides, the bottom piece folds to face the top, opposite the center.'
        },
        {
            type: 'A',
            prompt: 'A large rectangle is divided by one horizontal line and one vertical line. How many smaller rectangles are there in total?',
            options: [
                { text: '2', image: null },
                { text: '4', image: null },
                { text: '6', image: null },
                { text: '9', image: null }
            ],
            correctAnswer: 3,
            hint: 'Count the 4 small rectangles, plus rectangles made by combining 2 small ones (top half, bottom half, left half, right half), plus the big one.',
            professorIntro: 'Don\'t just count the obvious small rectangles. Bigger rectangles hide inside too!',
            professorCorrect: 'Brilliant! 4 small + 4 combined halves + 1 big = 9 rectangles total!',
            professorWrong: 'There are more than you think! Count the 4 small ones, then look for rectangles made from 2 small ones, and the whole big one.'
        },
        {
            type: 'A',
            prompt: 'You are looking straight down at a cylinder from above. What shape do you see?',
            options: [
                { text: 'Rectangle', image: null },
                { text: 'Circle', image: null },
                { text: 'Oval', image: null },
                { text: 'Triangle', image: null }
            ],
            correctAnswer: 1,
            hint: 'A cylinder has a circular top. Looking down from directly above, you see that circle.',
            professorIntro: 'Imagine holding a can of soup and looking straight down at it. What shape is the top?',
            professorCorrect: 'Correct! Looking down at a cylinder, you see a perfect circle!',
            professorWrong: 'Think of a soda can. The top of a can is a circle, so looking down you see a circle.'
        },
        {
            type: 'A',
            prompt: 'A square is made of 2 triangles. How many triangles make up a hexagon (6-sided shape)?',
            options: [
                { text: '4', image: null },
                { text: '6', image: null },
                { text: '8', image: null },
                { text: '3', image: null }
            ],
            correctAnswer: 1,
            hint: 'A regular hexagon can be divided into 6 equal triangles, all meeting at the center.',
            professorIntro: 'If you draw lines from the center of a hexagon to each corner, how many triangles do you get?',
            professorCorrect: 'Exactly! A hexagon splits into 6 equal triangles from its center!',
            professorWrong: 'Draw a dot in the center of a hexagon. Connect it to all 6 corners. Count the triangles you made!'
        },
        {
            type: 'A',
            prompt: 'If you cut a square diagonally from corner to corner, what two shapes do you get?',
            options: [
                { text: 'Two rectangles', image: null },
                { text: 'Two triangles', image: null },
                { text: 'A triangle and a trapezoid', image: null },
                { text: 'Two pentagons', image: null }
            ],
            correctAnswer: 1,
            hint: 'A diagonal line goes from one corner to the opposite corner, splitting the square into two equal halves.',
            professorIntro: 'Imagine drawing a line from one corner of a square to the opposite corner. What shapes are on each side?',
            professorCorrect: 'Right! A diagonal cut gives you two identical right triangles!',
            professorWrong: 'A diagonal cuts from corner to corner. Each half has three sides: two from the square and the cut line. That\'s a triangle!'
        },
        {
            type: 'A',
            prompt: 'A jigsaw puzzle piece is missing from the top-right corner. The missing space has a bump on the left and a hole on the bottom. Which piece fits?',
            options: [
                { text: 'Hole on left, bump on bottom', image: null },
                { text: 'Bump on left, hole on bottom', image: null },
                { text: 'Hole on left, hole on bottom', image: null },
                { text: 'Bump on left, bump on bottom', image: null }
            ],
            correctAnswer: 0,
            hint: 'A bump in the space needs a hole on the piece, and a hole in the space needs a bump on the piece. They\'re opposites!',
            professorIntro: 'Puzzle pieces interlock! A bump fits into a hole and a hole fits around a bump.',
            professorCorrect: 'Perfect fit! Bumps match holes and holes match bumps!',
            professorWrong: 'The space has a bump on the left, so the piece needs a HOLE on its left side to fit around it.'
        },
        {
            type: 'A',
            prompt: 'Which option is the mirror image of the letter "b"?',
            options: [
                { text: 'b', image: null },
                { text: 'd', image: null },
                { text: 'p', image: null },
                { text: 'q', image: null }
            ],
            correctAnswer: 1,
            hint: 'A mirror flips left and right. The bump on "b" faces right, so in a mirror it faces left.',
            professorIntro: 'If you hold the letter "b" up to a mirror, the left and right sides swap. What letter does it look like?',
            professorCorrect: 'Correct! The mirror image of "b" is "d" — the bump flips to the other side!',
            professorWrong: 'A mirror flips horizontally. The "b" has its round part on the right. Flipped, it goes to the left, making "d".'
        },
        {
            type: 'A',
            prompt: 'If you rotate the letter "N" by 90 degrees clockwise, what does it look like?',
            options: [
                { text: 'Z', image: null },
                { text: 'N', image: null },
                { text: 'U', image: null },
                { text: 'S', image: null }
            ],
            correctAnswer: 0,
            hint: 'Turn the letter N so the top goes to the right. The vertical lines become horizontal and the diagonal stays.',
            professorIntro: 'Imagine the letter N printed on a card. Now turn that card 90 degrees clockwise. What letter does it resemble?',
            professorCorrect: 'Great spatial thinking! Rotating "N" 90 degrees clockwise gives you something that looks like "Z"!',
            professorWrong: 'Picture the N on its side with the top rotated to the right. The two vertical strokes become horizontal, and the diagonal connects them like a Z.'
        }
    ]
};
