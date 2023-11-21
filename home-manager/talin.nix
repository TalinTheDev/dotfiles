{ inputs, config, pkgs, ... }:

{
  home = {
    username = "talin";
    homeDirectory = "/home/talin";
    
    packages = [
      # inputs.ags.packages.${pkgs.system}.default

      pkgs.neofetch # System Fetch
      pkgs.google-chrome # Chrome
      pkgs.fish # Fish
      pkgs.gtklock # Lock
      pkgs.ranger # File Manager
      pkgs.neovim # NVIM
      pkgs.swww # Wallpaper
      pkgs.pywal # Theming
      pkgs.pipes # Terminal Pipes
      pkgs.cmatrix # Terminal matrix
      pkgs.grimblast # Screenshot
      pkgs.killall # Kill
      pkgs.brightnessctl # Screen Brightness
      
      pkgs.discord # Discord
      pkgs.betterdiscordctl # Better Discord lmao

      pkgs.xfce.thunar # File Manager
      pkgs.waybar # Bar
      pkgs.htop # Task manager
      pkgs.wev # Waybar event viewer
      pkgs.libsForQt5.qt5.qtgraphicaleffects # For SDDM
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

  xresources.properties = {
    "Xcursor.size" = 16;
    "Xft.dpi" = 101;
  };
  
  gtk = {
    enable = true;
    theme = {
      name = "Orchis";
      package = pkgs.orchis-theme;
    };
    iconTheme = {
      name = "Papirus-Dark";
      package = pkgs.papirus-icon-theme;
    };
    cursorTheme = {
      name = "Volantes";
      package = pkgs.volantes-cursors;
    };

    gtk3.extraConfig = {
      Settings = ''
        gtk-application-prefer-dark-theme=1
      '';
    };

    gtk4.extraConfig = {
      Settings = ''
        gtk-application-prefer-dark-theme=1
      '';
    };
  };
  
  programs = {
    direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
    fish = {
      enable = true;
      interactiveShellInit = ''
        set fish_greeting
        direnv hook fish | source
        set -g direnv_fish_mode disable_arrow
      '';
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
      shellIntegration.enableFishIntegration = true;
    };

    vscode = {
      enable = true;
      extensions = with pkgs.vscode-extensions; [
        bbenoist.nix
        jdinhlife.gruvbox
        astro-build.astro-vscode
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