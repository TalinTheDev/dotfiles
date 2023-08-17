{ config, pkgs, ... }:

{
  home = {
    username = "talin";
    homeDirectory = "/home/talin";

    packages = with pkgs; [
      neofetch
      google-chrome
      fish

      zip
      xz
      unzip
      p7zip
      xfce.thunar
      xfce.thunar-archive-plugin
      xfce.thunar-volman

      exa

      file
      which
      tree

      nix-output-monitor

      nerdfonts
    ];

    stateVersion = "23.05";
  };

  # link the configuration file in current directory to the specified location in home directory
  # home.file.".config/i3/wallpaper.jpg".source = ./wallpaper.jpg;

  # home.file.".config/fish" = {
  #   source = ./config/fish;
  #   recursive = true;
  # };


  xresources.properties = {
    "Xcursor.size" = 16;
    "Xft.dpi" = 101;
  };
  
  programs = {
    bash = {
      enable = true;
      enableCompletion = true;
      shellAliases = {
      };
    };

    fish = {
      enable = true;
    };

    vscode = {
      enable = true;
      extensions = with pkgs.vscode-extensions; [
        bbenoist.nix
        jdinhlife.gruvbox
      ];
    };

    git = {
      enable = true;
      userName = "Talin Sharma";
      userEmail = "talinsharma.dev@gmail.com";
      extraConfig = {
        credential.helper = "/run/current-system/sw/bin/git-credential-libsecret";
      };
    };
  };
}