import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEqualTo', async: false })
export class IsNotEqualTo<T> implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyName] = args.constraints;
    const relatedValue = (args.object as T)[propertyName];

    return value !== relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be not equal ${relatedPropertyName}`;
  }
}
