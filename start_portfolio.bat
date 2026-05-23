@echo off
title Hari Paul's Portfolio Server
echo ============================================================
echo 🚀 Launching Local Python Web Server for your Portfolio...
echo 🌍 Opening http://localhost:8000 in your browser...
echo ============================================================
echo.

:: Open default web browser to the local server
start "" "http://localhost:8000"

:: Start the Python built-in web server
python -m http.server 8000

pause
