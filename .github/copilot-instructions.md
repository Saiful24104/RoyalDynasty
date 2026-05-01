- Outline project architecture
- Define technology stack (Electron, React, TypeScript)
- Document game systems
- Create comprehensive README
- Set up development environment
- Establish file structure
- Implement core game engine
- Build UI framework

## Royal Dynasty Simulator - Development Guide

### Project Overview
A real-time kingdom management strategy game combining:
- Electron for cross-platform desktop distribution
- React + TypeScript for reactive UI
- Custom game engine for real-time simulation
- Medieval fantasy setting with multiple game systems

### Architecture Summary

**Game Engine** (`src/game/engine.ts`)
- Real-time tick system (100ms intervals)
- Game speed multiplier support
- Delta time calculations
- Resource production, consumption, and decay
- Building construction tracking
- Army unit training
- Stability dynamics
- Event processing

**Game Manager** (`src/game/manager.ts`)
- Building system (construction, upgrades)
- Army system (recruitment, dismissal)
- Nobility system (council, factions, loyalty)
- Heir system (succession mechanics)
- Economy system (trade routes, prices)
- Diplomacy system (relationships, wars, peace)

**Data Models** (`src/shared/types.ts`)
- Kingdom state structure
- Ruler attributes with skills
- Building and unit definitions
- Noble council hierarchy
- Market goods and trading
- Event system framework

### Key Systems to Understand

1. **Real-time Simulation**
   - Game loop runs every 100ms
   - Time multiplier affects all time-based calculations
   - Buildings produce resources based on level
   - Armies consume food and gold for maintenance

2. **Resource System**
   - 5 resources: Gold, Food, Wood, Stone, Iron
   - Production via buildings
   - Consumption via population and maintenance
   - Trading via market system

3. **Population Dynamics**
   - Consumes food (critical for survival)
   - Affects kingdom productivity
   - Famine causes stability loss
   - Grows monthly at 0.1% rate

4. **Stability System**
   - Base value 0-100
   - Improved by consort (0.3%), heir (0.5%)
   - Reduced by low resources and famine
   - Affects all kingdom operations

### Development Workflow

1. **For New Features**
   - Define types in `src/shared/types.ts`
   - Add system logic to `src/game/manager.ts`
   - Update game loop in `src/game/engine.ts` if time-dependent
   - Create UI component in `src/renderer/components/`
   - Add route in main App.tsx

2. **Customization Options**
   - Game balance: Edit `src/shared/constants.ts`
   - UI styling: Modify `src/renderer/styles/App.css`
   - Initial state: Adjust `src/game/initializer.ts`

3. **Testing**
   - Use game speed controls to accelerate time
   - Monitor console for any errors
   - Test edge cases (zero resources, max units, etc.)

### Next Steps for Enhancement

1. **Persistence**: Add save/load functionality using electron-store
2. **Events**: Implement random event system in engine tick
3. **Battles**: Create battle simulation system
4. **Visuals**: Add map visualization and building sprites
5. **AI**: Implement NPC kingdoms with autonomous decision-making
6. **Performance**: Optimize for large unit counts and long game sessions

### File Management
- Configuration: `tsconfig.json`, `package.json`
- Build output: `dist/` directory
- Preload security: `src/main/preload.ts`
- Styles: All in `src/renderer/styles/App.css` (monolithic for simplicity)
- Assets: Placeholder in `public/` directory

This outline provides a solid foundation for continued development. The separation of concerns (Engine/Manager/Initializer) allows easy system extension without affecting core simulation.
