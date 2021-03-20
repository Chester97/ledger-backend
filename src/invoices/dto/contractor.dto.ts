import {
  ContractorAddressValidator,
  ContractorCompanyValidator,
  ContractorNameValidator,
  ContractorSurnameValidator,
  ContractorTaxIdValidator,
} from '../helpers/invoiceValidation.decorator';
import { Schema } from 'mongoose';

export const ContractorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  companyName: { type: String, required: true },
  nip: { type: String, required: true },
  address: { type: String, required: true },
});

export class ContractorDto {
  @ContractorNameValidator() name: string;
  @ContractorSurnameValidator() surname: string;
  @ContractorCompanyValidator() companyName: string;
  @ContractorTaxIdValidator() nip: string;
  @ContractorAddressValidator() address: string;
}
