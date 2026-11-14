const ExcelJs = require('exceljs');

//Excel workbook
async function exceltest() {
    //constructor 
    const workbook = new ExcelJs.Workbook();
    //await before executing java code
    await workbook.xlsx.readFile("/Users/yilma/OneDrive/Documents/Playwright Web-API Automation Shatty/exceljs_download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            console.log(cell.value);

        })
    })

}
//calling the above function
exceltest();

/* result - $node workingwithexcel.js 
Green
399
Winter
6
Orange
Orange
199 */

