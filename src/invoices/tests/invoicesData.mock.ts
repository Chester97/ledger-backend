import { InvoiceDto } from '../dto/invoice.dto';

export const INVOICES_DATA: Array<InvoiceDto> = [
  {
    id: 'dek66dKCUdfhJR5LfqZZS',
    position: 2,
    dateOfEvent: '2021-02-23',
    registry: 'abc1234678',
    description: 'kulalalal',
    contractor: {
      name: 'Kamil',
      surname: 'Kowalczuk',
      companyName: 'KKF Company',
      nip: '54333222343',
      address: 'Pietkiewicza 4D/29',
    },
    income: {
      soldGoods: 232323,
      totalGoods: 3232323,
    },
    expenses: {
      other: 323,
      total: 3232,
    },
  },
  {
    id: 'Yif_OYWZdbr6IqLmtQZnb',
    position: 3,
    dateOfEvent: '2021-10-13',
    registry: 'def12345',
    description: 'kulalalal',
    contractor: {
      name: 'Jan',
      surname: 'Kowalski',
      companyName: 'Kowalski Enterteiment',
      nip: '27331222343',
      address: 'Mysliwska 1/29',
    },
    income: {
      soldGoods: 21212,
      totalGoods: 6767,
    },
    expenses: {
      other: 444,
      total: 65656,
    },
  },
  {
    id: 'qYpVmV8ruZ3NRvgeGZL3B',
    position: 4,
    dateOfEvent: '2021-12-20',
    registry: 'ghi12345',
    description: 'tramamma',
    contractor: {
      name: 'Marek',
      surname: 'Aureliusz',
      companyName: 'Aureliush Sp z.oo',
      nip: '12631292343',
      address: 'Niebiańska 1',
    },
    income: {
      soldGoods: 9877,
      totalGoods: 90909,
    },
    expenses: {
      other: 4545,
      total: 4545,
    },
  },
];
