import express, { Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';
import { generatePdf } from './services/pdf.service';
import { commonPdfData } from './common/common-invoice-pdf-payload';

const app = express();
const PORT = process.env.PORT || 3000;
// replace 'invoice-np' with 'invoice-en' for English Invoice
const invoiceTemplatePath = 'src/templates/invoice-np.ejs'; 

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.render('layout', { innerPage: './index', title: 'Download PDF' });
})

// sends file as a stream to the client browser
app.get('/download-pdf', async (req: Request, res: Response) => {
    const pdfStream = await generatePdf(commonPdfData, invoiceTemplatePath, 'stream') as Readable;
    res.attachment('sample.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
})

// writes file on the server machine
app.get('/save-pdf-on-server', async (req: Request, res: Response) => {
    const pdfStream = await generatePdf(commonPdfData, invoiceTemplatePath, 'stream') as Readable;
    const destinationFile = fs.createWriteStream('sample.pdf');
    pdfStream.pipe(destinationFile);
    return res.send('File written successfully!');;
})

app.listen(PORT, () => {
    console.log(`Server is up and running at port: ${PORT}`);
})