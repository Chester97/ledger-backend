import { OmitType, PickType, PartialType } from '@nestjs/mapped-types';
import { ContractorDto } from './contractor.dto';
import { IncomeDto, AddIncomeDto } from './income.dto';
import { ExpensesDto, AddExpensesDto } from './expenses.dto';
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
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class InvoiceDto {
  @Prop() @IdValidator() id: string;
  @Prop() @PositionValidator() position: number;
  @Prop() @DateOfEventValidator() dateOfEvent: string;
  @Prop() @RegistryValidator() registry: string;
  @Prop() @DescriptionValidator() description: string;
  @Prop() @ContractorValidator() contractor: ContractorDto;
  @Prop() @IncomeValidator() income: IncomeDto;
  @Prop() @ExpensesValidator() expenses: ExpensesDto;
}

export type InvoiceDocument = InvoiceDto & Document;

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDto);

class GenericInvoice {
  @Prop() @IdValidator() id: string;
  @Prop() @PositionValidator() position: number;
  @Prop() @DateOfEventValidator() dateOfEvent: string;
  @Prop() @RegistryValidator() registry: string;
  @Prop() @DescriptionValidator() description: string;
  @Prop() @ContractorValidator() contractor: ContractorDto;
  @Prop() @IncomeValidator() income: AddIncomeDto;
  @Prop() @ExpensesValidator() expenses: AddExpensesDto;
}

export class AddInvoiceDto extends OmitType(GenericInvoice, [
  'id',
  'position',
] as const) {}
export class IdInvoiceDto extends PickType(InvoiceDto, ['id'] as const) {}
export class UpdateInvoiceDto extends PartialType(GenericInvoice) {}
