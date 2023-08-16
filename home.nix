{ config, pkgs, ... }:

{
  home.username = "talin";
  home.homeDirectory = "/home/talin";

  # link the configuration file in current directory to the specified location in home directory
  # home.file.".config/i3/wallpaper.jpg".source = ./wallpaper.jpg;

  # link all files in `./scripts` to `~/.config/i3/scripts`
  # home.file.".config/i3/scripts" = {
  #   source = ./scripts;
  #   recursive = true;   # link recursively
  #   executable = true;  # make all files executable
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

    exa

    file
    which
    tree

    nix-output-monitor
  ];

  programs.bash = {
    enable = true;
    enableCompletion = true;
    shellAliases = {
    };
  };

  home.stateVersion = "23.05";
  programs.home-manager.enable = true;
}