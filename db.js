const mongoose = require('mongoose');
const config = require('../../config');
mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.DEBUG != undefined);

function open(){
    return new Promise((resolve, reject) => {
        if(process.env.DEBUG != undefined) {
            let Mockgoose = require('mockgoose').Mockgoose;
            let mockgoose = new Mockgoose(mongoose);
            mockgoose.helper.setDbVersion("** your mongodb version **");
            mockgoose.prepareStorage().then(function() {
                mongoose.connect(config.db_test, (err, res) => {
                  if (err) return reject(err);
                  resolve();
                });
            }).catch(reject);
        }else{
            mongoose.connect(config.db, (err, res) => {
              if (err) return reject(err);
              resolve();
            });
        }
    });
}

function close(){
    return mongoose.disconnect();
}

module.exports = { close, open };
