@echo off
title Claude Max API Proxy (port 3456)
cd /d "%~dp0"
echo Starting Claude Max API Proxy at http://localhost:3456 ...
node dist\server\standalone.js 3456
echo.
echo Server exited.
pause
