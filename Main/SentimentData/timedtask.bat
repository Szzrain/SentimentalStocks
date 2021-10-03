rem This bat is how we implement timed task
rem We deploy this script on a Windows Server and it will help us to collect Reddit submissions every hour

@ECHO OFF
rem show how many submissions did we collect
@set a=0
:start
python GetReddit.py
set /a a=%a%+1
title Collect times [%a%]
rem Time for one hour
ping -n 3600 127.1>nul
goto start
pause