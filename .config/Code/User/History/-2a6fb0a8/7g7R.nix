{ stdenv, pkgs }:
{
  sddm-sugar-dark = stdenv.mkDerivation {
    name = "sddm-sugar-dark-1.2.3";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/sugar-dark
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-sugar-dark";
      rev = "v1.2.3";
      sha256 = "1m8fz5d1n14asr4389k1yvqxajhyjh0asz0npl26kjx1kwv83fi0";
    };
  };
}