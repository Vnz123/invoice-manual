const Joi = require('joi');

const invoiceSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
    }).required(),
    usage: Joi.object({
        number_of_e_signatures: Joi.number().integer().min(0).required(),
        number_of_stamp_papers: Joi.number().integer().min(0).required(),
    }).required(),
    charges: Joi.object({
        unit_price: Joi.number().precision(2).required(),
        total_amount: Joi.number().precision(2).required(),
    }).required(),
    invoiceDate: Joi.date().iso().required(),
    dueDate: Joi.date().iso().required(),
});

module.exports = (data) => invoiceSchema.validate(data);
