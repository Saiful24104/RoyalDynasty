'''// Game Manager - Handles game logic and systems

import { GameState, Kingdom, Building, BuildingType, Army, Noble, NobleCouncil, Faction, Unit, UnitType, Commander, Marriage, Species, SuccessionLaw } from '../shared/types';
import { INITIAL_RESOURCES, BUILDING_CONSTRUCTION_TIME, SUCCESSION_LAWS } from '../shared/constants';
import { IMAGE_ASSETS } from '../renderer/config';

export class GameManager {
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  // ===== BUILDING SYSTEM =====

  buildBuilding(buildingType: BuildingType): boolean {
    const costMap: { [key in BuildingType]?: { gold: number; wood: number; stone: number } } = {
      [BuildingType.FARM]: { gold: 200, wood: 50, stone: 100 },
      [BuildingType.BARRACKS]: { gold: 500, wood: 200, stone: 300 },
      [BuildingType.MARKET]: { gold: 300, wood: 100, stone: 150 },
      [BuildingType.CASTLE]: { gold: 2000, wood: 500, stone: 1000 },
      [BuildingType.WALLS]: { gold: 1000, wood: 300, stone: 800 },
      [BuildingType.UNIVERSITY]: { gold: 800, wood: 200, stone: 400 },
      [BuildingType.TEMPLE]: { gold: 500, wood: 150, stone: 300 },
      [BuildingType.WORKSHOP]: { gold: 400, wood: 250, stone: 200 },
      [BuildingType.WAREHOUSE]: { gold: 300, wood: 200, stone: 100 },
      [BuildingType.LIBRARY]: { gold: 600, wood: 150, stone: 250 },
    };

    const cost = costMap[buildingType];
    if (!cost) return false;

    const resources = this.gameState.kingdom.resources;

    if (resources.gold < cost.gold || resources.wood < cost.wood || resources.stone < cost.stone) {
      return false;
    }

    resources.gold -= cost.gold;
    resources.wood -= cost.wood;
    resources.stone -= cost.stone;

    const building: Building = {
      id: `building_${Date.now()}`,
      type: buildingType,
      level: 1,
      constructionProgress: 0,
      productionMultiplier: 1.0,
      maintenanceCost: 50,
      isConstructing: true,
    };

    this.gameState.kingdom.capital.buildings.push(building);
    return true;
  }

  upgradeBuilding(buildingId: string): boolean {
    const building = this.gameState.kingdom.capital.buildings.find(b => b.id === buildingId);
    if (!building || building.isConstructing) return false;

    const upgradeCost = building.level * 200;
    if (this.gameState.kingdom.resources.gold < upgradeCost) return false;

    this.gameState.kingdom.resources.gold -= upgradeCost;
    building.isConstructing = true;
    building.constructionProgress = 0;

    return true;
  }

  // ===== ARMY SYSTEM =====

  recruitUnits(armyId: string, unitType: UnitType, count: number): boolean {
    const costMap: { [key in UnitType]?: { gold: number; food: number } } = {
      [UnitType.INFANTRY]: { gold: 50, food: 100 },
      [UnitType.CAVALRY]: { gold: 150, food: 120 },
      [UnitType.ARCHER]: { gold: 75, food: 100 },
      [UnitType.MAGE]: { gold: 300, food: 50 },
      [UnitType.KNIGHT]: { gold: 200, food: 150 },
      [UnitType.SIEGE_WEAPON]: { gold: 500, food: 100 },
    };

    const unitCost = costMap[unitType];
    if (!unitCost) return false;

    const totalCost = {
      gold: unitCost.gold * count,
      food: unitCost.food * count,
    };

    const resources = this.gameState.kingdom.resources;
    if (resources.gold < totalCost.gold || resources.food < totalCost.food) {
      return false;
    }

    resources.gold -= totalCost.gold;
    resources.food -= totalCost.food;

    const army = this.gameState.armies.find(a => a.id === armyId);
    if (!army) return false;

    const existingUnit = army.units.find(u => u.type === unitType);

    if (existingUnit) {
      existingUnit.count += count;
    } else {
      army.units.push({
        id: `unit_${Date.now()}`,
        type: unitType,
        count,
        health: 100,
        training: 0,
      });
    }

    return true;
  }

  dismissUnits(armyId: string, unitId: string, count: number): boolean {
    const army = this.gameState.armies.find(a => a.id === armyId);
    if (!army) return false;

    const unit = army.units.find(u => u.id === unitId);
    if (!unit || unit.count < count) return false;

    unit.count -= count;

    if (unit.count === 0) {
      army.units = army.units.filter(u => u.id !== unitId);
    }

    return true;
  }

  // ===== NOBILITY SYSTEM =====

  addNobleToCouncil(noble: Noble): void {
    this.gameState.council.nobles.push(noble);
  }

  updateNobileLoyalty(nobleId: string, loyaltyChange: number): void {
    const noble = this.gameState.council.nobles.find(n => n.id === nobleId);
    if (noble) {
      noble.loyalty = Math.max(0, Math.min(100, noble.loyalty + loyaltyChange));
    }
  }

  createFaction(faction: Faction): void {
    this.gameState.council.factions.push(faction);
  }

  addNobleToFaction(nobleId: string, factionId: string): void {
    const faction = this.gameState.council.factions.find(f => f.id === factionId);
    if (faction) {
      const noble = this.gameState.council.nobles.find(n => n.id === nobleId);
      if (noble && !faction.members.includes(nobleId)) {
        faction.members.push(nobleId);
        noble.faction = factionId;
      }
    }
  }

  // ===== HEIR SYSTEM =====

  setConsort(consortName: string): void {
    this.gameState.kingdom.ruler.consort = {
      id: `consort_${Date.now()}`,
      name: consortName,
      title: 'Consort',
      traits: [],
      influence: 50,
    };
  }

  setHeir(heirName: string, age: number = 0): void {
    this.gameState.kingdom.ruler.heir = {
      id: `heir_${Date.now()}`,
      name: heirName,
      age,
      legitimacy: 1.0,
      traits: [],
      potential: { ...this.gameState.kingdom.ruler.skills },
    };
  }

  // ===== ECONOMY SYSTEM =====

  executeTradeRoute(routeId: string, quantity: number): boolean {
    const route = this.gameState.market.tradingRoutes.find(r => r.id === routeId);
    if (!route || !route.isActive) return false;

    // Risk check
    if (Math.random() < route.riskLevel) {
      return false; // Trade failed
    }

    const profit = quantity * route.profitMargin;
    this.gameState.kingdom.resources.gold += profit;
    this.recordLedgerEntry(`Trade route ${route.from} -> ${route.to}`, 'income', profit, 'trade');

    return true;
  }

  collectTaxes(taxRate: number = 0.12): number {
    const kingdom = this.gameState.kingdom;
    const baseRevenue = kingdom.population * taxRate;
    const prosperityBonus = kingdom.capital.prosperity * 6;
    const stabilityBonus = kingdom.stability * 2;
    const totalRevenue = Math.max(0, Math.floor(baseRevenue + prosperityBonus + stabilityBonus));

    kingdom.resources.gold += totalRevenue;
    kingdom.treasury += totalRevenue;
    this.recordLedgerEntry('Tax collection', 'income', totalRevenue, 'taxes');

    return totalRevenue;
  }

  sellGoods(goodId: string, quantity: number): boolean {
    const good = this.gameState.market.goods.find(g => g.id === goodId);
    if (!good || good.quantity < quantity) return false;

    const price = this.gameState.market.prices.get(good.id) || good.basePrice;
    const totalValue = Math.max(0, Math.floor(price * quantity));

    good.quantity -= quantity;
    this.gameState.kingdom.resources.gold += totalValue;
    this.recordLedgerEntry(`Sold ${quantity} ${good.name}`, 'income', totalValue, 'market');

    return true;
  }

  arrangeMarriage(partnerName: string, partnerSpecies: Species, allianceType: 'dynastic' | 'political' | 'trade' | 'military' = 'dynastic'): Marriage {
    const ruler = this.gameState.kingdom.ruler;
    const marriage: Marriage = {
      id: `marriage_${Date.now()}`,
      partnerA: ruler.name,
      partnerB: partnerName,
      allianceType,
      status: 'married',
      weddingDate: Date.now(),
      notes: `${ruler.name} weds ${partnerName} of ${partnerSpecies}`,
    };

    this.gameState.marriages.push(marriage);
    ruler.consort = {
      id: `consort_${Date.now()}`,
      name: partnerName,
      title: 'Royal Consort',
      traits: ['Alliance', 'Diplomacy'],
      influence: 60,
    };

    ruler.legitimacy = Math.min(1.0, ruler.legitimacy + 0.1);
    this.gameState.kingdom.stability = Math.min(100, this.gameState.kingdom.stability + 5);
    this.recordLedgerEntry(`Royal marriage with ${partnerName}`, 'expense', 0, 'marriage');

    if (!ruler.heir) {
      this.setHeir(`${partnerName} Jr.`, 0);
    }

    return marriage;
  }

  updateMarketPrices(): void {
    // Fluctuate prices based on supply/demand
    this.gameState.market.goods.forEach(good => {
      const currentPrice = this.gameState.market.prices.get(good.id) || good.basePrice;
      const fluctuation = (Math.random() - 0.5) * 0.2; // ±10% fluctuation
      const newPrice = currentPrice * (1 + fluctuation);

      this.gameState.market.prices.set(good.id, newPrice);
    });
  }

  // ===== DIPLOMACY SYSTEM =====

  improveRelations(kingdomId: string, improvement: number): void {
    const relationship = this.gameState.kingdom.diplomacy.find(r => r.kingdomId === kingdomId);
    if (relationship) {
      relationship.relationshipValue = Math.max(-100, Math.min(100, relationship.relationshipValue + improvement));
    }
  }

  declareWar(kingdomId: string): void {
    const relationship = this.gameState.kingdom.diplomacy.find(r => r.kingdomId === kingdomId);
    if (relationship) {
      relationship.hostility = true;
      relationship.relationshipValue = -100;
    }
  }

  makePeace(kingdomId: string): void {
    const relationship = this.gameState.kingdom.diplomacy.find(r => r.kingdomId === kingdomId);
    if (relationship) {
      relationship.hostility = false;
      relationship.relationshipValue = 0;
    }
  }

  // ===== GENERAL METHODS =====

  getGameState(): GameState {
    return this.gameState;
  }

  getCurrentDate(): string {
    const time = this.gameState.gameTime;
    return `Year ${time.year}, Month ${time.month}, Day ${time.day}`;
  }

  getKingdomInfo(): Kingdom {
    return this.gameState.kingdom;
  }

  calculateKingdomScore(): number {
    const kingdom = this.gameState.kingdom;
    return (
      kingdom.stability * 2 +
      kingdom.population / 100 +
      (kingdom.resources.gold / 100) +
      (this.gameState.armies.reduce((sum, a) => sum + a.units.reduce((s, u) => s + u.count, 0), 0) * 5)
    );
  }

  // ==================== COURT SYSTEM ====================
  
  performCeremony(ceremonyId: string): void {
    const ceremony = this.gameState.kingdom.capital.court?.ceremonies.find(c => c.id === ceremonyId);
    if (!ceremony) return;

    const cost = ceremony.cost;
    if (this.gameState.kingdom.resources.gold < cost) return;

    this.gameState.kingdom.resources.gold -= cost;
    this.gameState.kingdom.resources.prestige += ceremony.prestigeGain;
    
    // Impact court members' loyalty
    if (this.gameState.kingdom.capital.court?.courtMembers) {
      this.gameState.kingdom.capital.court.courtMembers.forEach(member => {
        member.loyalty = Math.min(100, member.loyalty + ceremony.loyaltyImpact);
      });
    }
  }

  // ==================== BLOODLINE SYSTEM ====================

  addBloodlineMember(bloodlineId: string, member: any): void {
    const bloodline = this.gameState.bloodlines.find(b => b.id === bloodlineId);
    if (!bloodline) return;
    
    member.id = `member_${Date.now()}`;
    bloodline.members.push(member);
  }

  // ==================== HERO SYSTEM ====================

  recruitHero(hero: any): void {
    if (this.gameState.kingdom.resources.gold < 500) return;
    
    this.gameState.kingdom.resources.gold -= 500;
    hero.id = `hero_${Date.now()}`;
    hero.joinDate = new Date().toISOString();
    this.gameState.heroes.push(hero);
  }

  improveHeroSkill(heroId: string, skillName: string): void {
    const hero = this.gameState.heroes.find(h => h.id === heroId);
    if (!hero) return;

    const skillCost = 100 * (hero.level || 1);
    if (this.gameState.kingdom.resources.gold < skillCost) return;

    this.gameState.kingdom.resources.gold -= skillCost;
    const skill = hero.skills.find(s => s.name === skillName);
    if (skill) {
      skill.level = (skill.level || 1) + 1;
    }
  }

  // ==================== GUILD SYSTEM ====================

  recruitGuildMember(guildId: string, memberName: string): void {
    const guild = this.gameState.guilds.find(g => g.id === guildId);
    if (!guild) return;

    const cost = 50;
    if (this.gameState.kingdom.resources.gold < cost) return;

    this.gameState.kingdom.resources.gold -= cost;
    guild.members.push({
      id: `member_${Date.now()}`,
      name: memberName,
      rank: 'apprentice',
      skills: [],
      reputation: 0
    });
  }

  executeGuildQuest(questId: string): void {
    // Find quest in any guild
    for (const guild of this.gameState.guilds) {
      const quest = guild.quests.find(q => q.id === questId);
      if (!quest) continue;

      if (quest.status === 'in_progress' || quest.status === 'available') {
        quest.status = 'completed' as any;
        this.gameState.kingdom.resources.gold += quest.reward;
        this.gameState.kingdom.resources.prestige += 10;
      }
      return;
    }
  }

  // ==================== TAVERN SYSTEM ====================

  tavernAction(actionType: string): void {
    const tavern = this.gameState.tavern;
    if (!tavern) return;

    switch (actionType) {
      case 'drink':
        if (this.gameState.kingdom.resources.gold < 10) return;
        this.gameState.kingdom.resources.gold -= 10;
        tavern.level = Math.min(100, tavern.level + 0.2);
        break;

      case 'host_tournament':
        if (this.gameState.kingdom.resources.gold < 500) return;
        this.gameState.kingdom.resources.gold -= 500;
        this.gameState.kingdom.resources.prestige += 25;
        tavern.level = Math.min(100, tavern.level + 1);
        break;

      case 'gather_intelligence':
        if (this.gameState.kingdom.resources.gold < 100) return;
        this.gameState.kingdom.resources.gold -= 100;
        // Generate rumor
        const rumors = tavern.rumors;
        if (rumors.length > 0) {
          rumors[Math.floor(Math.random() * rumors.length)].verified = true;
        }
        break;
    }
  }

  // ==================== ACADEMY SYSTEM ====================

  enrollScholar(scholarName: string, specialization: string): void {
    const academy = this.gameState.kingdom.capital.academy;
    if (!academy) return;

    const cost = 200;
    if (this.gameState.kingdom.resources.gold < cost) return;

    this.gameState.kingdom.resources.gold -= cost;
    academy.students.push({
      id: `scholar_${Date.now()}`,
      name: scholarName,
      specialization: specialization,
      level: 1,
      progress: 0
    });
  }

  researchMagic(researchType: string): void {
    const academy = this.gameState.kingdom.capital.academy;
    if (!academy) return;

    const manaCost = researchType === 'Necromancy' ? 150 : 100;
    if (this.gameState.kingdom.resources.mana < manaCost) return;

    this.gameState.kingdom.resources.mana -= manaCost;
    academy.knowledgePool += manaCost / 2;
  }

  // ==================== WORLD MAP SYSTEM ====================

  conquerTerritory(regionId: string): void {
    const region = this.gameState.worldMap.regions.find(r => r.id === regionId);
    if (!region || region.controlled_by === this.gameState.kingdom.id) return;

    const conquestCost = 1000;
    if (this.gameState.kingdom.resources.gold < conquestCost) return;

    this.gameState.kingdom.resources.gold -= conquestCost;
    region.controlled_by = this.gameState.kingdom.id;

    // Add territory to player
    this.gameState.worldMap.playerTerritories.push({
      id: `territory_${Date.now()}`,
      regionId: region.id,
      name: region.name,
      prosperity: 50,
      defenses: 50
    });
  }

  // ==================== HEIR INCUBATION SYSTEM ====================

  startHeirIncubation(consortName: string): void {
    if (!this.gameState.kingdom.ruler.consort) {
      this.setConsort(consortName);
    }

    // Create heir in incubation state
    const heir = {
      id: `heir_incubating_${Date.now()}`,
      name: `${consortName}'s Child`,
      age: 0,
      legitimacy: 0.9,
      traits: [],
      potential: { ...this.gameState.kingdom.ruler.skills },
      isIncubating: true,
      incubationMonthsRemaining: 9,
      incubationResources: {
        goldInvested: 0,
        foodInvested: 0,
        manaInvested: 0,
      },
    };

    this.gameState.kingdom.ruler.heir = heir as any;
  }

  investInHeirDevelopment(resourceType: string, amount: number): void {
    const heir = this.gameState.kingdom.ruler.heir;
    if (!heir || !heir.isIncubating || !heir.incubationResources) return;

    const resources = this.gameState.kingdom.resources;

    switch (resourceType.toLowerCase()) {
      case 'gold':
        if (resources.gold < amount) return;
        resources.gold -= amount;
        heir.incubationResources.goldInvested += amount;
        // Gold increases leadership potential
        heir.potential.leadership += amount / 100;
        break;
      case 'food':
        if (resources.food < amount) return;
        resources.food -= amount;
        heir.incubationResources.foodInvested += amount;
        // Food increases physical stats (martial)
        heir.potential.military += amount / 100;
        break;
      case 'mana':
        if (resources.mana < amount) return;
        resources.mana -= amount;
        heir.incubationResources.manaInvested += amount;
        // Mana increases wisdom and magical knowledge
        heir.potential.wisdom += amount / 100;
        break;
    }
  }

  // ==================== INFLUENCE & BACKLASH SYSTEM ====================

  exertInfluence(source: string, amount: number): void {
    const influence = this.gameState.influenceSystem;
    const { BACKLASH_THRESHOLD, BACKLASH_PENALTY, BACKLASH_STABILITY_LOSS } = require('../shared/constants').INFLUENCE_SETTINGS;

    influence.currentInfluence = Math.min(100, influence.currentInfluence + amount);
    influence.sources.push({
      id: `influence_${Date.now()}`,
      source,
      amount,
      timestamp: Date.now(),
    });

    // Check for backlash
    if (influence.currentInfluence > BACKLASH_THRESHOLD) {
      influence.backlashCounter += amount;
      influence.internalFriction += 2;
      this.gameState.kingdom.stability -= BACKLASH_STABILITY_LOSS;
    }
  }

  resolveBacklash(): void {
    const influence = this.gameState.influenceSystem;
    influence.backlashCounter = Math.max(0, influence.backlashCounter - 10);
    influence.internalFriction = Math.max(0, influence.internalFriction - 1);
    influence.externalBacklash = Math.max(0, influence.externalBacklash - 2);
  }

  // ==================== NOBLE HOUSE SYSTEM ====================

  improveHouseRelation(houseId: string, improvement: number): void {
    const house = this.gameState.nobleHouses.find(h => h.id === houseId);
    if (house) {
      house.relationship = Math.max(0, Math.min(100, (house.relationship || 0) + improvement));
    }
  }

  unlockEliteUnit(houseId: string): boolean {
    const house = this.gameState.nobleHouses.find(h => h.id === houseId);
    if (!house || (house.relationship || 0) < 70) return false;

    // House relationship is high enough to unlock elite unit
    return true;
  }

  // ==================== ENEMY DYNASTY SYSTEM ====================

  declareWarOnDynasty(dynastyId: string): void {
    const dynasty = this.gameState.enemyDynasties.find(d => d.id === dynastyId);
    if (dynasty) {
      dynasty.isAtWar = true;
      dynasty.relations = -100;
      this.gameState.kingdom.stability -= 15;
    }
  }

  makePeaceWithDynasty(dynastyId: string): void {
    const dynasty = this.gameState.enemyDynasties.find(d => d.id === dynastyId);
    if (dynasty) {
      dynasty.isAtWar = false;
      dynasty.relations = 0;
    }
  }

  // ==================== SUCCESSION LAW SYSTEM ====================

  changeSuccessionLaw(newLawId: string): void {
    const law = Object.values(SUCCESSION_LAWS as Record<string, SuccessionLaw>).find((l) => l.id === newLawId);
    if (law) {
      this.gameState.successionLaw = law;
      this.gameState.kingdom.stability += 5; // Stability change from new law
    }
  }

  // ==================== FINANCIAL LEDGER SYSTEM ====================

  recordLedgerEntry(description: string, category: string, amount: number, source?: string, destination?: string): void {
    const ledger = this.gameState.generalLedger;
    const entry = {
      id: `entry_${Date.now()}`,
      date: Date.now(),
      description,
      category: category as any,
      amount,
      source,
      destination,
    };

    ledger.entries.push(entry);

    if (category === 'income') {
      ledger.totalIncome += amount;
    } else if (category === 'expense') {
      ledger.totalExpense += amount;
    }

    ledger.netBalance = ledger.totalIncome - ledger.totalExpense;
    ledger.lastUpdated = Date.now();
  }

  auditRivalHouse(houseId: string): any {
    const rival = this.gameState.nobleHouses.find(h => h.id === houseId);
    if (!rival) return null;

    const auditCost = 500;
    if (this.gameState.kingdom.resources.gold < auditCost) return null;

    this.gameState.kingdom.resources.gold -= auditCost;

    // Simulated audit findings
    const findings = [
      { id: 'find_1', title: 'Tax Discrepancies', description: 'Unusual tax revenue patterns detected', severity: 'medium' as const, evidence: '20% variance from expected' },
      { id: 'find_2', title: 'Military Buildup', description: 'Increased military spending', severity: 'high' as const, evidence: 'Troop count up 30%' },
    ];

    return {
      id: `audit_${Date.now()}`,
      targetHouse: houseId,
      dateInitiated: Date.now(),
      findings: Math.random() > 0.5 ? findings.slice(0, 1) : findings,
      suspicions: ['Embezzlement', 'Rebellion planning'],
      completed: true,
    };
  }

  // ==================== ESTATE SYSTEM ====================

  developEstate(estateId: string): void {
    const estate = this.gameState.estates.find(e => e.id === estateId);
    if (!estate) return;

    const developmentCost = 300;
    if (this.gameState.kingdom.resources.gold < developmentCost) return;

    this.gameState.kingdom.resources.gold -= developmentCost;
    estate.prosperity = Math.min(100, estate.prosperity + 10);
    estate.population = Math.floor(estate.population * 1.05);
  }

  buildEstateDefenses(estateId: string): void {
    const estate = this.gameState.estates.find(e => e.id === estateId);
    if (!estate) return;

    const defenseCost = 500;
    if (this.gameState.kingdom.resources.stone < defenseCost / 2 || this.gameState.kingdom.resources.gold < defenseCost / 2) return;

    this.gameState.kingdom.resources.gold -= defenseCost / 2;
    this.gameState.kingdom.resources.stone -= defenseCost / 2;
    estate.defenses = Math.min(100, estate.defenses + 15);
  }

  // ==================== IMPERIAL OVERVIEW SYSTEM ====================

  initializeImperialOverview(): void {
    if (!this.gameState.kingdom.imperialOverview) {
      this.gameState.kingdom.imperialOverview = {
        id: `imperial_${Date.now()}`,
        vassalCount: 0,
        empireStability: 50,
        demonicInfluence: 0,
      };
    }

    if (!this.gameState.kingdom.prophecyCountdown) {
      this.gameState.kingdom.prophecyCountdown = {
        id: `prophecy_${Date.now()}`,
        kingdomsConquered: 0,
        endOfDaysTriggered: false,
        lastUpdateDate: Date.now(),
        milestoneEvents: [
          { id: 'milestone_1', kingdomsRequired: 3, name: 'First Conquest', description: 'Secure three kingdoms', triggered: false },
          { id: 'milestone_2', kingdomsRequired: 6, name: 'Rising Emperor', description: 'Secure six kingdoms', triggered: false },
          { id: 'milestone_3', kingdomsRequired: 10, name: 'End of Days', description: 'Secure all ten kingdoms', triggered: false },
        ],
      };
    }

    this.gameState.kingdom.namedHouses = this.gameState.kingdom.namedHouses || [];
  }

  updateImperialOverview(): void {
    const imperial = this.gameState.kingdom.imperialOverview;
    if (!imperial) return;

    // Update Empire Stability as average loyalty of Named Houses
    if (this.gameState.kingdom.namedHouses && this.gameState.kingdom.namedHouses.length > 0) {
      const totalLoyalty = this.gameState.kingdom.namedHouses.reduce((sum, h) => sum + h.loyalty, 0);
      imperial.empireStability = Math.floor(totalLoyalty / this.gameState.kingdom.namedHouses.length);
    }

    // Vassal count affects Levy Recovery Speed and Tax Base
    imperial.vassalCount = this.gameState.kingdom.namedHouses?.length || 0;

    // Vassals increase Demonic Influence over time
    imperial.demonicInfluence = Math.min(100, imperial.demonicInfluence + (imperial.vassalCount * 0.01));

    if (this.gameState.kingdom.prophecyCountdown) {
      this.gameState.kingdom.prophecyCountdown.lastUpdateDate = Date.now();
    }

    if (imperial.empireStability < 30) {
      this.triggerCivilWarEvent();
    }
  }

  triggerCivilWarEvent(): void {
    this.gameState.events.push({
      id: `civil_war_${Date.now()}`,
      type: 'political' as any,
      title: 'Civil War Breaking Out!',
      description: 'Low empire stability has triggered a civil war on the Layer 2 map. Multiple vassals are rebelling!',
      timestamp: Date.now(),
      resolved: false,
      choices: [
        {
          id: 'choice_1',
          text: 'Send armies to suppress the rebellion',
          consequences: {
            resources: { gold: -500 },
            stability: -20,
            legitimacy: 0,
            morale: -10,
          },
          outcome: 'Rebellion suppressed but stability remains low',
        },
        {
          id: 'choice_2',
          text: 'Negotiate with the rebels',
          consequences: {
            resources: { gold: -1000 },
            stability: 10,
            legitimacy: -5,
            morale: 5,
          },
          outcome: 'Temporary peace achieved',
        },
      ],
    });
  }

  // ==================== COUNCIL OF TEN / IMPERIAL PILLARS ====================

  initializeImperialPillars(): void {
    if (!this.gameState.kingdom.imperialPillars) {
      this.gameState.kingdom.imperialPillars = [
        {
          id: `pillar_war_${Date.now()}`,
          type: 'war' as any,
          name: 'War Pillar',
          description: 'Governs military might and conquest',
          worldAlteringEffect: {
            type: 'troop_lifesteal',
            description: 'Troops gain lifesteal in Layer 3 Red Zones',
            icon: '⚔️',
          },
          isActive: false,
          occupant: null,
        },
        {
          id: `pillar_coin_${Date.now()}`,
          type: 'coin' as any,
          name: 'Coin Pillar',
          description: 'Controls commerce and wealth',
          worldAlteringEffect: {
            type: 'market_discount',
            description: 'Reduces market costs by 20%',
            icon: '💰',
          },
          isActive: false,
          occupant: null,
        },
        {
          id: `pillar_shadow_${Date.now()}`,
          type: 'shadow' as any,
          name: 'Shadow Pillar',
          description: 'Oversees espionage and intrigue',
          worldAlteringEffect: {
            type: 'auto_scandal',
            description: 'Auto-triggers monthly Scandals on rival Kings',
            icon: '🕵️',
          },
          isActive: false,
          occupant: null,
        },
        {
          id: `pillar_seraphine_${Date.now()}`,
          type: 'seraphine' as any,
          name: 'Seraphine Seat (Consort)',
          description: 'Special seat for Lady Seraphine',
          worldAlteringEffect: {
            type: 'consort_boost',
            description: 'Boosts Diplomacy and Piety',
            icon: '👑',
          },
          isActive: false,
          occupant: null,
        },
      ];
    }
  }

  assignToPillar(pillarId: string, heroOrNobleName: string): boolean {
    const pillar = this.gameState.kingdom.imperialPillars?.find(p => p.id === pillarId);
    if (!pillar) return false;

    // Find hero or noble
    const hero = this.gameState.heroes.find(h => h.name === heroOrNobleName);
    const noble = this.gameState.council.nobles.find(n => n.name === heroOrNobleName);

    if (hero) {
      (pillar as any).occupant = hero;
      pillar.isActive = true;
      return true;
    } else if (noble) {
      (pillar as any).occupant = noble;
      pillar.isActive = true;
      return true;
    }
    return false;
  }

  // ==================== DIVINE EDICTS SYSTEM ====================

  initializeCultivationTree(): void {
    if (!this.gameState.kingdom.cultivationTree) {
      this.gameState.kingdom.cultivationTree = {
        id: `tree_${Date.now()}`,
        nodes: [
          {
            id: 'node_census',
            name: 'Imperial Census',
            description: 'Reveal hidden resource nodes on Layer 3 maps',
            spCost: 10,
            type: 'imperial_census' as any,
            parentNodeId: undefined,
            childNodeIds: [],
            permanentPassive: 'Layer 3 resource nodes are 30% more visible',
            icon: '📋',
          },
          {
            id: 'node_conscription',
            name: 'Forced Conscription',
            description: 'Convert Minor Vassals into Army Power, reduce Peasant Loyalty by 15%',
            spCost: 20,
            type: 'forced_conscription' as any,
            parentNodeId: undefined,
            childNodeIds: [],
            permanentPassive: 'Vassal conversion becomes 25% more efficient',
            icon: '🪖',
          },
          {
            id: 'node_marriage',
            name: 'Royal Marriage Decree',
            description: 'Guarantees 100% marriage success (costs Gold)',
            spCost: 0,
            type: 'royal_marriage_decree' as any,
            parentNodeId: undefined,
            childNodeIds: [],
            permanentPassive: 'Marriage costs reduced by 20%',
            icon: '💍',
          },
          {
            id: 'node_truth',
            name: 'Eye of Truth',
            description: 'Reveal hidden potential of commoners, unlock Protagonist-tier heroes',
            spCost: 25,
            type: 'eye_of_truth' as any,
            parentNodeId: undefined,
            childNodeIds: [],
            permanentPassive: 'Hero recruitment cost reduced by 30%',
            icon: '👁️',
          },
        ],
        pointsSpent: 0,
        pointsAvailable: 0,
      };
    }
  }

  spendSystemPoints(edictType: string, spCost: number): boolean {
    if (!this.gameState.kingdom.systemPoints || this.gameState.kingdom.systemPoints < spCost) {
      return false;
    }

    this.gameState.kingdom.systemPoints -= spCost;
    
    // Create Divine Edict record
    const edict: any = {
      id: `edict_${Date.now()}`,
      type: edictType,
      active: true,
      dateActivated: Date.now(),
    };

    if (!this.gameState.kingdom.divineEdicts) {
      this.gameState.kingdom.divineEdicts = [];
    }
    this.gameState.kingdom.divineEdicts.push(edict);

    // Apply edict consequences
    this.applyEdictEffects(edictType);
    return true;
  }

  applyEdictEffects(edictType: string): void {
    switch (edictType) {
      case 'imperial_census':
        // Reveal hidden nodes on Layer 3
        this.gameState.kingdom.resources.gold -= 100;
        break;
      case 'forced_conscription':
        // Convert vassals to army power
        if (this.gameState.kingdom.imperialOverview) {
          this.gameState.kingdom.imperialOverview.vassalCount = Math.max(0, this.gameState.kingdom.imperialOverview.vassalCount - 5);
          this.gameState.armies[0].units.push({
            id: `unit_conscript_${Date.now()}`,
            type: 'infantry' as any,
            count: 100,
            health: 100,
            training: 50,
          });
          // Reduce peasant loyalty
          if (this.gameState.kingdom.namedHouses) {
            this.gameState.kingdom.namedHouses.forEach(h => {
              h.loyalty = Math.max(0, h.loyalty - 15);
            });
          }
        }
        break;
      case 'royal_marriage_decree':
        // Guarantees marriage success (handled in marriage logic)
        break;
      case 'eye_of_truth':
        // Unlock protagonist-tier hero or reveal potential
        this.gameState.kingdom.resources.mana -= 100;
        break;
    }
  }

  // ==================== KING'S ATTRIBUTES BREAKTHROUGH SYSTEM ====================

  initializeAttributeBreakthroughs(): void {
    if (!this.gameState.kingdom.attributeBreakthroughs) {
      this.gameState.kingdom.attributeBreakthroughs = [
        {
          id: 'breakthrough_martial',
          attribute: 'military',
          threshold: 75,
          name: 'Imperial Pressure',
          description: 'Hostile armies move 10% slower',
          effect: 'enemy_movement_slow_10',
          isActive: false,
        },
        {
          id: 'breakthrough_wisdom',
          attribute: 'wisdom',
          threshold: 80,
          name: 'Heavenly Calculation',
          description: '5-second precognition of enemy strikes',
          effect: 'enemy_strike_precognition',
          isActive: false,
        },
        {
          id: 'breakthrough_diplomacy',
          attribute: 'diplomacy',
          threshold: 75,
          name: 'Diplomatic Mastery',
          description: 'Reduced gold cost for alliances by 30%',
          effect: 'alliance_cost_reduction_30',
          isActive: false,
        },
        {
          id: 'breakthrough_leadership',
          attribute: 'leadership',
          threshold: 80,
          name: 'Sovereign Aura',
          description: 'All units gain +15% attack and defense',
          effect: 'unit_stats_boost_15',
          isActive: false,
        },
        {
          id: 'breakthrough_charisma',
          attribute: 'charisma',
          threshold: 70,
          name: 'Heart of Gold',
          description: 'Population loyalty increased by 20%',
          effect: 'loyalty_boost_20',
          isActive: false,
        },
      ];
    }
  }

  checkAttributeBreakthroughs(): void {
    const ruler = this.gameState.kingdom.ruler;
    const breakthroughs = this.gameState.kingdom.attributeBreakthroughs;

    if (!breakthroughs) return;

    breakthroughs.forEach(breakthrough => {
      const attributeValue = ruler.skills[breakthrough.attribute];
      if (attributeValue >= breakthrough.threshold && !breakthrough.isActive) {
        breakthrough.isActive = true;
        breakthrough.unlockedAt = Date.now();
        this.activateBreakthroughEffect(breakthrough.effect);
      }
    });
  }

  activateBreakthroughEffect(effect: string): void {
    switch (effect) {
      case 'enemy_movement_slow_10':
        // Implement movement slow for enemies
        console.log('Imperial Pressure activated: enemy movement 10% slower');
        break;
      case 'enemy_strike_precognition':
        // Implement precognition mechanic
        console.log('Heavenly Calculation activated: 5-second precognition');
        break;
      case 'alliance_cost_reduction_30':
        // Reduce gold cost of alliances
        console.log('Diplomatic Mastery activated: alliance costs reduced 30%');
        break;
      case 'unit_stats_boost_15':
        // Boost unit stats
        this.gameState.armies.forEach(army => {
          army.units.forEach(unit => {
            unit.health = Math.floor(unit.health * 1.15);
          });
        });
        break;
      case 'loyalty_boost_20':
        // Increase population loyalty
        if (this.gameState.kingdom.namedHouses) {
          this.gameState.kingdom.namedHouses.forEach(h => {
            h.loyalty = Math.min(100, h.loyalty + 20);
          });
        }
        break;
    }
  }

  // ==================== REALM MANAGEMENT SYSTEM ====================

  setRealmManagementMode(mode: string): boolean {
    if (!['nurture', 'rule', 'extract'].includes(mode)) return false;

    const realmMgmt = this.gameState.kingdom.realmManagement || {
      currentMode: 'rule' as any,
      modeChangedAt: Date.now(),
    };
    realmMgmt.currentMode = mode as any;
    realmMgmt.modeChangedAt = Date.now();
    this.gameState.kingdom.realmManagement = realmMgmt;

    // Apply mode effects
    this.applyRealmManagementEffects(mode);
    return true;
  }

  applyRealmManagementEffects(mode: string): void {
    const kingdom = this.gameState.kingdom;
    const imperial = kingdom.imperialOverview;

    switch (mode) {
      case 'nurture':
        // Stability +10%, Mana +10%, Gold -5%
        kingdom.stability = Math.min(100, kingdom.stability + 10);
        kingdom.resources.mana = Math.floor(kingdom.resources.mana * 1.1);
        kingdom.resources.gold = Math.floor(kingdom.resources.gold * 0.95);
        break;
      case 'rule':
        // Balanced approach (default)
        break;
      case 'extract':
        // Gold +50%, Demonic Influence +20%, Stability -20%
        kingdom.resources.gold = Math.floor(kingdom.resources.gold * 1.5);
        kingdom.stability = Math.max(0, kingdom.stability - 20);
        if (imperial) {
          imperial.demonicInfluence = Math.min(100, imperial.demonicInfluence + 20);
          // Visual corruption of Layer 3 map and spawn rebels
          this.corruptMapLayer3();
        }
        break;
    }
  }

  corruptMapLayer3(): void {
    // Spawn rebel nodes on Layer 3
    this.gameState.worldMap.regions.forEach(region => {
      if (region.controlled_by !== this.gameState.kingdom.id && Math.random() > 0.7) {
        // Spawn rebel
        this.gameState.events.push({
          id: `rebel_${Date.now()}`,
          type: 'military' as any,
          title: 'Rebel Uprising!',
          description: `Rebels have risen in ${region.name} due to extraction policies!`,
          timestamp: Date.now(),
          resolved: false,
          choices: [],
        });
      }
    });
  }

  // ==================== LEY LINE ECONOMY SYSTEM ====================

  initializeLeyLineEconomy(): void {
    if (!this.gameState.kingdom.leyLineEconomy) {
      this.gameState.kingdom.leyLineEconomy = {
        id: `leyline_${Date.now()}`,
        manaWellsControlled: [],
        riversControlled: [],
        totalManaGeneration: 10,
        tributePipeline: [],
        manaBar: {
          current: 100,
          max: 100,
          pulseIntensity: 0.5,
        },
      };
    }
  }

  addManaWell(estateId: string): void {
    const leyline = this.gameState.kingdom.leyLineEconomy;
    if (!leyline || leyline.manaWellsControlled.includes(estateId)) return;

    leyline.manaWellsControlled.push(estateId);
    leyline.totalManaGeneration += 5; // Each well generates 5 mana per tick
  }

  addRiver(estateId: string): void {
    const leyline = this.gameState.kingdom.leyLineEconomy;
    if (!leyline || leyline.riversControlled.includes(estateId)) return;

    leyline.riversControlled.push(estateId);
    leyline.totalManaGeneration += 3; // Each river generates 3 mana per tick
  }

  recordTribute(houseId: string, tribute: Partial<any>): void {
    const leyline = this.gameState.kingdom.leyLineEconomy;
    if (!leyline) return;

    const house = this.gameState.kingdom.namedHouses?.find(h => h.id === houseId);
    if (!house) return;

    let pipeline = leyline.tributePipeline.find(t => t.sourceHouse === house.name);
    if (!pipeline) {
      pipeline = {
        id: `pipeline_${Date.now()}`,
        sourceHouse: house.name,
        tributeResources: tribute,
        frequency: 'monthly' as any,
        nextDue: Date.now() + 30 * 24 * 60 * 60 * 1000,
        logs: [],
      };
      leyline.tributePipeline.push(pipeline);
    }

    // Record tribute delivery
    pipeline.logs.push({
      id: `tribute_${Date.now()}`,
      date: Date.now(),
      sourceName: house.name,
      resourcesDelivered: tribute,
      message: `${house.name} offers ${JSON.stringify(tribute)} to the Imperial Forge`,
    });

    // Apply resources
    Object.entries(tribute).forEach(([resource, amount]) => {
      if (resource in this.gameState.kingdom.resources) {
        (this.gameState.kingdom.resources as any)[resource] += amount;
      }
    });
  }

  // ==================== PROPHECY COUNTDOWN SYSTEM ====================

  initializeProphecyCountdown(): void {
    if (!this.gameState.kingdom.prophecyCountdown) {
      this.gameState.kingdom.prophecyCountdown = {
        id: `prophecy_${Date.now()}`,
        kingdomsConquered: 0,
        endOfDaysTriggered: false,
        lastUpdateDate: Date.now(),
        milestoneEvents: [
          {
            id: 'milestone_5',
            kingdomsRequired: 5,
            name: 'The Halfway Point',
            description: 'You have conquered half the world',
            triggered: false,
          },
          {
            id: 'milestone_10',
            kingdomsRequired: 10,
            name: 'End of Days',
            description: 'All kingdoms conquered - trigger major 2.0 shift event',
            triggered: false,
          },
        ],
      };
    }
  }

  recordKingdomConquest(kingdomId: string): void {
    const prophecy = this.gameState.kingdom.prophecyCountdown;
    if (!prophecy) return;

    prophecy.kingdomsConquered++;
    prophecy.lastUpdateDate = Date.now();

    // Check milestones
    prophecy.milestoneEvents.forEach(milestone => {
      if (milestone.kingdomsRequired <= prophecy.kingdomsConquered && !milestone.triggered) {
        milestone.triggered = true;
        this.triggerMilestoneEvent(milestone);
      }
    });

    // Check for End of Days (10/10 kingdoms)
    if (prophecy.kingdomsConquered >= 10 && !prophecy.endOfDaysTriggered) {
      this.triggerEndOfDays();
    }
  }

  triggerMilestoneEvent(milestone: any): void {
    this.gameState.events.push({
      id: `milestone_${Date.now()}`,
      type: 'political' as any,
      title: milestone.name,
      description: milestone.description,
      timestamp: Date.now(),
      resolved: false,
      choices: [],
    });
  }

  triggerEndOfDays(): void {
    const prophecy = this.gameState.kingdom.prophecyCountdown;
    if (!prophecy) return;

    prophecy.endOfDaysTriggered = true;

    this.gameState.events.push({
      id: `end_of_days_${Date.now()}`,
      type: 'diplomatic' as any,
      title: '🌍 END OF DAYS CATACLYSM 🌍',
      description: 'You have conquered all 10 kingdoms! The ancient prophecy is fulfilled. The world shifts into a new era - Royal Dynasty 2.0. Reality itself bends to your will. A new realm of possibilities awaits...',
      timestamp: Date.now(),
      resolved: false,
      choices: [
        {
          id: 'choice_transcend',
          text: 'Transcend into the New Era',
          consequences: {
            resources: {},
            stability: 50,
            legitimacy: 0,
            morale: 100,
          },
          outcome: 'Reality shifts... Royal Dynasty 2.0 begins!',
        },
      ],
    });
  }

  // ==================== DOMAIN PULSE SYSTEM ====================

  initializeDomainPulse(): void {
    if (!this.gameState.kingdom.domainPulse) {
      this.gameState.kingdom.domainPulse = {
        id: `pulse_${Date.now()}`,
        stability: 50,
        estateFeeds: [],
        fogOfGovernance: {
          enabled: false,
          affectsCorruptionBar: false,
          affectsLoyaltyBar: false,
        },
        systemScanUnlocked: false,
      };
    }
  }

  updateDomainPulse(): void {
    const pulse = this.gameState.kingdom.domainPulse;
    if (!pulse) return;

    // Update stability from estates
    pulse.stability = this.gameState.kingdom.stability;

    // Generate estate feeds from conquered estates
    pulse.estateFeeds = this.gameState.estates.map(estate => ({
      id: estate.id,
      estateName: estate.name,
      resourceGeneration: estate.resources,
      advantage: this.getEstateAdvantage(estate),
      geographicBonus: this.calculateGeographicBonus(estate),
    }));

    // Check if Fog of Governance should be enabled
    const wisdom = this.gameState.kingdom.ruler.skills.wisdom;
    const intrigue = this.gameState.council.nobles.reduce((sum, n) => sum + (n.power || 0), 0) / this.gameState.council.nobles.length;
    pulse.fogOfGovernance.enabled = wisdom < 60 || intrigue > 60;
  }

  getEstateAdvantage(estate: any): string {
    // Based on location
    if (estate.location?.y > 60) return 'Mountain Advantage';
    if (estate.location?.x < 30) return 'River Advantage';
    if (estate.location?.x > 70) return 'Harbor Advantage';
    return 'Strategic Position';
  }

  calculateGeographicBonus(estate: any): number {
    let bonus = 1.0;
    if (estate.location?.y > 60) bonus += 0.2; // Mountains
    if (estate.location?.x < 30) bonus += 0.25; // Rivers
    if (estate.location?.x > 70) bonus += 0.15; // Harbors
    return bonus;
  }

  // ==================== CONSTELLATION MASTERY TREE ====================

  initializeConstellationMastery(): void {
    if (!this.gameState.kingdom.constellationMastery) {
      this.gameState.kingdom.constellationMastery = {
        id: `constellation_${Date.now()}`,
        nodes: [
          {
            id: 'const_eye',
            name: 'The All-Seeing Eye',
            description: 'Unlocks Layer 3 map permanently',
            spCost: 15,
            constellation: 'Celestial',
            unlocked: false,
            parentNodeId: undefined,
            childNodeIds: [],
            permanentPassive: {
              name: 'Eternal Sight',
              description: 'Layer 3 map always visible',
              effect: { layers: 3 },
            },
            backgroundPath: '/assets/backgrounds/constellation-node-active.png',
          },
          {
            id: 'const_sovereign',
            name: 'Sovereign Aura',
            description: 'Reduces Gold cost of Forced Marriages by 20%',
            spCost: 20,
            constellation: 'Royal',
            unlocked: false,
            parentNodeId: 'const_eye',
            childNodeIds: [],
            permanentPassive: {
              name: 'Royal Grace',
              description: 'Marriage costs reduced 20%',
              effect: { goldCost: -20 },
            },
            backgroundPath: '/assets/backgrounds/constellation-node-locked.png',
          },
          {
            id: 'const_leyline',
            name: 'Ley Line Mastery',
            description: 'Increases Mana generation for every River or Mana Well controlled',
            spCost: 25,
            constellation: 'Arcane',
            unlocked: false,
            parentNodeId: 'const_eye',
            childNodeIds: [],
            permanentPassive: {
              name: 'Mana Flow',
              description: '+30% mana generation per controlled node',
              effect: { manaGeneration: 30 },
            },
            backgroundPath: '/assets/backgrounds/constellation-node-locked.png',
          },
        ],
        pointsSpent: 0,
        pointsAvailable: 0,
        totalPassiveBonus: {},
      };
    }
  }

  unlockConstellationNode(nodeId: string): boolean {
    const constellation = this.gameState.kingdom.constellationMastery;
    if (!constellation) return false;

    const node = constellation.nodes.find(n => n.id === nodeId);
    if (!node || node.unlocked) return false;

    const ruler = this.gameState.kingdom.ruler;
    if (!ruler.systemPoints || ruler.systemPoints < node.spCost) return false;

    ruler.systemPoints -= node.spCost;
    node.unlocked = true;
    node.unlockedAt = Date.now();

    // Apply permanent passive
    Object.entries(node.permanentPassive.effect).forEach(([key, value]) => {
      (constellation.totalPassiveBonus as any)[key] = ((constellation.totalPassiveBonus as any)[key] || 0) + value;
    });

    return true;
  }

  // ==================== BLOODLINE SYSTEM ENHANCEMENTS ====================

  initializeEnhancedBloodline(): void {
    if (!this.gameState.kingdom.enhancedBloodline) {
      const ruler = this.gameState.kingdom.ruler;
      const consort = ruler.consort;

      this.gameState.kingdom.enhancedBloodline = {
        id: `bloodline_${Date.now()}`,
        emperor: {
          id: ruler.id,
          name: ruler.name,
          portraitPath: IMAGE_ASSETS.portraits.aldwin,
          ageStage: 'adult',
          cultivationLevel: 50,
          cultivationProgress: 0,
          attributes: ruler.skills,
        },
        consort: consort ? {
          id: consort.id,
          name: consort.name,
          portraitPath: IMAGE_ASSETS.portraits.seraphine,
          ageStage: 'adult',
          cultivationLevel: 40,
          cultivationProgress: 0,
        } : undefined,
        children: [],
        marriages: [],
        houseBuffs: [],
      };
    }
  }

  addChildToBloodline(name: string, ageStage: string): void {
    const bloodline = this.gameState.kingdom.enhancedBloodline;
    if (!bloodline) return;

    bloodline.children.push({
      id: `child_${Date.now()}`,
      name,
      portraitPath: `/assets/backgrounds/portrait-${ageStage}.png`,
      ageStage: ageStage as any,
      cultivationLevel: 0,
      cultivationProgress: 0,
    });
  }

  recordBloodlineMarriage(character1Id: string, character2Id: string): void {
    const bloodline = this.gameState.kingdom.enhancedBloodline;
    if (!bloodline) return;

    bloodline.marriages.push({
      id: `marriage_${Date.now()}`,
      character1Id,
      character2Id,
      marriageDate: Date.now(),
      marriageType: 'dynastic' as any,
    });
  }

  // ==================== NAMED HOUSES SYSTEM ====================

  initializeNamedHouses(): void {
    if (!this.gameState.kingdom.namedHouses || this.gameState.kingdom.namedHouses.length === 0) {
      this.gameState.kingdom.namedHouses = [
        {
          id: 'house_iron_thorne',
          name: 'House Iron-Thorne',
          crestPath: IMAGE_ASSETS.crests.ironThorne,
          lordName: 'Lord Thorne',
          loyalty: 70,
          wealth: 5000,
          power: 50,
          demonicInfluence: 0,
          isBossNode: false,
          relationship: 60,
        },
        {
          id: 'house_silver_leaf',
          name: 'House Silver-Leaf',
          crestPath: '/assets/crests/crest-silver-leaf.png',
          lordName: 'Lady Meridian',
          loyalty: 80,
          wealth: 4000,
          power: 40,
          demonicInfluence: 0,
          isBossNode: false,
          relationship: 75,
        },
        {
          id: 'house_quartz',
          name: 'House Quartz',
          crestPath: IMAGE_ASSETS.crests.quartz,
          lordName: 'Lord Granite',
          loyalty: 65,
          wealth: 3500,
          power: 45,
          demonicInfluence: 5,
          isBossNode: false,
          relationship: 50,
        },
        // Add more houses up to 15 total
      ];
    }
  }

  updateNamedHouseLoyalty(houseId: string, change: number): void {
    const house = this.gameState.kingdom.namedHouses?.find(h => h.id === houseId);
    if (!house) return;

    house.loyalty = Math.max(0, Math.min(100, house.loyalty + change));

    // Check if demonicInfluence reached 100
    if (house.demonicInfluence >= 100 && !house.isBossNode) {
      house.isBossNode = true;
      this.gameState.events.push({
        id: `boss_node_${Date.now()}`,
        type: 'political' as any,
        title: `${house.name} Transformed!`,
        description: `${house.name} has become a Boss node due to high Demonic Influence!`,
        timestamp: Date.now(),
        resolved: false,
        choices: [],
      });
    }
  }

  increaseDemonicInfluence(houseId: string, amount: number): void {
    const house = this.gameState.kingdom.namedHouses?.find(h => h.id === houseId);
    if (!house) return;

    house.demonicInfluence = Math.min(100, house.demonicInfluence + amount);
    
    if (house.demonicInfluence >= 100 && !house.isBossNode) {
      this.updateNamedHouseLoyalty(houseId, -30);
    }
  }
}
''