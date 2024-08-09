if status is-interactive
  eval (keychain --eval --agents ssh --quiet id_ed25519 --nogui)
end

if status is-login

end
