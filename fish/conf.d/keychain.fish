if status is-login
    and status is-interactive
    set -Ua SSH_KEYS_TO_AUTOLOAD ~/.ssh/id_ed25519
    keychain --eval $SSH_KEYS_TO_AUTOLOAD --quiet | source
end
