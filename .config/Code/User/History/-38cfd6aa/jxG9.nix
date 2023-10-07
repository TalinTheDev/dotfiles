{ stdenv, pkgs }:
{
  mantablockscreen = stdenv.mkDerivation {
    name = "mantablockscreen-0.5";
    dontBuild = false;
    makeFile = "Makefile";
    makeFlags = [ "PREFIX=$(out)" ];

    installPhase = ''
      mantablockscreen -i ~/.config/i3lock/Background.jpg
    '';

    src = pkgs.fetchFromGitHub {
      owner = "reorr";
      repo = "mantablockscreen";
      rev = "v0.5";
      hash = "sha256-Ryru+wf7i1VGGEpEI1cceT+LKq+SVWNDw5wUxrGQG8o=";
    };
  };
}