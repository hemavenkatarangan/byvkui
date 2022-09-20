const Joi = require('joi');

module.exports = {
    validateParam: (schema, parameters) => {
        return (req, res, next) => {

            let response = {};
            console.log('req.params', req.params);
            parameters.forEach(element => {

                console.log(req['params'][element]);
                const result = schema.validate({ param: req['params'][element] });

                if (result.error) {
                    response.status_code = "400";
                    response.status_message = "React Schema validation failed";
                    response.result = result.error.details;
                    return res.status(400).json(response);
                }
            });

            if (!req.value)
                req.value = {};

            if (!req.value['params'])
                req.value['params'] = {};

            req.value['params'] = req.params;
            next();

        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            let response = {};

            const result = schema.validate(req.body, { abortEarly: false });

            if (result.error) {
                response.status_code = "400";
                response.status_message = "Schema validation failed";
                response.result = result.error.details;
                return res.status(400).json(response);
            } else {

                if (!req.value)
                    req.value = {};

                if (!req.value['body'])
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }

    },

    checkRoles: (roles) => {
        return (req, res, next) => {
            !roles.includes(...req.user.roles) ? res.status(400).json('Unauthorized') : next();
        }

    },



    schemas: {
        userSchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            dob: Joi.date().required()
        }),

        userOptionalSchema: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email()
        }),

        registerUserSchema: Joi.object({
            first_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            last_name: Joi.string()
                .alphanum()
                .min(1)
                .max(30)
                .required(),
            password: Joi.string().length(8)
                .required(),

            confirm_password: Joi.ref('password'),
            dob: Joi.date(),
            phone_num: Joi.string().length(10).pattern(/^[0-9]+$/).allow(""),
            email_id: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        }).with('password', 'confirm_password'),

        loginUserSchema: Joi.object({
            email_id: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string()
                .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required()
        }),

        eventSchema: Joi.object().keys({
            eventName: Joi.string().required(),
            courseType: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status: Joi.string().valid('Not Started', 'Open', 'Started', 'Cancelled', 'Completed', 'Closed').required(),
            registrationStartDate: Joi.date().required(),
            registrationEndDate: Joi.date().required(),
            eventStartDate: Joi.date().required(),
            eventEndDate: Joi.date().required(),
            eventMaxSize: Joi.number().required(),
            registeredCount: Joi.number().required()
        }),

        qASchema: Joi.object().keys({
            question: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            answer: Joi.string().required()
        }),

        qAoptionalSchema: Joi.object().keys({
            question: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            answer: Joi.string()
        }),

        eventOptionalSchema: Joi.object().keys({
            eventName: Joi.string(),
            courseType: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            status: Joi.string().valid('Not Started', 'Open', 'Started', 'Cancelled', 'Completed', 'Closed'),
            registrationStartDate: Joi.date(),
            registrationEndDate: Joi.date(),
            publishDate: Joi.date(),
            eventStartDate: Joi.date(),
            eventEndDate: Joi.date(),
            eventMaxSize: Joi.number(),
            registeredCount: Joi.number()
        }),

        registeredEventSchema: Joi.object().keys({
            event: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status: Joi.string().valid('Not Registered', 'Registered', 'Cancelled', 'On Hold').required(),
            // qas: Joi.array().items(qASchema),
            isPaymentRecieved: Joi.boolean().required(),
            paidAmount: Joi.number().required(),
            paidDate: Joi.date().required(),
            receiptNumber: Joi.string().required(),
            message: Joi.string().required(),
        }),

        registeredOptionalEventSchema: Joi.object().keys({
            event: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            status: Joi.string().valid('Not Registered', 'Registered', 'Cancelled', 'On Hold'),
            isPaymentRecieved: Joi.boolean(),
            paidAmount: Joi.number(),
            paidDate: Joi.date(),
            receiptNumber: Joi.string(),
            message: Joi.string(),
        }),

        courseSchema: Joi.object().keys({
            name: Joi.string().required()

        }),

        courseOptionalSchema: Joi.object().keys({
            name: Joi.string()
        }),


        qAAdminSchema: Joi.object().keys({
            question: Joi.string().required(),
            questionType: Joi.string().valid('Descriptive', 'Selective', 'Multiple Choice').required(),
            expectedAnswer: Joi.array().items(Joi.string()),
            preDefinedValues: Joi.array().items(Joi.string()),
            course: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()

        }),

        qAAdminOptionalSchema: Joi.object().keys({
            question: Joi.string(),
            questionType: Joi.string().valid('Descriptive', 'Selective', 'Multiple Choice'),
            expectedAnswer: Joi.array().items(Joi.string()),
            preDefinedValues: Joi.array().items(Joi.string()),
            course: Joi.string().regex(/^[0-9a-fA-F]{24}$/)

        }),

        additionalPropertySchema: Joi.object().keys({
            name: Joi.string().required(),
            type: Joi.string().required()
        }),

        additionalPropertyOptionalSchema: Joi.object().keys({
            name: Joi.string(),
            type: Joi.string()
        }),


        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}