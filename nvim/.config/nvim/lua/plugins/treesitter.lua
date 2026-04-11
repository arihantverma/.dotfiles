-- TREESITTER
-- Syntax parsing for the languages used in this config.
--
-- Parsers are installed explicitly via :TSInstall / :TSUpdate rather than on
-- every Neovim startup. Missing parsers should never block editing, and the
-- install directory is added to runtimepath so parser files can be discovered.
--------------------------------------------------------------------------------

local parser_languages = "lua json html css javascript typescript tsx"

return {
  {
    "nvim-treesitter/nvim-treesitter",
    config = function()
      local install_dir = vim.fn.stdpath("data") .. "/site"

      if not vim.o.rtp:find(vim.pesc(install_dir), 1, false) then
        vim.opt.rtp:prepend(install_dir)
      end

      require("nvim-treesitter").setup({
        install_dir = install_dir,
      })

      -- Install the parser set this config expects to use regularly.
      vim.api.nvim_create_user_command("TSInstallRecommended", function()
        vim.cmd("TSInstall " .. parser_languages)
      end, { desc = "Install the recommended Treesitter parsers" })

      -- Start Treesitter only for the filetypes we actively use here.
      vim.api.nvim_create_autocmd("FileType", {
        pattern = {
          "lua",
          "json",
          "jsonc",
          "html",
          "css",
          "javascript",
          "javascriptreact",
          "typescript",
          "typescriptreact",
        },
        callback = function(args)
          pcall(vim.treesitter.start, args.buf)
        end,
      })
    end,
  },
}
