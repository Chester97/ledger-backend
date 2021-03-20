import { OmitType, PickType, PartialType } from '@nestjs/mapped-types';
import { ContractorDto, ContractorSchema } from './contractor.dto';
import { IncomeDto, IncomeSchema } from './income.dto';
import { ExpensesDto, ExpensesSchema } from './expenses.dto';
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

export type InvoiceDocumnet = InvoiceDto & Document;

@Schema()
export class InvoiceDto {
  @Prop() @IdValidator() id: string;
  @Prop() @PositionValidator() position: number;
  @Prop() @DateOfEventValidator() dateOfEvent: string;
  @Prop() @RegistryValidator() registry: string;
  @Prop() @DescriptionValidator() description: string;
  @Prop() @ContractorValidator() contractor: ContractorDto;
  @Prop() @IncomeValidator() income!: IncomeDto;
  @Prop() @ExpensesValidator() expenses: ExpensesDto;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDto);

export class AddInvoiceDto extends OmitType(InvoiceDto, [
  'id',
  'position',
] as const) {}
export class IdInvoiceDto extends PickType(InvoiceDto, ['id'] as const) {}
export class UpdateInvoiceDto extends PartialType(InvoiceDto) {}
