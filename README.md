# Royal Dynasty Simulator

A real-time kingdom management and strategy game built with Electron, React, and TypeScript.

## 🎮 Game Features

### Kingdom Management
- **Ruler Profile**: Manage your king/queen with customizable skills and traits
- **Royal Family**: Establish a consort and heir to secure your dynasty's future
- **Capital City**: Build and upgrade buildings, manage population and prosperity
- **Stability System**: Monitor kingdom stability affected by resources, population, and events

### Resource Management
- **Five Resource Types**: Gold, Food, Wood, Stone, Iron
- **Production System**: Buildings generate resources automatically
- **Economy**: Manage treasury, taxation, and expenses
- **Market System**: Trade goods with other kingdoms

### Military System
- **Army Management**: Organize multiple armies with different unit types
- **Unit Types**: Infantry, Cavalry, Archer, Mage, Knight, Siege Weapons
- **Training & Morale**: Improve unit effectiveness and maintain army morale
- **Warfare**: Strategic military campaigns (planned feature)

### Nobility & Diplomacy
- **Noble Council**: Manage powerful nobles and their loyalty
- **Factions**: Create political factions with conflicting interests
- **Influence**: Balance power between different council members
- **Diplomacy**: Form alliances, trade agreements, or declare wars

### Real-time Systems
- **Live Game Clock**: Year, month, day, hour simulation
- **Game Speed Control**: Play at your own pace (Pause, Slow, Normal, Fast, Very Fast)
- **Continuous Production**: Resources and units generate automatically
- **Dynamic Events**: Random events affect your kingdom (planned feature)

## 📋 Project Structure

```
src/
├── main/               # Electron main process
│   ├── index.ts       # App entry point
│   └── preload.ts     # IPC security layer
├── renderer/          # React UI
│   ├── App.tsx        # Main app component
│   ├── components/    # UI components
│   │   ├── Dashboard.tsx
│   │   ├── KingdomOverview.tsx
│   │   ├── ArmyManagement.tsx
│   │   ├── BuildingManagement.tsx
│   │   ├── NobleCouncil.tsx
│   │   ├── MarketPlace.tsx
│   │   └── GameControls.tsx
│   └── styles/        # CSS styles
├── game/              # Game engine & logic
│   ├── engine.ts      # Real-time simulation loop
│   ├── manager.ts     # Game systems manager
│   └── initializer.ts # Game initialization
└── shared/            # Shared types & constants
    ├── types.ts       # Game data models
    └── constants.ts   # Game configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Windows, macOS, or Linux

### Installation

1. Clone or extract the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with hot reload:
```bash
npm run dev
```

This will start:
- React development server on http://localhost:3000
- Electron app window with dev tools

### Build

Build the application:
```bash
npm run build
```

### Start

Run the compiled application:
```bash
npm start
```

## 🎯 Game Systems

### Building System
Construct and upgrade various buildings in your capital:
- **Farm**: Produce food
- **Market**: Generate gold
- **Workshop**: Produce wood and stone
- **Barracks**: Recruit military units
- **Castle**: Capital defense
- **University**: Research and education
- **Temple**: Religious influence
- **Walls**: Defensive fortifications
- **Library**: Knowledge preservation
- **Warehouse**: Resource storage

### Economy System
- Buildings automatically generate resources
- Maintenance costs for armies and buildings
- Population consumption of food
- Resource decay/spoilage (planned)
- Trade routes for profit

### Succession System
- Heirs reach age of majority at 16
- Legitimacy affects succession chance
- Consort influences kingdom stability
- Heir traits and potential development

### Stability Factors
- **Positive**: Consort, Heir, Stable resources
- **Negative**: Food shortage, Low treasury, Rebellion risk
- **Effects**: Impacts population growth, noble loyalty, military effectiveness

## 🔧 Game Configuration

Edit [src/shared/constants.ts](src/shared/constants.ts) to modify:
- Game speed multipliers
- Resource production rates
- Unit recruitment costs
- Building construction times
- Maintenance costs
- Stability thresholds

## 📊 Current Game State

The game initializes with:
- **Ruler**: King Arthur (Age 35, Reign 5 years)
- **Kingdom**: Camelot
- **Population**: 5,000
- **Initial Resources**: Gold 5000, Food 2000, Wood 1000, Stone 800, Iron 200
- **Starting Army**: 500 Infantry, 100 Cavalry, 200 Archers
- **Initial Stability**: 75%

## 📝 TODO & Planned Features

### Short Term
- [ ] Save/Load game functionality
- [ ] Random event system
- [ ] More building types
- [ ] City layout visualization
- [ ] Battle simulation system

### Medium Term
- [ ] Multiple kingdoms to interact with
- [ ] Improved diplomacy system
- [ ] Technology/Research trees
- [ ] Cultural systems
- [ ] Religion mechanics

### Long Term
- [ ] Procedurally generated world
- [ ] Multiplayer support (planned)
- [ ] Advanced AI for other kingdoms
- [ ] Dynamic map system
- [ ] Campaign scenarios

## 🛠️ Architecture

### Game Engine
- **Real-time Tick System**: Updates every 100ms with delta time
- **Game Speed Multiplier**: Affects time passage
- **State Management**: Centralized GameState object
- **Separation of Concerns**: Engine (simulation) vs Manager (logic) vs Initializer (setup)

### UI Architecture
- **React Components**: Modular, reusable UI components
- **State Lifting**: GameState managed at app level
- **Real-time Updates**: UI refreshes every 500ms with current game state
- **Electron IPC**: Main process ↔ Renderer process communication (ready for expansion)

## 🎨 Styling

The game features a dark medieval theme with:
- Deep blue backgrounds (#0a1428, #1a1f36, #2d3561)
- Gold accents (#ffd700)
- Cyan highlights (#7dd3fc)
- Responsive grid layouts
- Smooth transitions and hover effects

## 📖 Development Notes

### Adding New Components
1. Create component in `src/renderer/components/`
2. Import GameState and GameManager types
3. Add navigation button in main App.tsx
4. Style using App.css

### Adding New Game Systems
1. Extend GameState in `src/shared/types.ts`
2. Add manager methods in `src/game/manager.ts`
3. Add initialization in `src/game/initializer.ts`
4. Integrate into game engine tick loop

### TypeScript Paths
Use path aliases for cleaner imports:
- `@shared/*` → `src/shared/`
- `@game/*` → `src/game/`
- `@renderer/*` → `src/renderer/`

## 🐛 Known Issues

- None reported yet

## 📄 License

This project is open source. Modify and extend as needed!

## 💡 Tips

- Pause the game (⏸️) to make strategic decisions
- Monitor stability carefully - low stability leads to disaster
- Build diverse armies for different combat situations
- Manage your nobles' loyalty to prevent rebellions
- Establish trade routes for passive income

Enjoy ruling your kingdom! 👑
