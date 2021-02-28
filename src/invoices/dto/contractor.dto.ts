import {
  ContractorAddressValidator,
  ContractorCompanyValidator,
  ContractorNameValidator,
  ContractorSurnameValidator,
  ContractorTaxIdValidator,
} from '../helpers/invoiceValidation.decorator';

export class ContractorDto {
  @ContractorNameValidator() name: string;
  @ContractorSurnameValidator() surname: string;
  @ContractorCompanyValidator() companyName: string;
  @ContractorTaxIdValidator() nip: string;
  @ContractorAddressValidator() address: string;
}
