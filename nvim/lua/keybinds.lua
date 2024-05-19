vim.api.nvim_set_keymap("", "<leader>f", ":NvimTreeToggle<cr>", { silent = true, noremap = true })
vim.keymap.set("n", "<leader>l", function() require('conform').format({ lsp_fallback = true }) end)
vim.keymap.set("n", "zz", ":w<cr>", {silent = true, noremap = true})
