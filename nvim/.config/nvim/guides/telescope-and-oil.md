# Telescope and Oil.nvim Guide

## Prerequisites

These tools must be installed for Telescope to work:

```
brew install fd ripgrep
```

- **fd** — Fast file finder, used by `<Space>ff` (find files)
- **ripgrep** — Fast text search, used by `<Space>fg` (live grep)

---

## Telescope — Fuzzy Finder

Telescope lets you find files, search text, and navigate your project without
knowing exact paths. Just press a keybinding and start typing.

### Keymaps

| Key          | Action                    |
| ------------ | ------------------------- |
| `<Space>ff`  | Find files by name        |
| `<Space>fg`  | Search text across files  |
| `<Space>fb`  | Switch between open buffers |
| `<Space>fh`  | Search help documentation |

### How to Use

1. Press `<Space>ff` to open the file finder
2. Start typing any part of the filename — Telescope fuzzy matches, so
   `init` will find `init.lua`, `kmp` will find `keymaps.lua`
3. Use `<C-j>` / `<C-k>` to move up and down the results list
4. Press `<Enter>` to open the selected file
5. Press `<Esc>` to close Telescope

### Searching Text with Live Grep

`<Space>fg` opens a live grep search powered by ripgrep.

1. Type the text you're looking for
2. Results update in real time as you type
3. Navigate and open results the same way as file finder

> Requires ripgrep (see Prerequisites above).

### Switching Buffers

A **buffer** is an in-memory copy of a file you've opened. Every time you
open a file — via Telescope, oil, `:e`, or any other method — Neovim creates
a buffer for it. When you navigate away to another file, the previous buffer
stays open in the background. Think of buffers as browser tabs you can't see.

`<Space>fb` opens Telescope showing all your open buffers so you can jump
between them instantly.

**Example workflow:**

1. You open `init.lua` — buffer 1
2. Press `<Space>ff`, open `keymaps.lua` — buffer 2 (`init.lua` is still open)
3. Open `options.lua` via oil — buffer 3
4. Press `<Space>fb` — all three files appear in the list
5. Type "init", press Enter — you're back in `init.lua`

This is faster than `<Space>ff` for files you've already opened because the
list only contains your active files, not every file in the project.

**Useful buffer commands:**

| Command | Action                              |
| ------- | ----------------------------------- |
| `:ls`   | List all open buffers               |
| `:bd`   | Close (delete) the current buffer   |

---

## Oil.nvim — File Explorer

Oil shows your filesystem as a regular Neovim buffer. You navigate it with
the same keys you use to move around in any file.

### Opening Oil

| Key | Action                                    |
| --- | ----------------------------------------- |
| `-` | Open file explorer in current file's directory |

### Navigating Inside Oil

| Key       | Action                          |
| --------- | ------------------------------- |
| `j` / `k` | Move down / up through files   |
| `<Enter>` | Open file or enter directory    |
| `-`       | Go up to parent directory       |
| `g?`      | Show all oil keybindings (help) |

### Editing the Filesystem

Oil treats the file listing as editable text. You can:

- **Rename** a file by editing its name in the buffer
- **Delete** a file by deleting its line (`dd`)
- **Create** a file by adding a new line with a filename
- **Create** a directory by adding a line ending with `/`

After making changes, save with `:w` and Oil will prompt you to confirm
the operations before applying them.

### Hidden Files

Oil is configured to show hidden files (dotfiles) by default. You can
toggle this with `g.` inside an Oil buffer.

---

## Suggested Workflow

1. Use `<Space>ff` when you know roughly what file you want
2. Use `<Space>fg` when you know what text is in the file but not the filename
3. Use `<Space>fb` to jump between files you already have open
4. Use `-` when you want to browse a directory or manage files (rename, delete, create)
