@echo off
echo ========================================
echo  Starting Information Retrieval App
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)

REM Install root dependencies if needed
if not exist "node_modules" (
    echo Installing root dependencies...
    call npm install
)

REM Start the application
echo Starting all services...
call npm start

pause


