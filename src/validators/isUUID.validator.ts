import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as uuidValidate from 'uuid-validate';

@ValidatorConstraint({ name: 'isUUID', async: false })
export class IsUUIDValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return uuidValidate(value, 4);
  }

  defaultMessage() {
    return 'Invalid UUID format';
  }
}
