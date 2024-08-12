require("talinthedev.set")
require("talinthedev.remap")
require("talinthedev.lazy")

require("onedark").load()
-- vim.cmd("colorscheme rose-pine")

require("telescope").setup({
	pickers = {
		find_files = {
			follow = true,
		},
	},
})
