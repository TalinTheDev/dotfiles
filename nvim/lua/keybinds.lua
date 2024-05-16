vim.o.formatexpr = "v:lua.require'conform'.formatexpr()"
vim.api.nvim_set_keymap("", "<leader>f", ":NvimTreeToggle<cr>", {silent = true, noremap = true})
