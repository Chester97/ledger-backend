import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isEmpty, propIs } from 'rambda';

export function ExpensesNested(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IncomeValidation',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (isEmpty(value)) return false;
          return true;
        },
      },
    });
  };
}

export function ExpensesProperties(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IncomeValidation',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            propIs(Number, 'other', value) &&
            propIs(Number, 'total', value) &&
            propIs(Number, 'sum', value)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
