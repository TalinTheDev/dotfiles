--------------------
-- General Options --
---------------------

-- Leader keys
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- I have a nerd font installed and in use in my terminal
vim.g.have_nerd_font = true

-- My terminal's have color support
vim.opt.termguicolors = true

-- Line numbers
vim.opt.number = true
vim.opt.relativenumber = true

-- Check spelling please
vim.opt.spell = true

-- Spaces vs Tabs Configuration (https://stackoverflow.com/a/1878983/17826254)
vim.opt.tabstop = 4 -- Neovim recommendation to keep at 8, did not follow
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true
vim.opt.smarttab = true
vim.opt.autoindent = true

-- Enable mouse mode
vim.opt.mouse = "a"

-- Don't show the mode (already present in statusline)
vim.opt.showmode = false

-- Schedule clipboard integration with OS to happen after 'UIEnter' to prevent slow startup times
vim.schedule(function()
	vim.opt.clipboard = "unnamedplus"
end)

-- Enable break indent (:h breakindent) [???]
vim.opt.breakindent = true

-- Save file undo history
vim.opt.undofile = true

-- Case insensitive search unless a capital letter (or \C) is in the search term
vim.opt.ignorecase = true
vim.opt.smartcase = true

-- Show the signcolumn
vim.opt.signcolumn = "yes"

-- Decrease update time
vim.opt.updatetime = 250

-- Decrease keyboard sequence wait time
vim.opt.timeoutlen = 300

-- Open new splits right/below the current one
vim.opt.splitright = true
vim.opt.splitbelow = true

-- Don't display whitespace characters
vim.opt.list = false

-- Preview substitutions as I type
vim.opt.inccommand = "split"

-- Highlight line cursor is on
vim.opt.cursorline = true

-- Minimum lines to keep above/below the cursor
vim.opt.scrolloff = 15

-- Raise confirmation dialog when performing an operation that would fail
vim.opt.confirm = true

---------------------
-- General Keymaps --
---------------------

-- Save current buffer
vim.keymap.set("n", "<leader>fs", "<cmd>:w<CR>", {})

-- Exit insert mode
vim.keymap.set("i", "jk", "<Esc>", {})

-- Clear search highlights on <Esc> press
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>", {})

-- Show quickfix list for local diagnostics
vim.keymap.set("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostics quickfix list" })

-- Disable arrow keys
vim.keymap.set("n", "<left>", '<cmd>echo "Use h to move"<CR>')
vim.keymap.set("n", "<right>", '<cmd>echo "Use l to move"<CR>')
vim.keymap.set("n", "<up>", '<cmd>echo "Use k to move"<CR>')
vim.keymap.set("n", "<down>", '<cmd>echo "Use j to move"<CR>')

-- Splits navigation using just Ctrl+[h, j, k, l]
vim.keymap.set("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left split" })
vim.keymap.set("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right split" })
vim.keymap.set("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower split" })
vim.keymap.set("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper split" })

--------------------------
-- General Autocommands --
--------------------------

-- Highlight yanked text
vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking text",
	group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})

-----------------------
-- Plugin Management --
-----------------------

-- Install Lazy
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
	if vim.v.shell_error ~= 0 then
		error("Error cloning lazy.nvim:\n" .. out)
	end
end
vim.opt.rtp:prepend(lazypath)

-- Install plugins
require("lazy").setup({
	require("talinthedev.plugins.yazi"),
	require("talinthedev.plugins.gitsigns"),
	require("talinthedev.plugins.vim-sleuth"),
	require("talinthedev.plugins.which-key"),
	require("talinthedev.plugins.telescope"),
	require("talinthedev.plugins.lsp"),
	require("talinthedev.plugins.autofmt"),
	require("talinthedev.plugins.autocomplete"),
	require("talinthedev.plugins.theme"),
	require("talinthedev.plugins.comments"),
	require("talinthedev.plugins.mini"),
	require("talinthedev.plugins.telescope"),
})
