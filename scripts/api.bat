@echo off
if %1 == messages goto get_messages
if %1 == createmessage goto create_message
if %1 == rooms goto get_rooms
if %1 == createroom goto create_room

:get_messages
curl http://localhost:9000/api/v0/messages
exit /B

:create_message
set ROOM_ID=5b8317eeb2234822cc04e288
curl -X POST -d roomId=%ROOM_ID% -d user=phares -d type=text -d data="test message" http://localhost:9000/api/v0/messages
set ROOM_ID=
exit /B

:get_rooms
curl http://localhost:9000/api/v0/rooms
exit /B

:create_room
set CREATOR_ID=5b83178eb2234822cc04e286
set TARGET_ID=5b831796b2234822cc04e287
curl -X POST -d creatorId=%CREATOR_ID% -d targetId=%TARGET_ID% http://localhost:9000/api/v0/rooms
set CREATOR_ID=
set TARGET_ID=
exit /B