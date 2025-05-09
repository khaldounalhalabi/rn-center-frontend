@echo off
echo Exporting node.js path
:: set PATH=C:\Program Files\nodejs;%PATH%

echo Killing pom-front pm2 daemon...
pm2 stop pom-front

echo Deleting old builds...
rmdir /s /q .next

echo Pulling...
git reset --hard
git clean -df
git pull origin main

echo Installing npm packages...
npm install

echo Building...
npm run build

echo Starting pm2 daemons...
pm2 start ecosystem.config.js
