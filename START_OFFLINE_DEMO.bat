@echo off
title NICHE Student Grievance Portal - Offline Demo
cd /d "%~dp0"

echo =======================================================
echo   NOORUL ISLAM (NICHE) STUDENT GRIEVANCE PORTAL
echo   Offline Live Demonstration Server
echo =======================================================
echo.
echo [*] Starting local offline server...
echo [*] Opening browser to http://localhost:5173
echo.
echo NOTE: Keep this window OPEN during your presentation.
echo To stop the server when finished, close this window.
echo =======================================================
echo.

call npm run dev -- --host --open

pause