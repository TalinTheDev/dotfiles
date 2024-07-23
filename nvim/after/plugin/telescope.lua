local builtin = require('telescope.builtin')

vim.keymap.set('n', '<leader>pf', builtin.find_files, { desc = "Find project files" })
vim.keymap.set('n', '<C-g>)', builtin.git_files, { desc = "Find git files" })
vim.keymap.set('n', '<leader>ps', function() 
	builtin.grep_string({ search = vim.fn.input("Grep > ")});
end, { desc = "Find files using grep" })
