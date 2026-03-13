#!/bin/bash
# deploy.sh — Upload kid-games to FTP server using curl
# Credentials are read from .env.deploy (gitignored)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.deploy"

# Load credentials
if [[ ! -f "$ENV_FILE" ]]; then
    echo "ERROR: $ENV_FILE not found."
    echo "Create it with: FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS, REMOTE_DIR"
    exit 1
fi
source "$ENV_FILE"

# Validate required vars
for var in FTP_HOST FTP_USER FTP_PASS REMOTE_DIR; do
    if [[ -z "${!var:-}" ]]; then
        echo "ERROR: $var is not set in $ENV_FILE"
        exit 1
    fi
done

FTP_PORT="${FTP_PORT:-21}"
FTP_URL="ftp://${FTP_HOST}:${FTP_PORT}"

echo "============================================"
echo "  Deploying kid-games to ${FTP_HOST}"
echo "  Remote path: ${REMOTE_DIR}/"
echo "============================================"
echo ""

# Collect files to deploy (HTML, CSS, JS only — skip .md, .claude, etc.)
cd "$SCRIPT_DIR"
FILES=$(find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) ! -path './.claude/*' | sort)

FILE_COUNT=$(echo "$FILES" | wc -l)
echo "Found $FILE_COUNT files to upload:"
echo "$FILES" | sed 's/^/  /'
echo ""

# Upload files (--ftp-create-dirs handles directory creation automatically)
UPLOADED=0
FAILED=0

for file in $FILES; do
    remote_path="${REMOTE_DIR}/${file#./}"
    echo -n "  Uploading ${file#./} ... "

    if curl -s --connect-timeout 10 --max-time 30 \
        -T "$file" -u "${FTP_USER}:${FTP_PASS}" \
        --ftp-create-dirs "${FTP_URL}${remote_path}"; then
        echo "OK"
        ((UPLOADED++))
    else
        echo "FAILED (exit $?)"
        ((FAILED++))
    fi
done

echo ""
echo "============================================"
echo "  Done! ${UPLOADED} uploaded, ${FAILED} failed"
echo "============================================"

if [[ $FAILED -eq 0 ]]; then
    echo ""
    DOMAIN="${FTP_HOST#ftp.}"
    echo "  Site should be live at:"
    echo "  http://${DOMAIN}${REMOTE_DIR}/"
fi
