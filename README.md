# Vim Substitute for VSCodeVim

Vim Substitute for VSCodeVim enhances VSCodeVim with smarter find and replace. It prepares substitute commands using the word under the cursor or selected text, making replacements quick and intuitive.

## Features

- Detects word under cursor (Normal mode) or uses selected text (Visual modes)
- Escapes regex special characters for safe literal matching
- Two commands:
  - **Replace All** (`:%s/`): File-wide substitution
  - **Replace Line** (`:s/`): Line-specific substitution
- Integrates with VSCodeVim's command mode
- Works in Normal and Visual modes
- **Automatic keybinding setup**: Configures default keybindings on installation using your leader key
- **Modular architecture**: Clean, maintainable codebase with proper TypeScript typing

## Usage

### Default Keybindings (Auto-configured)

The extension automatically sets up these keybindings on activation:

- `<leader>sa` - Replace All Word/Selection (works in Normal and Visual modes)
- `<leader>sl` - Replace Line Word/Selection (works in Normal and Visual modes)

Where `<leader>` is your configured VSCodeVim leader key (default: backslash `\`).

### Manual Usage

1. Place your cursor on a word or select text
2. Use the keybindings above, or run commands from Command Palette:
   - `Vim Substitute: Replace All Word/Selection`
   - `Vim Substitute: Replace Line Word/Selection`
3. The command line will show the substitute command with your search text
4. Type your replacement and press Enter

## Automatic Configuration

The extension automatically:

- **Respects your leader key**: Uses your configured VSCodeVim leader key
- **Configures multiple modes**: Sets up keybindings for Normal and Visual modes
- **Avoids duplicates**: Only adds keybindings if they don't already exist
- **Works on activation**: No manual setup required
- **Modular architecture**: Clean, maintainable code with proper TypeScript typing

## Manual Keybinding Customization

If you want to change the default keybindings, you can modify them in your `settings.json`:

```json
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "r", "a"],
      "commands": ["substitute-vim.replaceAll"]
    },
    {
      "before": ["<leader>", "r", "l"],
      "commands": ["substitute-vim.replaceLine"]
    }
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "r", "a"],
      "commands": ["substitute-vim.replaceAll"]
    },
    {
      "before": ["<leader>", "r", "l"],
      "commands": ["substitute-vim.replaceLine"]
    }
  ]
}
```

## Conflict Resolution

If the default keybindings (`<leader>sa`, `<leader>sl`) conflict with your existing keybindings, you can:

1. Change this extension's keybindings using the manual configuration above
2. Or change the conflicting extension's keybindings
3. The extension will not override existing keybindings - it only adds them if they don't exist

You can change the `before` sequence to any keys you prefer. Save your settings and test the new keybinding in VSCodeVim Normal or Visual mode.

## Architecture

The extension features a clean, modular architecture:

- **`src/constants.ts`**: Centralized constants and configuration keys
- **`src/types/`**: TypeScript interfaces and type definitions
- **`src/utils/vim-config.utils.ts`**: Reusable vim configuration utilities
- **`src/keybinding.ts`**: Core keybinding logic and orchestration
- **`src/extension.ts`**: Extension activation and command registration

This modular design ensures maintainability, type safety, and easy extensibility.

## Installation

1. Clone this repository
2. Run `pnpm install`
3. Build with `pnpm run compile`
4. Press `F5` to launch extension development host

## Requirements

- VSCodeVim extension must be installed and enabled

## Troubleshooting

- If commands do not work, ensure VSCodeVim is active
- For keybinding conflicts, check Keyboard Shortcuts
- For build errors, run `pnpm install` and `pnpm run compile`

## License

See LICENSE.md for details.
