// Game Engine - Real-time simulation core

import { GameState, Kingdom, Resources, Army, Building, BuildingType, GameTime, GameEvent } from '../shared/types';
import { INITIAL_RESOURCES, RESOURCE_PRODUCTION, MAINTENANCE_COSTS, GAME_SPEED } from '../shared/constants';

export class GameEngine {
  private gameState: GameState;
  private gameTickInterval: number | null = null;
  private gameTickRate = 100; // Update every 100ms
  private lastTickTime = Date.now();
  private isPaused = false;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  // Start game loop
  startGameLoop() {
    this.gameTickInterval = window.setInterval(() => this.tick(), this.gameTickRate);
  }

  // Stop game loop
  stopGameLoop() {
    if (this.gameTickInterval) {
      clearInterval(this.gameTickInterval);
      this.gameTickInterval = null;
    }
  }

  // Main game tick
  private tick() {
    if (this.isPaused) return;

    const now = Date.now();
    const deltaTime = now - this.lastTickTime;
    this.lastTickTime = now;

    // Update game time
    this.updateGameTime(deltaTime);

    // Update resources and production
    this.updateProduction(deltaTime);

    // Update armies
    this.updateArmies(deltaTime);

    // Update stability
    this.updateStability(deltaTime);

    // Handle events
    this.processEvents();

    // Check for heir succession
    this.checkSuccession();

    // Maintenance costs
    this.applyMaintenanceCosts(deltaTime);
  }

  private updateGameTime(deltaTime: number) {
    const gameTime = this.gameState.gameTime;
    const timeMultiplier = this.gameState.gameTime.speed;

    let totalSeconds = (gameTime.hour * 3600 + gameTime.minute * 60) + (deltaTime * timeMultiplier) / 1000;

    gameTime.minute = Math.floor((totalSeconds % 3600) / 60);
    gameTime.hour = Math.floor(totalSeconds / 3600) % 24;

    if (gameTime.hour === 0 && gameTime.minute === 0) {
      gameTime.day++;
      this.onNewDay();
    }

    if (gameTime.day > 30) {
      gameTime.day = 1;
      gameTime.month++;
      this.onNewMonth();
    }

    if (gameTime.month > 12) {
      gameTime.month = 1;
      gameTime.year++;
      this.onNewYear();
    }
  }

  private updateProduction(deltaTime: number) {
    const kingdom = this.gameState.kingdom;

    kingdom.capital.buildings.forEach(building => {
      if (!building.isConstructing) {
        this.produceResources(building, deltaTime);
      } else {
        this.updateConstruction(building, deltaTime);
      }
    });

    // Handle resource decay and consumption
    this.consumeResources(deltaTime);
  }

  private produceResources(building: Building, deltaTime: number) {
    const productionPerMs = 0.01; // Base production per millisecond
    const resources = this.gameState.kingdom.resources;

    switch (building.type) {
      case BuildingType.FARM:
        resources.food += productionPerMs * building.level * building.productionMultiplier * (deltaTime / this.gameTickRate);
        break;
      case BuildingType.MARKET:
        resources.gold += productionPerMs * building.level * building.productionMultiplier * (deltaTime / this.gameTickRate);
        break;
      case BuildingType.WORKSHOP:
        resources.wood += productionPerMs * building.level * building.productionMultiplier * (deltaTime / this.gameTickRate);
        resources.stone += productionPerMs * (building.level * 0.5) * building.productionMultiplier * (deltaTime / this.gameTickRate);
        break;
      case BuildingType.LIBRARY:
      case BuildingType.UNIVERSITY:
        // Mana production from magical buildings
        resources.mana += productionPerMs * building.level * building.productionMultiplier * (deltaTime / this.gameTickRate);
        break;
      case BuildingType.TEMPLE:
        // Silver production from temples
        resources.silver += productionPerMs * building.level * building.productionMultiplier * (deltaTime / this.gameTickRate);
        break;
    }
  }

  private updateConstruction(building: Building, deltaTime: number) {
    building.constructionProgress += (deltaTime / 1000); // Progress in seconds

    if (building.constructionProgress >= 100) {
      building.isConstructing = false;
      building.constructionProgress = 100;
      building.level++;
      building.productionMultiplier *= 1.1; // 10% boost per level
    }
  }

  private consumeResources(deltaTime: number) {
    const resources = this.gameState.kingdom.resources;
    const consumptionPerMs = 0.001;

    // Population consumes food
    resources.food -= (this.gameState.kingdom.population * consumptionPerMs) * (deltaTime / this.gameTickRate);
    resources.food = Math.max(0, resources.food);

    // Check for famine
    if (resources.food < this.gameState.kingdom.population) {
      this.gameState.kingdom.stability -= 5;
      this.gameState.kingdom.population = Math.max(resources.food, this.gameState.kingdom.population * 0.9);
    }
  }

  private updateArmies(deltaTime: number) {
    this.gameState.armies.forEach(army => {
      // Recover morale
      army.morale = Math.min(100, army.morale + (deltaTime / 10000));

      // Training progression
      army.units.forEach(unit => {
        unit.training = Math.min(100, unit.training + (deltaTime / 20000));
      });
    });
  }

  private updateStability(deltaTime: number) {
    const kingdom = this.gameState.kingdom;

    // Stability factors
    let stabilityChange = 0.01; // Base stability growth

    // Heir presence improves stability
    if (kingdom.ruler.heir) {
      stabilityChange += 0.005;
    }

    // Consort presence improves stability
    if (kingdom.ruler.consort) {
      stabilityChange += 0.003;
    }

    // Low resources reduce stability
    if (kingdom.resources.gold < 1000) {
      stabilityChange -= 0.02;
    }

    if (kingdom.resources.food < kingdom.population) {
      stabilityChange -= 0.05;
    }

    kingdom.stability = Math.max(0, Math.min(100, kingdom.stability + stabilityChange));

    // Generate prestige gradually based on stability and court level
    const court = kingdom.capital.court;
    if (court && court.throneRoomLevel > 0) {
      const prestigePerMs = 0.0001 * court.throneRoomLevel;
      kingdom.resources.prestige += prestigePerMs * (deltaTime / this.gameTickRate);
    }

    // Generate mana from academy
    const academy = kingdom.capital.academy;
    if (academy && academy.level > 0) {
      const manaPerMs = 0.0001 * academy.level;
      kingdom.resources.mana += manaPerMs * (deltaTime / this.gameTickRate);
    }
  }

  private processEvents() {
    // This would be expanded to randomly generate events
    // based on game state
  }

  private checkSuccession() {
    const ruler = this.gameState.kingdom.ruler;

    if (ruler.heir && ruler.heir.age >= 16) {
      // Heir is of age, succession event could occur
    }
  }

  private applyMaintenanceCosts(deltaTime: number) {
    const kingdom = this.gameState.kingdom;
    const maintenancePerMs = 0.01;

    // Army maintenance
    this.gameState.armies.forEach(army => {
      const armyCost = army.units.reduce((sum, unit) => sum + unit.count, 0) * maintenancePerMs;
      kingdom.resources.food -= armyCost * (deltaTime / this.gameTickRate);
      kingdom.treasury -= armyCost * (deltaTime / this.gameTickRate);
    });

    // Building maintenance
    kingdom.capital.buildings.forEach(building => {
      if (!building.isConstructing) {
        kingdom.treasury -= (building.maintenanceCost * maintenancePerMs) * (deltaTime / this.gameTickRate);
      }
    });
  }

  private onNewDay() {
    // Daily updates
    this.gameState.kingdom.ruler.age += 1 / 365;
    if (this.gameState.kingdom.ruler.heir) {
      this.gameState.kingdom.ruler.heir.age += 1 / 365;
    }
  }

  private onNewMonth() {
    // Monthly updates - population growth, nobility satisfaction
    this.gameState.kingdom.population *= 1.001; // 0.1% monthly growth

    // ===== HEIR INCUBATION PROCESSING =====
    const heir = this.gameState.kingdom.ruler.heir;
    if (heir && heir.isIncubating && heir.incubationMonthsRemaining !== undefined) {
      heir.incubationMonthsRemaining -= 1;

      // Apply resource investments to heir stat growth
      if (heir.incubationResources) {
        const HEIR_STAT_GROWTH_RATE = 0.15;
        heir.potential.leadership *= (1 + (heir.incubationResources.goldInvested / 1000) * HEIR_STAT_GROWTH_RATE);
        heir.potential.military *= (1 + (heir.incubationResources.foodInvested / 1000) * HEIR_STAT_GROWTH_RATE);
        heir.potential.wisdom *= (1 + (heir.incubationResources.manaInvested / 1000) * HEIR_STAT_GROWTH_RATE);
      }

      // Heir born after 9 months
      if (heir.incubationMonthsRemaining <= 0) {
        heir.isIncubating = false;
        heir.age = 0;
      }
    }

    // ===== ESTATE DEVELOPMENT =====
    this.gameState.estates.forEach(estate => {
      // Natural prosperity growth
      estate.prosperity = Math.min(100, estate.prosperity + 0.5);
      // Population natural growth
      estate.population = Math.floor(estate.population * 1.002);
      // Resource regeneration
      if (estate.resources.food !== undefined) estate.resources.food += 10;
      if (estate.resources.wood !== undefined) estate.resources.wood += 5;
    });

    // ===== INFLUENCE SYSTEM DECAY =====
    const influence = this.gameState.influenceSystem;
    influence.currentInfluence = Math.max(0, influence.currentInfluence - 2); // Natural influence decay
    influence.internalFriction = Math.max(0, influence.internalFriction - 0.5);

    // ===== NOBLE HOUSE RELATIONSHIPS =====
    this.gameState.nobleHouses.forEach(house => {
      // Relationships naturally decay slightly unless nurtured
      if (house.relationship !== undefined) {
        house.relationship = Math.max(0, house.relationship - 0.5);
      }
    });

    // ===== ENEMY DYNASTY THREATS =====
    this.gameState.enemyDynasties.forEach(dynasty => {
      if (dynasty.isAtWar) {
        // War causes stability loss
        this.gameState.kingdom.stability -= 1;
        // War increases threat level
        dynasty.threat_level = Math.min(100, dynasty.threat_level + 2);
      } else {
        // Peace allows threat to naturally lower
        dynasty.threat_level = Math.max(0, dynasty.threat_level - 1);
      }
    });

    // ===== LEDGER AUTO-RECORDING =====
    // Record monthly maintenance costs
    const ledger = this.gameState.generalLedger;
    const totalMaintenanceCost = this.gameState.armies.reduce((sum, army) => {
      return sum + army.units.reduce((s, u) => s + u.count * 10, 0);
    }, 0);

    if (totalMaintenanceCost > 0) {
      ledger.entries.push({
        id: `entry_${Date.now()}`,
        date: Date.now(),
        description: 'Monthly army maintenance',
        category: 'expense',
        amount: totalMaintenanceCost,
      });
      ledger.totalExpense += totalMaintenanceCost;
    }

    ledger.netBalance = ledger.totalIncome - ledger.totalExpense;
    ledger.lastUpdated = Date.now();
  }

  private onNewYear() {
    // Yearly updates
    this.gameState.kingdom.ruler.reign++;

    // ===== YEARLY HEIR AGING =====
    const heir = this.gameState.kingdom.ruler.heir;
    if (heir && !heir.isIncubating) {
      // Heir ages normally when not incubating
      heir.age += 1;
      // Heir legitimacy slightly increases with age
      heir.legitimacy = Math.min(1.0, heir.legitimacy + 0.02);
    }

    // ===== YEARLY INFLUENCE RESET =====
    // Backlash counter partially resets yearly
    this.gameState.influenceSystem.backlashCounter = Math.max(0, this.gameState.influenceSystem.backlashCounter - 20);

    // ===== YEARLY NOBLE HOUSE REVIEW =====
    // Houses with low relationships may suffer consequences
    this.gameState.nobleHouses.forEach(house => {
      if (house.relationship !== undefined && house.relationship < 30) {
        // Low relationship leads to rebellion chance
        this.gameState.kingdom.stability -= 5;
      }
    });

    // ===== YEARLY ACADEMY GROWTH =====
    const academy = this.gameState.kingdom.capital.academy;
    if (academy) {
      academy.knowledgePool = Math.floor(academy.knowledgePool * 1.1); // 10% growth
      // Scholars progress
      academy.students.forEach(student => {
        student.progress = Math.min(100, student.progress + 25);
        if (student.progress >= 100) {
          student.level += 1;
          student.progress = 0;
        }
      });
    }

    // ===== YEARLY ESTATE EVALUATION =====
    this.gameState.estates.forEach(estate => {
      // High prosperity estates generate prestige
      if (estate.prosperity > 70) {
        this.gameState.kingdom.resources.prestige += estate.prosperity / 10;
      }
      // Poor estate stability loss
      if (estate.prosperity < 30) {
        this.gameState.kingdom.stability -= 3;
      }
    });
  }

  // Public methods

  setGameSpeed(speed: number) {
    this.gameState.gameTime.speed = speed;
  }

  pauseGame() {
    this.isPaused = true;
  }

  resumeGame() {
    this.isPaused = false;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  updateGameState(newState: Partial<GameState>) {
    this.gameState = { ...this.gameState, ...newState };
  }
}
