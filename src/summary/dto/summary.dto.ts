import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export class SummaryDto {
  month_income: number;
  year_income: number;
  month_expenses: number;
  year_expenses: number;
  whole_income: number;
  whole_expenses: number;
}

export type SummaryDocument = SummaryDto & Document;
export const SummarySchema = SchemaFactory.createForClass(SummaryDto);
