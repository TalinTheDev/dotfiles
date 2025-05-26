-- Uses Yazi as a file manager
return {
	"mikavilpas/yazi.nvim",
	event = "VeryLazy",
	dependencies = {
		"folke/snacks.nvim",
	},
	keys = {
		{
			"<leader>fc",
			mode = { "n", "v" },
			"<cmd>Yazi<cr>",
			desc = "Open yazi at the [c]urrent file",
		},
		{
			-- Open in the current working directory
			"<leader>fd",
			"<cmd>Yazi cwd<cr>",
			desc = "Open yazi in the current working [d]irectory",
		},
		{
			"<c-up>",
			"<cmd>Yazi toggle<cr>",
			desc = "Resume the last yazi session",
		},
	},
	opts = {
		-- if you want to open yazi instead of netrw, see below for more info
		open_for_directories = true,
		keymaps = {
			show_help = "<f1>",
		},
	},
	init = function()
		-- More details: https://github.com/mikavilpas/yazi.nvim/issues/802
		vim.g.loaded_netrwPlugin = 1
	end,
}
