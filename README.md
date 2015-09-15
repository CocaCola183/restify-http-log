# restify-http-log
Restify http log plugins.

## Before you start
* restify ^4.0.2  
* Node 0.12

## Install
```
npm install restify-http-log  
```

## Default usage
```js
var http_log = require('restify-http-log');  
server.pre(http_log());  
```
Note that it is better to use `pre` than `use`    

## Configuration
Default configuration:  
```js
{
	log_dir: process.cwd() + "/log/",
	http_log_dir: 'http',
	color: 'white'
}
```
explain:  
* log_dir: where you store your log files  
* http_log_dir: the folder you store your http log files in the log folder  
* color: the http log color output in console, see [this](https://www.npmjs.com/package/colors)  