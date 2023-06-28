if [ NODE_ENV = "production" ]; then
  node index.js
else
  . ./config/development.env
  npm run start:dev
fi
