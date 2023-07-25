import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate as uuidValidate } from 'uuid-validate';

@ValidatorConstraint({ name: 'isUUID', async: false })
export class IsUUIDValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return uuidValidate(value, 4);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid UUID format';
  }
}
