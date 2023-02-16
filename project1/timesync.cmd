PowerShell -Command "Set-ExecutionPolicy Unrestricted" >> "%TEMP%\StartupLog.txt" 2>&1
PowerShell %USERPROFILE%\Documents\timesync.ps1 >> "%TEMP%\StartupLog.txt" 2>&1