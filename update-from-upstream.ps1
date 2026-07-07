# Rebase this branch onto upstream main, rebuild, and back it up to the fork.
# Run from anywhere: powershell -File update-from-upstream.ps1
# If the rebase hits a conflict, the script stops; resolve it, then
# `git rebase --continue`, `npm run build`, and `git push --force-with-lease fork HEAD`.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

git fetch origin
git rebase origin/main
npm run build
git push --force-with-lease -u fork HEAD

Write-Host ""
Write-Host "Branch rebased onto origin/main, rebuilt, and pushed to fork."
