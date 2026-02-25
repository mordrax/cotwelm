# Castle of the Winds in Elm — Game Systems Status

## Project Overview

**Castle of the Winds** is a tile-based roguelike RPG originally created by Rick Saada in the late 1980s. This project (`cotwelm`) is the **third port attempt** by developer mordrax, following a [JavaScript version](https://github.com/mordrax/CoTWjs/) and a [Meteor/React version](https://github.com/mordrax/cotwmtor). The Elm rewrite began in August 2017 with active development through September 2017, and a final commit in October 2018.

- **Language**: Elm 0.18
- **Codebase**: ~16,850 lines of Elm across 84 modules
- **Total commits**: 58 (Aug 2017 – Oct 2018)
- **Live demo**: http://game.castleofthewinds.com
- **External devlog**: https://mordrax.github.io/cotwmtor/
- **Trello board**: https://trello.com/b/EByoUHwY/cotwmtor

---

## Devlog & Development History Summary

The commit history tells a clear story of rapid, focused development:

| Period | Focus Area | Key Milestones |
|--------|-----------|----------------|
| **Aug 12, 2017** | Items & Loot | Weapon/armor loot system, dungeon loot generation, 15% monster drop rate |
| **Aug 13–14** | Monsters | Random monster names, leveling system, shop message screens |
| **Aug 16–22** | Messaging | Inventory/shop messages, equipment messages, message styling |
| **Aug 27–30** | Character Info | Character info screen, item hover descriptions, level-up messages |
| **Aug 31 – Sep 4** | **Dungeon Rewrite** | Complete dungeon generator rewrite: room types (rectangular, cross, diamond, circular), corridor A* pathfinding, stairs, door placement |
| **Sep 5–6** | Polish | Time keeping, broken doors fix, walk interruption by monsters |
| **Sep 7–9** | Gameplay | FOV room exploration, monster pathfinding fixes, sign system, clickable monsters, key filtering per screen |
| **Sep 10** | UI | View refactoring, HUD extraction, consolidated menus |
| **Sep 16–17** | Tooltips | Monster hover stats, tile tooltips |
| **Oct 15, 2018** | Arena | Enabled arena/pit (final commit, 13 months later) |

The project was developed in intense sprints. The dungeon rewrite (PR #27) was the largest architectural change. After September 2017, development went quiet with only one more commit over a year later. The devlog (hosted separately on GitHub Pages from the earlier Meteor project) chronicles the broader journey across all three port attempts, with the Elm version representing the most mature and architecturally sound iteration.

---

## All Game Systems — Status & Completeness

### 1. Character Creation System

**Files**: `CharCreation.elm`, `Attributes.elm`, `View/CharCreation.elm`, `View/Difficulty.elm`

**What's implemented**:
- Character name text input
- Gender selection (male/female)
- Difficulty selection with visual icons
- 5 attributes (Strength, Dexterity, Constitution, Intelligence, and a 5th) with 100-point pool allocation via sliders
- Attribute description text at each level

**What's incomplete for MVP**:
- Attribute descriptions at levels 10–90 are all TODO placeholders ("Write something funny and informative about this level")
- No starting equipment selection
- No character class or background selection

**What's needed for completion**:
- All attribute flavor text filled in
- Starting equipment/class choices matching the original game
- Character portrait/visual preview
- Validation (minimum attribute values, name length)

**Completeness: ~70%**

---

### 2. Combat System

**Files**: `Game/Combat.elm`, `Arena/Match.elm`, `Arena/Round.elm`, `Arena/PlayerArena.elm`, `Arena/MonsterArena.elm`

**What's implemented**:
- Chance-to-Hit (CTH) calculation using AC, armor penalties, strength/dexterity bonuses, size modifiers
- Dice-based damage rolling with configurable dice expressions
- Critical hit range system
- Multiple attacks per turn (framework)
- Hit/miss/block/critical result types with message generation
- Arena testing framework with statistics tracking (win rate, avg HP remaining, avg turns, hit percentages)

**What's incomplete for MVP**:
- Attack speed modifier returns constant `1` — not implemented
- Combat messages are sparse (many placeholder/empty arrays)
- Status effects (Poison, Burn, Freeze, Shock, Adrenaline) defined in types but **not applied during combat**

**What's needed for completion**:
- Attack speed formula implementation
- Status effect application during combat rounds
- Special monster abilities (drain, spells, breath attacks) — referenced in monster types but no combat logic
- Ranged combat mechanics
- Magic/spell combat system
- Varied combat messages for immersion
- Flee/retreat mechanics

**Completeness: ~65%**

---

### 3. Dungeon Generation System

**Files**: `Dungeon/DungeonGenerator.elm`, `Dungeon/Room.elm`, `Dungeon/Corridor.elm`, `Dungeon/Entrance.elm`, `Dungeon/Editor.elm`, `Dungeon/Rooms/*.elm` (7 room types)

**What's implemented**:
- Procedural dungeon generation with non-overlapping room placement
- 7 room shape templates: Rectangular, Circular, Cross, Diamond, DiagonalSquares, DeadEnd, Potion
- A* pathfinding-based corridor routing between rooms
- Wall type calculation (various wall tile patterns)
- Stair placement (up/down connections between levels)
- Room connection validation (minimum connections and stair requirements)
- Door placement at room entrances
- Dungeon editor for development/testing

**What's incomplete for MVP**:
- Debug.log statements left in production code (lines 113–114, 164, 259, 273, 431 in DungeonGenerator)
- Single-width corridors only

**What's needed for completion**:
- Remove debug logging
- Secret rooms and hidden passages
- Treasure rooms and special encounter rooms
- Boss rooms at specific dungeon depths
- Trap placement
- Environmental features (water, lava, etc.)
- Dungeon theming per level depth

**Completeness: ~85%**

---

### 4. Monster System

**Files**: `Monster.elm`, `Monsters/Types.elm`, `Monsters/Factory.elm`, `Monsters/Model.elm`, `Monsters/View.elm`

**What's implemented**:
- **68 unique monster types** defined (Kobold through Green Dragon)
- Monster categories: Humanoid, Undead, Animal, Giant, Elemental, Devil, Dragon
- Difficulty ranking system for level-appropriate spawning
- Lexical random name generation for individual monsters
- Equipment assignment per monster type (weapons, armor)
- Monster stat scaling (HP, attributes) by type
- CSS sprite rendering for each monster type
- Monster attack types defined (Melee, Ranged, Poison, Fire, Ice, Lightning, etc.)

**What's incomplete for MVP**:
- Monster AI is basic (move toward player, attack in melee)
- Special attack types defined but **not implemented in combat logic**
- No monster-specific behaviors (spellcasting, fleeing, summoning)
- 15 monsters hardcoded per dungeon level

**What's needed for completion**:
- Special abilities per monster type (breath weapons, spells, drain attacks)
- Monster AI behaviors (flee when low HP, ranged attack preferences, group tactics)
- Level-scaled monster density (not hardcoded 15)
- Boss monsters with unique mechanics
- Monster resistances and vulnerabilities

**Completeness: ~75%**

---

### 5. Item & Equipment System

**Files**: `Item.elm`, `Item/Data.elm`, `Item/Weapon.elm`, `Item/Wearable.elm`, `Item/Belt.elm`, `Item/Pack.elm`, `Item/Purse.elm`, `Equipment.elm`

**What's implemented**:
- Comprehensive item type hierarchy (Weapons, Armor, Shields, Helmets, Gauntlets, Bracers, Belts, Packs, Purses, Coins)
- **17 player weapons** from Broken Sword to War Hammer with dice-based damage
- **13 monster-specific weapons** (claws, fangs, pincers, etc.)
- **15 armor types** from Rusty Leather to Elven Chain Mail with AC values
- **7 helmet types**, **12 shield types**, gauntlets with multiple tiers
- Item status system (Normal, Cursed, Enchanted)
- Identification status (Identified vs Unknown)
- Mass/weight system for items
- 15 equipment slots defined
- Cursed item prevention on unequip
- Coin system (Copper, Silver, Gold, Platinum)

**What's incomplete for MVP**:
- Equipment slots for Neckwear, Rings, Boots, Overgarment **defined but never used**
- No magic/enchanted item differentiation beyond status flag
- Item identification is tracked but no identify mechanic implemented

**What's needed for completion**:
- Activate unused equipment slots (rings, neckwear, boots, overgarment)
- Magic item properties and enchantment effects
- Identify scroll/service mechanic
- Potions and consumable items
- Scrolls and magical items
- Unique/artifact items
- Item durability or degradation (if desired)
- Item set bonuses (optional)

**Completeness: ~75%**

---

### 6. Inventory & Drag-Drop System

**Files**: `Inventory.elm`, `View/Inventory.elm`, `Utils/DragDrop.elm`

**What's implemented**:
- Full drag-and-drop interface for equipment management
- Item movement between: equipment slots, pack, ground, shop
- Shop buy/sell transactions with affordability checking
- Pack capacity management
- Cursed item handling (prevents unequip)
- Equipment/pack/ground/shop container views

**What's incomplete for MVP**:
- Pack removal logic has a TODO (line ~203 in Inventory.elm)
- Pack-related shop transactions incomplete

**What's needed for completion**:
- Fix pack removal/transaction bugs
- Item sorting options
- Item stacking for consumables
- Quick-equip shortcuts
- Bulk sell/drop functionality

**Completeness: ~75%**

---

### 7. Shop System

**Files**: `Shops.elm`, `Building.elm`

**What's implemented**:
- 4 shop types: Weaponsmith, General Store, Potion Store, Junk Shop
- Shop inventory management with item stocking
- Buy/sell price calculation with markup
- Shop UI integrated with inventory drag-drop
- Building entry/exit with shop linking

**What's incomplete for MVP**:
- Potion Store has **empty inventory** (stub)
- Junk Shop has **empty inventory** (stub)
- No shop inventory refresh/restock mechanic

**What's needed for completion**:
- Populate Potion Store with potions/consumables
- Populate Junk Shop with miscellaneous items
- Shop inventory refresh between dungeon trips
- Shop price negotiation or reputation system (optional)
- Temple services (healing, curse removal, resurrection)

**Completeness: ~60%**

---

### 8. Map & World System

**Files**: `Game/Maps.elm`, `Game/Level.elm`, `ASCIIMaps.elm`, `Tile.elm`

**What's implemented**:
- Multi-area world: Village, Farm, DungeonLevelOne (static), dynamic DungeonLevel N
- ASCII-to-tile map conversion for static areas
- Static village map with buildings, paths, and signs
- Dynamic dungeon level generation with save/load per level
- Level transitions via stairs (upstairs/downstairs)
- Area-linked buildings for seamless travel
- Tile types: Rock, Grass, DarkDgn, LitDgn, Walls (many variants), Doors, Floors, Water, Lava, etc.

**What's incomplete for MVP**:
- Farm area defined but minimal content
- Only dungeon level 1 has a static layout; deeper levels are generated
- Limited tile variety in generated dungeons

**What's needed for completion**:
- Full village area with all buildings from original game
- Farm/wilderness areas with encounters
- Multiple themed dungeon tilesets
- World map or overworld travel
- Secret areas and side dungeons
- NPC placement and interaction in town areas

**Completeness: ~70%**

---

### 9. Field of View & Visibility System

**Files**: `Game/FOV.elm`, `Game/Level.elm`, `Utils/FieldOfView.elm`, `Utils/BresenhamLine.elm`

**What's implemented**:
- Room-based FOV (entering a room reveals the entire room)
- Line-of-sight calculations using Bresenham's line algorithm
- Visibility states: Known, Unknown, Hidden
- Explored/unexplored tile tracking
- Monsters visible only in FOV
- Light source types defined (Artificial, Natural)
- Viewport-based rendering (only renders visible area)

**What's incomplete for MVP**:
- `Game/FOV.elm` is an empty stub (logic lives in Level.elm)
- No per-tile FOV raycasting (uses room-based reveal instead)
- Light source mechanics not implemented

**What's needed for completion**:
- Proper tile-based FOV algorithm (shadowcasting or recursive)
- Light source radius mechanics
- Dark areas requiring torches
- Stealth/hidden monster detection
- Magic detection abilities

**Completeness: ~70%**

---

### 10. Pathfinding & Movement System

**Files**: `Game/Pathfinding.elm`, `Game/Collision.elm`, `Utils/AStarCustom.elm`, `Utils/Direction.elm`, `Utils/Vector.elm`

**What's implemented**:
- A* pathfinding with Euclidean heuristic
- Path memoization/caching for performance
- 8-directional movement (keyboard: arrows + numpad)
- Click-to-move pathfinding for player
- Monster pathfinding toward player (10-tile detection range)
- Collision detection: wall blocking, monster combat, building entry, door auto-opening
- Walk mode (hold shift) for continuous movement until interrupted
- Walk interrupted by monster detection

**What's incomplete for MVP**:
- Two redundant pathfinding filter functions that could be consolidated

**What's needed for completion**:
- Diagonal movement cost differentiation (√2 vs 1)
- Improved monster detection (currently fixed 10-tile radius)
- Path visualization (show planned path on click)

**Completeness: ~90%**

---

### 11. Message & Communication System

**Files**: `Message.elm`, `Comms.elm`, `View/Hud.elm`

**What's implemented**:
- Message categorization (Good, Bad, Neutral)
- Message history with batching
- HUD message display
- Game messages for: combat, movement, doors, stairs, loot pickup, shop transactions, equipment changes, level-up
- Sign reading

**What's incomplete for MVP**:
- Combat message generator returns placeholder ("boo!") in many cases
- Limited message variety

**What's needed for completion**:
- Rich combat narration messages
- Environmental description messages
- NPC dialogue system
- Message log scrollback UI
- Message filtering by category

**Completeness: ~70%**

---

### 12. Input System

**Files**: `Input.elm`

**What's implemented**:
- Keyboard mapping to game actions
- Arrow keys + numpad 8-directional movement
- Context-sensitive key filtering per screen (map, inventory, building, etc.)
- Action keys: G (pickup), I (inventory), Space (wait), period (go down stairs)
- Shift+direction for walk mode

**What's incomplete for MVP**:
- Mouse click coordinates need full implementation for path navigation

**What's needed for completion**:
- Full mouse/touch support for movement and interaction
- Keybinding customization
- Help overlay showing available keys
- Right-click context menus

**Completeness: ~80%**

---

### 13. Hero & Stats System

**Files**: `Hero.elm`, `Stats.elm`

**What's implemented**:
- Hero initialization with configurable attributes
- HP/SP (Health/Spell Points) with current and max values
- Experience system with exponential level progression
- Stat regeneration with configurable rates
- Health status descriptions at various HP thresholds
- Damage application and death checking
- Status effects defined: Poison, Adrenaline, Burn, Freeze, Shock
- Level-up HP/SP calculation

**What's incomplete for MVP**:
- Status effects exist as types but are **never applied or processed**
- No spell point usage (SP exists but no magic system)
- Name hardcoded as "Conan the destroyer" in death screen

**What's needed for completion**:
- Status effect processing (damage over time, stat modifications)
- Magic/spell system using SP
- Character name carried through to all screens (death screen uses hardcoded name)
- Hunger/food system (if following original)
- Resistance calculations per element

**Completeness: ~75%**

---

### 14. UI & View System

**Files**: `View/Game.elm`, `View/Map.elm`, `View/Hud.elm`, `View/UI.elm`, `View/Inventory.elm`, `View/CharCreation.elm`, `View/CharacterInfo.elm`, `View/Difficulty.elm`, `View/Rip.elm`, `SplashView.elm`

**What's implemented**:
- Splash screen with New Game / Load Game / Overview buttons
- Character creation screen with attribute sliders
- Difficulty selection screen
- Main game map rendering with tile sprites
- HUD with health/status display and message area
- Inventory screen with drag-drop equipment management
- Character info screen
- Death (R.I.P.) tombstone screen
- Building interior view (placeholder TODO)
- Screen navigation system (Map, Inventory, Building, CharInfo, RIP)

**What's incomplete for MVP**:
- Building interior view is a TODO placeholder
- Load Game button exists but **no save/load system**
- Overview button exists but not implemented
- Character name not propagated to death screen

**What's needed for completion**:
- Save/load game system (localStorage or server-side)
- Building interior views
- Mini-map
- Settings/options screen
- Help/tutorial screens
- Responsive design for different screen sizes
- Mobile touch controls

**Completeness: ~70%**

---

### 15. Arena/Testing System

**Files**: `Arena/Match.elm`, `Arena/Round.elm`, `Arena/PlayerArena.elm`, `Arena/MonsterArena.elm`, `Arena/View.elm`

**What's implemented**:
- Automated combat testing framework
- Match simulation with configurable rounds
- Statistics tracking: wins, average HP remaining, average turns, hit percentages
- CTH calculation display
- Player vs Monster and Monster vs Monster matchups
- HTML table rendering of results

**What's incomplete for MVP**:
- This is a developer tool, not player-facing content
- No integration with main game as a game feature

**What's needed for completion**:
- Could become a "practice arena" feature
- Balance data export for tuning
- This is fundamentally complete for its purpose as a dev tool

**Completeness: ~80% (as a dev tool)**

---

## Overall Completeness Summary

| System | Status | MVP | Complete |
|--------|--------|-----|----------|
| Character Creation | Functional | 70% | 50% |
| Combat | Core working | 65% | 45% |
| Dungeon Generation | Strong | 85% | 65% |
| Monsters | Data-rich, logic-light | 75% | 55% |
| Items & Equipment | Comprehensive data | 75% | 55% |
| Inventory & Drag-Drop | Functional | 75% | 65% |
| Shops | Partially stocked | 60% | 40% |
| Maps & World | Foundation solid | 70% | 45% |
| FOV & Visibility | Room-based | 70% | 50% |
| Pathfinding & Movement | Strong | 90% | 80% |
| Messages | Framework present | 70% | 50% |
| Input | Keyboard good | 80% | 65% |
| Hero & Stats | Core working | 75% | 55% |
| UI & Views | Screens exist | 70% | 50% |
| Arena (Dev Tool) | Functional | 80% | 75% |

**Overall Project: ~74% to MVP, ~55% to full completion**

---

## High-Level Skeleton: Current State to Completion

### Phase 1: Stabilize & Fix (Make it playable end-to-end)

1. **Save/Load System** — Critical missing feature. Implement localStorage-based save/load so players don't lose progress.
2. **Fix Death Screen** — Propagate actual character name instead of hardcoded "Conan the destroyer".
3. **Remove Debug Logging** — Clean up `Debug.log` statements in DungeonGenerator.
4. **Fix Pack Transactions** — Resolve the TODO in Inventory.elm around pack removal.
5. **Building Interior View** — Replace the TODO placeholder in View/Game.elm with actual building interiors.

### Phase 2: Complete Core Game Loop (MVP)

6. **Populate All Shops** — Fill Potion Store and Junk Shop with actual inventories. Implement potions as consumable items.
7. **Implement Status Effects** — Wire Poison, Burn, Freeze, Shock into combat and per-turn processing.
8. **Attack Speed Formula** — Implement the combat speed modifier (currently returns constant 1).
9. **Combat Messages** — Replace placeholder combat messages with varied, descriptive text.
10. **Level-Scaled Content** — Scale monster count, loot quality, and monster difficulty by dungeon depth (currently hardcoded).

### Phase 3: Deepen Systems (Feature-complete)

11. **Magic System** — Implement spell casting using the existing SP system. Add spell scrolls, spell books, and mana potions.
12. **Special Monster Abilities** — Implement breath weapons, drain attacks, spellcasting, ranged attacks as defined in monster types.
13. **Activate Unused Equipment Slots** — Enable rings, neckwear, boots, overgarment slots with corresponding items.
14. **Magic Items & Enchantments** — Differentiate enchanted items with actual stat bonuses and effects.
15. **Identification System** — Implement identify scrolls or NPC identify service.
16. **Temple Services** — Healing, curse removal, and resurrection at the Temple of Odin.

### Phase 4: World & Content (Full game)

17. **Full Town Content** — All original Castle of the Winds buildings and NPCs.
18. **Wilderness/Farm Areas** — Populate outdoor areas with encounters and content.
19. **Quest System** — Main storyline from the original game (revenge quest).
20. **Boss Encounters** — Unique boss monsters at key dungeon depths.
21. **Multiple Dungeon Branches** — Side areas, secret dungeons, themed levels.
22. **Proper FOV** — Replace room-based reveal with shadowcasting algorithm.

### Phase 5: Polish & Platform (Release-ready)

23. **Elm 0.18 → 0.19+ Migration** — The project uses Elm 0.18 which is significantly outdated. Migration is a major undertaking but necessary for long-term maintainability.
24. **Responsive Design** — Mobile and tablet support.
25. **Mouse/Touch Controls** — Full point-and-click and touch input support.
26. **Sound & Music** — Audio effects for combat, movement, ambient dungeon sounds.
27. **Tutorial/Help System** — In-game help and new player onboarding.
28. **Settings & Options** — Keybinding config, display options, difficulty tuning.
29. **Analytics & Balancing** — Use the Arena system to balance combat across all dungeon levels.

---

## Environment Setup Guide

### Prerequisites

```
# Elm 0.18 (REQUIRED — the project does NOT compile with 0.19+)
# Option A: Install via npm
npm install -g elm@0.18.0

# Option B: Install from elm-lang.org/install (select 0.18)

# Development tools
npm install -g http-server browser-sync
```

### Building from Source

```bash
# 1. Clone the repository
git clone https://github.com/mordrax/cotwelm.git
cd cotwelm

# 2. Install Elm dependencies (automatic on first build)
# Dependencies are resolved from elm-package.json

# 3. Build the project
./build.sh
# This runs: rm -rf elm-stuff/build-artifacts/ && elm-make src/main.elm --output dist/js/cotw.js

# 4. Open in browser
# Open dist/index.html in Chrome (recommended)
```

### Development Mode (Auto-Refresh)

```bash
# Start development server with auto-reload
./dev.sh

# This starts:
#   - http-server on port 8844 serving dist/
#   - browser-sync on port 8888 proxying to 8844
#   - Auto-refreshes browser when dist/js/cotw.js changes

# In a separate terminal, recompile on changes:
elm-make src/main.elm --output dist/js/cotw.js
```

### Quick Reference

| Command | Purpose |
|---------|---------|
| `./build.sh` | Clean build (deletes elm-stuff/build-artifacts first) |
| `./dev.sh` | Start dev server with browser-sync auto-reload |
| `./build.sh "commit msg"` | Build + git commit + push + deploy to Heroku |
| `./deploy.sh` | Deploy to Heroku only |
| `./hack.sh` | Module hot-reload hack for faster iteration |

### Important Notes

- **Elm 0.18 only**: This project uses `elm-make` (not `elm make`) and `elm-package.json` (not `elm.json`). It will not compile with Elm 0.19+.
- **Chrome recommended**: The index.html is noted as working best in Chrome.
- **No node_modules needed for build**: Elm packages are self-contained in `elm-stuff/`. npm packages are only needed for `http-server` and `browser-sync` dev tools.
- **Assets in dist/**: All CSS, images, and the compiled JS live in `dist/`. The `dist/index.html` is the entry point that loads everything.
- **PHP include in HTML**: The `index.html` has a `<?php include_once("analyticstracking.php") ?>` line — this works when served by PHP but is ignored by static servers and browsers.

### Docker Environment (Recommended for Reproducibility)

Since Elm 0.18 is no longer easily installable, a Docker approach is the most reliable:

```dockerfile
FROM node:8

# Install Elm 0.18
RUN npm install -g elm@0.18.0

# Install dev tools
RUN npm install -g http-server browser-sync

WORKDIR /app
COPY . .

# Build
RUN elm-make src/main.elm --output dist/js/cotw.js

EXPOSE 8844 8888

CMD ["http-server", "dist", "-p", "8844"]
```

```bash
# Build and run
docker build -t cotwelm .
docker run -p 8844:8844 cotwelm
# Then open http://localhost:8844
```

---

*Document generated 2026-02-25. Based on analysis of 84 Elm source files, 58 git commits (Aug 2017 – Oct 2018), and project documentation.*
