{ stdenv, pkgs }:
{
  sddm-theme-corners = stdenv.mkDerivation {
    name = "sddm-theme-corners-0.1.0";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/corners
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-theme-corners";
      rev = "v0.1.0";
      sha256 = "";
    };
  };
}