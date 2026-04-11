--------------------------------------------------------------------------------
-- FORMATTING
-- Auto-format on save using conform.nvim.
--
-- Strategy:
-- - Web files prefer prettierd, then fall back to prettier
-- - Lua files use stylua
-- - <leader>cf formats manually, and :w formats on save
--
-- Keymaps:
--   <leader>cf — Format current buffer manually
--------------------------------------------------------------------------------

return {
  {
    "stevearc/conform.nvim",
    event = { "BufWritePre" },
    cmd = { "ConformInfo" },
    keys = {
      {
        "<leader>cf",
        function()
          require("conform").format({ async = true, lsp_format = "fallback" })
        end,
        mode = { "n", "v" },
        desc = "Format buffer",
      },
    },
    config = function()
      local conform = require("conform")

      -- Try the daemon first for speed, then the normal CLI as a fallback.
      local web_formatters = { "prettierd", "prettier", stop_after_first = true }

      conform.setup({
        formatters_by_ft = {
          javascript = web_formatters,
          typescript = web_formatters,
          javascriptreact = web_formatters,
          typescriptreact = web_formatters,
          html = web_formatters,
          css = web_formatters,
          json = web_formatters,
          jsonc = web_formatters,
          lua = { "stylua" },
        },
        format_on_save = {
          timeout_ms = 3000,
          lsp_format = "fallback",
        },
      })
    end,
  },
}
