/**
 * Science Town Builder — Grades 3-5 Question Bank
 *
 * 50 questions total: 10 per domain (earth, biology, chemistry, physics, engineering).
 * Age-appropriate for grades 3-5 (ages 8-11). Questions require reasoning,
 * not just recall. Distractors include common misconceptions.
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Questions35 = {

    // =========================================================================
    //  EARTH SCIENCE  (10 questions)
    // =========================================================================
    earth: [
        {
            domain: 'earth',
            question: 'What type of rock forms when melted rock (magma) cools and hardens?',
            options: ['Sedimentary', 'Metamorphic', 'Mineral', 'Igneous'],
            correctIndex: 3,
            explanation: 'Igneous rocks form when hot magma or lava cools down and becomes solid. The word "igneous" comes from the Latin word for fire!'
        },
        {
            domain: 'earth',
            question: 'What process turns liquid water into water vapor?',
            options: ['Evaporation', 'Freezing', 'Condensation', 'Melting'],
            correctIndex: 0,
            explanation: 'Evaporation is when liquid water heats up and turns into water vapor (gas). This is a key step in the water cycle!'
        },
        {
            domain: 'earth',
            question: 'Which of these is an example of erosion?',
            options: [
                'A volcano erupting',
                'An earthquake shaking the ground',
                'A river slowly wearing away a canyon',
                'A fossil forming in rock'
            ],
            correctIndex: 2,
            explanation: 'Erosion is the process of water, wind, or ice slowly wearing away and moving rock and soil. Rivers can carve deep canyons over millions of years!'
        },
        {
            domain: 'earth',
            question: 'What can fossils tell scientists about the past?',
            options: [
                'What the weather will be like tomorrow',
                'What kinds of living things existed long ago',
                'How old the Sun is',
                'What color ancient rocks were'
            ],
            correctIndex: 1,
            explanation: 'Fossils are preserved remains of ancient living things. They help scientists learn what plants and animals lived on Earth millions of years ago!'
        },
        {
            domain: 'earth',
            question: 'Which layer of the Earth is the thinnest?',
            options: ['Inner core', 'Outer core', 'Crust', 'Mantle'],
            correctIndex: 2,
            explanation: 'The crust is the thinnest layer of the Earth — it is the rocky outer shell we live on. Under the oceans, it can be as thin as 5 kilometers!'
        },
        {
            domain: 'earth',
            question: 'Which property is most useful for identifying a mineral?',
            options: ['Its size', 'Where it was found', 'How old it is', 'Its hardness'],
            correctIndex: 3,
            explanation: 'Hardness is one of the best ways to identify minerals. Scientists use the Mohs hardness scale, which ranks minerals from 1 (softest) to 10 (hardest)!'
        },
        {
            domain: 'earth',
            question: 'What is soil mostly made of?',
            options: [
                'Broken-down rocks, dead plants and animals, water, and air',
                'Just dirt and nothing else',
                'Only sand and clay',
                'Recycled plastic and metal'
            ],
            correctIndex: 0,
            explanation: 'Soil is a mixture of tiny rock pieces, decomposed plants and animals (humus), water, and air. It takes hundreds of years to form just one inch of soil!'
        },
        {
            domain: 'earth',
            question: 'Which of these is a non-renewable resource?',
            options: ['Sunlight', 'Wind', 'Coal', 'Trees'],
            correctIndex: 2,
            explanation: 'Coal is non-renewable because it takes millions of years to form. Once we use it up, it cannot be replaced in our lifetime. Sunlight and wind are renewable!'
        },
        {
            domain: 'earth',
            question: 'What is the difference between weather and climate?',
            options: [
                'There is no difference — they mean the same thing',
                'Climate changes every hour; weather stays the same',
                'Weather only happens in summer; climate happens all year',
                'Weather is what happens day to day; climate is the pattern over many years'
            ],
            correctIndex: 3,
            explanation: 'Weather describes conditions right now or over a few days. Climate describes the average weather patterns in an area over 30 or more years!'
        },
        {
            domain: 'earth',
            question: 'What causes most earthquakes?',
            options: [
                'Strong winds pushing the ground',
                'Pieces of Earth\'s crust sliding and grinding against each other',
                'Heavy rain soaking into the soil',
                'The Moon pulling on the Earth'
            ],
            correctIndex: 1,
            explanation: 'Earthquakes happen when tectonic plates (huge pieces of Earth\'s crust) move and push against each other. The sudden release of energy causes the ground to shake!'
        }
    ],

    // =========================================================================
    //  BIOLOGY  (10 questions)
    // =========================================================================
    biology: [
        {
            domain: 'biology',
            question: 'In a forest ecosystem, what role do decomposers play?',
            options: [
                'They hunt and eat other animals',
                'They produce oxygen through photosynthesis',
                'They break down dead plants and animals and return nutrients to the soil',
                'They pollinate flowers'
            ],
            correctIndex: 2,
            explanation: 'Decomposers like fungi and bacteria break down dead organisms and return important nutrients to the soil, which helps new plants grow!'
        },
        {
            domain: 'biology',
            question: 'In a food chain, what happens to energy as it moves from plants to herbivores to carnivores?',
            options: [
                'Energy increases at each level',
                'Energy stays exactly the same at each level',
                'Energy disappears completely',
                'Energy decreases at each level'
            ],
            correctIndex: 3,
            explanation: 'Energy decreases at each level of a food chain because living things use most of the energy they get for growing, moving, and staying alive. Only about 10% passes to the next level!'
        },
        {
            domain: 'biology',
            question: 'What do plants need to carry out photosynthesis?',
            options: [
                'Sunlight, water, and carbon dioxide',
                'Soil, darkness, and oxygen',
                'Rain, wind, and heat',
                'Fertilizer, shade, and nitrogen'
            ],
            correctIndex: 0,
            explanation: 'During photosynthesis, plants use sunlight, water, and carbon dioxide to make their own food (sugar) and release oxygen as a bonus!'
        },
        {
            domain: 'biology',
            question: 'Which animal group has scales, breathes air with lungs, and lays eggs on land?',
            options: ['Amphibians', 'Reptiles', 'Fish', 'Mammals'],
            correctIndex: 1,
            explanation: 'Reptiles have dry, scaly skin, breathe with lungs, and most lay eggs on land. Lizards, snakes, and turtles are all reptiles!'
        },
        {
            domain: 'biology',
            question: 'During a butterfly\'s life cycle, what happens inside the chrysalis?',
            options: [
                'The caterpillar sleeps but stays the same',
                'The caterpillar grows bigger but keeps its shape',
                'The caterpillar\'s body completely changes into a butterfly',
                'The caterpillar turns into an egg'
            ],
            correctIndex: 2,
            explanation: 'Inside the chrysalis, the caterpillar goes through metamorphosis — its body breaks down and completely rebuilds into a butterfly with wings!'
        },
        {
            domain: 'biology',
            question: 'Why do some animals hibernate during winter?',
            options: [
                'Because they are lazy and like to sleep',
                'Because the sun tells them to',
                'To grow bigger while they sleep',
                'To save energy when food is scarce and temperatures are cold'
            ],
            correctIndex: 3,
            explanation: 'Hibernation is an adaptation that helps animals survive winter. They slow their heart rate and breathing to use very little energy when food is hard to find!'
        },
        {
            domain: 'biology',
            question: 'What is the main job of the skeletal system in the human body?',
            options: [
                'To provide structure and protect organs',
                'To digest food',
                'To pump blood through the body',
                'To send messages to the brain'
            ],
            correctIndex: 0,
            explanation: 'The skeletal system gives your body its shape, supports your weight, and protects important organs. For example, your skull protects your brain and your ribs protect your heart and lungs!'
        },
        {
            domain: 'biology',
            question: 'What are cells?',
            options: [
                'Tiny batteries that power the body',
                'The basic building blocks of all living things',
                'Small bones inside your blood',
                'Microscopic robots in your brain'
            ],
            correctIndex: 1,
            explanation: 'Cells are the smallest units of life. Every living thing — from bacteria to blue whales — is made up of cells. Your body has trillions of them!'
        },
        {
            domain: 'biology',
            question: 'How do bees help flowering plants reproduce?',
            options: [
                'By watering the plants with nectar',
                'By eating the seeds and planting them',
                'By carrying pollen from one flower to another',
                'By trimming dead leaves off the plant'
            ],
            correctIndex: 2,
            explanation: 'When bees visit flowers to collect nectar, pollen sticks to their bodies. They carry that pollen to the next flower, which helps the plant make seeds. This process is called pollination!'
        },
        {
            domain: 'biology',
            question: 'Which of these is an inherited trait rather than a learned behavior?',
            options: [
                'A dog doing a trick',
                'A child riding a bike',
                'A parrot saying words',
                'A person\'s natural eye color'
            ],
            correctIndex: 3,
            explanation: 'Eye color is inherited — it is determined by genes passed from parents to children. Riding a bike and doing tricks are learned behaviors that must be practiced!'
        }
    ],

    // =========================================================================
    //  CHEMISTRY  (10 questions)
    // =========================================================================
    chemistry: [
        {
            domain: 'chemistry',
            question: 'Which state of matter has a definite shape and a definite volume?',
            options: ['Gas', 'Liquid', 'Plasma', 'Solid'],
            correctIndex: 3,
            explanation: 'Solids have a definite shape and volume because their particles are packed closely together and vibrate in place. A rock keeps its shape no matter what container you put it in!'
        },
        {
            domain: 'chemistry',
            question: 'What happens to water when it reaches 100\u00B0C (212\u00B0F) at sea level?',
            options: [
                'It freezes into ice',
                'It becomes heavier',
                'It boils and turns into steam',
                'Nothing happens'
            ],
            correctIndex: 2,
            explanation: '100\u00B0C is the boiling point of water at sea level. At this temperature, liquid water changes into steam (water vapor). The particles move fast enough to escape into the air!'
        },
        {
            domain: 'chemistry',
            question: 'When you mix sand into water, what do you create?',
            options: ['A mixture', 'A solution', 'A chemical reaction', 'A new element'],
            correctIndex: 0,
            explanation: 'Sand and water form a mixture because the sand does not dissolve — you can still see the separate parts. In a solution, like salt water, the substance dissolves completely!'
        },
        {
            domain: 'chemistry',
            question: 'Which of these is a chemical change?',
            options: [
                'Cutting paper with scissors',
                'Burning a piece of wood',
                'Melting an ice cube',
                'Breaking a glass bottle'
            ],
            correctIndex: 1,
            explanation: 'Burning wood is a chemical change because it creates new substances — ash, smoke, and carbon dioxide. You cannot "unburn" wood! Cutting and breaking are physical changes.'
        },
        {
            domain: 'chemistry',
            question: 'What are atoms?',
            options: [
                'The largest things in the universe',
                'A type of energy found in batteries',
                'Tiny particles that make up all matter',
                'Drops of water too small to see'
            ],
            correctIndex: 2,
            explanation: 'Atoms are extremely tiny particles that make up all matter — everything you can touch, see, or smell is made of atoms. They are far too small to see even with a regular microscope!'
        },
        {
            domain: 'chemistry',
            question: 'Which material is the best conductor of heat?',
            options: ['Wood', 'Metal', 'Plastic', 'Rubber'],
            correctIndex: 1,
            explanation: 'Metals are excellent conductors of heat, which means heat energy passes through them easily. That is why metal pots are used for cooking — they transfer heat to the food efficiently!'
        },
        {
            domain: 'chemistry',
            question: 'Lemon juice tastes sour. What does that tell you about it?',
            options: [
                'It is a base',
                'It is a pure element',
                'It is a metal',
                'It is an acid'
            ],
            correctIndex: 3,
            explanation: 'Sour taste is a property of acids. Lemon juice contains citric acid. Bases, on the other hand, tend to feel slippery and taste bitter (like soap)!'
        },
        {
            domain: 'chemistry',
            question: 'What is a water molecule (H\u2082O) made of?',
            options: [
                'Two hydrogen atoms and one oxygen atom',
                'Two oxygen atoms and one hydrogen atom',
                'One hydrogen atom and one oxygen atom',
                'Three oxygen atoms'
            ],
            correctIndex: 0,
            explanation: 'A water molecule (H\u2082O) contains two hydrogen atoms bonded to one oxygen atom. The "2" in H\u2082O tells you there are two hydrogen atoms!'
        },
        {
            domain: 'chemistry',
            question: 'If you dissolve sugar in water and then boil away all the water, what happens to the sugar?',
            options: [
                'The sugar disappears forever',
                'The sugar turns into water',
                'The sugar floats away as gas',
                'The sugar is left behind because matter is not destroyed'
            ],
            correctIndex: 3,
            explanation: 'Matter cannot be created or destroyed — this is called conservation of matter. The sugar was always there in the water, and when the water evaporates, the sugar remains!'
        },
        {
            domain: 'chemistry',
            question: 'Which of these changes can be reversed?',
            options: [
                'Baking a cake',
                'Freezing water into ice',
                'Burning paper',
                'Frying an egg'
            ],
            correctIndex: 1,
            explanation: 'Freezing water is reversible — you can melt the ice to get liquid water again. Baking, burning, and frying cause chemical changes that cannot be undone!'
        }
    ],

    // =========================================================================
    //  PHYSICS  (10 questions)
    // =========================================================================
    physics: [
        {
            domain: 'physics',
            question: 'A ramp is an example of which type of simple machine?',
            options: ['Lever', 'Inclined plane', 'Pulley', 'Wheel and axle'],
            correctIndex: 1,
            explanation: 'A ramp is an inclined plane — a flat surface tilted at an angle. It makes it easier to move heavy objects up by spreading the effort over a longer distance!'
        },
        {
            domain: 'physics',
            question: 'If two teams pull on a rope with equal force in opposite directions, what happens?',
            options: [
                'The rope moves toward the stronger team',
                'The rope breaks immediately',
                'The rope does not move because the forces are balanced',
                'Both teams slide forward'
            ],
            correctIndex: 2,
            explanation: 'When equal forces push or pull in opposite directions, they are balanced forces. Balanced forces do not cause a change in motion, so the rope stays still!'
        },
        {
            domain: 'physics',
            question: 'A ball sitting on top of a hill has what type of energy?',
            options: [
                'Potential energy',
                'Kinetic energy',
                'Sound energy',
                'Electrical energy'
            ],
            correctIndex: 0,
            explanation: 'A ball on a hill has potential energy — stored energy due to its position. When the ball rolls down the hill, that potential energy transforms into kinetic energy (energy of motion)!'
        },
        {
            domain: 'physics',
            question: 'What do you need to make a complete electrical circuit that lights a bulb?',
            options: [
                'Just a battery and a bulb',
                'Just wires and a switch',
                'A bulb and a magnet',
                'A battery, wires, and a bulb connected in a loop'
            ],
            correctIndex: 3,
            explanation: 'A complete circuit needs a power source (battery), a path for electricity to flow (wires), and something to use the energy (bulb), all connected in a continuous loop!'
        },
        {
            domain: 'physics',
            question: 'Sound is produced by:',
            options: [
                'Light bouncing off objects',
                'Objects vibrating back and forth',
                'Air changing color',
                'Heat rising from the ground'
            ],
            correctIndex: 1,
            explanation: 'All sounds are made by vibrations. When an object vibrates, it pushes the air particles around it, creating sound waves that travel to your ears!'
        },
        {
            domain: 'physics',
            question: 'When light hits a mirror, it bounces off. What is this called?',
            options: ['Refraction', 'Absorption', 'Diffusion', 'Reflection'],
            correctIndex: 3,
            explanation: 'Reflection is when light bounces off a surface like a mirror. The light changes direction but does not slow down or change color!'
        },
        {
            domain: 'physics',
            question: 'What happens when you try to push the north poles of two magnets together?',
            options: [
                'They stick together strongly',
                'Nothing happens',
                'They push apart (repel)',
                'They become demagnetized'
            ],
            correctIndex: 2,
            explanation: 'Like poles repel! Two north poles (or two south poles) will push away from each other. Opposite poles (north and south) attract and pull together!'
        },
        {
            domain: 'physics',
            question: 'Why is it harder to push a heavy box across a rough carpet than a smooth floor?',
            options: [
                'There is more friction between the box and the rough carpet',
                'The carpet is heavier than the floor',
                'Gravity is stronger on carpet',
                'The box changes shape on carpet'
            ],
            correctIndex: 0,
            explanation: 'Friction is a force that resists motion between two surfaces touching each other. Rough surfaces create more friction than smooth ones, making it harder to slide objects!'
        },
        {
            domain: 'physics',
            question: 'Why does a dropped ball fall to the ground instead of floating in the air?',
            options: [
                'Because air pushes it down',
                'Because the ball is heavy',
                'Because gravity pulls it toward Earth',
                'Because the ball wants to be on the ground'
            ],
            correctIndex: 2,
            explanation: 'Gravity is a force that pulls all objects toward the center of the Earth. It acts on everything — heavy and light objects alike — which is why the ball falls!'
        },
        {
            domain: 'physics',
            question: 'If you touch a metal spoon sitting in a pot of hot soup, the spoon feels hot. How did the heat reach the handle?',
            options: [
                'The heat traveled through the air to the handle',
                'The heat moved through the metal by conduction',
                'The handle made its own heat',
                'Light from the stove warmed the handle'
            ],
            correctIndex: 1,
            explanation: 'Conduction is heat transfer through direct contact. Heat moves from the hot soup through the metal of the spoon to the handle because metals are great conductors!'
        }
    ],

    // =========================================================================
    //  ENGINEERING  (10 questions)
    // =========================================================================
    engineering: [
        {
            domain: 'engineering',
            question: 'What is the FIRST step in the engineering design process?',
            options: [
                'Build a prototype',
                'Test your design',
                'Identify the problem you are trying to solve',
                'Pick the most expensive materials'
            ],
            correctIndex: 2,
            explanation: 'Engineers always start by clearly identifying the problem. You need to understand what you are trying to solve before you can brainstorm ideas and start designing!'
        },
        {
            domain: 'engineering',
            question: 'Why are triangles used so often in building structures like bridges and towers?',
            options: [
                'Because triangles are very strong and do not change shape easily under pressure',
                'Because triangles are the prettiest shape',
                'Because triangles use less material than circles',
                'Because triangles are easier to draw than squares'
            ],
            correctIndex: 0,
            explanation: 'Triangles are the strongest geometric shape for structures. Unlike rectangles, a triangle cannot be pushed out of shape without breaking one of its sides!'
        },
        {
            domain: 'engineering',
            question: 'Which type of bridge uses cables hung from tall towers to hold up the roadway?',
            options: ['Beam bridge', 'Arch bridge', 'Truss bridge', 'Suspension bridge'],
            correctIndex: 3,
            explanation: 'A suspension bridge has tall towers with cables draped between them. The cables support the roadway below. The Golden Gate Bridge is a famous suspension bridge!'
        },
        {
            domain: 'engineering',
            question: 'When two gears are connected and one turns clockwise, what direction does the other gear turn?',
            options: [
                'Clockwise (same direction)',
                'Counterclockwise (opposite direction)',
                'It does not turn at all',
                'It spins in a random direction'
            ],
            correctIndex: 1,
            explanation: 'Connected gears always turn in opposite directions. When one gear\'s teeth push the other gear\'s teeth, it forces the second gear to spin the opposite way!'
        },
        {
            domain: 'engineering',
            question: 'How does a pulley make lifting a heavy object easier?',
            options: [
                'It makes the object lighter',
                'It uses electricity to lift the object',
                'It lets you pull down instead of lifting up, and can reduce the force needed',
                'It removes gravity from the object'
            ],
            correctIndex: 2,
            explanation: 'A pulley changes the direction of force — you pull down on the rope to lift something up. Multiple pulleys together can also reduce the amount of force needed!'
        },
        {
            domain: 'engineering',
            question: 'An engineer is designing a helmet. Which material property is MOST important?',
            options: [
                'Flexibility so it can bend easily',
                'Impact resistance so it can absorb a hit and protect the head',
                'Transparency so you can see through it',
                'Conductivity so it can carry electricity'
            ],
            correctIndex: 1,
            explanation: 'A helmet must be able to absorb impacts and protect the wearer\'s head. Engineers choose materials that are strong and can spread out the force of a hit!'
        },
        {
            domain: 'engineering',
            question: 'After testing a prototype and finding a problem, what should an engineer do?',
            options: [
                'Give up and start a completely different project',
                'Ignore the problem and say the design is finished',
                'Blame the materials for being bad',
                'Analyze what went wrong, improve the design, and test again'
            ],
            correctIndex: 3,
            explanation: 'The engineering design process is a cycle. When a test reveals a problem, engineers figure out why it happened, redesign, and test again. Failure is a normal part of improving!'
        },
        {
            domain: 'engineering',
            question: 'Why might an architect build a small model of a building before constructing the real thing?',
            options: [
                'Because small buildings are more popular',
                'Because they do not have enough materials for a big building',
                'To test the design and find problems before spending money on the full-size version',
                'To sell the model as a toy'
            ],
            correctIndex: 2,
            explanation: 'Scale models let engineers and architects test ideas cheaply. They can check if the design looks right, is structurally sound, and fix problems before building the real thing!'
        },
        {
            domain: 'engineering',
            question: 'A simple water filter can remove dirt from water using layers of sand and gravel. What engineering field does this relate to?',
            options: [
                'Environmental engineering',
                'Aerospace engineering',
                'Electrical engineering',
                'Software engineering'
            ],
            correctIndex: 0,
            explanation: 'Environmental engineering uses science and technology to protect the environment and human health. Water filtration is a key part of making sure people have clean, safe drinking water!'
        },
        {
            domain: 'engineering',
            question: 'Which is the best example of technology solving an everyday problem?',
            options: [
                'A cloud floating in the sky',
                'Eyeglasses helping someone see clearly',
                'A tree growing in a forest',
                'A rock sitting on the ground'
            ],
            correctIndex: 1,
            explanation: 'Technology is anything designed by people to solve a problem. Eyeglasses solve the problem of blurry vision. Clouds, trees, and rocks are natural — they were not engineered!'
        }
    ]
};
