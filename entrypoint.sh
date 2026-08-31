#!/bin/sh
set -e

echo "=== [TUGU FRONTEND] Starting container initialization ==="

# 1. Pastikan node_modules terinstall
if [ ! -d "node_modules" ]; then
    echo "--> Installing npm packages..."
    npm install
fi

echo "=== [TUGU FRONTEND] Frontend siap berjalan di port 5173 ==="

# 2. Jalankan perintah container
exec "$@"
