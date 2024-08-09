if status is-interactive
  # SSH Start
  eval (keychain --eval --agents ssh --quiet id_ed25519 --nogui)

  # Color scheme
  set_onedark -b
end

if status is-login

end
