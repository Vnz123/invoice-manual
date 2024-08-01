const db = require('../config/dbConnection');

exports.findUserByEmail = async (email) => {
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    return users[0];
};

exports.createUser = async (name, email, address) => {
    const [result] = await db.query('INSERT INTO users (name, email, address) VALUES (?, ?, ?)', [name, email, address]);
    return result.insertId;
};
