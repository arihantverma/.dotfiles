# LSP, Completion, Formatting, and Treesitter Guide

This guide explains the "IDE-like" parts of your Neovim config: language
servers, completion, formatting, and Treesitter syntax parsing.

---

## Big Picture

When you open a `tsx` file, four systems can help you:

- **Treesitter** understands syntax inside the current file
- **LSP** understands your project and code semantics
- **Completion** suggests what to type next
- **Formatting** rewrites code into a consistent style

They are related, but they do different jobs.

---

## 1. Treesitter

**Plugin:** `nvim-treesitter/nvim-treesitter`  
**Config file:** `lua/plugins/treesitter.lua`

Treesitter parses code into a syntax tree so Neovim can do better highlighting
and other syntax-aware features.

Your config currently supports these main parser targets:

- `lua`
- `json`
- `html`
- `css`
- `javascript`
- `typescript`
- `tsx`

It also creates a helper command:

```vim
:TSInstallRecommended
```

That command installs the recommended parser set for this config.

Important notes:

- Parsers are **not** installed on every Neovim startup anymore
- Missing parsers should not interrupt editing with a full-screen error
- Parser files are installed under your Neovim data directory

Useful commands:

```vim
:TSInstallRecommended
:TSInstall lua json html css javascript typescript tsx
:TSUpdate
:checkhealth nvim-treesitter
```

---

## 2. LSP

**Plugins:** `mason.nvim`, `mason-tool-installer.nvim`, `nvim-lspconfig`  
**Config file:** `lua/plugins/lsp.lua`

LSP gives you code intelligence:

- go to definition
- references
- rename
- hover information
- diagnostics
- code actions

### What each plugin does

- `mason.nvim` installs external developer tools
- `mason-tool-installer.nvim` ensures the tools you want are installed
- `nvim-lspconfig` tells Neovim which language servers to start

### Tools your config ensures

- `typescript-language-server`
- `html-lsp`
- `css-lsp`
- `tailwindcss-language-server`
- `eslint-lsp`
- `emmet-ls`
- `prettierd`
- `prettier`
- `stylua`

### LSP servers your config enables

- `ts_ls`
- `html`
- `cssls`
- `tailwindcss`
- `eslint`
- `emmet_ls`

### Useful LSP keys

These are built into Neovim 0.11+:

| Key   | Action |
| ----- | ------ |
| `gd`  | Go to definition |
| `grr` | Find references |
| `grn` | Rename symbol |
| `gra` | Code action |
| `K`   | Hover documentation |

Custom mapping from your config:

| Key         | Action |
| ----------- | ------ |
| `<Space>e`  | Show diagnostics under the cursor |

After jumping with `gd` or `grr`, use:

| Key    | Action |
| ------ | ------ |
| `<C-o>` | Jump back |
| `<C-i>` | Jump forward |

---

## 3. Completion

**Plugin:** `saghen/blink.cmp`  
**Config file:** `lua/plugins/completion.lua`

Completion is the popup that suggests items while you type.

Your current setup pulls suggestions from:

- LSP
- file paths
- snippets
- current buffer words

Insert-mode completion keys come from `blink.cmp`'s default preset.

Think of completion as:

- LSP says what is valid here
- blink.cmp shows it to you in a menu

---

## 4. Formatting

**Plugin:** `stevearc/conform.nvim`  
**Config file:** `lua/plugins/formatting.lua`

Formatting rewrites code into a consistent style.

Your current formatter setup is:

- web files prefer `prettierd`, then fall back to `prettier`
- Lua files use `stylua`
- formatting also falls back to LSP formatting when appropriate

Supported filetypes in this config:

- `javascript`
- `typescript`
- `javascriptreact`
- `typescriptreact`
- `html`
- `css`
- `json`
- `jsonc`
- `lua`

Useful formatting behavior:

| Key          | Action |
| ------------ | ------ |
| `<Space>cf`  | Format the current buffer manually |
| `:w`         | Autoformat on save |

The manual format key is available immediately in a fresh session.

---

## 5. Web Dev Helpers

**Config file:** `lua/plugins/web-dev.lua`

Two small editing helpers are enabled:

- `nvim-ts-autotag` auto-closes and renames HTML/JSX tags
- `nvim-autopairs` auto-closes brackets, quotes, and parentheses

These are quality-of-life tools, not required for LSP or Treesitter to work.

---

## 6. Which-key

**Plugin:** `folke/which-key.nvim`  
**Config file:** `lua/plugins/which-key.lua`

`which-key` is a keybinding hint popup.

How to use it:

1. Press `<Space>` in normal mode
2. Pause briefly
3. Read the available next keys in the popup
4. Continue typing the shortcut you want

Your config groups these leader prefixes:

- `<Space>f` for find/navigation
- `<Space>c` for code/formatting

Most entries shown in the popup come from mapping descriptions (`desc`).

---

## Naming Confusion

One language can have several different names in Neovim tooling.

Example for TypeScript React:

| Meaning | Name |
| ------- | ---- |
| filetype | `typescriptreact` |
| Treesitter parser | `tsx` |
| LSP server name | `ts_ls` |
| Mason package | `typescript-language-server` |

This is normal in the Neovim ecosystem.

---

## How to Add a New Language Later

When adding a new language, think in layers:

1. Treesitter parser for syntax
2. LSP server for intelligence
3. Formatter if you want autoformatting

Typical steps:

1. Add the parser/lazy config if you want Treesitter support
2. Add the Mason package in `lsp.lua`
3. Add the LSP server name in `vim.lsp.enable(...)`
4. Add a formatter in `formatting.lua` if needed

---

## Verification Checklist

Use these checks when something feels broken:

```vim
:checkhealth nvim-treesitter
:checkhealth vim.lsp
:Mason
:ConformInfo
:lua print(vim.inspect(require('nvim-treesitter.config').get_installed()))
```

For Treesitter parser files specifically:

```vim
:echo nvim_get_runtime_file('parser/tsx.so', v:true)
```

For filetype detection:

```vim
:set ft?
```
