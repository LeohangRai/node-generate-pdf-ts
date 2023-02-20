export type CustomInvoicePayload = {
    username: string;
    paymentDate: Date;
    paymentType: string;
    paymentMethod: 'Online' | 'Offline';
    paymentGateway: string | undefined;
    mobileNumber: string | undefined;
    transactionId: string;
    paymentAmt: number;
}