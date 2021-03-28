import { applyDecorators } from '@nestjs/common';
import {
  IsInt,
  Min,
  IsDefined,
  IsString,
  IsNotEmpty,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContractorDto } from '../dto/contractor.dto';
import {
  IncomeNested,
  IncomeProperties,
} from './IncomeCustomValidator.decorator';
import {
  ExpensesNested,
  ExpensesProperties,
} from './ExpensesCustomValidator.decorator';
import { IsOnlyDate } from './DateCustomValidator.decorator';

export function IdValidator() {
  return applyDecorators(
    IsDefined({ message: 'ID of an inovice is required!' }),
    IsString({ message: 'ID must be a string!' }),
    Length(21, 21, { message: 'ID is not valid!' }),
  );
}

export function PositionValidator() {
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

export function IncomeValidator() {
  return applyDecorators(
    IsDefined({ message: 'Income fields are required!' }),
    IncomeNested({ message: 'Income fields are empty!' }),
    IncomeProperties({ message: 'Missing fields or wrong data in Income!' }),
  );
}

export function ExpensesValidator() {
  return applyDecorators(
    IsDefined({ message: 'Expenses fields are required!' }),
    ExpensesNested({ message: 'Expenses fields are empty!' }),
    ExpensesProperties({
      message: 'Missing fields or wrong data in Expenses!',
    }),
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

export function IncomeSumValidator() {
  return applyDecorators(
    IsDefined({ message: 'Income sum goods is valid!' }),
    IsInt({ message: 'Income sum must be an numbers!' }),
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

export function ExpenseSumValidator() {
  return applyDecorators(
    IsDefined({ message: 'Expense sum is valid!' }),
    IsInt({ message: 'Expense sum must be an numbers!' }),
  );
}
