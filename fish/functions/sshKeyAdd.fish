function sshKeyAdd
  eval (ssh-agent -c) &&
  kitty ssh-add
end
