require('dotenv/config');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.mailGunApiKey,
        domain: process.env.mailGunDomain
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

function sendMail(from, subject, text, cb) {
    const mailOptions = {
        from: from, 
        to: 'elecclub.iitg@gmail.com', 
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (error, data) {
        if (error) {
            cb(error, null);
        }
        else {
            cb(null, data);
        }
    });
}
function sendDataToEmail (request, response) {

    let {name, from, subject, msg} = request.body;
    msg += `---  Sended By: ${name}`;
    sendMail(from, subject, msg, function(error, data) {
        if(error){
            console.log(error);
        }else {
            console.log("Data sent successfully");
        }
    })

}

module.exports = {sendDataToEmail}