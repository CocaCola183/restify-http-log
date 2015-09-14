var logger = require('color-journal')({
	"log_dir": process.cwd() + "/log/",
	"record_level": 0,
	"log_methods": {
	  "http": { "color": "white", "rank": 0}
	}
});

module.exports = function (req, res, next) {
  var time_start = Date.now();
  var _send = res.send;
  res.send = function() {
    res.header('X-Execution-Time', String(Date.now() - time_start));
    logger.http(req.method, req.url, req.headers.host, req.headers['user-agent'], String(Date.now() - time_start), 'ms');
    return _send.apply(res, arguments);
  }
  next();
}

