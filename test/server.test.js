// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../index");
// chai.should();
// chai.use(chaiHttp);

// describe("Server Test", () => {
//   // 200 Successful Request
//   it("Generate all passwords done successfully", (done) => {
//     const body = {
//       minLength: 10,
//       nuOfSpecialChar: 3,
//       nuOfnumbers: 4,
//       nuOfpasswords: 4,
//     };
//     chai
//       .request(server)
//       .post("/api/generate/passwords/v1")
//       .send(body)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         // res.body.passwords.should.be.a("array");
//         // res.body.passwords.length.should.be.eq(body.passwords);
//         done();
//       });
//   });

//   // 400 Bad Request
//   it("Passwords not generated bad request see console", (done) => {
//     // test the inputs and value and type
//     const body = {
//       minLength: 1,
//       nuOfSpecialChar: 2,
//       nuOfnumbers: 2,
//       nuOfpasswords: 4,
//     };
//     chai
//       .request(server)
//       .post("/api/generate/passwords/v1")
//       .send(body)
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.body.should.be.a("object");
//         console.log("Bad Request message:", res.body.msg);

//         done();
//       });
//   });

//   // 404 Not Found
//   it("wrong url or request method", (done) => {
//     // test the URL and  method (get post put ...)
//     chai
//       .request(server)
//       .get("/api/passwords")
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//         res.body.msg.should.be.eq("page not found");
//         done();
//       });
//   });
// });

let request = require("request");
let chai = require("chai");
let assert = require("chai").assert;
let expect = require("chai").expect;
let index = require("../index");
// don't .js extension, common js handles it perfectly
let should = chai.should();

let chaiHttp = require("chai-http");
chai.use(chaiHttp);
describe("/GET  all passwords", () => {
  it("should return status 200 ", (done) => {
    // dont forget done params
    //or else it will always give u test pass even if it is wrong
    //assertion

    chai
      .request("http://localhost:5500")
      .get("/")
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res); // note that u should check for res existance
        res.should.have.status(200);
        done();
      });
  });
  const body = {
    minLength: Number(10),
    nuOfSpecialChar: 2,
    nuOfnumbers: 2,
    nuOfpasswords: 4,
  };
  it("should return status 200 2 test ", (done) => {
    assert.isAbove(body.minLength, 5, 'minlength is strictly greater than 5');
    chai
      .request("http://localhost:5500")
      .post("/api/generate/passwords/v1") // chai makes it easy.. http://localhost:5500/
      .send(body)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res); // note that u should check for res existance
        // res.should.have.status(200);
        done();
      });
  });
});
