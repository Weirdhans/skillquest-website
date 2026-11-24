#!/usr/bin/env bash
# State branch of the monthly newsletter: an orphan branch `newsletter-state` with
# issues/<YYYY-MM>.json per issue (which articles went out in which language, the
# Resend broadcast IDs and fingerprints). No email addresses. It keeps the state out
# of master, so no deploy or branch protection is involved. Same pattern as the
# social queue in the app repo. Used by .github/workflows/newsletter-*.yml
# (GH_TOKEN must be set).
#
#   bash scripts/newsletter-state.sh <dir>                    check out (or create) the branch in <dir>
#   bash scripts/newsletter-state.sh <dir> commit "<message>" commit and push what changed in <dir>
set -euo pipefail

dir="${1:?directory}"
branch="newsletter-state"
repo_url="https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
identity=(-c user.name="skillquest-newsletter" -c user.email="newsletter@users.noreply.github.com")

if [ "${2:-}" = "commit" ]; then
  cd "$dir"
  git add -A
  if git diff --cached --quiet; then
    echo "State branch: nothing to commit."
    exit 0
  fi
  git "${identity[@]}" commit -q -m "${3:-newsletter: update}"
  for attempt in 1 2 3; do
    if git push -q origin "HEAD:${branch}"; then exit 0; fi
    git pull -q --rebase origin "$branch" || true
  done
  echo "State branch: push failed after 3 attempts." >&2
  exit 1
fi

if git ls-remote --exit-code --heads "$repo_url" "$branch" >/dev/null 2>&1; then
  git clone -q --depth 1 --branch "$branch" "$repo_url" "$dir"
else
  mkdir -p "$dir/issues"
  cd "$dir"
  printf '%s\n' \
    '# Newsletter state' \
    '' \
    'Written by the newsletter workflows of this repository; see docs/NEWSLETTER.md on master.' \
    'One file per issue in issues/. Do not edit by hand while an issue waits for approval.' > README.md
  git init -q -b "$branch"
  git remote add origin "$repo_url"
  git add -A
  git "${identity[@]}" commit -q -m "newsletter: seed the state branch"
  git push -q origin "$branch"
fi
