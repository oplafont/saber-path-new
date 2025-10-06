export type Trait = 'guardian' | 'consular' | 'sentinel' | 'seer' | 'wanderer';

export interface RankedAnswer {
  first: string | null;
  second: string | null;
  third: string | null;
}

interface OptionDefinition {
  label: string;
  traits: Partial<Record<Trait, number>>;
  tags: string[];
  storyHook?: string;
}

interface QuestionDefinition {
  text: string;
  options: OptionDefinition[];
}

export interface QuizQuestion {
  text: string;
  options: string[];
}

export interface TraitBreakdown {
  trait: Trait;
  label: string;
  tagline: string;
  score: number;
  percentage: number;
  description: string;
}

export interface VirtueHighlight {
  id: string;
  label: string;
  score: number;
  percentage: number;
  description: string;
}

export interface TimelineBeat {
  era: string;
  highlight: string;
  outcome: string;
}

export interface ModuleRecommendation {
  title: string;
  description: string;
  duration: string;
}

export interface MissionDirective {
  title: string;
  location: string;
  objective: string;
}

export interface StarMapStop {
  stop: string;
  focus: string;
  reason: string;
}

export interface FormDetail {
  name: string;
  rationale: string;
}

export interface AllyProfile {
  name: string;
  species: string;
  role: string;
  description: string;
}

export interface RivalProfile {
  name: string;
  description: string;
  lesson: string;
}

export interface JediProfileData {
  name: string;
  archetype: {
    id: Trait;
    label: string;
    tagline: string;
    description: string;
    motto: string;
    ceremonialRole: string;
    forceAlignment: string;
  };
  secondary: {
    id: Trait;
    label: string;
    tagline: string;
  };
  saber: {
    color: string;
    accent: string;
    hiltStyle: string;
    ignitionSound: string;
    formDetails: FormDetail[];
    kyberCrystals: string[];
  };
  robeStyle: string;
  robeAccent: string;
  symbolicItem: string;
  comparisons: string[];
  quote: string;
  themeSong: string;
  trainingChallenge: string;
  trainingModules: ModuleRecommendation[];
  missions: MissionDirective[];
  meditations: string[];
  holocrons: string[];
  gear: string[];
  companion: AllyProfile;
  rival: RivalProfile;
  starMap: StarMapStop[];
  timeline: TimelineBeat[];
  traitBreakdown: TraitBreakdown[];
  virtueHighlights: VirtueHighlight[];
  abilityFocus: string[];
  narrative: string;
  holoMessage: string;
}

interface TraitMeta {
  id: Trait;
  label: string;
  tagline: string;
  description: string;
  secondaryDescriptor: string;
  forceAlignment: string;
  saberColor: string;
  hiltStyle: string;
  robeStyle: string;
  robeAccent: string;
  symbolicItem: string;
  motto: string;
  quote: string;
  themeSong: string;
  comparisons: string[];
  kyberCrystals: string[];
  abilityFocus: string[];
  ceremonialRole: string;
  ignitionSound: string;
  forms: FormDetail[];
  trainingChallenge: string;
  trainingModules: ModuleRecommendation[];
  missions: MissionDirective[];
  meditations: string[];
  holocrons: string[];
  gear: string[];
  companion: AllyProfile;
  rival: RivalProfile;
  starMap: StarMapStop[];
  timeline: TimelineBeat[];
}

const TRAIT_DETAILS: Record<Trait, TraitMeta> = {
  guardian: {
    id: 'guardian',
    label: 'Temple Vanguard',
    tagline: 'Shield of the Light',
    description:
      'a stalwart defender who stands at the vanguard of every battle, weaving steadfast shields and decisive counters.',
    secondaryDescriptor:
      'channel protective instincts into every tactic, ensuring no ally is left exposed.',
    forceAlignment: 'Light-side Guardian who embodies vigilance and bravery.',
    saberColor: 'electric blue with a silver core',
    hiltStyle: 'Reinforced durasteel hilt with emitter fins for defensive grips.',
    robeStyle: 'Midnight tunic layered with azure tabards and light durasteel pauldrons.',
    robeAccent: 'Shoulder inlays woven with sentinel gold sigils honour your tactical awareness.',
    symbolicItem: 'A kyber-etched oath ring sworn before the High Council.',
    motto: 'Stand between the darkness and those who cannot.',
    quote: 'Hold the line, and hope will always find a path.',
    themeSong: 'The Jedi Steps – John Williams',
    comparisons: ['Obi-Wan Kenobi', 'Plo Koon'],
    kyberCrystals: ['Ilum kyber shard', 'Guardian Forge crystal of Lothal'],
    abilityFocus: ['Force Barrier', 'Battle Precognition'],
    ceremonialRole: 'Guardian of the Temple Gates',
    ignitionSound: 'A confident, rising hum that crescendos into a resonant warble.',
    forms: [
      {
        name: 'Form III: Soresu',
        rationale: 'You excel at steadfast defence, creating impenetrable shells for those you protect.',
      },
      {
        name: 'Form V: Djem So',
        rationale: 'Your counter-strikes turn enemy aggression into swift justice.',
      },
      {
        name: 'Form IV: Ataru',
        rationale: 'Acrobatic flourishes let you end confrontations before innocents are harmed.',
      },
    ],
    trainingChallenge:
      'Coordinate three simultaneous defensive engagements, rotating between shield lines without letting your guard drop.',
    trainingModules: [
      {
        title: 'Shield Wall Harmonisation',
        description:
          'Synchronise defensive stances with a squad of Padawans while monitoring their morale through the Force.',
        duration: '4 evenings',
      },
      {
        title: 'Guardian Bastion Drills',
        description: 'Practise layered Soresu deflections against droideka salvos on the Temple sparring deck.',
        duration: '6 sessions',
      },
      {
        title: 'Valor Meditation',
        description: 'Channel Force Valor through breathing mantras to fortify allies before battle.',
        duration: 'Daily, 20 minutes',
      },
    ],
    missions: [
      {
        title: 'Stand at the Jovan Spire',
        location: 'Outer Rim listening post',
        objective: 'Hold the line long enough for evacuation transports to clear the atmosphere.',
      },
      {
        title: 'Shield the Tython Conclave',
        location: 'Ancient Tython monastery',
        objective: 'Protect diplomats while negotiating a ceasefire with local warlords.',
      },
    ],
    meditations: ['Guardian’s Flame Breath', 'Echoes of the Crystal Chambers'],
    holocrons: ['Holocron of Master Cin Drallig', 'Defender Protocols of the High Republic'],
    gear: ['Fold-out energy shield emitter', 'Temple-forged vambrace with integrated comlink'],
    companion: {
      name: 'CT-41 “Rampart”',
      species: 'Clone veteran',
      role: 'Tactics partner',
      description:
        'A retired clone trooper who now consults on defensive deployments and keeps you grounded in camaraderie.',
    },
    rival: {
      name: 'Serra Korr',
      description: 'A Makashi duelist who tests your adaptability with precision strikes.',
      lesson: 'She reminds you that steadfast protection must still embrace elegance and adaptability.',
    },
    starMap: [
      {
        stop: 'Ilum Crystal Caverns',
        focus: 'Attune to the singing glaciers and renew your vows of protection.',
        reason: 'The crystals echo your shielded heart.',
      },
      {
        stop: 'Jovan Listening Post',
        focus: 'Coordinate refugee shield corridors under fire.',
        reason: 'Your leadership is needed when the Outer Rim trembles.',
      },
      {
        stop: 'Mon Cala Dry Docks',
        focus: 'Train with aquatic marines on multi-environment defence.',
        reason: 'Adaptation readies you for anything.',
      },
    ],
    timeline: [
      {
        era: 'Initiate Trials',
        highlight: 'Mastered Soresu forms months ahead of schedule.',
        outcome: 'Earned the ceremonial mantle of Watcher of the Gate.',
      },
      {
        era: 'Clone Wars Flashpoint',
        highlight: 'Shielded an entire village from artillery by rotating Force barriers.',
        outcome: 'Cemented your reputation as an unbreakable guardian.',
      },
      {
        era: 'Present Mission',
        highlight: 'Tasked with training a cohort of sentinel hopefuls.',
        outcome: 'Your legacy now extends through those you inspire.',
      },
    ],
  },
  consular: {
    id: 'consular',
    label: 'Luminous Consular',
    tagline: 'Voice of the Force',
    description:
      'a luminous sage who settles storms with insight and turns empathy into unshakable strength.',
    secondaryDescriptor:
      'thread insight into every plan, softening hearts before blades ever clash.',
    forceAlignment: 'Light-side Consular attuned to the Living Force.',
    saberColor: 'verdant green with golden motes',
    hiltStyle: 'Polished naurwood hilt with flowing engravings for graceful flourishes.',
    robeStyle: 'Layered ivory and moss robes with a luminous sash of woven kyber thread.',
    robeAccent: 'Delicate embroidery of starlight vines marks your devotion to harmony.',
    symbolicItem: 'A singing kyber focus crystal tuned to meditation chimes.',
    motto: 'Guide the current, do not force its flow.',
    quote: 'Understanding is the sharpest blade a Jedi can carry.',
    themeSong: 'Across the Stars (Concert Suite) – John Williams',
    comparisons: ['Yoda', 'Jocasta Nu'],
    kyberCrystals: ['Wellspring of Life crystal', 'Verdant Ilum shard'],
    abilityFocus: ['Force Harmony', 'Empathic Healing'],
    ceremonialRole: 'Emissary of the Council',
    ignitionSound: 'A soft, melodic build that blooms into a clear sustained tone.',
    forms: [
      {
        name: 'Form II: Makashi',
        rationale: 'You prefer controlled, precise movements that end conflict without escalation.',
      },
      {
        name: 'Form VI: Niman',
        rationale: 'Blending diplomacy with measured force, you adapt to any encounter.',
      },
      {
        name: 'Form III: Soresu',
        rationale: 'A defence-first posture allows dialogue to continue until peace is secured.',
      },
    ],
    trainingChallenge:
      'Resolve a dispute between feuding guilds without drawing a saber, relying on Force empathy to align their motives.',
    trainingModules: [
      {
        title: 'Holocron Symposium Facilitation',
        description: 'Moderate debates between masters while maintaining emotional equilibrium for all participants.',
        duration: '3 symposiums',
      },
      {
        title: 'Living Force Listening',
        description: 'Meditate in the gardens of Coruscant, sensing emotional currents across the metropolis.',
        duration: '2 weeks',
      },
      {
        title: 'Harmonised Makashi Sets',
        description: 'Practise graceful Makashi movements accompanied by negotiation mantras and breathwork.',
        duration: '5 sequences',
      },
    ],
    missions: [
      {
        title: 'Parley on Onderon',
        location: 'Onderon royal court',
        objective: 'Broker a truce between rebellious nobles without a single casualty.',
      },
      {
        title: 'Caretaker of the Wellspring',
        location: 'The Wellspring of Life',
        objective: 'Rebalance the Force presence after dark-side disturbances.',
      },
    ],
    meditations: ['Singing Crystal Chants', 'Lotus of the Living Force'],
    holocrons: ['Holocron of Master Vandar Tokare', 'Treatise on Diplomatic Resonance'],
    gear: ['Translating protocol pendant', 'Force-attuned negotiation beads'],
    companion: {
      name: 'L3-17 “Lilt”',
      species: 'Melodic protocol droid',
      role: 'Negotiation partner',
      description:
        'A custom protocol droid that harmonises languages with subtle musical cues to soothe tense rooms.',
    },
    rival: {
      name: 'Baroness Vraxia',
      description: 'A shrewd senator who challenges your ideals with ruthless pragmatism.',
      lesson: 'She forces you to articulate the true cost of compassion and stand firm.',
    },
    starMap: [
      {
        stop: 'Jedha’s Mirror Sanctuary',
        focus: 'Meditate among kyber mirrors to expand clairvoyant empathy.',
        reason: 'The sanctum amplifies your connection to the Living Force.',
      },
      {
        stop: 'Chandrila Diplomatic Summit',
        focus: 'Advise on treaty language that preserves justice and mercy.',
        reason: 'Your counsel shapes the Republic’s future.',
      },
      {
        stop: 'The Wellspring of Life',
        focus: 'Renew your bond to the Living Force through quiet contemplation.',
        reason: 'Balance returns to those who listen.',
      },
    ],
    timeline: [
      {
        era: 'Initiate Reflection',
        highlight: 'Solved disputes between clans of Padawans using only song and story.',
        outcome: 'Named Speaker of the Initiate Choir.',
      },
      {
        era: 'Outer Rim Deployment',
        highlight: 'Negotiated the safe evacuation of war refugees under siege.',
        outcome: 'Granted an honorary seat at the Council’s mediation table.',
      },
      {
        era: 'Present Mission',
        highlight: 'Tasked with re-opening shuttered archives on Jedha.',
        outcome: 'Your knowledge now preserves the lessons of ages.',
      },
    ],
  },
  sentinel: {
    id: 'sentinel',
    label: 'Shadow Sentinel',
    tagline: 'Balance of Blade and Code',
    description:
      'a pragmatic sentinel blending covert tech with saber mastery to keep threats contained.',
    secondaryDescriptor:
      'balance clandestine strategy with everyday compassion, seeing what others overlook.',
    forceAlignment: 'Sentinel operative balancing vigilance with compassion.',
    saberColor: 'amber blade with an obsidian edge',
    hiltStyle: 'Modular durasteel hilt with a deployable shoto emitter.',
    robeStyle: 'Charcoal stealth gear reinforced with discreet armour plates and data gauntlets.',
    robeAccent: 'Hidden pockets lined with null-cloth let you stash slicer tools within reach.',
    symbolicItem: 'An encrypted datacron of Outer Rim watchlists keyed to your signature.',
    motto: 'Find the gap in the armour, then seal it.',
    quote: 'We defend the light best when shadows cannot hide within it.',
    themeSong: 'Star Wars Rebels Suite – Kevin Kiner',
    comparisons: ['Bastila Shan', 'Ahsoka Tano'],
    kyberCrystals: ['Amber crystal from Sorgan', 'Recovered Sentinel shard from Ossus'],
    abilityFocus: ['Force Cloak', 'Tech Empowerment'],
    ceremonialRole: 'Warden of the Outer Rim Watch',
    ignitionSound: 'A sharp, tactical snap-hiss that settles into a low vigilant hum.',
    forms: [
      {
        name: 'Form V: Shien / Djem So',
        rationale: 'Redirecting enemy firepower is second nature to your tactical mind.',
      },
      {
        name: 'Form III: Soresu',
        rationale: 'Defensive patience reveals openings for surgical strikes.',
      },
      {
        name: 'Jar’Kai Variant',
        rationale: 'Paired blades and gadgets let you adapt instantly to shifting missions.',
      },
    ],
    trainingChallenge:
      'Disrupt an illicit slicer ring without revealing your identity, using stealth, diplomacy, and only non-lethal measures.',
    trainingModules: [
      {
        title: 'Shadow Network Recon',
        description: 'Practise slicing holonet nodes while maintaining meditative breathing to stay centred.',
        duration: '8 covert drills',
      },
      {
        title: 'Sentinel Cloak Flow',
        description: 'Blend Force Cloak with silent footwork in low-light obstacle courses.',
        duration: '6 nocturnal sessions',
      },
      {
        title: 'Adaptive Counterstrike',
        description: 'Alternate between Shien blaster deflection and Jar’Kai flourish combos.',
        duration: '5 integrated sparring rounds',
      },
    ],
    missions: [
      {
        title: 'Ghost Trail on Bracca',
        location: 'Bracca shipbreaking yards',
        objective: 'Track down dark-side artefacts hidden among scrap before scavengers sell them.',
      },
      {
        title: 'Silent Beacon',
        location: 'Nar Shaddaa underlevels',
        objective: 'Sabotage a crime syndicate’s supply lines without civilian casualties.',
      },
    ],
    meditations: ['Veiled Lantern Trance', 'Pulse of the Datastream'],
    holocrons: ['Holocron of Master Atris (Redacted Files)', 'Sentinel Field Manual Vol. II'],
    gear: ['Holo-disruptor field generator', 'Encrypted datapad with slicer suite'],
    companion: {
      name: 'Jax Ren',
      species: 'Human slicer',
      role: 'Field analyst',
      description: 'A repentant slicer who now assists you with intel gathering and mission logistics.',
    },
    rival: {
      name: 'Darth Nyx',
      description: 'A shadowy dark-sider skilled in subterfuge who tests your resolve.',
      lesson: 'Forces you to face the temptation of ruthless tactics and choose the light deliberately.',
    },
    starMap: [
      {
        stop: 'Bracca Shipbreakers',
        focus: 'Cleanse derelict hulks of hidden contraband.',
        reason: 'Your vigilance prevents future wars.',
      },
      {
        stop: 'Nar Shaddaa Underlevels',
        focus: 'Build networks of informants among forgotten citizens.',
        reason: 'Hope grows where watchful eyes lend aid.',
      },
      {
        stop: 'Coruscant Underworld',
        focus: 'Coordinate with Temple intelligence to dismantle sleeper cells.',
        reason: 'The heart of the Republic needs unseen guardians.',
      },
    ],
    timeline: [
      {
        era: 'Initiate Assessment',
        highlight: 'Outsmarted training droids by reprogramming them mid-spar.',
        outcome: 'Awarded the Sentinel’s codecipher as a Padawan.',
      },
      {
        era: 'Shadow War Years',
        highlight: 'Disarmed a cartel without casualties by manipulating power grids.',
        outcome: 'Earned the trust of the Council’s covert branch.',
      },
      {
        era: 'Present Mission',
        highlight: 'Assigned to mentor a new cell of Sector Rangers.',
        outcome: 'Your tactics will ripple across the Outer Rim.',
      },
    ],
  },
  seer: {
    id: 'seer',
    label: 'Celestial Seer',
    tagline: 'Interpreter of the Cosmic Will',
    description:
      'a cosmic mystic translating visions into precise action before danger fully forms.',
    secondaryDescriptor: 'interpret omens others ignore, letting allies move with prophetic confidence.',
    forceAlignment: 'Mystic attuned to the Unifying Force.',
    saberColor: 'silver-white blade with an iridescent halo',
    hiltStyle: 'Songsteel lattice hilt engraved with constellations.',
    robeStyle: 'Flowing indigo robes woven with starlight threads and sensory beads.',
    robeAccent: 'Constellation beadwork shifts colours as your visions brighten.',
    symbolicItem: 'A holocron of luminous visions recorded during your pilgrimages.',
    motto: 'Let the Force write tomorrow through you.',
    quote: 'Every flicker of light is a future seeking a guardian.',
    themeSong: 'Rey’s Theme – John Williams (Concert Arrangement)',
    comparisons: ['Shaak Ti', 'Jolee Bindo'],
    kyberCrystals: ['Jedha pearl', 'Ilum prism crystal'],
    abilityFocus: ['Flow-Walking', 'Force Visions'],
    ceremonialRole: 'Keeper of the Celestial Vault',
    ignitionSound: 'A harmonic chime that unfurls into an ethereal, echoing hum.',
    forms: [
      {
        name: 'Form VI: Niman',
        rationale: 'Balanced motions let you adapt to the Force’s whispers mid-duel.',
      },
      {
        name: 'Form IV: Ataru',
        rationale: 'Graceful spins channel prophetic momentum into the battlefield.',
      },
      {
        name: 'Tràkata Variants',
        rationale: 'Unpredictable deactivations, guided by visions, unsettle foes before they strike.',
      },
    ],
    trainingChallenge:
      'Meditate atop a moving starcruiser, foreseeing hazards minutes before they occur and guiding the pilot safely through.',
    trainingModules: [
      {
        title: 'Vision Weave Journaling',
        description: 'Record nightly visions and interpret symbology with your mentor council.',
        duration: '10 nights',
      },
      {
        title: 'Horizon-Walk Exercises',
        description: 'Practise controlled flow-walking to observe possible futures without attachment.',
        duration: '6 guided sessions',
      },
      {
        title: 'Ataru Celestial Kata',
        description: 'Perform aerial Ataru sequences timed to cosmic orrery rotations.',
        duration: '5 dawn practices',
      },
    ],
    missions: [
      {
        title: 'Pilgrimage to Jedha',
        location: 'Jedha Holy City',
        objective: 'Stabilise kyber-induced storms disrupting pilgrim routes.',
      },
      {
        title: 'Shroud of Vortex Station',
        location: 'Deep-space research outpost',
        objective: 'Assist scientists by predicting micro-singularity surges.',
      },
    ],
    meditations: ['Nebula Breath Alignment', 'Whispers of the World Between Worlds'],
    holocrons: ['Holocron of Avar Kriss', 'Chronicle of the Seer Circles'],
    gear: ['Star-charted meditation shawl', 'Dreamleaf incense brazier'],
    companion: {
      name: 'Tirah',
      species: 'Togruta mystic',
      role: 'Vision interpreter',
      description: 'A fellow seer who helps translate your foresights into actionable guidance.',
    },
    rival: {
      name: 'Vizier Vhorr',
      description: 'An Imperial soothsayer who twists visions for domination.',
      lesson: 'Challenges you to anchor every prophecy with compassion.',
    },
    starMap: [
      {
        stop: 'Jedha Kyber Temples',
        focus: 'Share visions with Guardians of the Whills.',
        reason: 'Their chants sharpen your foresight.',
      },
      {
        stop: 'Bendu’s Perch on Atollon',
        focus: 'Learn to balance storm and calm within yourself.',
        reason: 'The Bendu teaches the middle path.',
      },
      {
        stop: 'World Between Worlds Confluence',
        focus: 'Study cosmic echoes without disturbing the timeline.',
        reason: 'Wisdom tempers power.',
      },
    ],
    timeline: [
      {
        era: 'Youngling Dream',
        highlight: 'Foretold the arrival of a lost holocron before it appeared.',
        outcome: 'The Order recognised your prophetic sight.',
      },
      {
        era: 'Mystic Sojourn',
        highlight: 'Guided a convoy through hyperspace anomalies with meditative foresight.',
        outcome: 'Pilots across the Republic seek your counsel.',
      },
      {
        era: 'Present Mission',
        highlight: 'Charged with keeping the Celestial Vault attuned to the Light.',
        outcome: 'Your visions now anchor the Order’s long-term strategy.',
      },
    ],
  },
  wanderer: {
    id: 'wanderer',
    label: 'Outer Rim Wayfinder',
    tagline: 'Trailblazer beyond the map',
    description:
      'an adventurous pathfinder charting new routes so hope can reach forgotten worlds.',
    secondaryDescriptor: 'carry the spark of adventure, reading landscapes and cultures at a glance.',
    forceAlignment: 'Adventurous guardian with a seeker’s heart.',
    saberColor: 'sunset orange blade with teal undertones',
    hiltStyle: 'Weathered collapsible hilt with a built-in grappling emitter.',
    robeStyle: 'Layered dustcloak with utility harness and breath-mask collar.',
    robeAccent: 'Weathered leather strips record each frontier you reconnect to the Republic.',
    symbolicItem: 'An ancient star compass inherited from High Republic pathfinders.',
    motto: 'There is always another horizon waiting.',
    quote: 'Light a beacon on every world you touch.',
    themeSong: 'The Mandalorian Theme – Ludwig Göransson (Orchestral Suite)',
    comparisons: ['Qui-Gon Jinn', 'Ezra Bridger'],
    kyberCrystals: ['Kyber from the Lothal Temple', 'Tython dawn crystal'],
    abilityFocus: ['Force Navigation', 'Beast Connection'],
    ceremonialRole: 'Scout of the Outer Rim Mapping Corps',
    ignitionSound: 'A bright, adventurous flare that settles into a quick, pulsing rhythm.',
    forms: [
      {
        name: 'Form IV: Ataru',
        rationale: 'Your agility lets you traverse uneven terrain and strike from unexpected angles.',
      },
      {
        name: 'Form V: Shien',
        rationale: 'Deflecting blaster fire keeps explorers and refugees safe behind you.',
      },
      {
        name: 'Form I: Shii-Cho',
        rationale: 'A foundational style adaptable to diverse improvised scenarios.',
      },
    ],
    trainingChallenge:
      'Chart a safe passage through a volatile asteroid belt using only instinct and Force-guided navigation without navicomputer assistance.',
    trainingModules: [
      {
        title: 'Star Compass Calibration',
        description: 'Align ancient navigation tools to modern hyperspace beacons.',
        duration: '3 long-haul flights',
      },
      {
        title: 'Beast Empathy Circuits',
        description: 'Bond with local fauna to learn terrain secrets and scout hazards.',
        duration: '5 field immersions',
      },
      {
        title: 'Frontier Survival Weave',
        description: 'Practise Ataru leaps combined with environmental adaptation drills.',
        duration: '7 open-range sessions',
      },
    ],
    missions: [
      {
        title: 'Rediscover the Lothal Pathway',
        location: 'Lothal wilderness',
        objective: 'Map new hyperspace micro-routes to support relief missions.',
      },
      {
        title: 'Beacon at Wild Space',
        location: 'Uncharted asteroid outpost',
        objective: 'Establish a communications relay to connect scattered settlers with the Republic.',
      },
    ],
    meditations: ['Horizon Gaze Focus', 'Pulse of the Open Sky'],
    holocrons: ['Explorer Logs of Orla Jareni', 'Pathfinder Almanac'],
    gear: ['Compact glider pack', 'Multi-spectrum scanner gauntlet'],
    companion: {
      name: 'Keshra',
      species: 'Tooka scout',
      role: 'Trail companion',
      description: 'A keen-eyed tooka that scouts terrain and warns of hidden dangers.',
    },
    rival: {
      name: 'Captain Draiv',
      description: 'A treasure-seeking pirate who races you to lost relics.',
      lesson: 'Forces you to balance curiosity with responsibility.',
    },
    starMap: [
      {
        stop: 'Lothal Jedi Temple',
        focus: 'Meditate with the luminous wolves and seek new pathways.',
        reason: 'Their guidance reveals hidden doorways.',
      },
      {
        stop: 'Wild Space Outpost K-37',
        focus: 'Set up beacon arrays for stranded colonies.',
        reason: 'Your explorations keep others connected.',
      },
      {
        stop: 'Ahch-To Tide Pools',
        focus: 'Study ancient Jedi travel songs etched in stone.',
        reason: 'History fuels your wanderlust responsibly.',
      },
    ],
    timeline: [
      {
        era: 'Youngling Expedition',
        highlight: 'Discovered a lost kyber sprout in the Temple gardens.',
        outcome: 'Earned the pathfinder’s compass from Master Yaddle.',
      },
      {
        era: 'Frontier Apprenticeship',
        highlight: 'Led relief vessels through pirate-infested space with daring manoeuvres.',
        outcome: 'Outer Rim settlers still speak your name in grateful tones.',
      },
      {
        era: 'Present Mission',
        highlight: 'Commissioned to map safe refugee corridors toward the Core.',
        outcome: 'Your charts save lives each rotation.',
      },
    ],
  },
};

const TAG_DETAILS: Record<string, { label: string; description: string }> = {
  diplomacy: {
    label: 'Diplomacy',
    description: 'You resolve tension with empathy, negotiation, and listening.',
  },
  defence: {
    label: 'Protection',
    description: 'Your instinct is to shield allies and absorb the first impact.',
  },
  offense: {
    label: 'Decisive Strike',
    description: 'You prefer ending conflicts swiftly with courageous action.',
  },
  mysticism: {
    label: 'Mysticism',
    description: 'Visions, intuition, and the deeper currents of the Force guide you.',
  },
  lore: {
    label: 'Lorekeeper',
    description: 'Ancient knowledge and research fuel your growth.',
  },
  exploration: {
    label: 'Exploration',
    description: 'New horizons and uncharted worlds call you onward.',
  },
  leadership: {
    label: 'Leadership',
    description: 'You organise and inspire others with strategic clarity.',
  },
  stealth: {
    label: 'Stealth',
    description: 'You move unseen, gathering intel and striking from the shadows.',
  },
  mentorship: {
    label: 'Mentorship',
    description: 'Teaching others and elevating their potential comes naturally to you.',
  },
};

const QUESTIONS_INTERNAL: QuestionDefinition[] = [
  {
    text: 'When faced with conflict, you prefer:',
    options: [
      {
        label: 'Calm negotiation and diplomacy',
        traits: { consular: 3, sentinel: 1 },
        tags: ['diplomacy', 'mentorship'],
        storyHook: 'You once defused a duel with nothing more than tea and patient listening in the Temple gardens.',
      },
      {
        label: 'Defensive manoeuvres to protect others',
        traits: { guardian: 3, sentinel: 2 },
        tags: ['defence', 'leadership'],
        storyHook: 'Training reports note nights spent holding shields for villages under siege drills.',
      },
      {
        label: 'Swift offensive action to end it quickly',
        traits: { guardian: 3, wanderer: 2 },
        tags: ['offense', 'exploration'],
        storyHook: 'You cut through blockades with daring leaps, refusing to let darkness gain footing.',
      },
      {
        label: 'Listening to the Force for guidance',
        traits: { seer: 3, consular: 2 },
        tags: ['mysticism', 'lore'],
        storyHook: 'Visions often nudge your steps seconds before threats appear.',
      },
    ],
  },
  {
    text: 'Which training appeals to you the most?',
    options: [
      {
        label: 'Lightsaber forms and combat techniques',
        traits: { guardian: 3, sentinel: 2, wanderer: 1 },
        tags: ['offense', 'defence'],
        storyHook: 'Temple sparring logs record you volunteering for extra rotations long after curfew.',
      },
      {
        label: 'Meditation and expanding your connection to the Force',
        traits: { seer: 3, consular: 2 },
        tags: ['mysticism', 'diplomacy'],
        storyHook: 'You spent nights in the crystal chambers, listening to the hum of the kyber.',
      },
      {
        label: 'Tactical leadership and battlefield strategy',
        traits: { guardian: 2, sentinel: 3 },
        tags: ['leadership', 'defence'],
        storyHook: 'Holotables still show your training simulations annotated with improvements for every squad.',
      },
      {
        label: 'Deep study of ancient Jedi texts and lore',
        traits: { consular: 3, seer: 2 },
        tags: ['lore', 'mentorship'],
        storyHook: 'Archivists cite your translations of forgotten runes as “exemplary and poetic.”',
      },
    ],
  },
  {
    text: 'Pick the trait you value most:',
    options: [
      {
        label: 'Courage',
        traits: { guardian: 3, wanderer: 2 },
        tags: ['offense', 'leadership'],
        storyHook: 'You volunteered for the riskiest negotiation after seeing fear on younger faces.',
      },
      {
        label: 'Wisdom',
        traits: { consular: 3, seer: 2 },
        tags: ['lore', 'mysticism'],
        storyHook: 'Masters recall you pausing duels mid-strike to consider the lesson behind each move.',
      },
      {
        label: 'Compassion',
        traits: { consular: 2, sentinel: 2, seer: 1 },
        tags: ['mentorship', 'diplomacy'],
        storyHook: 'Younglings flock to you, certain you understand what their hearts struggle to say.',
      },
      {
        label: 'Discipline',
        traits: { sentinel: 3, guardian: 2 },
        tags: ['defence', 'stealth'],
        storyHook: 'Your holocron logs show flawless forms repeated long after instructors dismissed the class.',
      },
    ],
  },
  {
    text: 'Your ideal lightsaber is:',
    options: [
      {
        label: 'A single-bladed weapon with a classic hilt',
        traits: { guardian: 2, consular: 1 },
        tags: ['defence', 'mentorship'],
        storyHook: 'You honour the elegance of the old masters, keeping your hilt polished and ready.',
      },
      {
        label: 'A curved hilt emphasising finesse',
        traits: { consular: 2, seer: 1 },
        tags: ['diplomacy', 'mysticism'],
        storyHook: 'Sparring partners note how your curved hilt dances rather than clashes.',
      },
      {
        label: 'A double-bladed staff for versatility',
        traits: { sentinel: 2, wanderer: 2 },
        tags: ['offense', 'exploration'],
        storyHook: 'Your custom staff whirls as easily in the market square as on the battlefield.',
      },
      {
        label: 'A shoto or short blade paired with the Force',
        traits: { seer: 2, sentinel: 1 },
        tags: ['stealth', 'mysticism'],
        storyHook: 'You practice with a shoto while meditating, trusting the Force to extend your reach.',
      },
    ],
  },
  {
    text: 'Choose the destiny that resonates with you:',
    options: [
      {
        label: 'Guarding the peace across the galaxy',
        traits: { guardian: 3, sentinel: 1 },
        tags: ['defence', 'leadership'],
        storyHook: 'Holorecords show you standing between civilians and artillery without hesitation.',
      },
      {
        label: 'Teaching Padawans and passing on knowledge',
        traits: { consular: 3, seer: 1 },
        tags: ['mentorship', 'lore'],
        storyHook: 'Your quarters overflow with lesson plans written for anyone who might ask.',
      },
      {
        label: 'Exploring unknown regions and uncovering secrets',
        traits: { wanderer: 3, seer: 2 },
        tags: ['exploration', 'mysticism'],
        storyHook: 'Star charts pinned to your walls track dozens of worlds waiting for your return.',
      },
      {
        label: 'Leading troops into battle against tyranny',
        traits: { guardian: 3, sentinel: 2 },
        tags: ['leadership', 'offense'],
        storyHook: 'Command staff quote your strategies when briefing new squads.',
      },
    ],
  },
];

export const QUESTIONS: QuizQuestion[] = QUESTIONS_INTERNAL.map((q) => ({
  text: q.text,
  options: q.options.map((o) => o.label),
}));

export const createEmptyAnswers = (): RankedAnswer[] =>
  QUESTIONS_INTERNAL.map(() => ({ first: null, second: null, third: null }));

const RANK_WEIGHTS: Record<keyof RankedAnswer, number> = {
  first: 3,
  second: 2,
  third: 1,
};

function normalisePercentage(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function toTitleCase(value: string): string {
  return value
    .split(' ')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function uniqueStrings(items: string[], limit?: number): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
      if (typeof limit === 'number' && result.length >= limit) break;
    }
  }
  return result;
}

function summariseVirtues(tagTotals: Record<string, number>): VirtueHighlight[] {
  const total = Object.values(tagTotals).reduce((acc, value) => acc + value, 0);
  const entries = Object.entries(tagTotals)
    .map(([id, score]) => {
      const meta = TAG_DETAILS[id] ?? { label: toTitleCase(id), description: '' };
      return {
        id,
        label: meta.label,
        description: meta.description,
        score,
        percentage: normalisePercentage(score, total),
      };
    })
    .sort((a, b) => b.score - a.score);
  return entries.slice(0, 4);
}

function buildNarrative(
  name: string,
  primary: TraitMeta,
  secondary: TraitMeta,
  storySeeds: string[]
): string {
  const identity = `${name} is ${primary.description}`;
  const secondaryLine =
    primary.id === secondary.id
      ? ''
      : ` Guided by the ${secondary.label.toLowerCase()}, you ${secondary.secondaryDescriptor}`;
  const seeds = storySeeds.length ? ` Moments that defined you: ${storySeeds.join(' ')}` : '';
  const motto = ` Motto: "${primary.motto}".`;
  return `${identity}${secondaryLine}${seeds}${motto}`.replace(/\s+/g, ' ').trim();
}

function buildMarkdown(
  displayName: string,
  primary: TraitMeta,
  secondary: TraitMeta,
  formDetails: FormDetail[],
  saberColor: string,
  saberAccent: string,
  hiltStyle: string,
  robeStyle: string,
  robeAccent: string,
  symbolicItem: string,
  comparisons: string[],
  themeSong: string,
  trainingChallenge: string,
  holoMessage: string,
  narrative: string
): string {
  const formLines = formDetails
    .map((form, idx) => {
      const label = idx === 0 ? 'Primary' : idx === 1 ? 'Secondary' : 'Tertiary';
      return `- **${label}: ${form.name}** – ${form.rationale}`;
    })
    .join('\n');
  const comparisonsLine = comparisons.join(', ');
  const forceAlignmentExtra =
    primary.id === secondary.id
      ? primary.forceAlignment
      : `${primary.forceAlignment} The teachings of the ${secondary.label} also shape you: ${secondary.forceAlignment}`;
  return [
    '## Jedi Profile',
    '',
    `**Name:** ${displayName}`,
    `**Archetype:** ${primary.label} — ${primary.tagline}`,
    `**Ceremonial Role:** ${primary.ceremonialRole}`,
    '',
    '### Lightsaber Forms',
    formLines,
    '',
    '### Force Alignment',
    forceAlignmentExtra,
    '',
    '### Lightsaber Details',
    `- **Blade Colour:** ${saberColor} (accented by ${saberAccent})`,
    `- **Hilt Style:** ${hiltStyle}`,
    `- **Ignition Sound:** ${primary.ignitionSound}`,
    '',
    '### Robes/Armour',
    `${robeStyle} ${primary.id === secondary.id ? '' : `Accent: ${robeAccent}`}`.trim(),
    '',
    '### Symbolic Item',
    symbolicItem,
    '',
    '### Backstory',
    narrative,
    '',
    '### Famous Jedi Comparisons',
    comparisonsLine,
    '',
    '### Theme Song',
    themeSong,
    '',
    '### Training Challenge',
    trainingChallenge,
    '',
    '### Holo-message',
    `*"${holoMessage}"*`,
  ].join('\n');
}

function combineFormDetails(primary: TraitMeta, secondary: TraitMeta): FormDetail[] {
  const combined: FormDetail[] = [];
  const pushForm = (form: FormDetail, origin: 'primary' | 'secondary') => {
    const exists = combined.some((existing) => existing.name === form.name);
    if (exists) return;
    if (origin === 'primary') {
      combined.push(form);
    } else {
      combined.push({
        name: form.name,
        rationale: `${form.rationale} (tempered by the wisdom of the ${secondary.label})`,
      });
    }
  };
  primary.forms.forEach((form) => pushForm(form, 'primary'));
  secondary.forms.forEach((form) => pushForm(form, 'secondary'));
  return combined.slice(0, 3);
}

function mergeUnique<T extends { title: string }>(
  primaryItems: T[],
  secondaryItems: T[],
  limit?: number
): T[] {
  const titles = new Set<string>();
  const result: T[] = [];
  for (const item of [...primaryItems, ...secondaryItems]) {
    if (titles.has(item.title)) continue;
    titles.add(item.title);
    result.push(item);
    if (typeof limit === 'number' && result.length >= limit) break;
  }
  return result;
}

function mergeStringArrays(a: string[], b: string[], limit?: number): string[] {
  return uniqueStrings([...a, ...b], limit);
}

export function generateProfile(
  name: string | undefined,
  answers: RankedAnswer[]
): { profile: string; data: JediProfileData } {
  const totals: Record<Trait, number> = {
    guardian: 0,
    consular: 0,
    sentinel: 0,
    seer: 0,
    wanderer: 0,
  };
  const tagTotals: Record<string, number> = {};
  const storySeeds: string[] = [];

  answers.forEach((answer, index) => {
    const question = QUESTIONS_INTERNAL[index];
    if (!question) return;
    (['first', 'second', 'third'] as (keyof RankedAnswer)[]).forEach((rank) => {
      const selection = answer?.[rank];
      if (!selection) return;
      const option = question.options.find((opt) => opt.label === selection);
      if (!option) return;
      const weight = RANK_WEIGHTS[rank];
      Object.entries(option.traits).forEach(([traitKey, value]) => {
        const trait = traitKey as Trait;
        totals[trait] += value * weight;
      });
      option.tags.forEach((tag) => {
        tagTotals[tag] = (tagTotals[tag] ?? 0) + weight;
      });
      if (rank === 'first' && option.storyHook) {
        storySeeds.push(option.storyHook);
      }
    });
  });

  const totalScore = Object.values(totals).reduce((acc, value) => acc + value, 0);
  const traitBreakdown: TraitBreakdown[] = (Object.keys(totals) as Trait[])
    .map((trait) => {
      const meta = TRAIT_DETAILS[trait];
      const score = totals[trait];
      return {
        trait,
        label: meta.label,
        tagline: meta.tagline,
        score,
        percentage: normalisePercentage(score, totalScore),
        description: meta.description,
      };
    })
    .sort((a, b) => b.score - a.score);

  const primary = TRAIT_DETAILS[traitBreakdown[0]?.trait ?? 'guardian'];
  const secondary = TRAIT_DETAILS[traitBreakdown[1]?.trait ?? primary.id];

  const formDetails = combineFormDetails(primary, secondary);
  const saberColor = primary.saberColor;
  const saberAccent = secondary.id === primary.id ? 'subtle silver flecks' : secondary.saberColor;
  const hiltStyle = primary.hiltStyle;
  const robeStyle = primary.robeStyle;
  const robeAccent = secondary.id === primary.id ? primary.robeAccent : secondary.robeAccent;
  const symbolicItem = primary.symbolicItem;
  const comparisons = mergeStringArrays(primary.comparisons, secondary.comparisons, 3);
  const themeSong = secondary.id === primary.id
    ? primary.themeSong
    : `${primary.themeSong} / ${secondary.themeSong}`;
  const trainingChallenge =
    secondary.id === primary.id
      ? primary.trainingChallenge
      : `${primary.trainingChallenge} Secondary focus: ${secondary.trainingChallenge}`;
  const holoMessage = primary.quote;

  const trainingModules = mergeUnique(primary.trainingModules, secondary.trainingModules, 5);
  const missions = mergeUnique(primary.missions, secondary.missions, 4);
  const meditations = mergeStringArrays(primary.meditations, secondary.meditations, 4);
  const holocrons = mergeStringArrays(primary.holocrons, secondary.holocrons, 4);
  const gear = mergeStringArrays(primary.gear, secondary.gear, 4);
  const kyberCrystals = mergeStringArrays(primary.kyberCrystals, secondary.kyberCrystals, 4);
  const abilityFocus = mergeStringArrays(primary.abilityFocus, secondary.abilityFocus, 4);
  const starMap = [...primary.starMap.slice(0, 2), ...(secondary.starMap.slice(0, 1))];
  const timeline = [...primary.timeline.slice(0, 2), ...(secondary.timeline.slice(0, 1))];

  const displayName = name && name.trim().length > 0 ? name.trim() : 'Padawan';
  const narrative = buildNarrative(displayName, primary, secondary, storySeeds);
  const markdown = buildMarkdown(
    displayName,
    primary,
    secondary,
    formDetails,
    saberColor,
    saberAccent,
    hiltStyle,
    robeStyle,
    robeAccent,
    symbolicItem,
    comparisons,
    themeSong,
    trainingChallenge,
    holoMessage,
    narrative
  );

  const virtueHighlights = summariseVirtues(tagTotals);

  const data: JediProfileData = {
    name: displayName,
    archetype: {
      id: primary.id,
      label: primary.label,
      tagline: primary.tagline,
      description: primary.description,
      motto: primary.motto,
      ceremonialRole: primary.ceremonialRole,
      forceAlignment: primary.forceAlignment,
    },
    secondary: {
      id: secondary.id,
      label: secondary.label,
      tagline: secondary.tagline,
    },
    saber: {
      color: saberColor,
      accent: saberAccent,
      hiltStyle,
      ignitionSound: primary.ignitionSound,
      formDetails,
      kyberCrystals,
    },
    robeStyle,
    robeAccent,
    symbolicItem,
    comparisons,
    quote: primary.quote,
    themeSong,
    trainingChallenge,
    trainingModules,
    missions,
    meditations,
    holocrons,
    gear,
    companion: primary.companion,
    rival: secondary.id === primary.id ? primary.rival : secondary.rival,
    starMap,
    timeline,
    traitBreakdown,
    virtueHighlights,
    abilityFocus,
    narrative,
    holoMessage,
  };

  return { profile: markdown, data };
}
