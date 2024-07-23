return {
	"ThePrimeagen/harpoon",
	branch = "harpoon2",
	dependencies = { "nvim-lua/plenary.nvim" },
	config = function()
		local harpoon = require("harpoon")

		harpoon:setup()

		vim.keymap.set("n", "<leader>a", function() harpoon:list():add() end, { desc = "Add file to harpoon" })
		vim.keymap.set("n", "<leader>d", function() harpoon:list():remove() end, { desc = "Remove file to harpoon" })
		vim.keymap.set("n", "<C-e>", function() harpoon.ui:toggle_quick_menu(harpoon:list()) end, { desc = "View harpoon" })

		vim.keymap.set("n", "<C-1>", function() harpoon:list():select(1) end, { desc = "Go to the 1st buffer in harpoon" })
		vim.keymap.set("n", "<C-2>", function() harpoon:list():select(2) end, { desc = "Go to the 2st buffer in harpoon" })
		vim.keymap.set("n", "<C-3>", function() harpoon:list():select(3) end, { desc = "Go to the 3rd buffer in harpoon" })
		vim.keymap.set("n", "<C-4>", function() harpoon:list():select(4) end, { desc = "Go to the 4th buffer in harpoon" })

		-- Toggle previous & next buffers stored within Harpoon list
		vim.keymap.set("n", "<C-p>", function() harpoon:list():prev() end, { desc = "Goto the previous buffer in harpoon" })
		vim.keymap.set("n", "<C-n>", function() harpoon:list():next() end, { desc = "Goto the next buffer in harpoon" })
	end
}
