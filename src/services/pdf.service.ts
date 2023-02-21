import { CustomInvoicePayload } from "../custom-types/invoice.dto";
import * as fs from 'fs';
import ejs from 'ejs';
import puppeteer from "puppeteer";
import { Readable } from "stream";

export async function generatePdf (
    data: CustomInvoicePayload, 
    templatePath: string = 'src/templates/invoice-np.ejs',
    type: 'buffer' | 'stream' = 'stream'
) : Promise<Buffer | Readable> 
{
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = ejs.compile(template);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`data:text/html, ${compiledTemplate(data)}`, {
        waitUntil: 'networkidle0'
    });
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true
    });
    await browser.close();
    if (type != 'stream') {
        // returns in Buffer format
        return pdf;
    }
    return bufferToStream(pdf);
}


function bufferToStream(buffer: Buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}