@echo off
title Solr Server
echo ========================================
echo  Starting Apache Solr Server
echo ========================================
echo.

REM Get the script directory (where this batch file is located)
set SCRIPT_DIR=%~dp0
echo Current directory: %CD%
echo Script directory: %SCRIPT_DIR%
echo.

REM Change to project root
cd /d "%SCRIPT_DIR%"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to change to script directory
    pause
    exit /b 1
)

REM Then navigate to Solr bin directory
echo Changing to Solr bin directory...
cd /d "%SCRIPT_DIR%backend\solr-9.1.1\bin"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Solr bin directory not found at: %SCRIPT_DIR%backend\solr-9.1.1\bin
    echo Please make sure you're running this from the project root directory
    pause
    exit /b 1
)
echo Current directory: %CD%
echo.

REM Check if Java is installed
echo Checking Java installation...
java -version
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java and add it to your system PATH
    echo.
    pause
    exit /b 1
)
echo Java found!
echo.

REM Check if Solr is already running
echo Checking if Solr is already running...
solr.cmd status
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Solr is already running!
    echo.
    pause
    exit /b 0
)
echo Solr is not running. Starting now...
echo.

echo Starting Solr server...
echo This window must stay open while Solr is running.
echo.
echo If you see permission errors, close this window and:
echo 1. Right-click start-solr.bat
echo 2. Select "Run as administrator"
echo.

echo Starting Solr server...
echo.
solr.cmd start

echo.
echo Solr start command completed with exit code: %ERRORLEVEL%
echo.

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  Solr started successfully!
    echo ========================================
    echo.
    echo Solr Admin UI: http://localhost:8983/solr/
    echo.
    echo Keep this window open while using the application.
    echo Press Ctrl+C to stop Solr.
    echo.
) else (
    echo.
    echo ========================================
    echo  ERROR: Failed to start Solr
    echo ========================================
    echo.
    echo Possible solutions:
    echo 1. Run this file as Administrator (right-click -^> Run as administrator)
    echo 2. Check if port 8983 is already in use
    echo 3. Verify Java is installed: java -version
    echo 4. Check Solr logs in: backend\solr-9.1.1\server\logs\
    echo.
    pause
    exit /b 1
)

REM Keep window open - wait for user input
echo.
echo ========================================
echo  Press any key to close this window
echo  (Keep Solr running in the background)
echo ========================================
pause >nul

