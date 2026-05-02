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
  species: Species;
  createdAt: number;
  lastUpdated: number;
  // New systems
  imperialOverview?: ImperialOverview;
  imperialPillars?: ImperialPillar[];
  divineEdicts?: DivineEdict[];
  cultivationTree?: CultivationTree;
  attributeBreakthroughs?: AttributeBreakthrough[];
  realmManagement?: RealmManagementState;
  leyLineEconomy?: LeyLineEconomy;
  prophecyCountdown?: ProphecyCountdown;
  enhancedBloodline?: EnhancedBloodline;
  domainPulse?: DomainPulse;
  constellationMastery?: ConstellationMastery;
  namedHouses?: NamedHouse[];
  systemPoints?: number; // Currency for Edicts and Constellation
}

export interface Marriage {
  id: string;
  partnerA: string;
  partnerB: string;
  allianceType: 'dynastic' | 'political' | 'trade' | 'military';
  status: 'pending' | 'married' | 'annulled' | 'divorced';
  weddingDate: number;
  notes?: string;
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
  // New systems
  systemPoints?: number; // Currency for Edicts
  attributeBreakthroughs?: AttributeBreakthrough[];
  activePillars?: string[]; // Pillar IDs occupied by this ruler
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
  // New systems
  portraitPath?: string; // Dynamic portrait updates
  occupiesPillar?: boolean; // If occupies Seraphine seat
  houseAffiliation?: string;
  graceBuffActive?: boolean; // During heir incubation
  diplomacyBoost?: number;
  pietyBoost?: number;
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
  // Cultivation progression
  cultivationLevel?: number; // 1-100+
  cultivationProgress?: number; // 0-100
  ageStage?: 'infant' | 'youth' | 'adult' | 'elder';
  portraitPath?: string;
  systemEyePotential?: number; // 0-100
  bloodlineTalent?: string;
  unlockedTraits?: string[];
  inheritanceChance?: number; // Affected by cultivation level
  divineOmen?: {
    triggered: boolean;
    triggeredAt?: number;
    stats: Partial<RulerSkills>;
  };
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
  otherKingdoms: Kingdom[];
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
  marriages: Marriage[];
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
  leaderName?: string;
  leaderTitle?: string;
  kingdomId?: string;
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

// ===== IMPERIAL OVERVIEW SYSTEM =====
export interface ImperialOverview {
  id: string;
  vassalCount: number; // Number of minor vassals
  empireStability: number; // 0-100, average loyalty of 15 Named Houses
  demonicInfluence: number; // Was Corruption, now Demonic Influence (0-100)
}

// ===== COUNCIL OF TEN / IMPERIAL PILLARS =====
export enum ImperialPillarType {
  WAR = 'war',
  COIN = 'coin',
  SHADOW = 'shadow',
  SERAPHINE = 'seraphine', // Special Consort seat
  KNOWLEDGE = 'knowledge',
  FAITH = 'faith',
  TRADE = 'trade',
  ESPIONAGE = 'espionage',
  HARVEST = 'harvest',
  VOID = 'void',
}

export interface ImperialPillar {
  id: string;
  type: ImperialPillarType;
  name: string;
  occupant?: Hero | Noble | null; // Can be null if vacant
  description: string;
  worldAlteringEffect: {
    type: string;
    description: string;
    icon: string;
  };
  isActive: boolean;
  duration?: number; // Some effects might be temporary
}

// ===== DIVINE EDICTS SYSTEM =====
export enum EdictsType {
  IMPERIAL_CENSUS = 'imperial_census', // Reveal hidden resource nodes
  FORCED_CONSCRIPTION = 'forced_conscription', // Convert vassals to army power
  ROYAL_MARRIAGE_DECREE = 'royal_marriage_decree', // Guarantees 100% marriage success
  EYE_OF_TRUTH = 'eye_of_truth', // Reveal hidden potential of commoners
  DIVINE_BLESSING = 'divine_blessing',
  CULTURAL_RENAISSANCE = 'cultural_renaissance',
  HARVEST_MOON = 'harvest_moon',
  ETERNAL_DARKNESS = 'eternal_darkness',
}

export interface DivineEdict {
  id: string;
  type: EdictsType;
  name: string;
  description: string;
  cost: number; // System Points (SP) or Gold
  costType: 'sp' | 'gold';
  consequences: {
    resources?: Partial<Resources>;
    peasantLoyalty?: number; // Can be negative
    stability?: number;
  };
  active: boolean;
  dateActivated?: number;
}

// ===== CULTIVATION TREE (SP SYSTEM) =====
export interface CultivationTree {
  id: string;
  nodes: TreeNode[];
  pointsSpent: number;
  pointsAvailable: number;
}

export interface TreeNode {
  id: string;
  name: string;
  description: string;
  spCost: number;
  type: EdictsType;
  unlockedAt?: number;
  parentNodeId?: string;
  childNodeIds?: string[];
  permanentPassive?: string; // Description of permanent effect
  icon: string;
}

// ===== KING'S ATTRIBUTES BREAKTHROUGH EFFECTS =====
export interface AttributeBreakthrough {
  id: string;
  attribute: keyof RulerSkills;
  threshold: number; // 75, 80, etc.
  name: string;
  description: string;
  effect: string;
  unlockedAt?: number;
  isActive: boolean;
}

// ===== REALM MANAGEMENT SYSTEM (NURTURE/RULE/EXTRACT) =====
export enum RealmManagementMode {
  NURTURE = 'nurture', // Stability +10%, Mana +10%, Gold -5%
  RULE = 'rule', // Balanced approach
  EXTRACT = 'extract', // Gold +50%, Demonicinfluence +20%, Stability -20%, visually corrupts map
}

export interface RealmManagementState {
  currentMode: RealmManagementMode;
  modeChangedAt: number;
  extractionDuration?: number; // How long Extract mode is active
  corruptedNodes?: string[]; // Layer 3 nodes corrupted by Extract mode
}

// ===== LEY LINE ECONOMY =====
export interface LeyLineEconomy {
  id: string;
  manaWellsControlled: string[]; // Estate/region IDs
  riversControlled: string[]; // Estate/region IDs
  totalManaGeneration: number;
  tributePipeline: TributePipeline[];
  manaBar: {
    current: number;
    max: number;
    pulseIntensity: number; // Visual feedback
  };
}

export interface TributePipeline {
  id: string;
  sourceHouse: string; // Noble house name
  tributeResources: Partial<Resources>;
  frequency: 'weekly' | 'monthly' | 'yearly';
  nextDue: number;
  logs: TributeLog[];
}

export interface TributeLog {
  id: string;
  date: number;
  sourceName: string;
  resourcesDelivered: Partial<Resources>;
  message: string; // e.g., "House Iron-Thorne offers 500 Iron to the Imperial Forge"
}

// ===== PROPHECY COUNTDOWN =====
export interface ProphecyCountdown {
  id: string;
  kingdomsConquered: number; // 0-10
  endOfDaysTriggered: boolean;
  lastUpdateDate: number;
  milestoneEvents: MilestoneEvent[];
}

export interface MilestoneEvent {
  id: string;
  kingdomsRequired: number; // At 10, trigger major 2.0 shift
  name: string;
  description: string;
  triggered: boolean;
  triggeredAt?: number;
}

// ===== ENHANCED BLOODLINE SYSTEM =====
export interface EnhancedBloodline {
  id: string;
  emperor: BloodlineCharacter;
  consort?: BloodlineCharacter;
  children: BloodlineCharacter[];
  marriages: BloodlineMarriage[];
  houseBuffs: HouseBloodlineBuff[];
}

export interface BloodlineCharacter {
  id: string;
  name: string;
  portraitPath: string; // e.g., /assets/backgrounds/portrait-aldwin.png
  ageStage: 'infant' | 'youth' | 'adult' | 'elder'; // Affects portrait evolution
  cultivationLevel: number;
  cultivationProgress: number; // 0-100
  houseAffiliation?: string;
  crestPath?: string; // e.g., /assets/backgrounds/crest-quartz.png
  attributes?: Partial<RulerSkills>;
  traits?: string[];
}

export interface BloodlineMarriage {
  id: string;
  character1Id: string;
  character2Id: string;
  marriageDate: number;
  marriageType: 'dynastic' | 'political' | 'trade' | 'military';
}

export interface HouseBloodlineBuff {
  id: string;
  houseName: string;
  attributeBonus: Partial<RulerSkills>;
  description: string;
}

// ===== DOMAIN PULSE SYSTEM =====
export interface DomainPulse {
  id: string;
  stability: number; // 0-100
  estateFeeds: EstateFeed[]; // Geographic tributes
  fogOfGovernance: {
    enabled: boolean; // Based on Intrigue/Wisdom
    affectsCorruptionBar: boolean;
    affectsLoyaltyBar: boolean;
  };
  systemScanUnlocked?: boolean; // Reveals true values
}

export interface EstateFeed {
  id: string;
  estateName: string;
  resourceGeneration: Partial<Resources>;
  advantage?: string; // e.g., "Mountain Advantage", "River Advantage"
  geographicBonus: number;
}

// ===== CONSTELLATION MASTERY TREE =====
export interface ConstellationMastery {
  id: string;
  nodes: ConstellationNode[];
  pointsSpent: number;
  pointsAvailable: number;
  totalPassiveBonus: Partial<RulerSkills>;
}

export interface ConstellationNode {
  id: string;
  name: string;
  description: string;
  spCost: number;
  constellation: string; // e.g., "The All-Seeing Eye"
  unlocked: boolean;
  unlockedAt?: number;
  parentNodeId?: string;
  childNodeIds?: string[];
  permanentPassive: {
    name: string;
    description: string;
    effect: Partial<{
      manaGeneration: number;
      goldCost: number;
      layers: number; // Unlock Layer 3, etc.
    }>;
  };
  backgroundPath: string; // e.g., /assets/backgrounds/constellation-node-active.png
}

// ===== HERO SYSTEM ENHANCEMENT =====
export interface HeroEnhancement {
  level: number;
  experience: number;
  systemEyePotential: number;
  bloodlineTalent?: string;
  pilgrimageLevel?: number; // If Hero can go on pilgrimages
  talentSlots: TalentSlot[];
}

export interface TalentSlot {
  id: string;
  slotNumber: number;
  talent?: string;
  unlockedAt?: number;
}

// ===== NAMED HOUSES (15 Named Houses for Empire Stability) =====
export interface NamedHouse {
  id: string;
  name: string;
  crestPath: string;
  lordName: string;
  loyalty: number; // 0-100, affects Empire Stability
  wealth: number;
  power: number;
  demonicInfluence: number; // At 100%, becomes Boss node
  isBossNode: boolean;
  relationship: number; // With main kingdom
}
