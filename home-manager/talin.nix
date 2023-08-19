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
      fishPlugins.sponge

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
  home.file = {
    ".config/neofetch" = {
      recursive = true;
      source = ./config/neofetch;
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
        {
          name = "sponge";
          src = pkgs.fetchFromGitHub {
            owner = "meaningful-ooo";
            repo = "sponge";
            rev = "1.1.0";
            sha256 = "sha256-MdcZUDRtNJdiyo2l9o5ma7nAX84xEJbGFhAVhK+Zm1w=";
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