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

`<Space>fb` shows all open buffers (files you've opened in this session).
Useful for jumping between files you're actively working on.

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
