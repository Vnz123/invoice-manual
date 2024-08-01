const invoiceService = require('../services/invoiceService');
const validateInvoice = require('../utils/validateInvoice');

exports.createInvoice = async (req, res) => {
    const { error } = validateInvoice(req.body);
    if (error) {
        console.log('Invalid input data:', req.body);
        return res.status(400).send('Invalid input data');
    }

    const { user, usage, charges, invoiceDate, dueDate } = req.body;

    try {
        await invoiceService.createInvoice(user, usage, charges, invoiceDate, dueDate);
        res.status(201).send('Invoice created successfully');
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error');
    }
};
