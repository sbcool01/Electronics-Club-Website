const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '2bb23307c4c79a2da43e258a268164fd-3d0809fb-086516e1',
        domain: 'sandbox8743d756b5904682b143f46ff151af52.mailgun.org'
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