## Course work on ISM
Technologies:  
1. [Material-UI](https://github.com/callemall/material-ui) - 
1. [electron](https://github.com/atom/electron)  

Skeleton application imported from example [Material-UI - Example Webpack Project](https://github.com/callemall/material-ui/tree/master/examples/webpack-example)
Initial repository location [there](https://github.com/dmitry22/information_security_management). It was a repository of laboratory work.

## Build
1. uncomment code in webpack-production.config.js
```
var compiler = webpack(config);
compiler.run(function (err, stats) {
  console.log(stats.toJson()); // по завершению, выводим всю статистику
});
```
1. run `node webpack-production.config.js`
