function sshKeyAdd
  kitty keychain --eval $SSH_KEYS_TO_AUTOLOAD -Q -q | source
end
