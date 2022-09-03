import { ParserRequest } from "./dto/parser.request";

const cheerio = require('cheerio');
const request = require('request');
const https = require('https')
const fs = require('fs');
const { Injectable } = require('@nestjs/common');
let writeStream;

@Injectable()
export class ParserService {
  async getParse(requestData: ParserRequest) {
    const path = requestData.fileName.toString()
    writeStream = fs.createWriteStream(""+path+'.csv'+"");

    //Add file headers

    writeStream.write(`Title,Price,Link \n`);

    const links = [];
    for(let i=1; i<=requestData.pageNumbers; i++) {
      links.push(requestData.links+'?page='+ i)
    }

    await links.forEach((link) => {
      request(link, (e, response, html) => {
        if (!e && response.statusCode == 200) {
          const $ = cheerio.load(html);

          $('.card__body').each((i, el) => {
            const itemName = $(el).find('.card__title').text();
            const itemPrice = $(el)
              .find('.card-price')
              .text()
              .replace(/\s\s+/g, '');
            const link = $(el).find('a').attr('href');

            //Write to CSV file
            writeStream.write(`${itemName}, ${itemPrice}, ${link} \n`);
          });
        }
      });
    });
    return('Parsing done...')
  }
}
