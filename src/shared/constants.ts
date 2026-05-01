// Game Constants

export const GAME_SPEED = {
  PAUSE: 0,
  SLOW: 1,
  NORMAL: 5,
  FAST: 10,
  VERY_FAST: 20,
};

export const RESOURCE_PRODUCTION = {
  FARM: { food: 10 },
  MINE: { stone: 5, iron: 3 },
  FOREST: { wood: 8 },
  TRADE_POST: { gold: 15 },
};

export const UNIT_COSTS = {
  INFANTRY: { gold: 10, food: 2 },
  CAVALRY: { gold: 25, food: 3 },
  ARCHER: { gold: 15, food: 2 },
  MAGE: { gold: 50, food: 1 },
  KNIGHT: { gold: 40, food: 3 },
  SIEGE_WEAPON: { gold: 100, food: 2 },
};

export const BUILDING_CONSTRUCTION_TIME = {
  FARM: 300000, // milliseconds
  BARRACKS: 600000,
  CASTLE: 1800000,
  MARKET: 300000,
  UNIVERSITY: 900000,
  WALLS: 1200000,
};

export const MAINTENANCE_COSTS = {
  ARMY: { gold: 50, food: 100 },
  CASTLE: { gold: 25 },
  WALLS: { gold: 20 },
  BUILDINGS: { gold: 10 },
};

export const INITIAL_RESOURCES = {
  gold: 5000,
  food: 2000,
  wood: 1000,
  stone: 800,
  iron: 200,
  mana: 100,
  silver: 500,
  prestige: 0,
};

export const STABILITY_THRESHOLDS = {
  CRITICAL: 20,
  LOW: 40,
  MEDIUM: 60,
  HIGH: 80,
};

export const HEIR_AGE_OF_SUCCESSION = 16;
export const HEIR_MINIMUM_LEGITIMACY = 0.5;

// ===== NOBLE HOUSES SYSTEM (15 Houses) =====
export const NOBLE_HOUSES = [
  {
    id: 'house_iron_thorne',
    name: 'Iron-Thorne',
    trait: 'Resolute',
    eliteUnit: 'Iron Phalanx',
    uniqueAbility: '+40% Physical Defense; Cheap Forts',
    description: 'Masters of defense and fortification',
  },
  {
    id: 'house_gold_coin',
    name: 'Gold-Coin',
    trait: 'Opulent',
    eliteUnit: 'Gilded Assassins',
    uniqueAbility: '+50% Crit; Gold Theft per hit',
    description: 'Wealthy merchants and thieves',
  },
  {
    id: 'house_silver_leaf',
    name: 'Silver-Leaf',
    trait: 'Mystical',
    eliteUnit: 'Arcane Archers',
    uniqueAbility: 'Magic DMG; Ignores 20% Armor',
    description: 'Masters of magic and ranged combat',
  },
  {
    id: 'house_night_shade',
    name: 'Night-Shade',
    trait: 'Shadowy',
    eliteUnit: 'Shadow Stalkers',
    uniqueAbility: 'Invisible on World Map; Sabotage',
    description: 'Spies and assassins',
  },
  {
    id: 'house_wild_claw',
    name: 'Wild-Claw',
    trait: 'Primal',
    eliteUnit: 'Behemoth Riders',
    uniqueAbility: 'High HP; Ignore Forest penalties',
    description: 'Beast tamers and wilderness masters',
  },
  {
    id: 'house_sky_wing',
    name: 'Sky-Wing',
    trait: 'Elevated',
    eliteUnit: 'Falcon Knights',
    uniqueAbility: 'Aerial Recon; 3-tile Fog Reveal',
    description: 'Aerial supremacy and reconnaissance',
  },
  {
    id: 'house_deep_current',
    name: 'Deep-Current',
    trait: 'Fluid',
    eliteUnit: 'Tide-Breakers',
    uniqueAbility: 'Amphibious; No Water/Swamp penalty',
    description: 'Naval masters and water dwellers',
  },
  {
    id: 'house_sun_forge',
    name: 'Sun-Forge',
    trait: 'Industrial',
    eliteUnit: 'Solar Engineers',
    uniqueAbility: '2x Speed for Bridge/Fort construction',
    description: 'Engineering and industrial innovation',
  },
  {
    id: 'house_stone_skin',
    name: 'Stone-Skin',
    trait: 'Stalwart',
    eliteUnit: 'Dwarf Sappers',
    uniqueAbility: 'Bonus DMG to Enemy Forts/Walls',
    description: 'Mountain dwellers and siege masters',
  },
  {
    id: 'house_frost_bite',
    name: 'Frost-Bite',
    trait: 'Frigid',
    eliteUnit: 'Ice-Vein Wraiths',
    uniqueAbility: 'Slows enemy movement by 30%',
    description: 'Arctic warriors and ice mages',
  },
  {
    id: 'house_ember_heart',
    name: 'Ember-Heart',
    trait: 'Volatile',
    eliteUnit: 'Fire-Brand Mages',
    uniqueAbility: 'High AOE Magic Damage; Burns terrain',
    description: 'Fire wielders and destructive mages',
  },
  {
    id: 'house_wind_walker',
    name: 'Wind-Walker',
    trait: 'Swift',
    eliteUnit: 'Storm Cavalry',
    uniqueAbility: 'Highest Move Speed; Charge Bonus',
    description: 'The fastest warriors in the realm',
  },
  {
    id: 'house_oak_root',
    name: 'Oak-Root',
    trait: 'Organic',
    eliteUnit: 'Elder Healers',
    uniqueAbility: '-40% Casualty rate post-battle',
    description: 'Nature druids and healers',
  },
  {
    id: 'house_blood_oath',
    name: 'Blood-Oath',
    trait: 'Fanatical',
    eliteUnit: 'Zealot Guard',
    uniqueAbility: 'DMG increases as HP drops; No retreat',
    description: 'Fanatical warriors of unstoppable faith',
  },
  {
    id: 'house_iron_mind',
    name: 'Iron-Mind',
    trait: 'Analytical',
    eliteUnit: 'System Auditors',
    uniqueAbility: 'Increases SP (System Points) gain',
    description: 'Scholars and system auditors',
  },
];

// ===== ENEMY DYNASTIES (5 Major Antagonists) =====
export const ENEMY_DYNASTIES = [
  {
    id: 'dynasty_valerius',
    name: 'Valerius Hegemony',
    kingdom: 'Iron Peaks',
    rivalHouse: 'house_iron_thorne',
    eliteThreat: 'Peak-Crushers (Sunders Walls)',
    threat_level: 95,
  },
  {
    id: 'dynasty_gilded',
    name: 'Gilded Republic',
    kingdom: 'Gilded Coast',
    rivalHouse: 'house_gold_coin',
    eliteThreat: 'Coin-Shield Guard (Bribes Vassals)',
    threat_level: 85,
  },
  {
    id: 'dynasty_shadow',
    name: 'Shadow Syndicate',
    kingdom: 'Shadow Vales',
    rivalHouse: 'house_night_shade',
    eliteThreat: 'Faceless Infiltrators (Supply Sabotage)',
    threat_level: 90,
  },
  {
    id: 'dynasty_azure',
    name: 'Azure Shogunate',
    kingdom: 'Azure Reach',
    rivalHouse: 'house_deep_current',
    eliteThreat: 'Leviathan Dragoons (Water Submerge)',
    threat_level: 88,
  },
  {
    id: 'dynasty_eternal',
    name: 'Eternal Coven',
    kingdom: 'Whispering Woods',
    rivalHouse: 'house_ember_heart',
    eliteThreat: 'Arcane Devastators (Reality Warping)',
    threat_level: 100,
  },
];

// ===== SUCCESSION LAWS =====
export const SUCCESSION_LAWS = {
  PRIMOGENITURE: {
    id: 'primogeniture',
    name: 'Primogeniture',
    description: 'Crown passes to the eldest son',
    bias: 'maleFemale',
    legitimacy_requirement: 0.5,
  },
  AGNATIC_COGNATIC: {
    id: 'agnatic_cognatic',
    name: 'Agnatic-Cognatic',
    description: 'Eldest child inherits, regardless of gender',
    bias: 'none',
    legitimacy_requirement: 0.5,
  },
  ELECTIVE: {
    id: 'elective',
    name: 'Elective Monarchy',
    description: 'Nobles vote for the next ruler',
    bias: 'none',
    legitimacy_requirement: 0.3,
  },
  TANISTRY: {
    id: 'tanistry',
    name: 'Tanistry',
    description: 'Family chooses from eligible members',
    bias: 'power_based',
    legitimacy_requirement: 0.6,
  },
  MERITOCRACY: {
    id: 'meritocracy',
    name: 'Meritocracy',
    description: 'Most skilled heir becomes ruler',
    bias: 'skills',
    legitimacy_requirement: 0.4,
  },
};

// ===== HEIR INCUBATION (9-month system) =====
export const HEIR_INCUBATION_MONTHS = 9;
export const HEIR_STAT_GROWTH_RATE = 0.15; // 15% growth per month with resources

// ===== INFLUENCE & BACKLASH SYSTEM =====
export const INFLUENCE_SETTINGS = {
  MAX_INFLUENCE: 100,
  MARRIAGE_INFLUENCE_COST: 30,
  ACADEMY_INFLUENCE_COST: 20,
  BACKLASH_THRESHOLD: 70, // At 70+ influence, backlash occurs
  BACKLASH_PENALTY: 5,
  BACKLASH_STABILITY_LOSS: 10,
};
