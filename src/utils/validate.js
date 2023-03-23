const Joi = require("joi");
const pick = require("./pick");


const validate = (schema, req) => {

    const validSchema = pick(schema, ['params', 'query', 'body', 'user', 'fileNames']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false, allowUnknown: true })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return { status: false, error: errorMessage };
    }
    return { status: true, value };
};


module.exports = {
    validate
}