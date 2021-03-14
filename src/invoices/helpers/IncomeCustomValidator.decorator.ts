import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isEmpty, propIs } from 'rambda';

export function IncomeNested(validationOptions?: ValidationOptions) {
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

export function IncomeProperties(validationOptions?: ValidationOptions) {
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
            propIs(Number, 'soldGoods', value) &&
            propIs(Number, 'totalGoods', value)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
