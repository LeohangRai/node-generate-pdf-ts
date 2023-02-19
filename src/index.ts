import puppeteer from "puppeteer";
import handlebars from 'handlebars';
import * as fs from 'fs';
import { Readable } from "stream";

(async() => {
    const template = fs.readFileSync('./templates/invoice-template.hbs', 'utf-8');
    const compiledTemplate = handlebars.compile(template); 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const data = {
        name: 'Leohang Rai'
    }
    await page.goto(`data:text/html, ${compiledTemplate(data)}`, {
        waitUntil: 'networkidle0'
    });
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true
    })
    const fileStream = bufferToStream(pdf);
    const destinationFile = fs.createWriteStream('sample.pdf');
    fileStream.pipe(destinationFile);
    await browser.close();
})();

function bufferToStream(buffer: Buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

