function sshKeyAdd
  keychain -k all
  keychain
  eval (keychain --eval --agents ssh --quiet id_ed25519 --nogui)
end
