import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate as uuidValidate } from 'uuid-validate';

@ValidatorConstraint({ name: 'isUuidOrNullable', async: false })
export class IsUuidOrNullable implements ValidatorConstraintInterface {
  validate(value: any) {
    if (value === null) {
      return true;
    }
    if (typeof value !== 'string') {
      return false;
    }
    return uuidValidate(value, 4);
  }

  defaultMessage() {
    return 'Invalid UUID format or not nullable';
  }
}
