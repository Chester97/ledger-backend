import { OmitType, PickType, PartialType } from '@nestjs/mapped-types';
import { ContractorDto } from './contractor.dto';
import { IncomeDto } from './income.dto';
import { ExpensesDto } from './expenses.dto';
import {
  IdValidator,
  PositionValidator,
  DateOfEventValidator,
  DescriptionValidator,
  RegistryValidator,
  ContractorValidator,
  IncomeValidator,
  ExpensesValidator,
} from '../helpers/invoiceValidation.decorator';

export class InvoiceDto {
  @IdValidator() id: string;
  @PositionValidator() position: number;
  @DateOfEventValidator() dateOfEvent: string;
  @RegistryValidator() registry: string;
  @DescriptionValidator() description: string;
  @ContractorValidator() contractor: ContractorDto;
  @IncomeValidator() income!: IncomeDto;
  @ExpensesValidator() expenses: ExpensesDto;
}

export class AddInvoiceDto extends OmitType(InvoiceDto, ['id'] as const) {}
export class IdInvoiceDto extends PickType(InvoiceDto, ['id'] as const) {}
export class UpdateInvoiceDto extends PartialType(InvoiceDto) {}
