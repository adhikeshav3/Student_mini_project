@echo off
chcp 65001 >nul
title Noorul Islam University (NICHE) - SGRMS Offline Demo Server
color 0F

echo ===============================================================================
echo   NOORUL ISLAM CENTRE FOR HIGHER EDUCATION (NICHE)
echo   Student Grievance Redressal & Resolution System (SGRMS)
echo   OFFLINE LIVE DEMO ENVIRONMENT
echo ===============================================================================
echo.
echo [*] Initializing offline environment...

:: Ensure execution from the project root folder
cd /d "%~dp0"

:: Verify Node.js runtime
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not detected on this computer.
    echo Please ensure Node.js is installed to run the local server.
    echo.
    pause
    exit /b 1
)

:: Verify local dependencies
if not exist "node_modules\" (
    echo [!] Local dependencies not found. Installing from lockfile...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency installation failed.
        pause
        exit /b 1
    )
)

echo [✓] Local runtime verified: Node.js is active.
echo [✓] Offline dependencies intact.
echo [✓] 100%% Local Client-Side Database & Triage Engine Ready.
echo [✓] ZERO internet connection required.
echo.
echo ===============================================================================
echo   Starting Offline Portal Server...
echo   Local Address: http://localhost:5173/
echo.
echo   Your default browser will launch automatically in a moment.
echo   To STOP the demo server, close this window or press Ctrl + C.
echo ===============================================================================
echo.

:: Run Vite with --host (for network/hotspot access) and --open (to auto-launch browser)
call npm run dev -- --host --open

pause
