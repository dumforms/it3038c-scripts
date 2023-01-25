function getIP{
    (Get-NetIPAddress).IPv4Address | Select-String "10.*"
}
function getFullVersion{
    
    $PS_Minor = $HOST.Version.Minor
    $PS_Build = $HOST.Version.Build
    $PS_Rev = $HOST.Version.Revision
    "$PS_Major" + "." + "$PS_Minor" + "." + "$PS_Build" + "." + "$PS_Rev"
}

$IP = getIP
$USER = $env:USERNAME
$HOSTNAME = hostname
$PS_Major = $HOST.Version.Major
$PS_FULL = getFullVersion
$DATE = Get-Date -Format "dddd, MMMM dd, yyyy"

$BODY = "This machine's IP is $IP.
The current user is $USER.
The Hostname is $HOSTNAME.
The machine is running PowerShell version $PS_Major ($PS_FULL)
Today's date is $DATE"

Write-Host($BODY)
Out-File -FilePath C:\Users\matth\Downloads\sysinfoOutput.txt -InputObject $BODY -Encoding ascii