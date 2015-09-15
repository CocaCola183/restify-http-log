var assert = require('assert-plus');

module.exports = function restify_http_log (opts) {
  opts = opts || {};
  opts.log_dir = opts.log_dir || process.cwd() + "/log/";
  opts.http_log_dir = opts.http_log_dir || 'http';
  opts.color = opts.color || 'white';
  var logger_opts = {
    "log_dir": opts.log_dir,
    "record_level": 0
  };
  logger_opts["log_methods"] = {};
  logger_opts["log_methods"][opts.http_log_dir] = {
    color: opts.color,
    rank: 0
  }
  
  var logger = require('color-journal')(logger_opts);

  return function (req, res, next) {
    var time_start = Date.now();
    var _send = res.send;
    res.send = function() {
      res.header('X-Execution-Time', String(Date.now() - time_start));
      logger.http(req.method, req.url, req.headers.host, req.headers['user-agent'], String(Date.now() - time_start), 'ms');
      return _send.apply(res, arguments);
    }
    next();
  };
}