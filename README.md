## Course work on ISM
Готовые программы можно скачать перейдя по ссылке в [документацию]()  
Технологии:  
1. [Material-UI](https://github.com/callemall/material-ui)  
2. [webpack](https://webpack.github.io/)  
3. [nw-builder](https://github.com/nwjs/nw-builder)  

Каркасом приложения служит [Material-UI - Example Webpack Project](https://github.com/callemall/material-ui/tree/master/examples/webpack-example).
Изначально программы были написаны на Ruby и хранились [тут](https://github.com/dmitry22/information_security_management).

## Сборка
* Первоначально необходимо установить NodeJS и сделать `npm install` в главной директории.
* Этот код в `webpack-production.config.js` должен быть раскомментирован:
```
var compiler = webpack(config);
compiler.run(function (err, stats) {
  console.log(stats.toJson()); // по завершению, выводим всю статистику
});
```
* При желании собрать какую-то конкретную лабу, необходимо раскомментировать код для неё в `src/app/Main.jsx` и закомментировать для других лаб:
```
// Первое приложение
import AppContent from './app3/Content.jsx';
const appNames = 'Выбор СЗИ методами линейной свертки и ранжирования альтернатив'
// Второе приложение
// import AppContent from './App2/Content.jsx';
// const appNames = 'Комбинаторно-морфологический метод синтеза наборов СЗИ';
// Третье приложение
// import AppContent from './App1/Content.jsx';
// const appNames = 'Выбор рационального варианта реагирования на событие нарушения ИБ';
```
* Запуск `node webpack-production.config.js` для сборки этого в один файл
* Далее `cd build` и в ней сделать `npm install` и `node builder.js`
* Когда сборщик завершит работу программа будет доступна в папке `build/build`
