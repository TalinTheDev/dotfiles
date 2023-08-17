{ stdenv, fetchFromGitHub }:
{
  stdenv.mkDerivation rec {
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/sugar-dark
    '';
    src = fetchFromGitHub {
      owner = "MarianArlt";
      repo = "sddm-sugar-dark";
      rev = "v1.2";
      sha256 = "0q9bqv1i7p0ny70vla0i9iimxxxbb9mslncb6m05g4nkc416rvv4";
    };
  };
}