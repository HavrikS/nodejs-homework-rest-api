const { Schema, model } = require("mongoose");
const Joi = require("joi")

const {handleSaveErrors} = require("../helpers")

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
    avatarURL: String,
});

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
})

const User = model("user", userSchema);

const schemas = {
    registerSchema,
    loginSchema,
}

module.exports = {
    User,
    schemas,
}


