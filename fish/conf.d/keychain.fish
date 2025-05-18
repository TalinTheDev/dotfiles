if status is-login
	and status is-interactive
	keychain --eval $SSH_KEYS_TO_AUTOLOAD --quiet | source
end
