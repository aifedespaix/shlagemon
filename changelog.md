# Changelog

All notable changes to this project will be documented in this file.
The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.3.4] - 2025-07-06

### Added

- Disease system introducing ailments for Shlagémon with in-battle badges.
- Held item support for Shlagémon.

### Changed

- Mobile menu buttons redesigned and disabled while dialogs are open.

### Fixed

- Battle timers now clear correctly.
- Minor UI and configuration fixes.

## [0.3.3] - 2025-07-05

### Added

- Player creation form with persisted audio preferences.
- Audio settings button moved to the header with random music tracks.
- Evolution stone item and improved potion timers.
- `SearchInput` component for Schlagedex filtering with new sorting options.
- King challenge button during battles and tooltip when out of Shlageballs.
- Ability to release a Shlagémon from the Schlagedex.

### Changed

- Zones color-coded by level and sword cursor on battle hover.
- Capture disabled when the enemy is fainted.
- Pinia now initializes before other modules.

### Fixed

- Double-click handling in the Schlagedex and various UI fixes.
- Crashes when starting trainer or king battles.
- Adjustments to the player info panel.

## [0.3.2] - 2025-07-04

### Added

- Character system with new trainers (Caillou, Sachatte, Prof. Merdant, Marcon, Norman, Siphanus and Marine Lahaine).
- Battle progress indicator and capture/win tooltips.
- Achievements panel redesign with persistent unlocks.
- Shlagémon stats now scale with the zone's rank.
- Attack bonuses computed from accessible Schlagedex entries.
- Capture icon for already owned wild Shlagémon.
- New evolutions: Floripute and Barbebizarre.

### Changed

- Combat bonuses now use Schlagedex bonus percent.
- Modernized achievements style.
- Zone action buttons moved to the village panel.

### Fixed

- HP persists between wild battles.
- Player info panel overflow and other minor bugs.
- Duplicate Schlagedex entries merged when loading saves.
- Deserialization guarded when data is missing.
- Merge duplicates after evolution.
- Evolution modal appears only when evolution is allowed.

## [0.3.1] - 2025-07-03

### Added

- Tooltip component in the player panel.
- Game grid layout adjustments.

### Fixed

- Allow rematch after losing trainer fight.
- Persist defeated kings in zone progress.
- Player info panel alignment fixes.
- Various minor fixes.

## [0.3.0] - 2025-07-02

### Added

- Zone progression with boss fights and zone-specific encounters.
- Trainer battles with vigor management and switching phase.
- Capture overlay and shiny highlighting.
- Display of battle effectiveness via toast bubble.

### Fixed

- Prevent overflow of player info panel with ellipsis.

## [0.2.0] - 2025-06-30

### Added

- Shop and inventory panels with item actions.
- Zone navigation and level-based zones.
- Toast notifications for new Shlagémon and rarity upgrades.

### Changed

- Improved modal component with built-in close controls.

## [0.1.0] - 2025-06-27

### Added

- Migration to Vue 3 with UnoCSS styling and dark/light theme toggle.
- Schlagedex with Shlagémon stats and responsive grid.
- Local storage persistence for game state.
