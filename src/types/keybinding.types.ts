/**
 * Configuration for a keybinding
 */
export interface KeybindingConfig {
  before: string[];
  commands: string[];
}

/**
 * VSCodeVim binding structure
 */
export interface VimBinding {
  before?: string[];
  commands?: string[];
  after?: string[];
}

/**
 * Keybinding mode configuration
 */
export interface KeybindingMode {
  configKey: string;
  bindings: KeybindingConfig[];
}

/**
 * Default keybinding configuration structure
 */
export interface DefaultKeybindings {
  normal: KeybindingConfig[];
  visual: KeybindingConfig[];
}
