# LSP, Completion, and Treesitter Guide

This guide explains how your Neovim config provides the "IDE-like" features:
intelligent code navigation, autocompletion, error diagnostics, and syntax
highlighting. It covers what each plugin does, how they connect to each other,
and how to extend them when you need a new language.

---

## Table of Contents

1. [The Big Picture](#the-big-picture)
2. [Three Systems, Three Jobs](#three-systems-three-jobs)
3. [File-by-File Walkthrough](#file-by-file-walkthrough)
4. [The Naming Confusion](#the-naming-confusion)
5. [Keymaps Reference](#keymaps-reference)
6. [How to Add a New Language](#how-to-add-a-new-language)
7. [How to Verify Everything Works](#how-to-verify-everything-works)
8. [What Changed and Why (TJ/Prime Review)](#what-changed-and-why)
9. [Glossary](#glossary)

---

## The Big Picture

When you open a `.tsx` file and start typing, three separate systems work
together to give you an IDE-like experience:

```
┌─────────────────────────────────────────────────────────┐
│                    Your .tsx file                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TREESITTER (syntax)         LSP (intelligence)         │
│  "What tokens are in         "What does this code       │
│   this file?"                 mean?"                    │
│                                                         │
│  - Syntax highlighting       - Go to definition         │
│  - Knows: this is a          - Find references          │
│    string, that's a          - Rename symbol             │
│    function name             - Error diagnostics         │
│                              - Code actions              │
│                                                         │
│              COMPLETION (suggestions)                   │
│              "What should you type next?"                │
│                                                         │
│              - Pulls suggestions from LSP               │
│              - Also suggests: buffer words,              │
│                file paths, snippets                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Each system is independent but they talk to each other:
- **Treesitter** parses the file locally (no external server needed)
- **LSP** talks to an external language server process (e.g. `typescript-language-server`)
- **Completion** (blink.cmp) asks the LSP server "what can I type here?" and shows you a menu

---

## Three Systems, Three Jobs

### 1. Treesitter — Syntax Parsing

**What it does:** Parses your code into a syntax tree. Think of it like a
grammar checker that knows "this word is a function name, that word is a
string, this is a keyword."

**Why it matters:** Without treesitter, Neovim uses regex-based highlighting
which is slow and often wrong (e.g., it might color a variable name inside a
string as if it were real code). Treesitter understands the actual structure
of your code.

**Plugin:** `nvim-treesitter/nvim-treesitter`
**Config file:** `lua/plugins/render-markdown.lua` (treesitter lives here because
it was first added for markdown rendering, but it serves all languages)

**How it works in your config:**

```lua
-- Step 1: Download parser files for these languages
local parsers = { "javascript", "typescript", "tsx", ... }
require("nvim-treesitter").install(parsers)

-- Step 2: When you open a file of one of these types, turn on treesitter
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "javascript", "typescript", "typescriptreact", ... },
  callback = function()
    vim.treesitter.start()  -- activates treesitter for the current buffer
  end,
})
```

Why two separate lists? Because parser names and filetype names are different
things. See [The Naming Confusion](#the-naming-confusion) below.

### 2. LSP — Language Server Protocol

**What it does:** Connects Neovim to an external "language server" — a
separate program that deeply understands your code. The language server reads
your entire project (including node_modules, tsconfig, etc.) and provides
intelligent features.

**Why it matters:** Treesitter only looks at one file at a time and only
understands syntax. LSP understands your whole project: it knows that the
function you're calling is defined in another file, it knows the types of
your variables, it can spot errors before you save.

**Three plugins work together for LSP:**

```
Mason                    mason-tool-installer         nvim-lspconfig
(package manager)   →    (auto-install list)      →   (configure & start)

"I can download          "Make sure these are          "Connect these servers
 language servers         installed"                    to Neovim and tell
 and put them in                                       them what to do"
 ~/.local/share/
 nvim/mason/"
```

**Mason** is like `brew` but for Neovim tools. It downloads pre-built
language servers, formatters, and linters into its own directory so you don't
have to install them globally.

**mason-tool-installer** is a simple plugin that says "make sure these
specific tools are installed via Mason." If they're missing, it installs
them automatically.

**nvim-lspconfig** is the bridge between Neovim and the language servers. It
knows where each server's executable is and how to start it. When you open a
`.tsx` file, nvim-lspconfig starts `typescript-language-server` in the
background and connects it to your buffer.

### 3. Completion — blink.cmp

**What it does:** Shows you a popup menu of suggestions as you type, and
inserts the one you pick.

**Why it matters:** Without completion, you'd have to type everything from
memory, character by character. Completion pulls suggestions from multiple
sources:

- **LSP** — the language server suggests function names, variable names,
  properties, types (the smartest source)
- **Buffer** — words already in your current file (useful for variable names
  you defined earlier)
- **Path** — file paths on your filesystem (useful for imports)
- **Snippets** — pre-built code templates (e.g., type `clg` and get
  `console.log()`)

**Plugin:** `saghen/blink.cmp`
**Config file:** `lua/plugins/completion.lua`

blink.cmp is a single plugin that replaces what used to require 6+ plugins
with nvim-cmp (the old completion engine). It's faster and simpler.

---

## File-by-File Walkthrough

### `lua/plugins/lsp.lua`

This file has three plugin specs (a "spec" is a Lua table that tells
lazy.nvim how to install and configure a plugin):

**Spec 1: Mason**

```lua
{
  "mason-org/mason.nvim",
  config = function()
    require("mason").setup()
  end,
},
```

- `"mason-org/mason.nvim"` — the GitHub repo. lazy.nvim clones this.
- `config = function() ... end` — runs after the plugin loads. `setup()` is
  a Neovim convention: most plugins export a `setup()` function you must
  call to initialize them.

**Spec 2: mason-tool-installer**

```lua
{
  "WhoIsSethDaniel/mason-tool-installer.nvim",
  dependencies = { "mason-org/mason.nvim" },
  config = function()
    require("mason-tool-installer").setup({
      ensure_installed = {
        "typescript-language-server",
        "html-lsp",
        "css-lsp",
        "tailwindcss-language-server",
        "eslint-lsp",
        "emmet-ls",
      },
    })
  end,
},
```

- `dependencies` — tells lazy.nvim: "load mason.nvim first, because I need
  it to be available." This guarantees load order.
- `ensure_installed` — the list of Mason package names to auto-install. These
  are Mason's own names, NOT the lspconfig names. See [The Naming
  Confusion](#the-naming-confusion).

**Spec 3: nvim-lspconfig**

```lua
{
  "neovim/nvim-lspconfig",
  dependencies = {
    "WhoIsSethDaniel/mason-tool-installer.nvim",
    "saghen/blink.cmp",
  },
  config = function()
    vim.lsp.config("*", {
      capabilities = require("blink.cmp").get_lsp_capabilities(),
    })

    vim.lsp.enable({ "ts_ls", "html", "cssls", "tailwindcss", "eslint", "emmet_ls" })

    vim.api.nvim_create_autocmd("LspAttach", {
      callback = function(args)
        vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float,
          { buffer = args.buf, silent = true })
      end,
    })
  end,
},
```

Line by line:

- `dependencies` includes both mason-tool-installer (so servers are installed
  before we try to start them) and blink.cmp (so we can ask it for
  capabilities).

- `vim.lsp.config("*", { capabilities = ... })` — the `"*"` means "apply
  this config to ALL language servers." Capabilities tell the server what
  Neovim can handle. By using `blink.cmp`'s capabilities, we tell the server
  "yes, I support autocompletion, send me completion suggestions." Without
  this, the server wouldn't send completion items to Neovim.

- `vim.lsp.enable({...})` — starts these servers. The names here are
  **lspconfig names** (e.g., `ts_ls`, `cssls`). When you open a `.tsx` file,
  Neovim checks "does any enabled server handle this filetype?" and starts it.

- `vim.api.nvim_create_autocmd("LspAttach", ...)` — an autocommand that runs
  every time an LSP server attaches to a buffer. We use it to set a
  buffer-local keymap. `buffer = args.buf` means this keymap only works in
  that specific buffer, not globally.

- `<leader>e` opens a floating window showing the diagnostic (error/warning)
  under your cursor. This is the only custom keymap we define — everything
  else is built into Neovim 0.11+.

### `lua/plugins/completion.lua`

```lua
{
  "saghen/blink.cmp",
  version = "1.*",
  dependencies = {
    "L3MON4D3/LuaSnip",
    "rafamadriz/friendly-snippets",
  },
  config = function()
    require("luasnip.loaders.from_vscode").lazy_load()

    require("blink.cmp").setup({
      snippets = { preset = "luasnip" },
      sources = {
        default = { "lsp", "path", "snippets", "buffer" },
      },
      keymap = { preset = "default" },
      signature = { enabled = true },
    })
  end,
},
```

- `version = "1.*"` — pin to major version 1. This means lazy.nvim will
  update to 1.1, 1.2, etc., but won't jump to 2.0 which might have breaking
  changes.

- **LuaSnip** is a snippet engine — it can expand abbreviations like `clg`
  into `console.log()` and let you tab between placeholder positions.

- **friendly-snippets** is a collection of pre-made snippets for many
  languages (ES7 React snippets, HTML boilerplate, etc.). The
  `lazy_load()` call loads them from the plugin's JSON files in VSCode
  snippet format.

- `snippets = { preset = "luasnip" }` — tells blink.cmp to use LuaSnip as
  its snippet engine (blink.cmp has its own built-in engine, but LuaSnip is
  more powerful and compatible with friendly-snippets).

- `sources.default` — the priority order for completion suggestions:
  1. `"lsp"` — language server suggestions (highest priority)
  2. `"path"` — file path completions
  3. `"snippets"` — snippet expansions
  4. `"buffer"` — words from the current file

- `keymap = { preset = "default" }` — uses blink.cmp's default keymaps
  (see [Keymaps Reference](#keymaps-reference)).

- `signature = { enabled = true }` — shows function signature help in a
  floating window as you type function arguments. For example, when you type
  `useState(` it shows you what arguments the function expects.

### `lua/plugins/render-markdown.lua` (Treesitter section)

```lua
{
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local parsers = {
      "markdown", "markdown_inline",
      "html", "css",
      "javascript", "typescript", "tsx",
      "json",
      "lua",
    }
    require("nvim-treesitter").install(parsers)

    vim.api.nvim_create_autocmd("FileType", {
      pattern = {
        "markdown", "markdown_inline",
        "html", "css",
        "javascript", "typescript", "typescriptreact",
        "json", "jsonc",
        "lua",
      },
      callback = function()
        vim.treesitter.start()
      end,
    })
  end,
},
```

- `require("nvim-treesitter").install(parsers)` — downloads and compiles
  parser files for each language. Parsers are `.so` files (compiled C code)
  that know how to parse a specific language's syntax. They're stored in
  `~/.local/share/nvim/lazy/nvim-treesitter/parser/`.

- The `FileType` autocmd activates treesitter highlighting whenever you open
  a file of a matching type. `vim.treesitter.start()` is a built-in Neovim
  function (not a plugin function) that tells Neovim "use treesitter for
  syntax highlighting in this buffer instead of the old regex-based method."

- **Why `parsers` and `pattern` have different entries:**
  - `"tsx"` is the parser name (the compiled `.so` file is called `tsx.so`)
  - `"typescriptreact"` is the Neovim filetype (what Neovim calls `.tsx` files)
  - `"jsonc"` is a filetype (JSON with comments, e.g., `tsconfig.json`) but
    there's no separate `jsonc` parser — the `json` parser handles it
  - The parser list is what gets **downloaded**; the pattern list is what gets
    **activated** when you open a file

### `lua/plugins/web-dev.lua`

```lua
-- Auto-close and auto-rename HTML/JSX tags
{
  "windwp/nvim-ts-autotag",
  event = "InsertEnter",
  opts = {},
},

-- Auto-close brackets, quotes, parens
{
  "windwp/nvim-autopairs",
  event = "InsertEnter",
  opts = {},
},
```

- `event = "InsertEnter"` — lazy loading: these plugins only load when you
  enter insert mode for the first time. This makes Neovim start up faster.

- `opts = {}` — a shorthand. When you write `opts = {}`, lazy.nvim
  automatically calls `require("plugin-name").setup({})` for you. It's
  equivalent to writing `config = function() require("nvim-autopairs").setup({}) end`.
  The `{}` means "use all default settings."

- **nvim-ts-autotag** uses treesitter to understand HTML/JSX tags. When you
  type `<div>`, it auto-inserts `</div>`. When you rename `<div>` to
  `<span>`, it renames the closing tag too.

- **nvim-autopairs** auto-closes brackets, quotes, and parens. Type `(` and
  it inserts `)`. Type `"` and it inserts the closing `"`.

### `lua/plugins/formatting.lua`

This file was not changed in the review, but for completeness:

- **conform.nvim** auto-formats your code when you save (`:w`)
- It tries Biome first (if a `biome.json` exists), then falls back to Prettier
- `stop_after_first = true` means only one formatter runs, not both
- `<leader>cf` formats the current buffer manually

---

## The Naming Confusion

One of the most confusing things in the Neovim ecosystem is that the same
language server has **three different names** depending on where you're
referring to it:

| What you mean            | Mason name (package)            | lspconfig name | Treesitter parser |
| ------------------------ | ------------------------------- | -------------- | ----------------- |
| TypeScript/JavaScript    | `typescript-language-server`    | `ts_ls`        | `typescript`, `tsx`, `javascript` |
| HTML                     | `html-lsp`                      | `html`         | `html`            |
| CSS                      | `css-lsp`                       | `cssls`        | `css`             |
| Tailwind CSS             | `tailwindcss-language-server`   | `tailwindcss`  | (none)            |
| ESLint                   | `eslint-lsp`                    | `eslint`       | (none)            |
| Emmet                    | `emmet-ls`                      | `emmet_ls`     | (none)            |

And Neovim **filetypes** are yet another set of names:

| File extension | Neovim filetype      | Treesitter parser |
| -------------- | -------------------- | ----------------- |
| `.js`          | `javascript`         | `javascript`      |
| `.ts`          | `typescript`         | `typescript`      |
| `.tsx`         | `typescriptreact`    | `tsx`             |
| `.jsx`         | `javascriptreact`    | `javascript`      |
| `.json`        | `json`               | `json`            |
| `tsconfig.json`| `jsonc`              | `json`            |

**Where each name is used:**

- **Mason names** → only in `mason-tool-installer`'s `ensure_installed` list
  (what to download)
- **lspconfig names** → in `vim.lsp.enable()` (what to start)
- **Treesitter parser names** → in `require("nvim-treesitter").install()`
  (what to compile)
- **Neovim filetypes** → in `FileType` autocmd patterns, `formatters_by_ft`,
  etc. (what file you opened)

**How to find these names:**

- Mason names: run `:Mason` and search the list, or check
  https://mason-registry.dev/registry/list
- lspconfig names: run `:help lspconfig-all` or check
  https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md
- Treesitter parser names: run `:TSInstallInfo` (though with the new API,
  you can also check https://github.com/nvim-treesitter/nvim-treesitter#supported-languages)
- Neovim filetypes: open a file and run `:set ft?` to see its filetype

---

## Keymaps Reference

### Completion (blink.cmp) — Insert Mode

These work when the completion menu is visible:

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `<C-n>`     | Select next item in completion menu         |
| `<C-p>`     | Select previous item in completion menu     |
| `<C-y>`     | Confirm (accept) the selected completion    |
| `<C-e>`     | Dismiss the completion menu                 |
| `<C-space>` | Manually trigger completion                 |

(`<C-n>` means Ctrl+n, `<C-space>` means Ctrl+Space)

### LSP — Normal Mode (Built-in Neovim 0.11+)

These keymaps are provided by Neovim itself — no plugin config needed:

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `gd`        | **Go to definition** — jump to where a function/variable is defined |
| `gD`        | **Go to declaration** — jump to where a symbol is declared (less common) |
| `grr`       | **Go to references** — list all places this symbol is used |
| `gri`       | **Go to implementation** — jump to the implementation of an interface/abstract method |
| `gO`        | **Document symbols** — list all symbols (functions, variables, types) in the current file |
| `grn`       | **Rename** — rename a symbol across all files |
| `gra`       | **Code action** — show available fixes/refactors (e.g., "add missing import") |
| `K`         | **Hover** — show type info / documentation in a floating window |
| `<C-s>`     | **Signature help** — show function parameters (in insert mode) |

### Navigation — Jump Back/Forward

After using `gd` or `grr` to jump somewhere, use these to navigate back:

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `<C-o>`     | **Jump back** — go back to where you were before the jump |
| `<C-i>`     | **Jump forward** — go forward (undo a `<C-o>`) |
| `<C-t>`     | **Tag jump back** — pop the tag stack (alternative to `<C-o>` after `gd`) |

### LSP — Custom (from our config)

| Key          | Action                                     |
| ------------ | ------------------------------------------ |
| `<leader>e`  | Show diagnostic float (error/warning details under cursor) |

### Formatting

| Key          | Action                                     |
| ------------ | ------------------------------------------ |
| `<leader>cf` | Format current buffer manually             |
| (auto)       | Format on save (every time you `:w`)       |

### Diagnostics — Built-in Neovim

| Key   | Action                              |
| ----- | ----------------------------------- |
| `]d`  | Jump to next diagnostic             |
| `[d`  | Jump to previous diagnostic         |

---

## How to Add a New Language

Say you want to add **Go** support. You need to touch three things:

### Step 1: Add the treesitter parser

In `lua/plugins/render-markdown.lua`, add `"go"` to the `parsers` list and
`"go"` to the `FileType` pattern list:

```lua
local parsers = {
  ...,
  "go",  -- add this
}

vim.api.nvim_create_autocmd("FileType", {
  pattern = {
    ...,
    "go",  -- add this
  },
  ...
})
```

This gives you syntax highlighting.

### Step 2: Install the language server via Mason

In `lua/plugins/lsp.lua`, add the Mason package name to `ensure_installed`:

```lua
ensure_installed = {
  ...,
  "gopls",  -- Go language server (Mason name happens to match lspconfig name)
},
```

To find the correct Mason name, run `:Mason` in Neovim and search for "go".

### Step 3: Enable the language server

In the same file, add the lspconfig name to `vim.lsp.enable()`:

```lua
vim.lsp.enable({ ..., "gopls" })
```

To find the lspconfig name, check `:help lspconfig-all`.

### Step 4 (optional): Add a formatter

In `lua/plugins/formatting.lua`, add a formatter for the filetype:

```lua
formatters_by_ft = {
  ...,
  go = { "gofumpt" },
},
```

And add `"gofumpt"` to mason-tool-installer's `ensure_installed` list.

### Then restart Neovim

`:Lazy` will install any new plugins, Mason will install the new server,
and treesitter will download the parser. Open a `.go` file to verify.

---

## How to Verify Everything Works

### Check treesitter

1. Open a `.tsx` file
2. Run `:InspectTree` — this opens a window showing the syntax tree.
   You should see nodes like `jsx_element`, `identifier`, `string`, etc.
3. If syntax highlighting looks right (keywords colored, strings colored,
   function names colored differently from variables), treesitter is working.

### Check LSP

1. Open a `.tsx` file
2. Run `:checkhealth lsp` — shows LSP client status
3. Press `K` on a function name — you should see a hover popup with type info
4. Press `gd` on a function call — should jump to its definition
5. Press `grn` on a variable — should let you rename it across files
6. If you see red/yellow squiggly underlines, diagnostics are working

### Check completion

1. Open a `.tsx` file and enter insert mode
2. Start typing a known variable or function name
3. A completion popup should appear automatically
4. Use `<C-n>` / `<C-p>` to navigate, `<C-y>` to accept
5. Type a function name and `(` — signature help should appear showing
   the function's parameters

### Check Mason

1. Run `:Mason` — opens the Mason UI
2. You should see all 6 servers listed as installed (with a checkmark)
3. Press `q` to close

### Check formatting

1. Open a `.tsx` file, mess up the indentation
2. Save with `:w` — the file should auto-format
3. Or press `<leader>cf` to format manually

---

## What Changed and Why

These changes are based on a review following patterns from TJ DeVries
(kickstart.nvim author) and ThePrimeagen (init.lua). The goal: fewer
plugins, less duplication, use what Neovim provides natively.

### 1. nvim-cmp (6 plugins) → blink.cmp (1 plugin)

**Before:** The completion system required 6 separate plugins:
- `nvim-cmp` (the engine)
- `cmp-nvim-lsp` (LSP source)
- `cmp-buffer` (buffer source)
- `cmp-path` (path source)
- `cmp_luasnip` (snippet source)
- `LuaSnip` + `friendly-snippets` (snippet engine + collection)

**After:** `blink.cmp` is a single plugin that includes LSP, buffer, path,
and snippet sources built-in. We still use LuaSnip + friendly-snippets for
the snippet collection, but we don't need separate "source" plugins.

**Why:** Less config, fewer moving parts, faster. blink.cmp is written in
Rust internally and is noticeably snappier than nvim-cmp.

### 2. mason-lspconfig → mason-tool-installer

**Before:** `mason-lspconfig.nvim` both installed servers AND configured
them, duplicating what `nvim-lspconfig` already does.

**After:** `mason-tool-installer.nvim` only installs tools. Configuration
is handled entirely by `nvim-lspconfig` via `vim.lsp.config()` and
`vim.lsp.enable()`. Clean separation of concerns.

**Why:** mason-lspconfig was doing two jobs. The Neovim 0.11+ APIs
(`vim.lsp.config` and `vim.lsp.enable`) make the configuration side
unnecessary.

### 3. Mason org updated: `williamboman/*` → `mason-org/*`

The mason plugins moved to a new GitHub organization. The old URLs still
work as redirects, but using the new ones is correct going forward.

### 4. Removed redundant LSP keymaps

**Before:** We manually set keymaps for `gd`, `gr`, `K`, `<leader>rn`,
`<leader>ca` in our LspAttach autocmd.

**After:** Only `<leader>e` remains. Everything else is now built into
Neovim 0.11+.

**Built-in keymaps that replaced our custom ones:**

| Our old keymap   | Built-in (0.11+) | Action        |
| ---------------- | ----------------- | ------------- |
| `gd`             | `gd`              | Go to definition |
| `gr`             | `grr`             | References    |
| `K`              | `K`               | Hover info    |
| `<leader>rn`     | `grn`             | Rename        |
| `<leader>ca`     | `gra`             | Code action   |

Note: `gr` became `grr` (double r) in the built-in version because `gr` by
itself needs to wait to see if you'll press another key after it.

**Why:** Less code to maintain. If Neovim improves these keymaps in the
future, you get the improvements automatically without changing your config.

### 5. Treesitter: old API → new API

**Before:** Used `require("nvim-treesitter.configs").setup()` with
`ensure_installed`, `highlight = { enable = true }`, and
`indent = { enable = true }`. Also had a `build` function to update parsers.

**After:** Uses `require("nvim-treesitter").install()` to download parsers
and `vim.treesitter.start()` (a built-in Neovim function) to activate
highlighting per filetype.

**Why:** The old `nvim-treesitter.configs` module was a plugin abstraction
over Neovim's built-in treesitter support. Neovim has matured enough that
you can use its native APIs directly. `vim.treesitter.start()` is built
into Neovim — it doesn't need the plugin at all. The plugin is only needed
to download/compile parsers.

The `indent = { enable = true }` was removed because treesitter-based
indentation is still unreliable in many languages and can cause surprising
behavior. Neovim's default filetype-based indentation works fine.

### 6. Autopairs: removed nvim-cmp integration

**Before:** nvim-autopairs had special integration code to work with
nvim-cmp (auto-adding `()` after confirming a function completion).

**After:** Simplified to `opts = {}` (just the default autopairs behavior).

**Why:** We replaced nvim-cmp with blink.cmp, so the nvim-cmp integration
code would error. blink.cmp handles parentheses in completions through its
own mechanisms.

---

## Glossary

**Autocmd (autocommand):** A hook that runs code when an event happens.
`LspAttach` fires when an LSP server connects to a buffer. `FileType` fires
when Neovim detects what type of file you opened. `BufWritePre` fires right
before you save.

**Buffer:** An in-memory copy of a file. When you open a file, Neovim creates
a buffer. Multiple buffers can be open at once even if you can only see one.

**Capabilities:** A list of features that the editor supports, sent to the
language server. For example, "I support completion" or "I support code
actions." The server uses this to decide what information to send back.

**Diagnostic:** An error, warning, or hint from the language server. Shown
as underlines in the code and in the sign column (the narrow column to the
left of line numbers).

**Filetype:** Neovim's name for what kind of file you opened. `.tsx` files
have filetype `typescriptreact`. Run `:set ft?` to check.

**Floating window:** A popup window that hovers over your code. Used for
hover info (`K`), diagnostics (`<leader>e`), signature help, etc.

**Language server:** A separate program (process) that understands a
programming language. It runs in the background and communicates with Neovim
via JSON messages (the LSP protocol). For TypeScript, the server is
`typescript-language-server`, which internally uses the TypeScript compiler.

**Lazy loading:** Loading a plugin only when it's needed, not at startup.
`event = "InsertEnter"` means "load this plugin the first time the user
enters insert mode." `ft = { "markdown" }` means "load when opening a
markdown file." This makes Neovim start faster.

**LSP (Language Server Protocol):** A standardized protocol (invented by
Microsoft for VS Code) that defines how editors talk to language servers.
Because it's standardized, the same `typescript-language-server` works in
VS Code, Neovim, Emacs, etc.

**Parser:** A compiled program (`.so` file) that can read source code and
produce a syntax tree. Each language has its own parser. Treesitter parsers
are written in C and compiled on your machine.

**Plugin spec:** A Lua table that tells lazy.nvim how to install and
configure a plugin. It includes the GitHub repo, dependencies, config
functions, lazy loading triggers, etc.

**Sign column:** The narrow column to the left of line numbers. LSP uses it
to show icons for errors (usually a red dot), warnings (yellow), hints, etc.

**Snippet:** A template that expands into code. Type a short abbreviation,
trigger expansion, and get a full code block with placeholders you can tab
through. Example: `rfc` might expand to a full React functional component.

**Stow:** GNU Stow, a symlink manager. Your dotfiles repo contains the
actual config files, and `stow` creates symlinks from `~/.config/nvim/` to
your repo. This way your config is version-controlled.
