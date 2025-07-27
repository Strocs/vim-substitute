/**
 * Command identifiers for the extension
 */
export const COMMANDS = {
  REPLACE_ALL: "substitute-vim.replaceAll",
  REPLACE_LINE: "substitute-vim.replaceLine",
} as const;

/**
 * VSCodeVim configuration keys
 */
export const VIM_CONFIG_KEYS = {
  NORMAL: "normalModeKeyBindingsNonRecursive",
  VISUAL: "visualModeKeyBindingsNonRecursive",
  LEADER: "leader",
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  LEADER: "\\",
} as const;
