# TODOs

## High Priority

- [x] Multiple Search Patterns: COMPLETED - Support for :s (line) and :%s (all) with keybindings
- [x] Enhanced Visual Mode: COMPLETED - Improve selection handling for line/block operations
- [x] Configuration Options: COMPLETED - Smart keybinding configuration with leader key detection and conflict avoidance

## Medium Priority

- [ ] Command Variants: Add case-insensitive/global flag commands
- [ ] Undo Integration: Better Vim undo system support
- [ ] Multi-cursor Support: Handle multiple cursors/selections
- [ ] Preview Mode: Option to preview replacements
- [ ] Range-specific Replace: Support for :'<,'>s in visual mode

## Low Priority

- [x] Custom Keybindings: COMPLETED - Automatic keybinding configuration with conflict detection
- [ ] Search History: Vim search history integration
- [ ] Advanced Regex: More complex patterns/flags
- [ ] Performance Optimization: Large file/selection support
- [ ] Additional Substitute Modes: Support for :g/, :v/, etc.

## Recently Completed

### Modular Architecture & Code Quality (v0.1.3)

- ✅ **Modular file structure**: Organized code into logical modules
  - `src/constants.ts` - Centralized constants and configuration keys
  - `src/types/` - TypeScript interfaces and type definitions
  - `src/utils/vim-config.utils.ts` - Reusable vim configuration utilities
- ✅ **Enhanced type safety**: Comprehensive TypeScript interfaces throughout
- ✅ **Code quality improvements**: Eliminated `any` types, improved error handling
- ✅ **Centralized constants**: Single source of truth for commands and config keys
- ✅ **Utility functions**: Reusable vim configuration operations
- ✅ **Better imports**: Clean import paths with index files
- ✅ **Error handling**: Proper try-catch blocks with descriptive messages
- ✅ **Code organization**: Clear separation of concerns and responsibilities

### Direct Keybinding System (v0.1.2)

- ✅ Automatic keybinding configuration on extension activation
- ✅ Leader key auto-detection and usage
- ✅ Multi-mode support (Normal and Visual modes)
- ✅ Removed operator pending mode (unnecessary for this use case)
- ✅ Duplicate prevention without complex conflict resolution
- ✅ Streamlined user experience (no prompts or setup required)
- ✅ Modular keybinding architecture

### VSCodeVim Integration Fixes

- ✅ Removed problematic native VS Code keybindings
- ✅ Proper integration with VSCodeVim's key processing system
- ✅ Configuration through VSCodeVim settings rather than package.json

## Testing & Quality

- [x] **Code Organization**: Modular architecture with proper separation of concerns
- [x] **Type Safety**: Comprehensive TypeScript interfaces and proper typing
- [x] **Error Handling**: Enhanced error messages with context information
- [ ] Unit Tests: Utility function coverage
- [ ] Integration Tests: VSCodeVim command integration
- [ ] Edge Cases: Empty selections, special chars, errors
- [ ] Documentation: Inline code docs/API reference
- [ ] Command Validation: Tests for correct command generation

## Future Enhancements

- [ ] Plugin Ecosystem: Integration with other Vim plugins
- [ ] Snippets Integration: Replacement with snippets
- [ ] Project-wide Replace: Multi-file support
- [ ] Regex Builder: Visual regex pattern builder
