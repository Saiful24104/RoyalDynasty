// Game Types and Interfaces

export interface Resources {
  gold: number;
  food: number;
  wood: number;
  stone: number;
  iron: number;
  mana: number;
  silver: number;
  prestige: number;
}

export interface Kingdom {
  id: string;
  name: string;
  ruler: Ruler;
  capital: Capital;
  resources: Resources;
  treasury: number;
  population: number;
  stability: number;
  diplomacy: Relationship[];
  createdAt: number;
  lastUpdated: number;
}

export interface Ruler {
  id: string;
  name: string;
  title: string;
  age: number;
  reign: number;
  skills: RulerSkills;
  traits: string[];
  consort: Consort | null;
  heir: Heir | null;
  legitimacy: number;
  species: string;
  house: string; // Noble house name
  rank: NobleRank;
}

export interface RulerSkills {
  leadership: number;
  diplomacy: number;
  military: number;
  wisdom: number;
  charisma: number;
}

export interface Consort {
  id: string;
  name: string;
  title: string;
  traits: string[];
  influence: number;
}

export interface Heir {
  id: string;
  name: string;
  age: number;
  legitimacy: number;
  traits: string[];
  potential: RulerSkills;
  // Incubation system
  isIncubating?: boolean;
  incubationMonthsRemaining?: number;
  incubationResources?: {
    goldInvested: number;
    foodInvested: number;
    manaInvested: number;
  };
  cultivationPath?: CultivationPath;
}

export interface Capital {
  id: string;
  name: string;
  buildings: Building[];
  population: number;
  prosperity: number;
  defense: number;
  court: CourtSystem;
  academy: Academy;
}

export interface Building {
  id: string;
  type: BuildingType;
  level: number;
  constructionProgress: number;
  productionMultiplier: number;
  maintenanceCost: number;
  isConstructing: boolean;
}

export enum BuildingType {
  CASTLE = 'castle',
  BARRACKS = 'barracks',
  FARM = 'farm',
  MARKET = 'market',
  UNIVERSITY = 'university',
  LIBRARY = 'library',
  TEMPLE = 'temple',
  WORKSHOP = 'workshop',
  WAREHOUSE = 'warehouse',
  WALLS = 'walls',
  BANK = 'bank',
  FORGE = 'forge',
  TAVERN = 'tavern',
  TRADE_POST = 'trade_post',
  MILL = 'mill',
  HARBOR = 'harbor',
}

export enum NobleRank {
  EMPEROR = 'emperor',
  KING = 'king',
  DUKE = 'duke',
  MARQUIS = 'marquis',
  COUNT = 'count',
  VISCOUNT = 'viscount',
  BARON = 'baron',
  KNIGHT = 'knight',
  LORD = 'lord',
  LANDED_GENTRY = 'landed_gentry',
}

export enum Species {
  HUMAN = 'human',
  ELF = 'elf',
  DWARF = 'dwarf',
  ORC = 'orc',
  HALF_ELF = 'half_elf',
  GOBLIN = 'goblin',
  DRAGONBORN = 'dragonborn',
  GNOME = 'gnome',
  HALFLING = 'halfling',
  TIEFLING = 'tiefling',
}

export interface Army {
  id: string;
  name: string;
  units: Unit[];
  commander: Commander;
  morale: number;
  readiness: number;
}

export interface Unit {
  id: string;
  type: UnitType;
  count: number;
  health: number;
  training: number;
}

export enum UnitType {
  INFANTRY = 'infantry',
  CAVALRY = 'cavalry',
  ARCHER = 'archer',
  MAGE = 'mage',
  KNIGHT = 'knight',
  SIEGE_WEAPON = 'siege_weapon',
}

export interface Commander {
  id: string;
  name: string;
  rank: string;
  experience: number;
  skills: number[];
}

export interface NobleCouncil {
  id: string;
  nobles: Noble[];
  influence: Map<string, number>;
  factions: Faction[];
}

export interface Noble {
  id: string;
  name: string;
  title: string;
  power: number;
  wealth: number;
  loyalty: number;
  traits: string[];
  faction: string;
}

export interface Faction {
  id: string;
  name: string;
  members: string[];
  influence: number;
  goals: string[];
}

export interface Market {
  id: string;
  goods: Good[];
  prices: Map<string, number>;
  tradingRoutes: TradingRoute[];
  merchants: Merchant[];
}

export interface Good {
  id: string;
  name: string;
  type: string;
  quantity: number;
  basePrice: number;
}

export interface TradingRoute {
  id: string;
  from: string;
  to: string;
  goods: string[];
  profitMargin: number;
  riskLevel: number;
  isActive: boolean;
}

export interface Merchant {
  id: string;
  name: string;
  wealth: number;
  reputation: number;
  specialties: string[];
}

export interface Relationship {
  kingdomId: string;
  relationshipValue: number;
  tradeAgreement: boolean;
  militaryAlliance: boolean;
  hostility: boolean;
}

export interface GameState {
  kingdom: Kingdom;
  armies: Army[];
  council: NobleCouncil;
  market: Market;
  gameTime: GameTime;
  events: GameEvent[];
  bloodlines: Bloodline[];
  houses: House[];
  heroes: Hero[];
  guilds: Guild[];
  tavern: Tavern;
  worldMap: WorldMap;
  // New systems
  nobleHouses: NobleHouse[];
  enemyDynasties: EnemyDynasty[];
  successionLaw: SuccessionLaw;
  influenceSystem: InfluenceSystem;
  generalLedger: GeneralLedger;
  continents: Continent[];
  estates: Estate[];
}

export interface GameTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  speed: number;
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: number;
  resolved: boolean;
  choices: EventChoice[];
}

export enum EventType {
  POLITICAL = 'political',
  MILITARY = 'military',
  ECONOMIC = 'economic',
  NATURAL = 'natural',
  DIPLOMATIC = 'diplomatic',
  SUCCESSION = 'succession',
}

export interface EventChoice {
  id: string;
  text: string;
  consequences: Consequences;
  outcome: string;
}

export interface Consequences {
  resources: Partial<Resources>;
  stability: number;
  legitimacy: number;
  morale: number;
}

export interface CourtSystem {
  id: string;
  throneRoomLevel: number;
  courtMembers: CourtMember[];
  ceremonies: Ceremony[];
  prestige: number;
}

export interface CourtMember {
  id: string;
  name: string;
  role: CourtRole;
  influence: number;
  loyalty: number;
}

export enum CourtRole {
  CHANCELLOR = 'chancellor',
  COURT_WIZARD = 'court_wizard',
  KEEPER_OF_SEALS = 'keeper_of_seals',
  MASTER_OF_COIN = 'master_of_coin',
  CHIEF_JUSTICIAR = 'chief_justiciar',
}

export interface Ceremony {
  id: string;
  name: string;
  type: CeremonyType;
  cost: number;
  prestigeGain: number;
  loyaltyImpact: number;
}

export enum CeremonyType {
  CORONATION = 'coronation',
  FEAST = 'feast',
  TOURNAMENT = 'tournament',
  BLESSING = 'blessing',
}

export interface Bloodline {
  id: string;
  name: string;
  members: BloodlineMember[];
  prestige: number;
  traits: BloodlineTrait[];
}

export interface BloodlineMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  health: number;
  potential: number;
}

export interface BloodlineTrait {
  id: string;
  name: string;
  description: string;
  effect: number;
}

export interface House {
  id: string;
  name: string;
  sigil: string;
  words: string;
  members: HouseMember[];
  power: number;
  wealth: number;
  landedTitles: string[];
}

export interface HouseMember {
  id: string;
  name: string;
  title: string;
  age: number;
  skills: number[];
}

export interface Hero {
  id: string;
  name: string;
  title: string;
  level: number;
  experience: number;
  skills: HeroSkill[];
  equipment: Equipment[];
  story: string;
}

export interface HeroSkill {
  id: string;
  name: string;
  level: number;
  effect: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  rarity: string;
  bonus: number;
}

export interface Guild {
  id: string;
  name: string;
  type: GuildType;
  level: number;
  members: GuildMember[];
  treasury: number;
  quests: Quest[];
}

export enum GuildType {
  MERCHANTS = 'merchants',
  ASSASSINS = 'assassins',
  MAGES = 'mages',
  WARRIORS = 'warriors',
  THIEVES = 'thieves',
}

export interface GuildMember {
  id: string;
  name: string;
  rank: string;
  skills: string[];
  reputation: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: string;
  status: QuestStatus;
}

export enum QuestStatus {
  AVAILABLE = 'available',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Tavern {
  id: string;
  name: string;
  level: number;
  patrons: Patron[];
  rumors: Rumor[];
  treasury: number;
}

export interface Patron {
  id: string;
  name: string;
  type: string;
  loyalty: number;
  goldSpent: number;
}

export interface Rumor {
  id: string;
  content: string;
  source: string;
  importance: number;
  verified: boolean;
}

export interface Academy {
  id: string;
  name: string;
  level: number;
  students: Scholar[];
  courses: Course[];
  knowledgePool: number;
}

export interface Scholar {
  id: string;
  name: string;
  specialization: string;
  level: number;
  progress: number;
}

export interface Course {
  id: string;
  name: string;
  subject: string;
  duration: number;
  benefit: string;
}

export interface WorldMap {
  id: string;
  regions: Region[];
  playerTerritories: Territory[];
}

export interface Region {
  id: string;
  name: string;
  type: string;
  population: number;
  resources: Partial<Resources>;
  controlled_by: string;
}

export interface Territory {
  id: string;
  name: string;
  regionId: string;
  prosperity: number;
  defenses: number;
}

// ===== NOBLE HOUSES SYSTEM =====
export interface NobleHouse {
  id: string;
  name: string;
  trait: string;
  eliteUnit: string;
  uniqueAbility: string;
  description: string;
  relationship?: number; // 0-100, must be > 70 to unlock elite unit
  members?: HouseMember[];
}

export interface EliteUnit extends Unit {
  houseId: string;
  houseName: string;
  specialAbility: string;
  bonusStats: {
    defense?: number;
    damage?: number;
    speed?: number;
    magicDamage?: number;
  };
}

// ===== ENEMY DYNASTIES =====
export interface EnemyDynasty {
  id: string;
  name: string;
  kingdom: string;
  rivalHouse: string;
  eliteThreat: string;
  threat_level: number; // 0-100
  isAtWar?: boolean;
  relations?: number;
}

// ===== SUCCESSION LAWS =====
export interface SuccessionLaw {
  id: string;
  name: string;
  description: string;
  bias: string;
  legitimacy_requirement: number;
}

// ===== GEOGRAPHIC ENGINE (3-Layer System) =====
export interface Continent {
  id: string;
  name: string;
  kingdoms: Kingdom[];
  environmentalHazards: EnvironmentalNode[];
}

export interface EnvironmentalNode {
  id: string;
  type: 'beast_nest' | 'river' | 'mountain' | 'forest' | 'swamp' | 'desert';
  location: { x: number; y: number };
  difficulty: number;
  resources?: Partial<Resources>;
  threat?: number;
}

export interface Estate {
  id: string;
  name: string;
  location: { x: number; y: number };
  owner: string;
  prosperity: number;
  defenses: number;
  population: number;
  resources: Partial<Resources>;
}

// ===== INFLUENCE & BACKLASH SYSTEM =====
export interface InfluenceSystem {
  currentInfluence: number; // 0-100
  sources: InfluenceSource[];
  backlashCounter: number; // Accumulates when influence > 70
  internalFriction: number; // Resistance from within
  externalBacklash: number; // External opposition
}

export interface InfluenceSource {
  id: string;
  source: string; // 'marriage', 'academy', 'council_control', etc.
  amount: number;
  timestamp: number;
}

// ===== CULTIVATION PATH SYSTEM =====
export interface CultivationPath {
  id: string;
  name: string;
  type: 'aetheria' | 'luminous' | 'martial' | 'scholarly';
  level: number;
  progress: number; // 0-100
  bonuses: {
    strength?: number;
    magic?: number;
    wisdom?: number;
    charisma?: number;
  };
  abilities: CultivationAbility[];
}

export interface CultivationAbility {
  id: string;
  name: string;
  description: string;
  level: number;
  effect: string;
}

// ===== FINANCIAL AUDITING SYSTEM =====
export interface GeneralLedger {
  id: string;
  entries: LedgerEntry[];
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  lastUpdated: number;
}

export interface LedgerEntry {
  id: string;
  date: number;
  description: string;
  category: 'income' | 'expense' | 'transfer';
  amount: number;
  source?: string;
  destination?: string;
}

export interface RivalAudit {
  id: string;
  targetHouse: string;
  dateInitiated: number;
  findings: AuditFinding[];
  suspicions: string[];
  completed: boolean;
}

export interface AuditFinding {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidence: string;
}
