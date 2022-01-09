import Joi from 'joi';

import { invalidCharacters, allowedDomain } from '../../config';
import { ErrorCodes, ErrorException } from '../../../../errors-handler';

export default async function validateLogin(input: unknown) {
  const schema = Joi.object().keys({
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
