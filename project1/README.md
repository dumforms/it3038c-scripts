# Project 1
## Why:
My laptop has decided that it doesn't want to start the w32time service when it boots, so it fails to sync with the Windows time servers. This project solves that problem.

## How:
timesync.ps1 runs the PowerShell commands to start the service and then uses it to sync with the time server.  
timesync.cmd prepares PowerShell to run an unsigned script and calls the PowerShell file.

Task Scheduler is configured to run the .cmd file as administrator, so that the service start command is run with the necessary privileges. This tasks triggers on boot, with a 15 second delay.
