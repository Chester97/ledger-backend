import { applyDecorators } from '@nestjs/common';
import {
  Validate,
  IsInt,
  Min,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsDateString,
  IsString,
  Length,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContractorDto } from '../dto/contractor.dto';
import { ExpensesDto } from '../dto/expenses.dto';
import { IncomeDto } from '../dto/income.dto';
import { IsOnlyDate } from './isOnlyDateValidator';
import { isEmpty } from 'rambda';

export function customNestedObject(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNestedObject',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(args);
          if (isEmpty(value)) return false;
          return true;
        },
      },
    });
  };
}

export function IdValidator() {
  console.log('wbijam ID');
  return applyDecorators(
    IsDefined({ message: 'ID of an inovice is required!' }),
    IsString({ message: 'ID must be a string!' }),
    Length(21, 21, { message: 'ID is not valid!' }),
  );
}

export function PositionValidator() {
  console.log('wbijam');
  return applyDecorators(
    IsDefined({ message: 'Position of invoice is required!' }),
    IsNotEmpty(),
    IsInt({ message: 'Position of invoice must be a number' }),
    Min(1, { message: 'Position of invoice must be greater than 0' }),
  );
}

export function DateOfEventValidator() {
  return applyDecorators(
    IsDefined({ message: 'Date of invoice event is required!' }),
    IsOnlyDate(),
  );
}

export function RegistryValidator() {
  return applyDecorators(
    IsDefined({ message: 'Accounting voucher number is required!' }),
    IsString({ message: 'Accounting voucher must be a string!' }),
    Length(4, 20, {
      message: 'Accounting voucher must be greater than 4 and less than 20',
    }),
  );
}

export function DescriptionValidator() {
  return applyDecorators(
    IsDefined({ message: 'Description of invoice event is required!' }),
    IsString({ message: 'Description of invoice event must be a string' }),
    Length(4, 30, {
      message:
        'Description of invoice event must be greater than 4 and less than 30',
    }),
  );
}

export function ContractorValidator() {
  return applyDecorators(
    Type(() => ContractorDto),
    IsDefined({ message: 'Contractor fields are required!' }),
    ValidateNested({ each: true, message: 'Contractor fields are required!' }),
  );
}

// export function IncomeValidator() {
//   return applyDecorators(
//     IsDefined({ message: 'Income fields are required!' }),
//     IsNotEmptyObject(),
//     ValidateNested({ each: true, message: 'Income fields are required!' }),
//     Type(() => IncomeDto),
//   );
// }

export function IncomeValidator() {
  return applyDecorators(IsDefined(), IsNotEmptyObject(), customNestedObject());
}

export function ExpensesValidator() {
  return applyDecorators(
    IsDefined({ message: 'Expenses fields are required!' }),
    ValidateNested({ each: true, message: 'Expenses fields are required!' }),
  );
}

/* ---CONTRACTOR_FIELDS--- */

export function ContractorNameValidator() {
  return applyDecorators(
    IsDefined({ message: 'Contractor name is required!' }),
    IsString({ message: 'Contractor name must be a string!' }),
    Length(2, 20, {
      message: 'Contractor name must be greater than 2 and less than 20',
    }),
  );
}

export function ContractorSurnameValidator() {
  return applyDecorators(
    IsDefined({ message: 'Contractor surname is required!' }),
    IsString({ message: 'Contractor surname must be a string!' }),
    Length(2, 30, {
      message: 'Contractor surname must be greater than 2 and less than 20',
    }),
  );
}

export function ContractorCompanyValidator() {
  // Dodatkowo sprawdzić czy nie ma już w bazie
  return applyDecorators(
    IsDefined({ message: 'Contractor company name is required!' }),
    IsString({ message: 'Contractor company name must be a string!' }),
    Length(5, 50, {
      message:
        'Contractor company name must be greater than 2 and less than 20',
    }),
  );
}

export function ContractorTaxIdValidator() {
  // uzupełnić
  return applyDecorators(
    IsDefined({ message: 'Contractor tax id is required!' }),
    IsString({ message: 'Contractor tax id must be a string!' }),
    Length(5, 12, {
      message: 'Contractor tax id must be greater than 5 and less than 12',
    }),
  );
}

export function ContractorAddressValidator() {
  // poprawić
  return applyDecorators(
    IsNotEmpty(),
    IsDefined({ message: 'Contractor address is required!' }),
    IsString({ message: 'Contractor address must be a string!' }),
    Length(10, 50, {
      message: 'Contractor address must be greater than 10 and less than 50',
    }),
  );
}

/* ---INCOME_FIELDS--- */

export function IncomeSoldValidator() {
  return applyDecorators(
    IsDefined({ message: 'Income sold goods is valid!' }),
    IsInt({ message: 'Income sold good must be an numbers!' }),
  );
}

export function IncomeTotalValidator() {
  return applyDecorators(
    IsDefined({ message: 'Income total goods is valid!' }),
    IsInt({ message: 'Income total goods must be an numbers!' }),
  );
}

/* ---EXPENSES_FIELDS--- */

export function ExpenseOtherValidator() {
  return applyDecorators(
    IsDefined({ message: 'Expense other is valid!' }),
    IsInt({ message: 'Expense other must be an numbers!' }),
  );
}

export function ExpenseTotalValidator() {
  return applyDecorators(
    IsDefined({ message: 'Expense total is valid!' }),
    IsInt({ message: 'Expense total must be an numbers!' }),
  );
}