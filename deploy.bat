
@echo off


cd frontend\clickerwebapp

call npm run build

robocopy build ..\..\backend\public /E

cd ..\..

cd backend


taskkill /F /IM node.exe

timeout /t 2

start cmd /k "node server.js"

cd ..

echo Deployment complete and server started!
pause