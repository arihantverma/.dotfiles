# Telescope and Oil.nvim Guide

## Prerequisites

These tools must be installed for Telescope to work:

```bash
brew install fd ripgrep
```

- `fd` powers file finding for `<Space>ff`
- `ripgrep` powers text search for `<Space>fg`

---

## Quick Reference

| Key         | Action |
| ----------- | ------ |
| `<Space>ff` | Find files by name |
| `<Space>fg` | Search text in the project |
| `<Space>fb` | Switch between open buffers |
| `<Space>fh` | Search Neovim help |
| `-`         | Open Oil in the current file's directory |

If `which-key.nvim` is loaded, press `<Space>` and pause briefly to see these
leader mappings in a popup.

---

## Telescope

Telescope is the fast "jump to something" tool.

### Find Files

1. Press `<Space>ff`
2. Type part of the filename
3. Use `<C-j>` and `<C-k>` to move through the list
4. Press `<Enter>` to open the selected file
5. Press `<Esc>` to close Telescope

Examples:

- `init` will find `init.lua`
- `keym` will find `keymaps.lua`

### Search Text

`<Space>fg` opens a live text search across the project.

1. Press `<Space>fg`
2. Type the text you want to find
3. Move through results with `<C-j>` and `<C-k>`
4. Press `<Enter>` to jump to the selected match

### Buffers

A buffer is an open file in memory. Buffers stay open even when you switch to a
different file.

Use `<Space>fb` to jump between files you already opened.

Useful commands:

| Command | Action |
| ------- | ------ |
| `:ls`   | List open buffers |
| `:bd`   | Close the current buffer |

---

## Oil.nvim

Oil is your file explorer. It shows a directory as a normal editable buffer.

### Basic Navigation

| Key       | Action |
| --------- | ------ |
| `-`       | Open Oil from the current file, or go to the parent directory when already inside Oil |
| `j` / `k` | Move down / up |
| `<Enter>` | Open a file or enter a directory |
| `g?`      | Show Oil help |
| `g.`      | Toggle hidden files |

### Editing Files and Folders

Inside an Oil buffer, the file list is editable text.

- Rename a file by editing its name
- Delete a file by deleting its line with `dd`
- Create a file by adding a new line with a filename
- Create a directory by adding a new line ending in `/`

After editing the listing, save with `:w` and Oil will ask you to confirm the
changes before applying them.

---

## Suggested Workflow

Use this mental model:

- Use `<Space>ff` when you roughly know the filename
- Use `<Space>fg` when you know the text but not the filename
- Use `<Space>fb` when the file is already open
- Use `-` when you want to browse directories or rename/create/delete files
