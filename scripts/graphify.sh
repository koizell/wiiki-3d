#!/bin/sh
# Keep graph generation and query logs local to this project.
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$root"
export GRAPHIFY_BACKEND=none
export GRAPHIFY_QUERY_LOG_DISABLE=1
exec "$root/.local/graphify-venv/bin/graphify" "$@"
