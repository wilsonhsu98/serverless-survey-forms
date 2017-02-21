'use strict';

let expect = require('chai').expect;
let should = require('chai').should();
let init = require('./init-test'),
    subscriberjs = init.subscriberjs;

describe("Interface to add one new subscriber model into data store", () => {
  describe("#addSubscribers successfully", () => {
    describe("When adding one new subscriber model with complete and normal parameters", () => {
      it("should response successfully", done => {
        let event = {
          surveyid: "this is fake surveyid",
          email: ["aa@aa.aa", "bb@bb.bb"],
        };
        subscriberjs.addSubscribers(event).then(response => {
          expect(response).to.not.be.null;
          response.should.have.all.keys('datetime');
          response.datetime.should.be.above(0);
          done();
        });
      });
    });
  });
  describe("#addSubscribers with error", () => {
    let missingParams = [
      {
        desc: "with missing event.email",
        event: {
          surveyid: "this is fake surveyid",
        },
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with missing event.surveyid",
        event: {
          email: ["aa@aa.aa", "bb@bb.bb"],
        },
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with wrong table",
        event: {
          surveyid: "this is fake surveyid",
          email: ["aa@aa.aa", "bb@bb.bb"],
        },
        expect: /Error: 400 Bad Request/
      }
    ];

    missingParams.forEach(test => {
      describe("When adding one new subscriber model " + test.desc, () => {
        it("should response error", done => {
          if (test.desc === "with wrong table") process.env.SERVERLESS_SUBSCRIBERTABLE = "XXX";
          subscriberjs.addSubscribers(test.event).catch(error => {
            expect(error).to.not.be.null;
            error.should.match(RegExp(test.expect));
            done();
          });
        });
      });
    });

    after("Set SERVERLESS_SUBSCRIBERTABLE subscribertable", done => {
      process.env.SERVERLESS_SUBSCRIBERTABLE = 'subscribertable';
      done();
    });
  });
});

describe("Interface to get one subscriber model from data store", () => {
  describe("#getSubscribers successfully", () => {
    describe("When getting exist subscriber model with complete and normal parameters", () => {
      it("should response successfully", done => {
        let event = {
          surveyid: "this is fake surveyid",
        };
        subscriberjs.getSubscribers(event).then(response => {
          expect(response).to.not.be.null;
          response.should.have.all.keys(['surveyid', 'email', 'datetime']);
          response.surveyid.should.have.string("this is fake surveyid");
          response.email.length.should.equal(2);
          done();
        });
      });
    });
  });
  describe("#getSubscribers with error", () => {
    let missingParams = [
      {
        desc: "with not match any event.surveyid",
        event: {
          surveyid: "Not match",
        },
        expect: /Error: 404 Not Found/
      },
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with wrong table",
        event: {
          surveyid: "Not match",
        },
        expect: /Error: 400 Bad Request/
      }
    ];

    missingParams.forEach(test => {
      describe("When getting one subscriber model " + test.desc, () => {
        it("should response error", done => {
          if (test.desc === "with wrong table") process.env.SERVERLESS_SUBSCRIBERTABLE = "XXX";
          subscriberjs.getSubscribers(test.event).catch(error => {
            expect(error).to.not.be.null;
            error.should.match(RegExp(test.expect));
            done();
          });
        });
      });
    });

    after("Set SERVERLESS_SUBSCRIBERTABLE subscribertable", done => {
      process.env.SERVERLESS_SUBSCRIBERTABLE = 'subscribertable';
      done();
    });
  });
});

describe("Interface to update one subscriber model in data store", () => {
  describe("#updateSubscribers successfully", () => {
    describe("When updating one exist subscriber model with complete and normal parameters", () => {
      it("should response successfully", done => {
        let event = {
          surveyid: "this is fake surveyid",
          email: ["aa@aa.aa", "bb@bb.bb", "cc@cc.cc"],
        };
        subscriberjs.updateSubscribers(event).then(response => {
          expect(response).to.not.be.null;
          response.should.have.all.keys(['email']);
          response.email.length.should.equal(3);
          done();
        });
      });
    });
  });
  describe("#updateSubscribers with error", () => {
    let errorParams = [
      {
        desc: "with non exist subscriber data",
        event: {
          surveyid: "not found",
          email: ["aa@aa.aa", "bb@bb.bb", "cc@cc.cc"],
        },
        expect: /Error: 404 Not Found/
      },
      {
        desc: "with missing event.surveyid",
        event: {
          email: ["aa@aa.aa", "bb@bb.bb", "cc@cc.cc"],
        },
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with missing event.email",
        event: {
          surveyid: "this is fake surveyid",
        },
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with wrong table",
        event: {
          surveyid: "not found",
          email: ["aa@aa.aa", "bb@bb.bb", "cc@cc.cc"],
        },
        expect: /Error: 400 Bad Request/
      }
    ];
    errorParams.forEach(test => {
      describe("When updating one subscriber model " + test.desc, () => {
        it("should response error", done => {
          if (test.desc === "with wrong table") process.env.SERVERLESS_SUBSCRIBERTABLE = "XXX";
          subscriberjs.updateSubscribers(test.event).catch(error => {
            expect(error).to.not.be.null;
            error.should.match(RegExp(test.expect));
            done();
          });
        });
      });
    });

    after("Set SERVERLESS_SUBSCRIBERTABLE subscribertable", done => {
      process.env.SERVERLESS_SUBSCRIBERTABLE = 'subscribertable';
      done();
    });
  });
});

describe("Interface to delete one subscriber model from data store", () => {
  describe("#deleteSubscribers successfully", () => {
    describe("When deleting exist subscriber model with complete and normal parameters", () => {
      it("should response successfully", done => {
        let event = {
          surveyid: "this is fake surveyid",
        };
        subscriberjs.deleteSubscribers(event).then(response => {
          expect(response).to.not.be.null;
          return subscriberjs.getSubscribers(event);
        }).catch(error => {
          expect(error).to.not.be.null;
          error.should.match(RegExp(/Error: 404 Not Found/));
          done();
        });
      });
    });
    describe("When deleting non-exist subscriber model with complete and normal parameters", () => {
      it("should response successfully", done => {
        let event = {
          surveyid: 'non-exist surveyid',
        };
        subscriberjs.deleteSubscribers(event).then(response => {
          expect(response).to.not.be.null;
          done();
        });
      });
    });
  });

  describe("#deleteSubscribers with error", () => {
    let missingParams = [
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      },
      {
        desc: "with wrong table",
        event: {
          surveyid: "this is fake survey model",
        },
        expect: /Error: 400 Bad Request/
      }
    ];

    missingParams.forEach(test => {
      describe("When deleting one subscriber model " + test.desc, () => {
        it("should response error", done => {
          if (test.desc === "with wrong table") process.env.SERVERLESS_SUBSCRIBERTABLE = "XXX";
          subscriberjs.deleteSubscribers(test.event).catch(error => {
            expect(error).to.not.be.null;
            error.should.match(RegExp(test.expect));
            done();
          });
        });
      });
    });

    after("Set SERVERLESS_SUBSCRIBERTABLE subscribertable", done => {
      process.env.SERVERLESS_SUBSCRIBERTABLE = 'subscribertable';
      done();
    });
  });
});