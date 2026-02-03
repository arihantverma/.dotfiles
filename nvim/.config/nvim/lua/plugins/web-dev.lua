--------------------------------------------------------------------------------
-- WEB DEV UTILITIES
-- Auto-close HTML/JSX tags and bracket pairs.
--
-- nvim-ts-autotag: Type <div>, get </div> automatically. Also renames
--   matching tags when you edit one.
-- nvim-autopairs: Auto-close brackets, quotes, parens. Integrated with
--   nvim-cmp so confirming a completion like `console.log` adds `()`.
--------------------------------------------------------------------------------

return {
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
}
