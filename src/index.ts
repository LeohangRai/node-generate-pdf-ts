import express, { Request, Response } from 'express';
import path from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';
import { generatePdf } from './services/pdf.service';
import { commonPdfData } from './common/common-invoice-pdf-payload';

const app = express();
const PORT = process.env.PORT || 3000;
const invoiceTemplatePath = 'src/templates/invoice.ejs';

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/download-pdf', async (req: Request, res: Response) => {
    const pdfStream = await generatePdf(commonPdfData, invoiceTemplatePath, 'stream') as Readable;
    res.attachment('receipt.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
})

app.get('/save-pdf-on-server', async (req: Request, res: Response) => {
    const pdfStream = await generatePdf(commonPdfData, invoiceTemplatePath, 'stream') as Readable;
    const destinationFile = fs.createWriteStream('sample-receipt.pdf');
    pdfStream.pipe(destinationFile);
    return;
})

app.listen(PORT, () => {
    console.log(`Server is up and running at port: ${PORT}`);
})