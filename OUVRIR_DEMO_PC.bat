@echo off
setlocal
cd /d "%~dp0"
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%~dp0index.html" & exit /b 0
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%~dp0index.html" & exit /b 0
start "" "%~dp0index.html"
