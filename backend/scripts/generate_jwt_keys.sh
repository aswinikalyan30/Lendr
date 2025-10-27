#!/usr/bin/env bash
# Dev helper: generate an RSA keypair for RS256 JWT signing/verification
# This script writes files to backend/secrets/ and is intended for local development only.

set -euo pipefail

OUT_DIR="$(dirname "$0")/../secrets"
mkdir -p "$OUT_DIR"

PRIVATE_KEY="$OUT_DIR/jwt_private.pem"
PUBLIC_KEY="$OUT_DIR/jwt_public.pem"

echo "Generating RSA private key -> $PRIVATE_KEY"
openssl genpkey -algorithm RSA -out "$PRIVATE_KEY" -pkeyopt rsa_keygen_bits:2048

echo "Extracting public key -> $PUBLIC_KEY"
openssl rsa -in "$PRIVATE_KEY" -pubout -outform PEM -out "$PUBLIC_KEY"

chmod 600 "$PRIVATE_KEY"
chmod 644 "$PUBLIC_KEY"

echo "Done."
echo "Add the following env vars to your backend .env or shell to use RS256:"
echo "JWT_PRIVATE_KEY_PATH=$PRIVATE_KEY"
echo "JWT_PUBLIC_KEY_PATH=$PUBLIC_KEY"

echo "Notes:"
echo " - Do NOT commit keys in backend/secrets to version control. This folder is gitignored by the project .gitignore."
echo " - Use these keys only for local development. In production, store keys in a proper secrets manager."
