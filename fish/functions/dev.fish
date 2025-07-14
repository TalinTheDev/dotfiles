function dev --wraps=devpod-cli --description 'alias dev=devpod-cli'
    devpod-cli $argv --dotfiles git@github.com:TalinTheDev/dotfiles --dotfiles-script setup --dotfiles-script-env "MODE=c"
end
