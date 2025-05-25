if status is-interactive
    # Commands to run in interactive sessions can go here
end

if status is-login
    contains ~/.local/bin $PATH
    or set PATH ~/.local/bin $PATH
    set -U fish_greeting ""
end
