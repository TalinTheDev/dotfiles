vim.g.mapleader = " "

vim.keymap.set( { "n", "v" }, "zz", ":update<cr>", { silent = true}); -- Save File
vim.keymap.set({ "n", "v", "i", "c" }, "<leader>ft", function() -- Toggle File Explorer
    local reveal_file = vim.fn.expand("%:p")
    if (reveal_file == "") then
      reveal_file = vim.fn.getcwd()
    else
      local f = io.open(reveal_file, "r")
      if (f) then
        f.close(f)
      else
        reveal_file = vim.fn.getcwd()
      end
    end
    require("neo-tree.command").execute({
      action = "focus",
      source = "filesystem",
      reveal_file = reveal_file,
      reveal_force_cwd = true,
      position = "left",
    })
  end,
  { silent = true }
);
