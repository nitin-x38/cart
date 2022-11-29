const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = 'test1234test1234';
const key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
const ivToken = 'testtesttesttest';

var encryptor={
    encrypt: function(text){
        try{
            var cipher = crypto.createCipheriv(algorithm,key,ivToken);
            var crypted = cipher.update(text,'utf8','hex');
            crypted += cipher.final('hex');
            return crypted;
        }catch(e){
            console.log(e);
            return "NA";
        }
    },

    decrypt: function(cipher){
        try{
            var decipher = crypto.createDecipheriv(algorithm,key,ivToken);
            var dec = decipher.update(cipher,'hex','utf8');
            dec += decipher.final('utf8');
            return dec;
        }catch(e){
            console.log(e);
            return "NA"
        }
    }
};

module.exports=encryptor;