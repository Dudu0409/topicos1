mongod --port 27018 --dbpath C:\Users\185961\Documents\topicos1\mongo\baserequisicoes --auth
rem mongod --port 27018 --dbpath C:\Users\david\Documents\topicos1\mongo\baserequisicoes --auth

rem mongo --port 27018 / sem autenticação
rem mongo -u "admin" -p "admin" --authenticationDatabase "baserequisicoes" --port 27018 / com autenticação
rem compass e node: mongodb://admin:admin@localhost:27018/baserequisicoes?authSource=baserequisicoes

rem Dependências:
rem npm install express --save
rem npm install mongodb --save
rem npm install nodemon --save-dev
rem npm install cors --save
rem npm install mongoose --save
rem npm install / Reinstalar