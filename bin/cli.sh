#!/usr/bin/env sh

set -eu

echo "bashsource: \"${BASH_SOURCE[0]}\" / "${BASH_SOURCE}""

DIRNAME="$(realpath "$(dirname  -- "${BASH_SOURCE[0]}")")"
PROJECT_ROOT="$(realpath "${DIRNAME}/..")"

npx scaffdog generate --project "${DIRNAME}"
