local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
     "git",
     "clone",
     "--filter=blob:none",
     "https://github.com/folke/lazy.nvim",
     "--branch=stable",
     lazypath
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")
require("lualine").setup({
  options = {
    disabled_filetypes = {
      "neo-tree"
    }
  },
  sections =  {
    lualine_a = { "mode" },
    lualine_b = { "branch", "diff", "diagnostics" },
    lualine_c = { "filename" },
    lualine_x = { "filetype" },
    lualine_y = { "progress" },
    lualine_z = { "location" }
  }
})
require("neo-tree").setup()
vim.cmd("colorscheme kanagawa")
