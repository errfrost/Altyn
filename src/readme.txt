https://www.youtube.com/watch?v=coQ5dg8wM2o
https://github.com/dappuniversity/eth-todo-list

1. cmd - truffle init
2. new file - package.json и из репозитория копируем содержимое
3. cmd - npm install
4. создаем файл TodoList.sol
4. cmd - truffle compile
5. truffle-config.js берем из репозитория - здесь настройки подключения к Ganache
6. создаем migrations/2_deploy_contracts.js - в migrations для Ganache важен порядок выполнения файлов, это отражено в их имени
7. выполняем миграцию смарт контракта в блокчейн cmd - truffle migrate
8. cmd - truffle migrate --reset - деплоит наш контракт и удаляет старые с таким же именем, если они есть
9. создаем bs-config.json в котором будут настройки фронтенда
10. cmd - npm run dev - запуск локального сервера
11. подключение кошелька из Ganache в MetaMask - https://medium.com/@kacharlabhargav21/using-ganache-with-remix-and-metamask-446fe5748ccf
12. mocha и chai - javascript фреймворки для тестирования
13. создаем файл tests\TodoList.test.js
14. cmd - truffle test - прогон тестов
15.
