#!/bin/bash
set -e
cd /opt/airquality/github/riders_sitrep
source .venv/bin/activate

LOCKFILE="/opt/airquality/locks/riders_sitrep_watch.lock"
mkdir -p "$(dirname "$LOCKFILE")"
(
  flock -n 200 || exit 0  # previous run still going (shouldn't happen, runs take <1s) — skip rather than pile up
  python3 watch.py
) 200>"$LOCKFILE"
