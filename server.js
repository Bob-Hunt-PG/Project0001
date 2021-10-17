const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res)=>{
        res.send(__dirname + '/public/contactform.html')
});

app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // **Needs to be stored in environment variables**
            user: 'bhunt@prioritygroup.com',
            pass: 'quality'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'anywherepdt@gmail.com',
        subject: `Message from ${req.body.fullName}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send ('error');
        }else{
            console.log('Email');
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});