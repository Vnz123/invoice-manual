



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require('express');
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv'); 
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const Joi = require('joi');

// dotenv.config(); 

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(helmet());

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const invoiceSchema = Joi.object({
//     user: Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         address: Joi.string().required(),
//     }).required(),
//     usage: Joi.object({
//         number_of_e_signatures: Joi.number().integer().min(0).required(),
//         number_of_stamp_papers: Joi.number().integer().min(0).required(),
//     }).required(),
//     charges: Joi.object({
//         unit_price: Joi.number().precision(2).required(),
//         total_amount: Joi.number().precision(2).required(),
//     }).required(),
//     invoiceDate: Joi.date().iso().required(),
//     dueDate: Joi.date().iso().required(),
// });

// function sendInvoiceEmail(email, name, invoiceId, usage, charges, invoiceDate, dueDate) {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Invoice Created',
//         text: `Dear ${name},\n\nYour invoice (ID: ${invoiceId}) has been created with the following details:\n\nUsage:\n- E-Signatures: ${usage.number_of_e_signatures}\n- Stamp Papers: ${usage.number_of_stamp_papers}\n\nCharges:\n- Unit Price: ${charges.unit_price}\n- Total Amount: ${charges.total_amount}\n\nInvoice Date: ${invoiceDate}\nDue Date: ${dueDate}\n\nPayment Instructions: Please pay the total amount by the due date.\n\nThank you!`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }

// app.post('/create-invoice', async (req, res) => {
//     const { error } = invoiceSchema.validate(req.body);
//     if (error) {
//         console.log('Invalid input data:', req.body);
//         return res.status(400).send('Invalid input data');
//     }

//     const { user, usage, charges, invoiceDate, dueDate } = req.body;

//     try {
//         const [users] = await db.query('SELECT id FROM users WHERE email = ?', [user.email]);
//         let userId = users[0]?.id;

//         if (!userId) {
//             const [result] = await db.query('INSERT INTO users (name, email, address) VALUES (?, ?, ?)', [user.name, user.email, user.address]);
//             userId = result.insertId;
//         }

//         const { number_of_e_signatures, number_of_stamp_papers } = usage;
//         const { unit_price, total_amount } = charges;

//         const [invoiceResult] = await db.query(
//             'INSERT INTO invoices (user_id, number_of_e_signatures, number_of_stamp_papers, unit_price, total_amount, invoice_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
//             [userId, number_of_e_signatures, number_of_stamp_papers, unit_price, total_amount, invoiceDate, dueDate]
//         );

//         await db.query('INSERT INTO audit_logs (action) VALUES (?)', [`Invoice created for user ID: ${userId}`]);

//         sendInvoiceEmail(user.email, user.name, invoiceResult.insertId, usage, charges, invoiceDate, dueDate);

//         res.status(201).send('Invoice created successfully');
//     } catch (err) {
//         console.error('Database error:', err);
//         res.status(500).send('Database error');
//     }
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });



const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const invoiceRoutes = require('./routes/invoiceRoutes');

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use('/api', invoiceRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
