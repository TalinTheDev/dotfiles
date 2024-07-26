function sshKeyAdd
  kitty keychain --eval $SSH_KEYS_TO_AUTOLOAD -q | source
end
