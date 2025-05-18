if status is-login
    and status is-interactive
    keychain --eval $SSH_KEYS_TO_AUTOLOAD --quiet --socket /tmp/ssh-agent.sock | source
end
