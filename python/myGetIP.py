import socket, sys

def getHostnameByIP(h):
    try:
        hostname = str(h)
        ip = socket.gethostbyname(hostname)
        print(hostname + " has an IP of " + ip)

    except:
        print("Oops, something went wrong!")

getHostnameByIP(sys.argv[1])