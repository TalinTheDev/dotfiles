{ stdenv, pkgs }:
{
  mantablockscreen = stdenv.mkDerivation {
    name = "mantablockscreen-0.5";
    dontBuild = false;
    makeFile = "Makefile";
    makeFlags = [ "PREFIX=$(out)" ];{ stdenv, pkgs }:
{
  sddm-sugar-dark = stdenv.mkDerivation {
    name = "sddm-sugar-dark-1.2.5";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/sugar-dark
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-sugar-dark";
      rev = "v1.2.5";
      sha256 = "CR9BsddPv7YSfHwkG0E1mJKbPYhPuijsOrxYyQhQoWQ=";
    };
  };
}

    src = pkgs.fetchFromGitHub {
      owner = "reorr";
      repo = "mantablockscreen";
      rev = "v0.5";
      hash = "sha256-Ryru+wf7i1VGGEpEI1cceT+LKq+SVWNDw5wUxrGQG8o=";
    };
  };
}