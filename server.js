const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kinnehbun@gmail.com',
    pass: 'dfartmvssogzgade'
  }
});

app.post("/create", (req, res) => {
  const { fullName, email, phone, reason } = req.body;

  // Construct email message
  const mailOptions = {
    from: `${email}`,
    // to: 'fkinneh73@hotmail.com',
    to: 'alieusma@gmail.com',
    subject: 'Information About Abarri',
    text: `Hello Abarri Adult Family,\n\nMy name is ${fullName} and I'm writing in enquiry: \n\n\n${reason}. \n\nBelow is my details if you want to contact me: 
    \nPHONE: ${phone} \nEMAIL: ${email}.
    \n\nRegards,\n${fullName}`
  };

  // Send email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ success: "Email sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
