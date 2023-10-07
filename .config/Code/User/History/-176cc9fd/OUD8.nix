{ config, pkgs, ... }:

{
  home = {
    username = "talin";
    homeDirectory = "/home/talin";

    packages = with pkgs; [
      neofetch
      google-chrome
      fish
      fishPlugins.hydro
      swaylock-effects
      bash
      firefox


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
  # home.file = {
  #   ".config/hypr" = {
  #     recursive = true;
  #     source = ./config/hypr;
  #   };
  # };
  home.file = {
    ".config/neofetch" = {
      recursive = true;
      source = ./config/neofetch;
    };
  };
  home.file = {
    ".config/Code/User" = {
      recursive = true;
      source = ./config/Code/User;
    };
  };
  home.file = {
    ".vscode/" = {
      recursive = true;
      source = ./config/.vscode;
    };
  };
    home.file = {
    ".config/mantablockscreen" = {
      recursive = true;
      source = ./config/mantablockscreen;
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
      plugins = [
        {
          name = "hydro";
          src = pkgs.fetchFromGitHub {
            owner = "jorgebucaran";
            repo = "hydro";
            rev = "d4875065ceea226f58ead97dd9b2417937344d6e";
            sha256 = "sha256-nXeDnqqOuZyrqGTPEQtYlFvrFvy1bZVMF4CA37b0lsE=";
          };
        }
      ];
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
      userSettings = {
        "password-store" = "gnome";
        "window.menuBarVisibility" = "toggle";
      };
    };

    git = {
      enable = true;
      userName = "Talin Sharma";
      userEmail = "talinsharma.dev@gmail.com";
      extraConfig = {
        credential.service = "git-credential-manager";
      };
    };
  };
}