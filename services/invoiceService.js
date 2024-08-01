const userModel = require('../models/userModel');
const invoiceModel = require('../models/invoiceModel');
const auditModel = require('../models/auditModel');
const emailService = require('./emailService');

exports.createInvoice = async (user, usage, charges, invoiceDate, dueDate) => {
    let userId = (await userModel.findUserByEmail(user.email))?.id;

    if (!userId) {
        userId = await userModel.createUser(user.name, user.email, user.address);
    }

    const invoiceId = await invoiceModel.createInvoice(userId, usage, charges, invoiceDate, dueDate);
    await auditModel.createAuditLog(`Invoice created for user ID: ${userId}`);

    emailService.sendInvoiceEmail(user.email, user.name, invoiceId, usage, charges, invoiceDate, dueDate);
};
