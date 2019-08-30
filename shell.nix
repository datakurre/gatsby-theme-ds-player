{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation rec {
  name = "gatsby-env";
  buildInputs = with pkgs; [
    jq
    lcms2
    libpng
    nodejs
    pkgconfig
    python3
    travis
    zlib
    yarn
  ];
  shellHook = ''
    export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
  '';
}
