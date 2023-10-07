{ stdenv, pkgs }:
{
  sddm-sugar-dark = stdenv.mkDerivation {
    name = "sddm-sugar-dark-1.2.6";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/sugar-dark
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-sugar-dark";
      rev = "v1.2.6";
      sha256 = "CR9BsddPv7YSfHwkG0E1mJKbPYhPuijsOrxYyQhQoWQ=";
    };
  };
}