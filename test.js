const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const conn = require('./../utils/db'); // <-- db.js
const app = require('../../app'); // <-- app.js

chai.use(chaiHttp);

describe('# Test', function(){

    before(function(done) {
        conn.open().then(() => done()).catch(done);
    });

    after(function(done){
        conn.close().then(() => done()).catch(done);
    });

    it(`test something`, function(done){

        chai.request(app) // <-- pass the app here
            .get('/path/to/test')
            .then((res) => {
                // expects

                done();
              })
              .catch((err) => {
                  done(err);
              });
    });
});
