# Change Log

All notable changes to the "vim-substitute" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added

- **Modular architecture**: Reorganized codebase into logical modules for better maintainability
- **Enhanced type safety**: Comprehensive TypeScript interfaces and proper typing throughout
- **Centralized constants**: Single source of truth for commands and configuration keys
- **Utility modules**: Reusable vim configuration utilities
- **Direct keybinding configuration**: Automatic setup of keybindings on extension activation
- **Multi-mode support**: Extension now works in Normal and Visual modes (removed operator pending as unnecessary)
- **Simplified user experience**: No prompts or manual setup required - keybindings are configured automatically
- **Leader key detection**: Uses user's configured VSCodeVim leader key automatically
- **Duplicate prevention**: Only adds keybindings if they don't already exist

### Changed

- **Code organization**: Split logic into separate modules (`constants.ts`, `types/`, `utils/`)
- **Improved maintainability**: Better separation of concerns and reusable components
- **Enhanced error handling**: Comprehensive error messages with context information
- **Streamlined activation**: Keybindings are set up immediately when extension activates
- **Removed complexity**: No configuration wizards or user prompts
- **Removed operator pending mode**: Simplified to Normal and Visual modes only (covers all practical use cases)
- **Direct approach**: If conflicts exist, users can manually resolve them
- **Improved VSCodeVim integration**: Uses proper vim configuration settings

### Fixed

- **VSCodeVim interference resolved**: Removed problematic native VS Code keybindings that interfered with VSCodeVim's key processing
- **Type safety issues**: Eliminated `any` types and added proper TypeScript interfaces
- **Code duplication**: Centralized shared logic and constants

### Technical Improvements

- **Modular file structure**: `src/constants.ts`, `src/types/`, `src/utils/vim-config.utils.ts`
- **Enhanced type definitions**: Comprehensive interfaces for all keybinding-related types
- **Utility functions**: Reusable vim configuration operations
- **Better imports**: Clean import paths with index files
- **Error handling**: Proper try-catch blocks with descriptive error messages
- **Code quality**: Improved readability, maintainability, and testability

## [0.1.1] - Previous Release

- Initial release
- Added smart word detection (Normal mode: word under cursor, Visual modes: selected text)
- Regex escaping for safe literal matching
- Two substitute commands: Replace All (:%s/) and Replace Line (:s/)
- Seamless integration with VSCodeVim's command mode
- File-wide and line-specific replacement support
- Basic error handling and notifications
- TypeScript strict mode and ESBuild for fast compilation
