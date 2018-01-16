import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
/*
  Generated class for the PdfServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PdfServiceProvider {

  constructor() {
    console.log('Hello PdfServiceProvider Provider');
  }
  intToFormat(nStr)
    {
     nStr=+nStr.toFixed(2); //rounding to 2 decimal. other option Math.round( num * 100 + Number.EPSILON ) / 100
     return '\u20B9' +nStr;
    }

createPdf(qdata) {
  var promise = new Promise((resolve, reject) => {
   var dd = this.createDocumentDefinition(qdata);
            var pdf = pdfMake.createPdf(dd);
            pdf.download();
         pdf.getBase64(output=> {  
         var x=  this.base64ToUint8Array(output);
         resolve(x);
         }); 
  });
  return promise;
}
/*
downloadPdf(qdata) {
  var promise = new Promise((resolve, reject) => {
   var dd = this.createDocumentDefinition(qdata);
            var pdf = pdfMake.createPdf(dd).open;
        resolve(pdf);
         }); 
  return promise;
}*/
downloadPdf(qdata){
    var promise = new Promise((resolve, reject) => {
   var dd = this.createDocumentDefinition(qdata);
     var pdf=pdfMake.createPdf(dd);
     pdf.download('report.pdf');
    resolve(true);
    reject (false);
    });
    return promise;
}
            
            
base64ToUint8Array(base64) {  
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}
createDocumentDefinition1(qdata){
    var dd= {  content: ['Test pdf']}
    return dd;
}
createDocumentDefinition(qdata){
    var dd= {  content: [
            { text: 'Rennovate Quote For Your Home Interiors', style: 'header'},
            
            {
                style: 'clientTable',
                table: {
                    widths: ['*', 75, 75,75],
                    body: [
                        [ 
                            { text: 'Client', style: 'itemsTableHeader' },
                            { text: 'ClientID', style: 'itemsTableHeader' },
                            { text: 'Date', style: 'itemsTableHeader'},
                            { text: 'Quote Price', style: 'itemsTableHeader' },
                        ],
                         [ 
                            { text: qdata.custname },
                            { text: '' },
                            { text: ''},
                            { text: this.intToFormat( qdata.grandTotal) },
                        ]
                    ]
                },
            },
                { text: 'Core Product', style: 'subheader'},
            {
                style: 'itemsTable',
                table: {
                    widths: ['*', '*', '*','*','*',40,45],
                    body: [
                        [ 
                            { text: 'Room', style: 'itemsTableHeader' },
                            { text: 'Product', style: 'itemsTableHeader' },
                            { text: 'Internal Material', style: 'itemsTableHeader' },
                            { text: 'Shutter Material', style: 'itemsTableHeader' },
                            { text: 'Price', style: 'itemsTableHeader' },
                             { text: 'Width(mm)', style: 'itemsTableHeader' },
                              { text: 'Height(mm)', style: 'itemsTableHeader' },
                        ]
                    ]
                }
            },
            {
                style: 'totalsTable',
                table: {
                    widths: ['*', 75, 75],
                    body: [
                        [
                            '',
                            'Subtotal',
                            '1',
                        ],
                        [
                            '',
                            'Shipping',
                           '2',
                        ],
                        [
                            '',
                            'Total',
                            '3',
                        ]
                    ]
                },
                layout: 'noBorders'
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
        }
    }
    return dd;
}
}
