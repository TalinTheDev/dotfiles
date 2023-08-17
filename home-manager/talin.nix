{ config, pkgs, ... }:

{
  home = {
    username = "talin";
    homeDirectory = "/home/talin";

    packages = with pkgs; [
      neofetch
      google-chrome
      fish
      oh-my-fish

      zip
      unzip
      xfce.thunar
      xfce.thunar-archive-plugin
      xfce.thunar-volman

      nerdfonts
    ];

    stateVersion = "23.05";
  };

  # link the configuration file in current directory to the specified location in home directory
  # home.file.".config/i3/wallpaper.jpg".source = ./wallpaper.jpg;

  home.file = {
    ".config/kitty" = {
      recursive = true;
      source = ./config/kitty;
    };
  };


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
      interactiveShellInit = ''set fish_greeting'';
    };

    kitty = {
      enable = true;
      theme = "Afterglow";
      shellIntegration.enableFishIntegration = true;
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
        credential.helper = "${pkgs.git.override { withLibsecret = true; }}/bin/git-credential-libsecret";
      };
    };
  };
}