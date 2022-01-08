import Joi from 'joi';

import { invalidCharacters, allowedDomain } from '../../config';
import { userEnums } from '..';
import { ErrorCodes, ErrorException } from '../../../../errors-handler';

export default async function validateUser(input: unknown) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .custom((value, helper) => {
        return invalidCharacters.test(value)
          ? helper.error('any.invalid')
          : value;
      })
      .required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: allowedDomain }
      })
      .trim()
      .required()
      .custom((value, helper) => {
        return invalidCharacters.test(value)
          ? helper.error('any.invalid')
          : value;
      }),

    address: Joi.object().keys({
      country: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .custom((value, helper) => {
          return invalidCharacters.test(value)
            ? helper.error('any.invalid')
            : value;
        })
        .required(),

      city: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .custom((value, helper) => {
          return invalidCharacters.test(value)
            ? helper.error('any.invalid')
            : value;
        }),

      street: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .custom((value, helper) => {
          return invalidCharacters.test(value)
            ? helper.error('any.invalid')
            : value;
        })
    }),

    hobbies: Joi.array().items(
      Joi.string()
        .min(3)
        .max(20)
        .trim()
        .custom((value, helper) => {
          return invalidCharacters.test(value)
            ? helper.error('any.invalid')
            : value;
        })
    ),

    role: Joi.string().valid(...userEnums.values()),

    mobileNumber: Joi.string()
      .regex(/^(?=\d{11}$)01[2501]\d{8}/)
      .required()
      .messages({
        'string.base': `"mobileNumber" should be start with 010, 012, 011 or 015`,
        'string.empty': `"mobileNumber" cannot be an empty field`,
        'string.min': `"mobileNumber" should have a length of 11 numbers`,
        'any.required': `"mobileNumber" is a required field`
      }),

    password: Joi.string()
      .min(6)
      .max(16)
      .trim()
      .required()
      .custom((value, helper) => {
        return invalidCharacters.test(value)
          ? helper.error('any.invalid')
          : value;
      })
  });

  try {
    await schema.validateAsync(input);
  } catch (error: any) {
    // customize Joi Error
    throw new ErrorException(error.details[0].message, ErrorCodes.Validation);
  }
}
