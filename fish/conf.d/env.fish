if status is-login
    and status is-interactive
    set -Ua SSH_KEYS_TO_AUTOLOAD ~/.ssh/id_ed25519
    set -U fish_greeting ""
end
