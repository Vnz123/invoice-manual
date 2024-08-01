const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendInvoiceEmail = (email, name, invoiceId, usage, charges, invoiceDate, dueDate) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Invoice Created',
        text: `Dear ${name},\n\nYour invoice (ID: ${invoiceId}) has been created with the following details:\n\nUsage:\n- E-Signatures: ${usage.number_of_e_signatures}\n- Stamp Papers: ${usage.number_of_stamp_papers}\n\nCharges:\n- Unit Price: ${charges.unit_price}\n- Total Amount: ${charges.total_amount}\n\nInvoice Date: ${invoiceDate}\nDue Date: ${dueDate}\n\nPayment Instructions: Please pay the total amount by the due date.\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
