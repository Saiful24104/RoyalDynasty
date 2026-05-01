// Game Initializer - Create new game with default values

import { 
  GameState, Kingdom, Ruler, Capital, RulerSkills, NobleCouncil, Market, GameTime, Army, Unit, UnitType, 
  Bloodline, House, Hero, Guild, Tavern, Academy, WorldMap, CourtSystem, NobleHouse, EnemyDynasty, SuccessionLaw,
  InfluenceSystem, GeneralLedger, Continent, Estate, EnvironmentalNode
} from '../shared/types';
import { 
  INITIAL_RESOURCES, NOBLE_HOUSES, ENEMY_DYNASTIES, SUCCESSION_LAWS, 
  HEIR_INCUBATION_MONTHS, INFLUENCE_SETTINGS
} from '../shared/constants';

export function initializeNewGame(rulerName: string, kingdomName: string): GameState {
  const rulerSkills: RulerSkills = {
    leadership: 70,
    diplomacy: 60,
    military: 65,
    wisdom: 70,
    charisma: 75,
  };

  const ruler: Ruler = {
    id: `ruler_${Date.now()}`,
    name: rulerName,
    title: 'King',
    age: 35,
    reign: 5,
    skills: rulerSkills,
    traits: ['Wise', 'Just'],
    consort: null,
    heir: null,
    legitimacy: 1.0,
  };

  const capital: Capital = {
    id: `capital_${Date.now()}`,
    name: `${kingdomName} Capital`,
    buildings: [
      {
        id: 'castle_main',
        type: 'castle' as any,
        level: 1,
        constructionProgress: 100,
        productionMultiplier: 1.0,
        maintenanceCost: 50,
        isConstructing: false,
      },
      {
        id: 'farm_main',
        type: 'farm' as any,
        level: 2,
        constructionProgress: 100,
        productionMultiplier: 1.2,
        maintenanceCost: 20,
        isConstructing: false,
      },
      {
        id: 'market_main',
        type: 'market' as any,
        level: 1,
        constructionProgress: 100,
        productionMultiplier: 1.0,
        maintenanceCost: 25,
        isConstructing: false,
      },
    ],
    population: 5000,
    prosperity: 70,
    defense: 50,
    court: {
      id: `court_${Date.now()}`,
      throneRoomLevel: 1,
      courtMembers: [],
      ceremonies: [],
      prestige: 50,
    },
    academy: {
      id: `academy_${Date.now()}`,
      name: `${kingdomName} Academy of Magic`,
      level: 1,
      students: [],
      courses: [],
      knowledgePool: 100,
    },
  };

  const kingdom: Kingdom = {
    id: `kingdom_${Date.now()}`,
    name: kingdomName,
    ruler,
    capital,
    resources: { ...INITIAL_RESOURCES },
    treasury: 10000,
    population: 5000,
    stability: 75,
    diplomacy: [],
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  };

  const council: NobleCouncil = {
    id: `council_${Date.now()}`,
    nobles: [
      {
        id: 'noble_1',
        name: 'Lord Marcus',
        title: 'Grand Duke',
        power: 85,
        wealth: 5000,
        loyalty: 80,
        traits: ['Ambitious', 'Honorable'],
        faction: 'loyalists',
      },
      {
        id: 'noble_2',
        name: 'Lady Eleanor',
        title: 'Duchess',
        power: 70,
        wealth: 3000,
        loyalty: 75,
        traits: ['Shrewd', 'Diplomatic'],
        faction: 'merchants',
      },
    ],
    influence: new Map([
      ['loyalists', 60],
      ['merchants', 40],
    ]),
    factions: [
      {
        id: 'faction_loyalists',
        name: 'Loyalists',
        members: ['noble_1'],
        influence: 60,
        goals: ['Strengthen the Crown', 'Expand Territory'],
      },
      {
        id: 'faction_merchants',
        name: 'Merchant Guild',
        members: ['noble_2'],
        influence: 40,
        goals: ['Increase Trade', 'Reduce Taxes'],
      },
    ],
  };

  const market: Market = {
    id: `market_${Date.now()}`,
    goods: [
      { id: 'wheat', name: 'Wheat', type: 'food', quantity: 1000, basePrice: 10 },
      { id: 'gold_coin', name: 'Gold Coin', type: 'currency', quantity: 5000, basePrice: 1 },
      { id: 'timber', name: 'Timber', type: 'resource', quantity: 800, basePrice: 15 },
      { id: 'stone', name: 'Stone', type: 'resource', quantity: 500, basePrice: 20 },
      { id: 'iron', name: 'Iron', type: 'resource', quantity: 300, basePrice: 30 },
    ],
    prices: new Map([
      ['wheat', 10],
      ['gold_coin', 1],
      ['timber', 15],
      ['stone', 20],
      ['iron', 30],
    ]),
    tradingRoutes: [],
    merchants: [],
  };

  const mainArmy: Army = {
    id: `army_main_${Date.now()}`,
    name: 'Royal Army',
    units: [
      { id: 'unit_inf_1', type: UnitType.INFANTRY, count: 500, health: 100, training: 75 },
      { id: 'unit_cav_1', type: UnitType.CAVALRY, count: 100, health: 100, training: 80 },
      { id: 'unit_arch_1', type: UnitType.ARCHER, count: 200, health: 100, training: 70 },
    ],
    commander: {
      id: 'commander_1',
      name: 'General Robert',
      rank: 'General',
      experience: 85,
      skills: [80, 75, 85],
    },
    morale: 85,
    readiness: 80,
  };

  const gameTime: GameTime = {
    year: 1000,
    month: 6,
    day: 15,
    hour: 12,
    minute: 0,
    speed: 1,
  };

  const bloodlines: Bloodline[] = [
    {
      id: 'bloodline_main',
      name: `House ${kingdomName}`,
      members: [],
      prestige: 100,
      traits: [],
    },
  ];

  const houses: House[] = [
    {
      id: 'house_main',
      name: `House ${kingdomName}`,
      sigil: '⚜️',
      words: 'Honor, Duty, Legacy',
      members: [{ id: 'lord_1', name: rulerName, title: 'Lord', age: 35, skills: [70, 60, 65] }],
      power: 80,
      wealth: 10000,
      landedTitles: ['Capital', 'Northern Province'],
    },
  ];

  const heroes: Hero[] = [
    {
      id: 'hero_main',
      name: 'Champion of the Realm',
      title: 'Legendary Warrior',
      level: 10,
      experience: 5000,
      skills: [
        { id: 'skill_1', name: 'Swordsmanship', level: 10, effect: '+50% melee damage' },
        { id: 'skill_2', name: 'Leadership', level: 8, effect: '+20% unit morale' },
      ],
      equipment: [],
      story: 'A legendary warrior of great renown',
    },
  ];

  const guilds: Guild[] = [
    {
      id: 'guild_merchants',
      name: 'Merchant Guild',
      type: 'merchants' as any,
      level: 2,
      members: [],
      treasury: 5000,
      quests: [],
    },
    {
      id: 'guild_mages',
      name: 'Circle of Mages',
      type: 'mages' as any,
      level: 1,
      members: [],
      treasury: 2000,
      quests: [],
    },
  ];

  const tavern: Tavern = {
    id: `tavern_${Date.now()}`,
    name: `The Crowned Lion`,
    level: 2,
    patrons: [],
    rumors: [],
    treasury: 1000,
  };

  const worldMap: WorldMap = {
    id: `map_${Date.now()}`,
    regions: [
      { id: 'region_1', name: 'Capital Region', type: 'urban', population: 10000, resources: { gold: 100, food: 500 }, controlled_by: kingdom.id },
      { id: 'region_2', name: 'Northern Lands', type: 'forest', population: 5000, resources: { wood: 300, food: 200 }, controlled_by: kingdom.id },
      { id: 'region_3', name: 'Mountain Hold', type: 'mountain', population: 3000, resources: { stone: 400, iron: 150 }, controlled_by: kingdom.id },
    ],
    playerTerritories: [
      { id: 'territory_1', name: 'Capital', regionId: 'region_1', prosperity: 80, defenses: 90 },
    ],
  };

  return {
    kingdom,
    armies: [mainArmy],
    council,
    market,
    gameTime,
    events: [],
    bloodlines,
    houses,
    heroes,
    guilds,
    tavern,
    worldMap,
    // New systems initialization
    nobleHouses: (NOBLE_HOUSES as any[]).map((house, index) => ({
      ...house,
      relationship: index === 0 ? 75 : Math.floor(Math.random() * 100),
      members: [],
    })),
    enemyDynasties: (ENEMY_DYNASTIES as any[]).map(dynasty => ({
      ...dynasty,
      isAtWar: false,
      relations: Math.floor(Math.random() * 50) - 50,
    })),
    successionLaw: SUCCESSION_LAWS.PRIMOGENITURE as any,
    influenceSystem: {
      currentInfluence: 30,
      sources: [],
      backlashCounter: 0,
      internalFriction: 5,
      externalBacklash: 0,
    },
    generalLedger: {
      id: `ledger_${Date.now()}`,
      entries: [
        {
          id: 'entry_initial',
          date: Date.now(),
          description: 'Kingdom founding capital',
          category: 'income',
          amount: 10000,
        },
      ],
      totalIncome: 10000,
      totalExpense: 0,
      netBalance: 10000,
      lastUpdated: Date.now(),
    },
    continents: [
      {
        id: 'continent_main',
        name: 'Aethelgard',
        kingdoms: [kingdom],
        environmentalHazards: [
          { id: 'node_1', type: 'beast_nest', location: { x: 50, y: 30 }, difficulty: 5, threat: 40 },
          { id: 'node_2', type: 'river', location: { x: 75, y: 60 }, difficulty: 0, resources: { food: 500 } },
          { id: 'node_3', type: 'mountain', location: { x: 20, y: 80 }, difficulty: 3, resources: { stone: 300, iron: 100 } },
        ],
      },
    ],
    estates: [
      {
        id: 'estate_1',
        name: 'Northern Estate',
        location: { x: 40, y: 20 },
        owner: kingdom.ruler.id,
        prosperity: 65,
        defenses: 50,
        population: 3000,
        resources: { gold: 500, food: 800, wood: 400 },
      },
    ],
  };
}

