vim.g.mapleader = " "
vim.g.localmapleader = " "

vim.keymap.set("n", "<leader>e", vim.cmd.Ex, { desc = "Open file tree" })
vim.keymap.set("n", "<leader>ds", ":update<cr>", { desc = "[D]ocument [S]ave" })
vim.keymap.set("n", "<leader>dq", ":q<cr>", { desc = "Window ([d]ocument) [Q]uit" })
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>", { desc = "Stop highlighting search results on Esc" })

vim.keymap.set("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
vim.keymap.set("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
vim.keymap.set("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
vim.keymap.set("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })
