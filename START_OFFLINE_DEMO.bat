@echo off
title NOORUL ISLAM (NICHE) - Student Grievance Portal (Offline Demo)
color 0F
cd /d "%~dp0"

echo ===============================================================================
echo   NOORUL ISLAM CENTRE FOR HIGHER EDUCATION (NICHE)
echo   STUDENT GRIEVANCE REDRESSAL SYSTEM - OFFLINE LIVE DEMO
echo ===============================================================================
echo.
echo  [+] Student Portal Mode        : ACTIVE (Strictly Student-Focused)
echo  [+] Interactive Disclosures    : ONLINE (Dynamic Grievance Analytics)
echo  [+] Offline Local Storage      : READY (100%% Zero-Internet Required)
echo.
echo  -----------------------------------------------------------------------------
echo  DEMO CREDENTIALS:
echo    Student Roll Number : 1123237031
echo    Password            : student@123
echo    (Or click "Instant 1-Click Access" on the screen)
echo  -----------------------------------------------------------------------------
echo.
echo  [*] Starting local server at http://localhost:5173 ...
echo  [*] Your default browser will open automatically in a moment.
echo.
echo  NOTE: Keep this window OPEN during your presentation.
echo  To stop the server when finished, simply close this window.
echo ===============================================================================
echo.

call npm run dev -- --host --open

pause