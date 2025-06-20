-- The fuzzy finder
return {
	"nvim-telescope/telescope.nvim",
	event = "VimEnter",
	dependencies = {
		"nvim-lua/plenary.nvim",
		{
			"nvim-telescope/telescope-fzf-native.nvim",
			build = "make",
			cond = function()
				return vim.fn.executable("make") == 1
			end,
		},
		{ "nvim-telescope/telescope-ui-select.nvim" },
		{ "nvim-tree/nvim-web-devicons", enabled = vim.g.have_nerd_font },
	},
	config = function()
		require("telescope").setup({
			extensions = {
				["ui-select"] = {
					require("telescope.themes").get_dropdown(),
				},
			},
			defaults = {
				file_ignore_patterns = {
					"%.git/", -- Ignore all files in `.git` directories
					"%dist/", -- Ignore all files in `dist` directories
					"%target/", -- Ignore all files in `target` directories
					"%node_modules/", -- Ignore all files in `node_modules` directories
				},
			},
		})

		-- Enable Telescope extensions if they are installed
		pcall(require("telescope").load_extension, "fzf")
		pcall(require("telescope").load_extension, "ui-select")

		local builtin = require("telescope.builtin")
		vim.keymap.set("n", "<leader>sh", builtin.help_tags, { desc = "[S]earch [H]elp" })
		vim.keymap.set("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
		vim.keymap.set("n", "<leader>sf", function()
			builtin.find_files({ cwd = vim.loop.cwd(), hidden = true, no_ignore = false })
		end, { desc = "[S]earch [F]iles" })
		vim.keymap.set("n", "<leader>st", builtin.builtin, { desc = "[S]earch [t]elescope builtins" })
		vim.keymap.set("n", "<leader>sw", function()
			builtin.grep_string({ cwd = vim.loop.cwd(), additional_args = { "--hidden", "--no-ignore" } })
		end, { desc = "[S]earch current [W]ord" })
		vim.keymap.set("n", "<leader>sg", function()
			builtin.live_grep({ cwd = vim.loop.cwd(), additional_args = { "--hidden", "--no-ignore" } })
		end, { desc = "[S]earch by [G]rep" })
		vim.keymap.set("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
		vim.keymap.set("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
		vim.keymap.set("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })

		vim.keymap.set("n", "<leader>/", function()
			builtin.current_buffer_fuzzy_find(require("telescope.themes").get_dropdown({
				winblend = 10,
				previewer = false,
			}))
		end, { desc = "[/] Fuzzily search in current buffer" })

		vim.keymap.set("n", "<leader>s/", function()
			builtin.live_grep({
				grep_open_files = true,
				prompt_title = "Live Grep in Open Files",
			})
		end, { desc = "[S]earch [/] in Open Files" })

		-- Shortcut for searching dotfiles
		vim.keymap.set("n", "<leader>sd", function()
			builtin.find_files({ cwd = vim.env.HOME .. "/dotfiles", hidden = true, no_ignore = false })
		end, { desc = "[S]earch [D]otfiles files" })
	end,
}
