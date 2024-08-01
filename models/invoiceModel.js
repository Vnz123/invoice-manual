const db = require('../config/dbConnection');

exports.createInvoice = async (userId, usage, charges, invoiceDate, dueDate) => {
    const { number_of_e_signatures, number_of_stamp_papers } = usage;
    const { unit_price, total_amount } = charges;
    const [result] = await db.query(
        'INSERT INTO invoices (user_id, number_of_e_signatures, number_of_stamp_papers, unit_price, total_amount, invoice_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, number_of_e_signatures, number_of_stamp_papers, unit_price, total_amount, invoiceDate, dueDate]
    );
    return result.insertId;
};
