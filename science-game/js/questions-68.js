/**
 * Science Town Builder — Grades 6-8 Question Bank
 *
 * 50 questions total: 10 per domain (earth, biology, chemistry, physics, engineering).
 * Targeted at ages 11-14. Emphasizes reasoning over memorization, with
 * scientifically precise answers and common-misconception distractors.
 *
 * correctIndex distribution: 0 = 13, 1 = 12, 2 = 13, 3 = 12
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Questions68 = [

    // ═══════════════════════════════════════════════════════════════
    //  EARTH SCIENCE  (10 questions)
    // ═══════════════════════════════════════════════════════════════

    {
        domain: 'earth',
        question: 'Which type of plate boundary is responsible for the formation of the Himalayan mountains?',
        options: ['Convergent boundary', 'Divergent boundary', 'Transform boundary', 'Hot-spot volcanism'],
        correctIndex: 0,
        explanation: 'Convergent boundaries occur when two plates push together. The collision of the Indian and Eurasian plates crumpled the crust upward to form the Himalayas.'
    },
    {
        domain: 'earth',
        question: 'During an earthquake, which type of seismic wave arrives at a monitoring station first?',
        options: ['P-waves', 'S-waves', 'Surface waves', 'Love waves'],
        correctIndex: 0,
        explanation: 'P-waves (primary waves) travel fastest because they compress rock in the same direction they move, so they always arrive before S-waves and surface waves.'
    },
    {
        domain: 'earth',
        question: 'A shield volcano like Mauna Loa has a broad, gently sloping shape. What causes this?',
        options: [
            'Explosive eruptions of thick lava',
            'Quiet eruptions of thin, runny lava that flows far',
            'Layers of alternating ash and lava',
            'Collapse of the magma chamber'
        ],
        correctIndex: 1,
        explanation: 'Shield volcanoes form from low-viscosity basaltic lava that flows easily over long distances, building wide, gentle slopes rather than steep cones.'
    },
    {
        domain: 'earth',
        question: 'Commercial airplanes typically cruise in the lower stratosphere. Why is this layer more stable for flight than the troposphere?',
        options: [
            'The stratosphere has more oxygen',
            'Wind speeds are always zero in the stratosphere',
            'Temperature increases with altitude in the stratosphere, preventing vertical air mixing',
            'There is no gravity in the stratosphere'
        ],
        correctIndex: 2,
        explanation: 'In the stratosphere, temperature rises with altitude because the ozone layer absorbs UV radiation. This temperature inversion suppresses convection, making the air calmer.'
    },
    {
        domain: 'earth',
        question: 'A city experiences a record-breaking heat wave in July. Can this single event prove that global climate change is occurring?',
        options: [
            'Yes, because heat waves are caused by climate change',
            'No, because climate describes long-term patterns, not individual weather events',
            'Yes, because July is always the hottest month',
            'No, because heat waves only happen naturally'
        ],
        correctIndex: 1,
        explanation: 'Climate is the average of weather conditions over 30 or more years. A single event is weather, not climate. Scientists look at long-term trends across many data points.'
    },
    {
        domain: 'earth',
        question: 'The Gulf Stream carries warm water from the Gulf of Mexico toward Europe. What is a major effect of this current?',
        options: [
            'It makes European winters much colder than expected',
            'It causes Europe to receive less rainfall',
            'It pushes icebergs south toward the equator',
            'It gives Western Europe milder winters than other regions at the same latitude'
        ],
        correctIndex: 3,
        explanation: 'The Gulf Stream transports enormous amounts of heat northward. Western Europe is significantly warmer in winter than places at similar latitudes in North America because of this warm current.'
    },
    {
        domain: 'earth',
        question: 'Scientists use radioactive decay of uranium-238 (half-life ~4.5 billion years) to date certain rocks. This technique is called:',
        options: [
            'Carbon dating',
            'Relative dating',
            'Radiometric dating',
            'Fossil correlation'
        ],
        correctIndex: 2,
        explanation: 'Radiometric dating measures the ratio of a radioactive isotope to its decay products. Carbon-14 dating only works for organic material up to ~50,000 years old, so uranium is used for much older rocks.'
    },
    {
        domain: 'earth',
        question: 'Earth\'s magnetic field protects us primarily by:',
        options: [
            'Deflecting charged particles in the solar wind away from the atmosphere',
            'Blocking all visible light from the Sun',
            'Holding the Moon in orbit around Earth',
            'Preventing earthquakes from reaching the surface'
        ],
        correctIndex: 0,
        explanation: 'The magnetosphere deflects most of the solar wind\'s charged particles, shielding our atmosphere from being stripped away and protecting living things from harmful radiation.'
    },
    {
        domain: 'earth',
        question: 'A mineral scratches glass (hardness ~5.5) but cannot scratch quartz (hardness 7). On Mohs scale, this mineral\'s hardness is approximately:',
        options: ['3', '8', '10', '6'],
        correctIndex: 3,
        explanation: 'On the Mohs hardness scale, a mineral that scratches glass but not quartz falls between 5.5 and 7 — approximately 6. Feldspar (hardness 6) is a common example.'
    },
    {
        domain: 'earth',
        question: 'Which strategy best reduces damage from earthquakes in a city located on an active fault?',
        options: [
            'Building taller structures so they sway above the shaking',
            'Using rigid, unbending materials for all construction',
            'Enforcing building codes that require flexible, earthquake-resistant designs',
            'Covering buildings in rubber to absorb the waves'
        ],
        correctIndex: 2,
        explanation: 'Modern earthquake engineering uses flexible steel frames, base isolators, and reinforced concrete. Building codes that require these designs are the most effective way to reduce earthquake damage in cities.'
    },

    // ═══════════════════════════════════════════════════════════════
    //  BIOLOGY  (10 questions)
    // ═══════════════════════════════════════════════════════════════

    {
        domain: 'biology',
        question: 'Which organelle is found in plant cells but NOT in animal cells?',
        options: ['Chloroplast', 'Mitochondria', 'Nucleus', 'Ribosome'],
        correctIndex: 0,
        explanation: 'Chloroplasts contain chlorophyll and carry out photosynthesis. Animal cells lack chloroplasts because animals obtain energy from food rather than sunlight.'
    },
    {
        domain: 'biology',
        question: 'In humans, the allele for brown eyes (B) is dominant over the allele for blue eyes (b). If both parents are Bb, what fraction of their children are expected to have blue eyes?',
        options: ['None (0%)', 'One-quarter (25%)', 'One-half (50%)', 'All (100%)'],
        correctIndex: 1,
        explanation: 'A Punnett square for Bb x Bb gives BB, Bb, Bb, and bb. Only bb (one out of four, or 25%) would show the recessive blue-eye phenotype.'
    },
    {
        domain: 'biology',
        question: 'Which body system is responsible for transporting oxygen from the lungs to every cell in the body?',
        options: ['Respiratory system', 'Nervous system', 'Digestive system', 'Circulatory system'],
        correctIndex: 3,
        explanation: 'The circulatory system uses the heart, blood vessels, and red blood cells to deliver oxygen throughout the body. The respiratory system brings air into the lungs, but the blood carries it onward.'
    },
    {
        domain: 'biology',
        question: 'A population of beetles varies in color from light to dark. Birds eat the light-colored beetles more easily against dark tree bark. Over many generations, the population becomes mostly dark-colored. This is an example of:',
        options: [
            'Genetic engineering',
            'Selective breeding by humans',
            'Natural selection',
            'Spontaneous generation'
        ],
        correctIndex: 2,
        explanation: 'Natural selection occurs when organisms with traits better suited to their environment survive and reproduce more. Over time, the favorable trait becomes more common in the population.'
    },
    {
        domain: 'biology',
        question: 'In the classification system, which level is MOST specific — grouping the fewest organisms together?',
        options: ['Kingdom', 'Species', 'Phylum', 'Genus'],
        correctIndex: 1,
        explanation: 'The classification hierarchy goes Kingdom, Phylum, Class, Order, Family, Genus, Species — from broadest to most specific. Species is the most specific level, identifying a single type of organism.'
    },
    {
        domain: 'biology',
        question: 'What are the three raw materials that plants need to perform photosynthesis?',
        options: [
            'Oxygen, glucose, and water',
            'Nitrogen, oxygen, and soil minerals',
            'Glucose, oxygen, and heat',
            'Carbon dioxide, water, and light energy'
        ],
        correctIndex: 3,
        explanation: 'Photosynthesis uses carbon dioxide from the air, water from the soil, and light energy from the Sun to produce glucose and oxygen: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.'
    },
    {
        domain: 'biology',
        question: 'During cellular respiration, cells break down glucose to release energy. Which gas is produced as a waste product?',
        options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
        correctIndex: 0,
        explanation: 'Cellular respiration converts glucose and oxygen into carbon dioxide, water, and ATP (energy). The CO2 you exhale is a waste product of this process happening in your cells.'
    },
    {
        domain: 'biology',
        question: 'In an energy pyramid, which level contains the MOST total energy?',
        options: [
            'Top predators (tertiary consumers)',
            'Secondary consumers',
            'Producers (plants and algae)',
            'Primary consumers (herbivores)'
        ],
        correctIndex: 2,
        explanation: 'Only about 10% of energy transfers from one trophic level to the next. Producers at the base hold the most total energy, and each level above has significantly less.'
    },
    {
        domain: 'biology',
        question: 'During mitosis, a single cell divides to produce two new cells. How does the chromosome number in each new cell compare to the original?',
        options: [
            'Each new cell has half the chromosomes',
            'Each new cell has the same number of chromosomes as the original',
            'Each new cell has double the chromosomes',
            'The number is random each time'
        ],
        correctIndex: 1,
        explanation: 'Mitosis produces two genetically identical daughter cells, each with the same number of chromosomes as the parent cell. The DNA is copied before division so nothing is lost.'
    },
    {
        domain: 'biology',
        question: 'Antibiotics are effective against bacterial infections but NOT against:',
        options: ['Viruses', 'Fungi', 'Parasites', 'Protists'],
        correctIndex: 0,
        explanation: 'Viruses are not living cells — they lack the cellular machinery that antibiotics target. Antiviral medications work differently from antibiotics and are needed to fight viral infections.'
    },

    // ═══════════════════════════════════════════════════════════════
    //  CHEMISTRY  (10 questions)
    // ═══════════════════════════════════════════════════════════════

    {
        domain: 'chemistry',
        question: 'Elements in the same column (group) of the periodic table share similar:',
        options: [
            'Atomic masses',
            'Numbers of protons',
            'Numbers of neutrons',
            'Chemical properties'
        ],
        correctIndex: 3,
        explanation: 'Elements in the same group have the same number of valence (outer) electrons, which determines how they react chemically. That is why Group 1 metals are all highly reactive, for example.'
    },
    {
        domain: 'chemistry',
        question: 'In a chemical reaction, the total mass of the products compared to the total mass of the reactants is:',
        options: [
            'Exactly the same',
            'Always greater',
            'Always less',
            'Unpredictable — it depends on the reaction'
        ],
        correctIndex: 0,
        explanation: 'The law of conservation of mass states that matter is neither created nor destroyed in a chemical reaction. The atoms rearrange, but the total mass stays the same.'
    },
    {
        domain: 'chemistry',
        question: 'A solution has a pH of 3. Which statement is correct?',
        options: [
            'The solution is a strong base',
            'The solution is acidic',
            'The solution is neutral',
            'The solution has no hydrogen ions'
        ],
        correctIndex: 1,
        explanation: 'The pH scale runs from 0 to 14. Values below 7 are acidic, 7 is neutral, and above 7 is basic. A pH of 3 is strongly acidic — similar to vinegar or lemon juice.'
    },
    {
        domain: 'chemistry',
        question: 'An atom has 6 protons, 6 neutrons, and 6 electrons. What element is it?',
        options: ['Nitrogen', 'Oxygen', 'Carbon', 'Helium'],
        correctIndex: 2,
        explanation: 'The number of protons defines the element. Carbon always has exactly 6 protons (atomic number 6). The proton count is what makes carbon different from every other element.'
    },
    {
        domain: 'chemistry',
        question: 'Which of the following is a CHEMICAL property rather than a physical property?',
        options: [
            'Boiling point',
            'Density',
            'Color',
            'Flammability'
        ],
        correctIndex: 3,
        explanation: 'Flammability describes how easily a substance reacts with oxygen to burn — this can only be observed through a chemical change. Physical properties like color, density, and boiling point can be observed without changing the substance\'s identity.'
    },
    {
        domain: 'chemistry',
        question: 'In an ionic bond, what happens between the atoms involved?',
        options: [
            'Atoms share electrons equally',
            'One atom transfers electrons to another, creating oppositely charged ions that attract',
            'Atoms share their nuclei',
            'Atoms repel each other with equal force'
        ],
        correctIndex: 1,
        explanation: 'In ionic bonding, a metal atom loses electrons to a nonmetal atom. This creates a positive ion and a negative ion that are held together by the electrostatic attraction between their opposite charges.'
    },
    {
        domain: 'chemistry',
        question: 'Water (H2O) is classified as a compound because it:',
        options: [
            'Is made of two or more different elements chemically bonded together',
            'Is made of only one type of atom',
            'Cannot be broken down into simpler substances',
            'Exists naturally as a liquid'
        ],
        correctIndex: 0,
        explanation: 'A compound is a substance formed when two or more different elements bond chemically in a fixed ratio. Water always contains hydrogen and oxygen in a 2:1 ratio (H2O).'
    },
    {
        domain: 'chemistry',
        question: 'In a saltwater solution, which substance is the solvent?',
        options: ['Salt (NaCl)', 'Both equally', 'Water (H2O)', 'Neither — it is a mixture, not a solution'],
        correctIndex: 2,
        explanation: 'The solvent is the substance that does the dissolving — usually the one present in the greater amount. In saltwater, water is the solvent and salt is the solute that dissolves into it.'
    },
    {
        domain: 'chemistry',
        question: 'When you mix baking soda and vinegar, the container feels cold to the touch. This reaction is:',
        options: [
            'Exothermic — it releases heat',
            'Isothermic — no temperature change occurs',
            'Nuclear — atoms are splitting apart',
            'Endothermic — it absorbs heat from the surroundings'
        ],
        correctIndex: 3,
        explanation: 'An endothermic reaction absorbs energy from its surroundings, causing the temperature to drop. The baking soda and vinegar reaction pulls heat from the container and your hand, making it feel cold.'
    },
    {
        domain: 'chemistry',
        question: 'The chemical formula CO2 tells us that one molecule of carbon dioxide contains:',
        options: [
            'Two carbon atoms and one oxygen atom',
            'One carbon atom and two oxygen atoms',
            'One carbon atom and one oxygen atom',
            'Two carbon atoms and two oxygen atoms'
        ],
        correctIndex: 1,
        explanation: 'In chemical formulas, the subscript number tells how many atoms of the preceding element are present. CO2 means one carbon atom bonded to two oxygen atoms.'
    },

    // ═══════════════════════════════════════════════════════════════
    //  PHYSICS  (10 questions)
    // ═══════════════════════════════════════════════════════════════

    {
        domain: 'physics',
        question: 'A book sits motionless on a table. According to Newton\'s first law, what will happen if no net force acts on it?',
        options: [
            'It will slowly start moving on its own',
            'It will gradually sink through the table',
            'It will remain at rest indefinitely',
            'It will float upward'
        ],
        correctIndex: 2,
        explanation: 'Newton\'s first law (the law of inertia) states that an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force.'
    },
    {
        domain: 'physics',
        question: 'An astronaut has a mass of 70 kg on Earth. What is their mass on the Moon, where gravity is about 1/6 of Earth\'s?',
        options: [
            '70 kg — mass does not change with location',
            'About 12 kg',
            'About 420 kg',
            '0 kg — there is no gravity on the Moon'
        ],
        correctIndex: 0,
        explanation: 'Mass measures the amount of matter in an object and does not change with location. Weight (the force of gravity on that mass) would be about 1/6 on the Moon, but mass stays 70 kg everywhere.'
    },
    {
        domain: 'physics',
        question: 'If you increase the frequency of a wave while the speed stays constant, what happens to its wavelength?',
        options: [
            'Wavelength increases',
            'Wavelength stays the same',
            'Wavelength becomes zero',
            'Wavelength decreases'
        ],
        correctIndex: 3,
        explanation: 'Wave speed = frequency x wavelength. If speed is constant and frequency increases, wavelength must decrease to keep the equation balanced. Higher frequency means shorter wavelength.'
    },
    {
        domain: 'physics',
        question: 'Which type of electromagnetic radiation has the MOST energy per photon?',
        options: ['Radio waves', 'Visible light', 'Gamma rays', 'Infrared'],
        correctIndex: 2,
        explanation: 'Energy increases with frequency across the electromagnetic spectrum. Gamma rays have the highest frequency and shortest wavelength, giving them the most energy per photon.'
    },
    {
        domain: 'physics',
        question: 'According to Ohm\'s law (V = IR), if you double the resistance in a circuit while keeping the voltage the same, the current will:',
        options: [
            'Double',
            'Be cut in half',
            'Stay the same',
            'Drop to zero'
        ],
        correctIndex: 1,
        explanation: 'Ohm\'s law says V = IR. Rearranging gives I = V/R. If R doubles and V stays constant, the current I is halved. More resistance means less current flows for the same voltage.'
    },
    {
        domain: 'physics',
        question: 'A roller coaster car is at the top of a hill, momentarily stopped. At this point, it has maximum:',
        options: [
            'Kinetic energy',
            'Thermal energy',
            'Sound energy',
            'Gravitational potential energy'
        ],
        correctIndex: 3,
        explanation: 'Gravitational potential energy depends on height. At the top of the hill the car is at its highest point with maximum potential energy. As it descends, potential energy converts to kinetic energy (energy of motion).'
    },
    {
        domain: 'physics',
        question: 'A car accelerates from 0 to 60 km/h in 10 seconds. What is its average acceleration?',
        options: [
            '6 km/h per second',
            '60 km/h per second',
            '600 km/h per second',
            '0.6 km/h per second'
        ],
        correctIndex: 0,
        explanation: 'Acceleration = change in velocity / time. The car\'s velocity changed by 60 km/h over 10 seconds, so acceleration = 60 / 10 = 6 km/h per second.'
    },
    {
        domain: 'physics',
        question: 'A ramp is an example of a simple machine. Using a longer, gentler ramp to lift a heavy box to the same height requires:',
        options: [
            'More force and more distance',
            'Less force but over a greater distance',
            'Less force and less distance',
            'The same force regardless of ramp length'
        ],
        correctIndex: 1,
        explanation: 'Simple machines trade force for distance. A longer ramp reduces the force needed, but you push the object over a greater distance. The total work (force x distance) stays roughly the same.'
    },
    {
        domain: 'physics',
        question: 'A metal spoon in hot soup gets hot quickly because metals are good at:',
        options: [
            'Radiation',
            'Insulation',
            'Conduction',
            'Convection'
        ],
        correctIndex: 2,
        explanation: 'Conduction is the transfer of thermal energy through direct contact between particles. Metals are excellent conductors because their tightly packed atoms and free electrons transfer energy very efficiently.'
    },
    {
        domain: 'physics',
        question: 'Sound travels fastest through which medium?',
        options: ['A vacuum (empty space)', 'Air', 'Water', 'Steel'],
        correctIndex: 3,
        explanation: 'Sound is a mechanical wave that needs matter to travel through. It moves fastest in solids like steel where particles are closest together, slower in liquids, slowest in gases, and not at all in a vacuum.'
    },

    // ═══════════════════════════════════════════════════════════════
    //  ENGINEERING  (10 questions)
    // ═══════════════════════════════════════════════════════════════

    {
        domain: 'engineering',
        question: 'A triangular shape is commonly used in bridge trusses because triangles:',
        options: [
            'Use the least material of any shape',
            'Block wind better than other shapes',
            'Are the only shape that cannot be deformed without changing the length of a side',
            'Are easier to manufacture than rectangles'
        ],
        correctIndex: 2,
        explanation: 'A triangle is inherently rigid — you cannot change its angles without changing the length of a side. Rectangles and other polygons can collapse under force, but triangles resist deformation, making them ideal for structures.'
    },
    {
        domain: 'engineering',
        question: 'In a parallel circuit with three light bulbs, what happens if one bulb burns out?',
        options: [
            'The remaining two bulbs continue to work normally',
            'All three bulbs go out',
            'The remaining two bulbs become dimmer',
            'The circuit catches fire'
        ],
        correctIndex: 0,
        explanation: 'In a parallel circuit, each bulb has its own independent path to the power source. If one path breaks, current still flows through the others. This is why homes use parallel wiring.'
    },
    {
        domain: 'engineering',
        question: 'A program checks: "IF temperature > 100 THEN sound alarm." The temperature reads 95. What happens?',
        options: [
            'The alarm sounds because 95 is close to 100',
            'The program crashes',
            'The alarm sounds at half volume',
            'The alarm does not sound because 95 is not greater than 100'
        ],
        correctIndex: 3,
        explanation: 'Computers follow logic exactly. The condition "temperature > 100" is false when temperature is 95, so the program skips the alarm instruction. Computers do not approximate or round — they evaluate conditions precisely.'
    },
    {
        domain: 'engineering',
        question: 'An engineer must choose a material for a spacecraft heat shield. Which property is MOST important?',
        options: [
            'Electrical conductivity',
            'Ability to withstand extremely high temperatures without melting or burning',
            'Transparency',
            'Flexibility and elasticity'
        ],
        correctIndex: 1,
        explanation: 'During re-entry, spacecraft encounter temperatures exceeding 1,600 degrees Celsius due to air friction. The heat shield material must have an extremely high melting point and low thermal conductivity to protect the craft.'
    },
    {
        domain: 'engineering',
        question: 'A solar panel converts sunlight into electricity using:',
        options: [
            'Tiny windmills inside the panel',
            'Water heated by the Sun to spin a turbine',
            'Photovoltaic cells made of semiconductor materials like silicon',
            'Mirrors that focus light onto a battery'
        ],
        correctIndex: 2,
        explanation: 'Photovoltaic cells contain semiconductor materials (usually silicon) that release electrons when struck by photons of light. This flow of electrons is electricity — no moving parts needed.'
    },
    {
        domain: 'engineering',
        question: 'In a water treatment plant, which step removes tiny dissolved chemicals and pathogens that filtration alone cannot catch?',
        options: [
            'Chemical disinfection (such as chlorination or UV treatment)',
            'Screening (removing large debris)',
            'Sedimentation (letting particles settle)',
            'Aeration (adding air to the water)'
        ],
        correctIndex: 0,
        explanation: 'Filtration removes suspended particles, but dissolved chemicals and microscopic pathogens require chemical disinfection. Chlorine, ozone, or UV light kill bacteria and viruses that pass through filters.'
    },
    {
        domain: 'engineering',
        question: 'A suspension bridge cable supports the roadway by being under:',
        options: [
            'Compression — the cable is being squeezed',
            'Tension — the cable is being pulled and stretched',
            'Torsion — the cable is being twisted',
            'Shear — the cable is being cut sideways'
        ],
        correctIndex: 1,
        explanation: 'Suspension bridge cables hang from towers and support the deck below. The weight of the roadway and traffic pulls the cables taut, placing them under tension (a stretching force).'
    },
    {
        domain: 'engineering',
        question: 'An airplane wing is shaped so that air moves faster over the curved top surface than the flat bottom. According to Bernoulli\'s principle, this creates:',
        options: [
            'Higher pressure above the wing, pushing it down',
            'Equal pressure on both sides, keeping the plane level',
            'A vacuum above the wing that sucks the plane upward',
            'Lower pressure above the wing, creating upward lift'
        ],
        correctIndex: 3,
        explanation: 'Bernoulli\'s principle states that faster-moving air exerts less pressure. The curved upper surface forces air to move faster, lowering pressure above the wing. Higher pressure below then pushes the wing upward — this is lift.'
    },
    {
        domain: 'engineering',
        question: 'The Tacoma Narrows Bridge collapsed in 1940 due to wind-induced vibrations. What engineering lesson did this disaster teach?',
        options: [
            'Engineers must account for resonance and aerodynamic forces in structural design',
            'Bridges should never be built over water',
            'Steel is too weak for bridge construction',
            'Suspension bridges should only be used for short spans'
        ],
        correctIndex: 0,
        explanation: 'The wind caused the bridge to oscillate at its natural frequency (resonance), amplifying the vibrations until it tore apart. Engineers now test designs in wind tunnels and account for aerodynamic effects.'
    },
    {
        domain: 'engineering',
        question: 'A "green roof" covered with plants helps a building by:',
        options: [
            'Making the building taller to catch more wind',
            'Replacing the need for walls',
            'Insulating the building, absorbing rainwater, and reducing urban heat',
            'Generating electricity from the plants'
        ],
        correctIndex: 2,
        explanation: 'Green roofs provide natural insulation (reducing heating and cooling costs), absorb rainwater (reducing runoff and flooding), and cool the surrounding air through evapotranspiration, combating the urban heat island effect.'
    }
];
