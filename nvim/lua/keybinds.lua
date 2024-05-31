vim.api.nvim_set_keymap("", "<leader>f", ":NvimTreeToggle<cr>", { silent = true, noremap = true })
vim.keymap.set("n", "<leader>l", function() require('conform').format({ lsp_fallback = true }) end)
vim.keymap.set("n", "zz", ":w<cr>", { silent = true, noremap = true })

-- Multi File Management --
vim.keymap.set("n", "<C-t>", ":tabe ", { silent = true, noremap = true })
vim.keymap.set("n", "<leader>l", ":tabnext<cr>", { silent = true, noremap = true })
vim.keymap.set("n", "<leader>h", ":tabprevious<cr>", { silent = true, noremap = true })
vim.keymap.set("n", "<C-w>", ":tabc<cr>", { silent = true, noremap = true })
