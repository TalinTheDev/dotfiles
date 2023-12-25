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
vim.g.material_style = "darker"
vim.cmd[[colorscheme material]] -- Color scheme


require("nvim-treesitter").setup({
  build = ":TSUpdate",
  config = function ()
    local configs = require("nvim-treesitter.configs")
    configs.setup({
          ensure_installed = { "lua", "javascript", "html", "astro", "bash", "cpp", "css", "gitignore", "json", "python", "rust", "scss", "sql", "toml", "vue" }, 
          sync_install = true,
          auto_install = true,
          highlight = { enable = true },
          indent = { enable = true },  
    })
  end
})
vim.cmd("TSEnable highlight indent")
