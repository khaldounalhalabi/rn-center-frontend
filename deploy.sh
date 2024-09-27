echo "Exporting node.js path"
export PATH=/opt/cpanel/ea-nodejs18/bin/:$PATH

echo "Killing all pm2 deamons ..."
pm2 kill

echo "Deleting old builds ..."
rm -r -f .next

echo "Pulling ..."
git reset --hard
git clean -df
git pull origin

echo "Installing npm packages ..."
npm i

echo "Building ..."
npm run build

echo "Starting pm2 deamons ..."
pm2 start ./ecosystem.config.js
