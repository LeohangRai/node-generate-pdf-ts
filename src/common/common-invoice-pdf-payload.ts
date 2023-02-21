import { CustomInvoicePayload } from '../custom-types/invoice.dto';

export const commonPdfData: CustomInvoicePayload = {
  username: 'Leohang Rai',
  mobileNumber: '9876543210',
  paymentAmt: 4000,
  paymentGateway: 'Esewa',
  paymentDate: new Date(),
  paymentMethod: 'Online',
  paymentType: 'General',
  transactionId: '3B1B3B1B'
};
