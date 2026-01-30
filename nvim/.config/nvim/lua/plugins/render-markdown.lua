--------------------------------------------------------------------------------
-- MARKDOWN RENDERING PLUGINS
-- This file sets up render-markdown.nvim and its dependencies.
--
-- render-markdown.nvim: Renders markdown beautifully inside Neovim
--   - In normal mode: you see rendered headings, checkboxes, code blocks, etc.
--   - In insert mode: you see raw markdown for editing
--   - Docs: https://github.com/MeanderingProgrammer/render-markdown.nvim
--
-- To customize render-markdown, add options to the opts = {} table.
-- See :help render-markdown for all available options.
--------------------------------------------------------------------------------

return {
  -- RENDER-MARKDOWN: The main plugin for pretty markdown rendering
  {
    "MeanderingProgrammer/render-markdown.nvim",
    dependencies = {
      "nvim-treesitter/nvim-treesitter",  -- Required: parses markdown syntax
      "echasnovski/mini.icons",            -- Required: provides icons for headings, links, etc.
    },
    ft = { "markdown" },  -- Only load when opening markdown files (lazy loading)
    opts = {},            -- Empty = use defaults. Add your customizations here later.
  },

  -- TREESITTER: Syntax parsing engine that powers many Neovim features
  -- This is foundational infrastructure, not just for markdown.
  -- Used by: syntax highlighting, code folding, text objects, and many plugins.
  -- Docs: https://github.com/nvim-treesitter/nvim-treesitter
  {
    "nvim-treesitter/nvim-treesitter",

    -- build: runs after the plugin is installed/updated
    -- This updates all installed language parsers
    build = function()
      require("nvim-treesitter.install").update({ with_sync = true })()
    end,

    -- config: runs when the plugin loads
    config = function()
      -- pcall = "protected call", won't crash if module not found
      local ok, configs = pcall(require, "nvim-treesitter.configs")
      if ok then
        configs.setup({
          -- Parsers to auto-install. Add more languages as needed:
          -- e.g., "lua", "javascript", "typescript", "python", "rust", "go"
          ensure_installed = { "markdown", "markdown_inline" },

          -- Enable treesitter-based syntax highlighting
          -- This is more accurate than Neovim's default regex-based highlighting
          highlight = { enable = true },
        })
      end
    end,
  },

  -- MINI.ICONS: Lightweight icon provider
  -- Provides icons used by render-markdown and other plugins.
  -- Alternative: nvim-web-devicons (heavier, more features)
  -- Docs: https://github.com/echasnovski/mini.icons
  {
    "echasnovski/mini.icons",
    version = false,  -- Use latest version (mini.nvim doesn't use semver)
    opts = {},        -- Empty = use defaults
  },
}
