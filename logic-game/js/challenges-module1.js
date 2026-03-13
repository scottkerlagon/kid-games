/**
 * Robot Brain Builder — Challenge Bank: Module 1 (Perception Core)
 * Levels 1-6, K-2 difficulty topics.
 * Registers on window.LogicGame.ChallengesModule1 as an object keyed by level ID.
 *
 * Level 1: Pattern Scanners (8 challenges, Type A)
 * Level 2: Sort Circuits (8 challenges, Type B)
 * Level 3: Sequence Chips (8 challenges, Type C)
 * Level 4: Cause Detector (7 challenges, Type A)
 * Level 5: Logic Gate Alpha (7 challenges, Type D)
 * Level 6: Shape Navigator (8 challenges, Type A)
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.ChallengesModule1 = {

    // ══════════════════════════════════════════════════════════════════
    // Level 1 — Pattern Scanners (8 challenges, Type A: Click-to-Select)
    // Topics: Pattern Recognition, Matching. K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    1: [
        {
            type: 'A',
            prompt: 'What comes next? Circle, Square, Circle, Square, ?',
            options: [
                { text: 'Circle', image: null },
                { text: 'Triangle', image: null },
                { text: 'Square', image: null },
                { text: 'Star', image: null }
            ],
            correctAnswer: 0,
            hint: 'The shapes go back and forth: Circle, Square, Circle, Square... what started the pattern?',
            professorIntro: 'Look at the shapes! They repeat in a pattern. Can you figure out what comes next?',
            professorCorrect: 'Excellent! Circle and Square take turns — Circle is next!',
            professorWrong: 'Hmm, look at the pattern again. The shapes keep switching back and forth!'
        },
        {
            type: 'A',
            prompt: 'Which color comes next? Red, Blue, Red, Blue, ?',
            options: [
                { text: 'Green', image: null },
                { text: 'Yellow', image: null },
                { text: 'Red', image: null },
                { text: 'Blue', image: null }
            ],
            correctAnswer: 2,
            hint: 'The colors switch: Red, Blue, Red, Blue... what comes after Blue?',
            professorIntro: 'Colors can make patterns too! What color should come next in this line?',
            professorCorrect: 'You got it! Red and Blue take turns, so Red comes next!',
            professorWrong: 'Not quite! Watch the colors switch back and forth. Try again!'
        },
        {
            type: 'A',
            prompt: 'Find the matching pair! Which shape is the same as a Star?',
            options: [
                { text: 'Heart', image: null },
                { text: 'Star', image: null },
                { text: 'Moon', image: null },
                { text: 'Diamond', image: null }
            ],
            correctAnswer: 1,
            hint: 'Look for the shape that looks exactly like a Star — it has pointy tips!',
            professorIntro: 'Matching is important for robots! Can you find the shape that matches a Star?',
            professorCorrect: 'Perfect match! A Star matches a Star!',
            professorWrong: 'That shape is different from a Star. Look for the one that is exactly the same!'
        },
        {
            type: 'A',
            prompt: 'What comes next? 1, 2, 3, 4, ?',
            options: [
                { text: '3', image: null },
                { text: '5', image: null },
                { text: '6', image: null },
                { text: '4', image: null }
            ],
            correctAnswer: 1,
            hint: 'We are counting up by one each time: 1, 2, 3, 4... what number is after 4?',
            professorIntro: 'Numbers can make patterns! We are counting up. What number comes next?',
            professorCorrect: 'That is right! After 4 comes 5. Great counting!',
            professorWrong: 'Oops! We are counting up: 1, 2, 3, 4... each number is one more than the last.'
        },
        {
            type: 'A',
            prompt: 'Which pattern matches? A, A, B, B, A, A, B, B — what comes next?',
            options: [
                { text: 'A, A', image: null },
                { text: 'B, B', image: null },
                { text: 'A, B', image: null },
                { text: 'B, A', image: null }
            ],
            correctAnswer: 0,
            hint: 'The pattern repeats in groups: A, A then B, B then A, A then B, B. What group is next?',
            professorIntro: 'This pattern uses letters! Look at how they repeat in groups.',
            professorCorrect: 'Wonderful! The pattern goes A, A, B, B and then starts over with A, A!',
            professorWrong: 'Look again! The letters come in pairs: A, A then B, B. The pattern repeats!'
        },
        {
            type: 'A',
            prompt: 'What comes next? Big, Small, Big, Small, ?',
            options: [
                { text: 'Medium', image: null },
                { text: 'Big', image: null },
                { text: 'Small', image: null },
                { text: 'Tiny', image: null }
            ],
            correctAnswer: 1,
            hint: 'Big and Small take turns. After Small comes...',
            professorIntro: 'Sizes can make patterns! Big, Small, Big, Small... what comes after Small?',
            professorCorrect: 'Right! Big and Small keep switching, so Big comes next!',
            professorWrong: 'Not quite. The sizes keep going back and forth: Big, Small, Big, Small...'
        },
        {
            type: 'A',
            prompt: 'Which shape is the same as the first one? The first shape is a Triangle.',
            options: [
                { text: 'Square', image: null },
                { text: 'Circle', image: null },
                { text: 'Triangle', image: null },
                { text: 'Rectangle', image: null }
            ],
            correctAnswer: 2,
            hint: 'A Triangle has 3 sides and 3 pointy corners. Find the one that matches!',
            professorIntro: 'The robot needs to find matching shapes! Which one looks the same as a Triangle?',
            professorCorrect: 'Great eye! Triangle matches Triangle perfectly!',
            professorWrong: 'That shape is not the same as a Triangle. A Triangle has 3 sides!'
        },
        {
            type: 'A',
            prompt: 'What comes next? Star, Heart, Star, Heart, ?',
            options: [
                { text: 'Star', image: null },
                { text: 'Moon', image: null },
                { text: 'Heart', image: null },
                { text: 'Sun', image: null }
            ],
            correctAnswer: 0,
            hint: 'Star and Heart take turns. After Heart comes...',
            professorIntro: 'One more pattern to scan! Star, Heart, Star, Heart... what is next?',
            professorCorrect: 'You are a pattern expert! Star comes next because they take turns!',
            professorWrong: 'Look at the pattern again: Star, Heart, Star, Heart... they keep switching!'
        }
    ],

    // ══════════════════════════════════════════════════════════════════
    // Level 2 — Sort Circuits (8 challenges, Type B: Click-to-Place)
    // Topics: Sorting & Classifying, Odd One Out. K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    2: [
        {
            type: 'B',
            prompt: 'Sort the animals and vehicles into the right groups!',
            items: [
                { id: 'dog', label: 'Dog' },
                { id: 'car', label: 'Car' },
                { id: 'cat', label: 'Cat' },
                { id: 'bus', label: 'Bus' },
                { id: 'fish', label: 'Fish' },
                { id: 'bike', label: 'Bike' }
            ],
            zones: [
                { id: 'animals', label: 'Animals' },
                { id: 'vehicles', label: 'Vehicles' }
            ],
            correctAnswer: {
                'dog': 'animals',
                'car': 'vehicles',
                'cat': 'animals',
                'bus': 'vehicles',
                'fish': 'animals',
                'bike': 'vehicles'
            },
            hint: 'Animals are living things like pets. Vehicles have wheels and take you places.',
            professorIntro: 'Help the robot sort! Put each thing in the right group — is it an animal or a vehicle?',
            professorCorrect: 'Super sorting! Animals are living creatures and vehicles are for riding!',
            professorWrong: 'Hmm, some things are in the wrong group. Think: does it have legs or wheels?'
        },
        {
            type: 'B',
            prompt: 'Sort the fruits and vegetables!',
            items: [
                { id: 'apple', label: 'Apple' },
                { id: 'carrot', label: 'Carrot' },
                { id: 'banana', label: 'Banana' },
                { id: 'broccoli', label: 'Broccoli' },
                { id: 'grape', label: 'Grape' },
                { id: 'pea', label: 'Pea' }
            ],
            zones: [
                { id: 'fruits', label: 'Fruits' },
                { id: 'veggies', label: 'Vegetables' }
            ],
            correctAnswer: {
                'apple': 'fruits',
                'carrot': 'veggies',
                'banana': 'fruits',
                'broccoli': 'veggies',
                'grape': 'fruits',
                'pea': 'veggies'
            },
            hint: 'Fruits are usually sweet. Vegetables are usually green or crunchy.',
            professorIntro: 'Time to sort some food! Which ones are fruits and which ones are vegetables?',
            professorCorrect: 'Yummy sorting! You know your fruits from your veggies!',
            professorWrong: 'Some are in the wrong spot! Fruits are usually sweet, vegetables are not.'
        },
        {
            type: 'B',
            prompt: 'Sort things by size! Is it big or small?',
            items: [
                { id: 'elephant', label: 'Elephant' },
                { id: 'mouse', label: 'Mouse' },
                { id: 'house', label: 'House' },
                { id: 'ant', label: 'Ant' },
                { id: 'tree', label: 'Tree' },
                { id: 'button', label: 'Button' }
            ],
            zones: [
                { id: 'big', label: 'Big Things' },
                { id: 'small', label: 'Small Things' }
            ],
            correctAnswer: {
                'elephant': 'big',
                'mouse': 'small',
                'house': 'big',
                'ant': 'small',
                'tree': 'big',
                'button': 'small'
            },
            hint: 'Think about how big each thing is in real life. Could you hold it in your hand?',
            professorIntro: 'Big or small? Sort each thing into the right group based on its size!',
            professorCorrect: 'Great job! You can tell big things from small things!',
            professorWrong: 'Think about it — is that really big or small in real life? Try again!'
        },
        {
            type: 'B',
            prompt: 'Sort the hot things and cold things!',
            items: [
                { id: 'icecream', label: 'Ice Cream' },
                { id: 'sun', label: 'Sun' },
                { id: 'snow', label: 'Snow' },
                { id: 'fire', label: 'Fire' },
                { id: 'oven', label: 'Oven' },
                { id: 'ice', label: 'Ice' }
            ],
            zones: [
                { id: 'hot', label: 'Hot' },
                { id: 'cold', label: 'Cold' }
            ],
            correctAnswer: {
                'icecream': 'cold',
                'sun': 'hot',
                'snow': 'cold',
                'fire': 'hot',
                'oven': 'hot',
                'ice': 'cold'
            },
            hint: 'Would you touch it and say "ouch!" or "brrr!"?',
            professorIntro: 'Hot or cold? Help the robot feel the temperature of each thing!',
            professorCorrect: 'Awesome! You know what is hot and what is cold!',
            professorWrong: 'Hmm, think about how each thing feels. Is it warm or chilly?'
        },
        {
            type: 'B',
            prompt: 'Sort the land animals and water animals!',
            items: [
                { id: 'horse', label: 'Horse' },
                { id: 'shark', label: 'Shark' },
                { id: 'rabbit', label: 'Rabbit' },
                { id: 'whale', label: 'Whale' },
                { id: 'bear', label: 'Bear' },
                { id: 'jellyfish', label: 'Jellyfish' }
            ],
            zones: [
                { id: 'land', label: 'Land Animals' },
                { id: 'water', label: 'Water Animals' }
            ],
            correctAnswer: {
                'horse': 'land',
                'shark': 'water',
                'rabbit': 'land',
                'whale': 'water',
                'bear': 'land',
                'jellyfish': 'water'
            },
            hint: 'Does the animal walk on the ground or swim in the ocean?',
            professorIntro: 'Where do these animals live? On land or in the water?',
            professorCorrect: 'Perfect! You know where each animal lives!',
            professorWrong: 'Think about where each animal spends its time — on land or under water?'
        },
        {
            type: 'B',
            prompt: 'Sort the sweet foods and salty foods!',
            items: [
                { id: 'cake', label: 'Cake' },
                { id: 'pretzel', label: 'Pretzel' },
                { id: 'cookie', label: 'Cookie' },
                { id: 'chips', label: 'Chips' },
                { id: 'candy', label: 'Candy' },
                { id: 'popcorn', label: 'Popcorn' }
            ],
            zones: [
                { id: 'sweet', label: 'Sweet Foods' },
                { id: 'salty', label: 'Salty Foods' }
            ],
            correctAnswer: {
                'cake': 'sweet',
                'pretzel': 'salty',
                'cookie': 'sweet',
                'chips': 'salty',
                'candy': 'sweet',
                'popcorn': 'salty'
            },
            hint: 'Sweet foods taste sugary. Salty foods taste... salty!',
            professorIntro: 'Does it taste sweet like sugar or salty like the sea? Sort them!',
            professorCorrect: 'Tasty sorting! You know your sweet from your salty!',
            professorWrong: 'Think about the taste — is it sugary sweet or crunchy salty?'
        },
        {
            type: 'B',
            prompt: 'Sort things that fly and things that do not fly!',
            items: [
                { id: 'bird', label: 'Bird' },
                { id: 'rock', label: 'Rock' },
                { id: 'airplane', label: 'Airplane' },
                { id: 'table', label: 'Table' },
                { id: 'butterfly', label: 'Butterfly' },
                { id: 'book', label: 'Book' }
            ],
            zones: [
                { id: 'flies', label: 'Can Fly' },
                { id: 'nofly', label: 'Cannot Fly' }
            ],
            correctAnswer: {
                'bird': 'flies',
                'rock': 'nofly',
                'airplane': 'flies',
                'table': 'nofly',
                'butterfly': 'flies',
                'book': 'nofly'
            },
            hint: 'Can it go up in the air and stay there? Wings or engines help things fly!',
            professorIntro: 'Can it fly through the air? Sort each thing into the right group!',
            professorCorrect: 'Fantastic! You know what can soar through the sky!',
            professorWrong: 'Think again — does it have wings or an engine to fly with?'
        },
        {
            type: 'B',
            prompt: 'Sort living things and non-living things!',
            items: [
                { id: 'flower', label: 'Flower' },
                { id: 'chair', label: 'Chair' },
                { id: 'puppy', label: 'Puppy' },
                { id: 'lamp', label: 'Lamp' },
                { id: 'frog', label: 'Frog' },
                { id: 'shoe', label: 'Shoe' }
            ],
            zones: [
                { id: 'living', label: 'Living Things' },
                { id: 'nonliving', label: 'Non-Living Things' }
            ],
            correctAnswer: {
                'flower': 'living',
                'chair': 'nonliving',
                'puppy': 'living',
                'lamp': 'nonliving',
                'frog': 'living',
                'shoe': 'nonliving'
            },
            hint: 'Living things grow, eat, and breathe. Non-living things do not!',
            professorIntro: 'Is it alive? Living things grow and need food. Non-living things do not!',
            professorCorrect: 'Amazing! You can tell what is alive and what is not!',
            professorWrong: 'Think about it — does it grow, eat, or breathe? If yes, it is living!'
        }
    ],

    // ══════════════════════════════════════════════════════════════════
    // Level 3 — Sequence Chips (8 challenges, Type C: Click-to-Arrange)
    // Topics: Sequencing, Following Algorithms. K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    3: [
        {
            type: 'C',
            prompt: 'Put the steps to make orange juice in order!',
            items: [
                { id: 'pick', label: 'Pick an orange' },
                { id: 'cut', label: 'Cut it in half' },
                { id: 'squeeze', label: 'Squeeze the juice out' },
                { id: 'pour', label: 'Pour juice into a glass' }
            ],
            correctAnswer: ['pick', 'cut', 'squeeze', 'pour'],
            hint: 'You need an orange before you can cut it! Each step uses what the last step made.',
            professorIntro: 'Let us make orange juice! Each step needs the one before it. What comes first?',
            professorCorrect: 'Refreshing! Pick, cut, squeeze, pour — each step needs what came before!',
            professorWrong: 'Think about it — you can not cut an orange until you have one! What comes first?'
        },
        {
            type: 'C',
            prompt: 'Put these numbers in order from smallest to biggest!',
            items: [
                { id: 'n5', label: '5' },
                { id: 'n2', label: '2' },
                { id: 'n8', label: '8' },
                { id: 'n1', label: '1' }
            ],
            correctAnswer: ['n1', 'n2', 'n5', 'n8'],
            hint: 'Start with the tiniest number and work your way up!',
            professorIntro: 'These numbers are all scrambled! Put them in order from the smallest to the biggest.',
            professorCorrect: 'Great counting! 1, 2, 5, 8 — from smallest to biggest!',
            professorWrong: 'Not quite right. Find the smallest number first, then the next smallest.'
        },
        {
            type: 'C',
            prompt: 'Put the butterfly life stages in order!',
            items: [
                { id: 'egg', label: 'Tiny egg on a leaf' },
                { id: 'cat', label: 'Caterpillar hatches' },
                { id: 'cocoon', label: 'Caterpillar makes a cocoon' },
                { id: 'bfly', label: 'Butterfly comes out' }
            ],
            correctAnswer: ['egg', 'cat', 'cocoon', 'bfly'],
            hint: 'It starts as an egg! Each stage turns into the next one.',
            professorIntro: 'A butterfly goes through amazing changes! Put the life stages in order.',
            professorCorrect: 'Beautiful! Egg, caterpillar, cocoon, butterfly — each stage becomes the next!',
            professorWrong: 'A butterfly starts as an egg. The egg hatches into a caterpillar. What comes after that?'
        },
        {
            type: 'C',
            prompt: 'Put the recipe steps in order to make cookies!',
            items: [
                { id: 'bake', label: 'Bake in the oven' },
                { id: 'mix', label: 'Mix the batter' },
                { id: 'eat', label: 'Eat the cookies' },
                { id: 'pour', label: 'Put batter on the tray' }
            ],
            correctAnswer: ['mix', 'pour', 'bake', 'eat'],
            hint: 'You have to make the batter before you can put it anywhere!',
            professorIntro: 'Let us bake cookies! But the steps are out of order. Fix them!',
            professorCorrect: 'Yummy! Mix, pour, bake, and eat! That is how you make cookies!',
            professorWrong: 'Think about cooking — what do you need to do before you can bake?'
        },
        {
            type: 'C',
            prompt: 'Put the steps to build a sandcastle in order!',
            items: [
                { id: 'dig', label: 'Dig up wet sand' },
                { id: 'fill', label: 'Fill the bucket with sand' },
                { id: 'flip', label: 'Flip the bucket upside down' },
                { id: 'lift', label: 'Lift the bucket off' }
            ],
            correctAnswer: ['dig', 'fill', 'flip', 'lift'],
            hint: 'You need sand before you can fill the bucket! Each step uses what you did before.',
            professorIntro: 'Let us build a sandcastle! Each step needs the one before it. What comes first?',
            professorCorrect: 'Great castle! Dig, fill, flip, lift — each step needs the one before it!',
            professorWrong: 'You can not fill a bucket until you have sand! What do you do first?'
        },
        {
            type: 'C',
            prompt: 'Put the plant stages in order!',
            items: [
                { id: 'flower', label: 'Flower blooms' },
                { id: 'seed', label: 'Plant the seed' },
                { id: 'fruit', label: 'Fruit grows' },
                { id: 'sprout', label: 'Sprout pops up' }
            ],
            correctAnswer: ['seed', 'sprout', 'flower', 'fruit'],
            hint: 'Everything starts with a tiny seed in the ground!',
            professorIntro: 'How does a plant grow? Put the steps in the right order!',
            professorCorrect: 'Green thumb! Seed, sprout, flower, then fruit!',
            professorWrong: 'Plants start as seeds. What happens after a seed is planted?'
        },
        {
            type: 'C',
            prompt: 'Put the steps to wash your hands in order!',
            items: [
                { id: 'water', label: 'Turn on the water' },
                { id: 'wet', label: 'Wet your hands' },
                { id: 'soap', label: 'Rub soap on your hands' },
                { id: 'rinse', label: 'Rinse the soap off' }
            ],
            correctAnswer: ['water', 'wet', 'soap', 'rinse'],
            hint: 'You need water running before you can wet your hands! Then soap, then rinse.',
            professorIntro: 'Washing hands has steps that go in order! What do you do first?',
            professorCorrect: 'Squeaky clean! Water on, wet hands, add soap, rinse off — perfect order!',
            professorWrong: 'You need running water before you can wet your hands. What is the first step?'
        },
        {
            type: 'C',
            prompt: 'Put these letters in ABC order!',
            items: [
                { id: 'd', label: 'D' },
                { id: 'b', label: 'B' },
                { id: 'a', label: 'A' },
                { id: 'c', label: 'C' }
            ],
            correctAnswer: ['a', 'b', 'c', 'd'],
            hint: 'Sing the alphabet song! Which letter comes first?',
            professorIntro: 'These letters are mixed up! Put them in alphabet order — A, B, C, D!',
            professorCorrect: 'A, B, C, D — perfect alphabet order!',
            professorWrong: 'Think of the alphabet song: A, B, C, D, E, F, G... which letter comes first?'
        }
    ],

    // ══════════════════════════════════════════════════════════════════
    // Level 4 — Cause Detector (7 challenges, Type A: Click-to-Select)
    // Topics: Cause & Effect (Basic). K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    4: [
        {
            type: 'A',
            prompt: 'If you leave ice cream in the sun, what happens?',
            options: [
                { text: 'It melts', image: null },
                { text: 'It freezes', image: null },
                { text: 'It grows bigger', image: null },
                { text: 'It turns blue', image: null }
            ],
            correctAnswer: 0,
            hint: 'The sun is very hot! What does heat do to ice cream?',
            professorIntro: 'When something happens, it causes something else! What does the hot sun do to ice cream?',
            professorCorrect: 'Right! The sun is hot, so the ice cream melts!',
            professorWrong: 'Think about what happens when ice cream gets warm. Does it stay frozen?'
        },
        {
            type: 'A',
            prompt: 'If you plant a seed and water it, what happens?',
            options: [
                { text: 'It disappears', image: null },
                { text: 'It grows into a plant', image: null },
                { text: 'It flies away', image: null },
                { text: 'It turns into a rock', image: null }
            ],
            correctAnswer: 1,
            hint: 'Seeds need water and sun to do something amazing!',
            professorIntro: 'You put a seed in the dirt and give it water. What will happen next?',
            professorCorrect: 'Wonderful! Water and sunlight help seeds grow into plants!',
            professorWrong: 'Seeds are alive! When you give them water, they start to grow!'
        },
        {
            type: 'A',
            prompt: 'You kick a ball. What happens to the ball?',
            options: [
                { text: 'It stays still', image: null },
                { text: 'It changes color', image: null },
                { text: 'It rolls away', image: null },
                { text: 'It gets bigger', image: null }
            ],
            correctAnswer: 2,
            hint: 'When you kick something, your foot pushes it. Where does it go?',
            professorIntro: 'You give a ball a big kick! What happens to the ball?',
            professorCorrect: 'That is right! Kicking a ball makes it roll away!',
            professorWrong: 'When you push or kick something, it moves! The ball would roll away.'
        },
        {
            type: 'A',
            prompt: 'What happens if you do not water a flower?',
            options: [
                { text: 'It grows taller', image: null },
                { text: 'It wilts and droops', image: null },
                { text: 'It starts to sing', image: null },
                { text: 'It turns into a tree', image: null }
            ],
            correctAnswer: 1,
            hint: 'Flowers need water to stay healthy. Without it...',
            professorIntro: 'Oh no! The flower has no water! What will happen to it?',
            professorCorrect: 'Correct! Without water, flowers get sad and droopy — they wilt!',
            professorWrong: 'Flowers need water to live. Without it, they get weak and droopy.'
        },
        {
            type: 'A',
            prompt: 'You turn off the light switch. What happens?',
            options: [
                { text: 'The room gets brighter', image: null },
                { text: 'The room gets dark', image: null },
                { text: 'The room gets bigger', image: null },
                { text: 'Nothing happens', image: null }
            ],
            correctAnswer: 1,
            hint: 'The light switch controls the light. If you turn it off...',
            professorIntro: 'Click! The light switch goes off. What happens in the room?',
            professorCorrect: 'That is right! No light means the room goes dark!',
            professorWrong: 'Think about what the light switch does — it controls the light!'
        },
        {
            type: 'A',
            prompt: 'You drop a glass on the floor. What happens?',
            options: [
                { text: 'It floats in the air', image: null },
                { text: 'It bounces like a ball', image: null },
                { text: 'It could break', image: null },
                { text: 'It grows legs and walks', image: null }
            ],
            correctAnswer: 2,
            hint: 'Glass is very fragile. When it hits a hard floor...',
            professorIntro: 'Uh oh! A glass is falling to the floor! What is going to happen?',
            professorCorrect: 'Yes! Glass is fragile and can break when it hits the floor!',
            professorWrong: 'Glass is not bouncy or floaty! Think about what happens when fragile things fall.'
        },
        {
            type: 'A',
            prompt: 'You push a door. What happens to the door?',
            options: [
                { text: 'It opens', image: null },
                { text: 'It shrinks', image: null },
                { text: 'It changes color', image: null },
                { text: 'It disappears', image: null }
            ],
            correctAnswer: 0,
            hint: 'When you push on a door, it swings...',
            professorIntro: 'You walk up to a door and give it a push. What happens next?',
            professorCorrect: 'Right! Pushing a door makes it open. Cause and effect!',
            professorWrong: 'Think about doors — when you push them, they swing open!'
        }
    ],

    // ══════════════════════════════════════════════════════════════════
    // Level 5 — Logic Gate Alpha (7 challenges, Type D: Click-to-Toggle)
    // Topics: Simple If/Then. K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    5: [
        {
            type: 'D',
            prompt: 'Rule: "If it is raining, you need an umbrella." It IS raining. Do you need an umbrella?',
            headers: { columns: ['Answer'], rows: ['You need an umbrella'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'The rule says IF it is raining, THEN you need an umbrella. Is it raining? Yes!',
            professorIntro: 'Logic gates follow rules! Read the rule carefully and decide: True or False?',
            professorCorrect: 'Correct! It IS raining, so the rule says you DO need an umbrella!',
            professorWrong: 'Read the rule again: IF raining, THEN umbrella. It IS raining, so...'
        },
        {
            type: 'D',
            prompt: 'Rule: "If it is sunny, wear sunglasses." It IS sunny. Should you wear sunglasses?',
            headers: { columns: ['Answer'], rows: ['Wear sunglasses'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'The sun is out! The rule says to wear sunglasses when it is sunny.',
            professorIntro: 'The sun is shining bright! What does the rule tell you to do?',
            professorCorrect: 'Yes! It IS sunny, so the rule says to wear sunglasses!',
            professorWrong: 'Look at the rule: IF sunny, THEN sunglasses. It IS sunny today!'
        },
        {
            type: 'D',
            prompt: 'Rule: "If it is cold, wear a coat." It is NOT cold. Should you wear a coat?',
            headers: { columns: ['Answer'], rows: ['Wear a coat'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'The rule says wear a coat IF it is cold. But it is NOT cold today!',
            professorIntro: 'Careful! The rule only works when the condition is true. Is it cold?',
            professorCorrect: 'Right! It is NOT cold, so you do NOT need a coat. The rule does not apply!',
            professorWrong: 'The rule says IF cold, THEN coat. But it is NOT cold! So no coat needed.'
        },
        {
            type: 'D',
            prompt: 'Rule: "If you are hungry, eat a snack." You ARE hungry. Should you eat a snack?',
            headers: { columns: ['Answer'], rows: ['Eat a snack'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'You are hungry! What does the rule say to do when you are hungry?',
            professorIntro: 'Your tummy is rumbling! The rule tells you what to do. What is it?',
            professorCorrect: 'Yes! You ARE hungry, so the rule says eat a snack!',
            professorWrong: 'You said you are hungry. The rule says: IF hungry, THEN eat a snack!'
        },
        {
            type: 'D',
            prompt: 'Rule: "If the light is red, stop walking." The light is NOT red. Should you stop?',
            headers: { columns: ['Answer'], rows: ['Stop walking'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'The rule says stop IF the light is red. But the light is NOT red!',
            professorIntro: 'Traffic rules are like logic rules! The light is not red. Should you stop?',
            professorCorrect: 'Correct! The light is NOT red, so the rule to stop does not apply!',
            professorWrong: 'The rule only says to stop IF the light is red. The light is NOT red!'
        },
        {
            type: 'D',
            prompt: 'Rule: "If it is bedtime, brush your teeth." It IS bedtime. Should you brush your teeth?',
            headers: { columns: ['Answer'], rows: ['Brush your teeth'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'T' },
            hint: 'Check: Is it bedtime? Yes! So what does the rule say to do?',
            professorIntro: 'The clock says it is bedtime! What does the rule tell you to do?',
            professorCorrect: 'Right! It IS bedtime, so the rule says brush your teeth!',
            professorWrong: 'It IS bedtime! The rule says: IF bedtime, THEN brush your teeth.'
        },
        {
            type: 'D',
            prompt: 'Rule: "If you see a dog, you can pet it." You do NOT see a dog. Can you pet it?',
            headers: { columns: ['Answer'], rows: ['You can pet it'] },
            prefilled: {},
            toggleOptions: ['T', 'F'],
            correctAnswer: { '0,0': 'F' },
            hint: 'The rule says you can pet a dog IF you see one. But there is no dog here!',
            professorIntro: 'The rule is about seeing a dog. But do you see a dog? Look carefully!',
            professorCorrect: 'That is right! No dog to see means no dog to pet. The rule does not apply!',
            professorWrong: 'You do NOT see a dog! The rule says IF you see a dog, THEN pet it. No dog, no petting!'
        }
    ],

    // ══════════════════════════════════════════════════════════════════
    // Level 6 — Shape Navigator (8 challenges, Type A: Click-to-Select)
    // Topics: Spatial Reasoning, Analogies. K-2 difficulty.
    // ══════════════════════════════════════════════════════════════════
    6: [
        {
            type: 'A',
            prompt: 'Circle is to round as Square is to ___',
            options: [
                { text: 'Pointy', image: null },
                { text: 'Round', image: null },
                { text: 'Has corners', image: null },
                { text: 'Tiny', image: null }
            ],
            correctAnswer: 2,
            hint: 'A circle is round. What is special about a square? It has four...',
            professorIntro: 'Analogies compare two pairs! A circle is round — what is a square?',
            professorCorrect: 'Smart! A circle is round and a square has corners!',
            professorWrong: 'Think about what makes a square special. Circles are round, squares have...'
        },
        {
            type: 'A',
            prompt: 'Which shape has 3 sides?',
            options: [
                { text: 'Square', image: null },
                { text: 'Circle', image: null },
                { text: 'Triangle', image: null },
                { text: 'Rectangle', image: null }
            ],
            correctAnswer: 2,
            hint: 'Count the sides! "Tri" means three.',
            professorIntro: 'The robot needs to count sides! Which shape has exactly 3 sides?',
            professorCorrect: 'Yes! A triangle has 3 sides — "tri" means three!',
            professorWrong: 'Count the sides of each shape. Which one has exactly 3?'
        },
        {
            type: 'A',
            prompt: 'If you turn a square upside down, what does it look like?',
            options: [
                { text: 'A triangle', image: null },
                { text: 'A circle', image: null },
                { text: 'Still a square', image: null },
                { text: 'A star', image: null }
            ],
            correctAnswer: 2,
            hint: 'Try turning a square around in your mind. Does its shape change?',
            professorIntro: 'Imagine flipping a square upside down. What shape do you see?',
            professorCorrect: 'Correct! A square looks the same even when you turn it upside down!',
            professorWrong: 'Think carefully — all four sides of a square are the same length. Flipping it does not change it!'
        },
        {
            type: 'A',
            prompt: 'Big is to Small as Tall is to ___',
            options: [
                { text: 'Wide', image: null },
                { text: 'Short', image: null },
                { text: 'Long', image: null },
                { text: 'Heavy', image: null }
            ],
            correctAnswer: 1,
            hint: 'Big and Small are opposites. What is the opposite of Tall?',
            professorIntro: 'Opposites! Big is the opposite of Small. What is the opposite of Tall?',
            professorCorrect: 'Perfect! Big/Small and Tall/Short are both opposite pairs!',
            professorWrong: 'Big is the opposite of Small. Now think — what is the opposite of Tall?'
        },
        {
            type: 'A',
            prompt: 'Which shape has NO corners?',
            options: [
                { text: 'Triangle', image: null },
                { text: 'Square', image: null },
                { text: 'Rectangle', image: null },
                { text: 'Circle', image: null }
            ],
            correctAnswer: 3,
            hint: 'Corners are pointy. Which shape is perfectly smooth all around?',
            professorIntro: 'Some shapes have pointy corners and some do not! Which has none at all?',
            professorCorrect: 'A circle has no corners — it is perfectly round!',
            professorWrong: 'Look at each shape. Triangles, squares, and rectangles all have corners. Which one does not?'
        },
        {
            type: 'A',
            prompt: 'Hot is to Cold as Up is to ___',
            options: [
                { text: 'Down', image: null },
                { text: 'Left', image: null },
                { text: 'Fast', image: null },
                { text: 'Big', image: null }
            ],
            correctAnswer: 0,
            hint: 'Hot and Cold are opposites. What is the opposite of Up?',
            professorIntro: 'More opposites! Hot and Cold are opposites. What goes with Up?',
            professorCorrect: 'Down is the opposite of Up, just like Cold is the opposite of Hot!',
            professorWrong: 'We need opposites! Hot/Cold, Up/??? What is the opposite of Up?'
        },
        {
            type: 'A',
            prompt: 'How many sides does a rectangle have?',
            options: [
                { text: '3 sides', image: null },
                { text: '4 sides', image: null },
                { text: '5 sides', image: null },
                { text: '6 sides', image: null }
            ],
            correctAnswer: 1,
            hint: 'A rectangle is like a stretched-out square. How many sides does a square have?',
            professorIntro: 'Count the sides of a rectangle! Top, bottom, left, right...',
            professorCorrect: 'A rectangle has 4 sides — just like a square but longer!',
            professorWrong: 'Count each side: top, bottom, left side, right side. How many is that?'
        },
        {
            type: 'A',
            prompt: 'Day is to Night as Happy is to ___',
            options: [
                { text: 'Tired', image: null },
                { text: 'Hungry', image: null },
                { text: 'Sad', image: null },
                { text: 'Silly', image: null }
            ],
            correctAnswer: 2,
            hint: 'Day and Night are opposites. What is the opposite of Happy?',
            professorIntro: 'Last analogy! Day is the opposite of Night. What is the opposite of Happy?',
            professorCorrect: 'Excellent! Day/Night and Happy/Sad — both opposite pairs! You are an analogy master!',
            professorWrong: 'Day and Night are opposites. What feeling is the opposite of Happy?'
        }
    ]

};
