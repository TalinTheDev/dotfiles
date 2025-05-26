#!/usr/bin/env bash

mkdir -p ~/.config

rm -rf ~/.config/nvim ~/.config/fish
cp nvim ~/.config/nvim -r
cp fish ~/.config/fish -r

chown talin:talin ~ -R
