import Joi from 'joi';

export default async function validateUser(
  input: unknown,
  userEnums: string[]
) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required(),

    address: {
      country: Joi.string().min(3).max(20),
      city: Joi.string().min(3).max(20),
      street: Joi.string().min(3).max(20)
    },

    hobbies: Joi.array().items(Joi.string().min(3).max(20)),

    role: Joi.string().valid(...userEnums),

    mobileNumber: Joi.string().regex(/^(010)|(012)|(015)|(011).+[0-9]{11}$/),

    password: Joi.string().min(6).max(16).required()
   // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  //  repeat_password: Joi.ref('password')
  });

  return schema.validateAsync(input);
}
