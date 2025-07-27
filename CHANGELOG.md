# Change Log

All notable changes to the "vim-substitute" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release
- Added smart word detection (Normal mode: word under cursor, Visual modes: selected text)
- Regex escaping for safe literal matching
- Two substitute commands: Replace All (:%s/) and Replace Line (:s/)
- Seamless integration with VSCodeVim's command mode
- Default keybindings: Space + s + a (Replace All), Space + s + l (Replace Line)
- File-wide and line-specific replacement support
- Basic error handling and notifications
- TypeScript strict mode and ESBuild for fast compilation
- Project structure and development workflow documented

### Technical Details

- Uses VS Code API for word/selection detection
- Escapes regex special characters for safety
- Invokes VSCodeVim's `vim.remap` for command mode automation
- Keybindings can be customized in VS Code settings

### Planned Features (see TODO.md for details)
