'use strict';

function dynadb() {
  let dynaliteServer;

  this.listen = function(dynalitePort, callback) {
    let dynalite = require('dynalite');
    dynaliteServer = dynalite({
      createTableMs: 0
    });

    dynaliteServer.listen(dynalitePort, callback);
  };

  this.close = function(callback) {
    dynaliteServer.close(callback);
  };
};

module.exports = dynadb;