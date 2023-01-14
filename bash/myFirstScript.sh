#!/bin/bash

greeting='This is a script. Hello!'
echo $greeting, thanks for joining us!
echo '$greeting, thanks for joining us! You owe me $20'
echo "$greeting, thanks for joining us!"
echo "$greeting, you owe me \$20"

echo Machine Type: $MACHTYPE
echo Hostname: $HOSTNAME
echo Working Dir: $PWD
echo Session Length: $SECONDS
echo Home Dir: $HOME

# I did this on an Ubuntu machine instead of the Sandbox CentOS machine, so my command looks a little different than the lab
a=$(ip a | grep 'global ens18' | awk '{print $2}')
echo My IP is $a
