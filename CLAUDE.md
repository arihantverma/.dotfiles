# Dotfiles Repository Instructions

## Sensitive Data

Never commit secrets, API keys, tokens, or credentials to this repository. If a config file requires sensitive values:

- Use environment variables and reference them in the config
- Use a separate local file that's gitignored (e.g., `config.local`)
- Use a secrets manager

Add sensitive patterns to `.gitignore`:

```
*.local
*secrets*
.env
```

## Maintaining setup.sh

The `setup.sh` file is the bootstrap script for setting up these dotfiles on a new machine. It must be kept in sync with the dotfiles in this repository.

**Update `setup.sh` whenever:**

1. **A new config is added** - When adding a new application config (e.g., a new `appname/` directory):
   - Add a backup line for the original config location (if it's a file or directory that might already exist)
   - Add a `stow -t ~ appname` line in the "Stow dotfiles" section

2. **A config location changes** - If the target path for a config changes, update the corresponding backup line

3. **New dependencies are required** - If a config requires additional tools/plugins to be installed, add the installation steps before the stow section

## Current stowed configs

| Directory  | Target Location                                              | Description                     | Dependencies                                    |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ----------------------------------------------- |
| `nvim/`    | `~/.config/nvim`                                             | Neovim configuration            | Neovim                                          |
| `zsh/`     | `~/.zshrc`                                                   | Zsh shell configuration         | Oh My Zsh, Pure prompt, zsh-syntax-highlighting |
| `ghostty/` | `~/Library/Application Support/com.mitchellh.ghostty/config` | Ghostty terminal config (macOS) | Ghostty terminal                                |
| `karabiner/` | `~/.config/karabiner/assets/complex_modifications/`        | Karabiner-Elements complex modifications (Keychron Q1 hacker layout) | Karabiner-Elements |

## Adding a new config

1. Create directory: `mkdir -p appname/<path-mirroring-home-structure>`
2. Move config: `mv ~/path/to/config appname/path/to/config`
3. Stow it: `stow -t ~ appname`
4. Update `setup.sh` with backup and stow lines
5. Update the table above with dependencies

## Testing changes

Before committing config changes:

1. Verify the symlink exists and points correctly: `ls -la <target-path>`
2. Open the application and confirm it loads the config without errors
3. Test any keybindings, themes, or custom settings you modified
4. If the app has a config validation command, run it (e.g., `nvim --headless -c 'checkhealth' -c 'qa'`)
