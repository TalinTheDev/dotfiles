if status is-interactive
    # Commands to run in interactive sessions can go here
end

if status is-login
    contains $HOME/.local/bin $PATH
    or set PATH $HOME/.local/bin $PATH
end

# ZVM
set -gx ZVM_INSTALL "$HOME/.zvm/self"
set -gx PATH $PATH "$HOME/.zvm/bin"
set -gx PATH $PATH "$ZVM_INSTALL/"
