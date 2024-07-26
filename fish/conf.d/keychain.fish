if status is-login
  eval (ssh-agent -c)
  kitty ssh-add
end
