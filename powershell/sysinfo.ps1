function getIP{
    (Get-NetIPAddress).IPv4Address | Select-String "10.*"
}

$IP = getIP
$PS = $HOST.Version.Major

Write-Host("This machine's IP is $IP")