{ config, pkgs, ... }:

{
  home.username = "talin";
  home.homeDirectory = "/home/talin";

  # link the configuration file in current directory to the specified location in home directory
  # home.file.".config/i3/wallpaper.jpg".source = ./wallpaper.jpg;

  # home.file.".config/fish" = {
  #   source = ./config/fish;
  #   recursive = true;
  # };

  #   home.file.".config/kitty" = {
  #   source = ./config/kitty;
  #   recursive = true;
  # };

  #   home.file.".config/neofetch" = {
  #   source = ./config/neofetch;
  #   recursive = true;
  # };

  #   home.file.".config/plank" = {
  #   source = ./config/plank;
  #   recursive = true;
  # };


  xresources.properties = {
    "Xcursor.size" = 16;
    "Xft.dpi" = 101;
  };

  programs.git = {
    enable = true;
    userName = "Talin Sharma";
    userEmail = "talinsharma.dev@gmail.com";
    extraConfig = {
      safe.directory = "/etc/nixos";
      credential.helper = "${pkgs.git.override { withLibsecret = true; }}/bin/git-credential-libsecret";
      pack.windowMemory = "2g";
      pack.packSizeLimit = "1g";
    };
  };

  programs.vscode = {
    enable = true;
    extensions = with pkgs.vscode-extensions; [
      bbenoist.nix
      jdinhlife.gruvbox
    ];
  };

  home.packages = with pkgs; [
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

  programs.bash = {
    enable = true;
    enableCompletion = true;
    shellAliases = {
    };
  };

  programs.fish = {
    enable = true;
    interactiveShellInit = ''
      set fish_greeting
    '';
    plugins = [
      {
        name = "tide";
        src = pkgs.fetchFromGitHub {
            owner = "ilancosman";
            repo = "tide";
            rev = "v5.6.0";
            sha256 = "cCI1FDpvajt1vVPUd/WvsjX/6BJm6X1yFPjqohmo1rI=";
        };
      }
    ];
  };

  home.stateVersion = "23.05";
  programs.home-manager.enable = true;
}