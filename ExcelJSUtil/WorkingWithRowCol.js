const ExcelJs = require('exceljs');

//Excel workbook
async function ExcelColRowTest() {
    //creating object  value - 1 not found yet
    let output = {row :-1, column:-1}
    //constructor 
    const workbook = new ExcelJs.Workbook();
    //await before executing java code
    await workbook.xlsx.readFile("/Users/yilma/OneDrive/Documents/Playwright Web-API Automation Shatty/exceljs_download.xlsx");
    //get cell Sheet1
    const worksheet = workbook.getWorksheet('Sheet1');

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if (cell.value === "Apple") {
                //printing the coordiantes     
                //console.log(rowNumber);  //avoiding hard coded balue
                //console.log(colNumber);  //avoiding hard coded balue
            
                output.row=rowNumber;
                output.column=colNumber;
            }

        })
    })
    // updating the cell value in the excel sheet
    const cell =  worksheet.getCell(output.row,output.column);
    cell.value = "Avocado";
    //write on the excel sheet
    await workbook.xlsx.writeFile("/Users/yilma/OneDrive/Documents/Playwright Web-API Automation Shatty/exceljs_download.xlsx");

}
//calling the above function
ExcelColRowTest();