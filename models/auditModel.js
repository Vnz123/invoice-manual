const db = require('../config/dbConnection');

exports.createAuditLog = async (action) => {
    await db.query('INSERT INTO audit_logs (action) VALUES (?)', [action]);
};
