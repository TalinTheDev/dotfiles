{ stdenv, pkgs }:
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
      sha256 = "G8jHZYx+8pumC/NizWDIWTdxYlVFxM3JtwTzAi4sJQ0=";
    };
  };
}