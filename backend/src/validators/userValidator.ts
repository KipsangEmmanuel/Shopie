import Joi from "joi"

export const validateRegisterUser = Joi.object().keys({
    username: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().pattern(
        new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        )
    ),
});

export const validateLoginUser = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateUserEmail = Joi.object().keys({
    email: Joi.string().email().min(8).required(),
});

export const validateUserId = Joi.object().keys({
    id: Joi.string().min(8).required(),
});