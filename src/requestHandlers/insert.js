var fs = require('fs');
const { parse } = require('querystring');
var start = require('./start');

/**
 * sends status report to server 
 * display html for on client side
 * generate a form to enter insert details
 * 
 * @param {object} request 
 * @param {object} response 
 */
function reqInsert(request, response){
    console.log("Request handler 'insert' was called.");

    fs.readFile('./html/insert.html', function (err, insert) {
        if (err) {
            throw err; 
        }       

    response.writeHead( 200, {"Content-Type": "text/html"} );
    response.write(insert);
    response.end();
    });
}

/**
 * checking the incoming data using formidable
 * 
 * @param {object} request 
 * @param {object} response 
 */
function reqImport(request, response){
    console.log("Request handler 'import' is processing.");
   
    function collectRequestData(request, callback) {
        const FORM_URLENCODED = 'application/x-www-form-urlencoded';
        if(request.headers['content-type'] === FORM_URLENCODED) {
            
            let body = [];

            response.on('error', (err) => {
                console.error(err);
            });

            request.on('data', (chunk) => {
                body += chunk.toString(); //convert buffer to string
            });

            request.on('end', () => {
                callback(parse(body));
              
                response.on('error', (err) => {
                    console.error(err);
                });
            });
        }
        else{
            callback(null);
        }
    }

    collectRequestData(request, result => {
        console.log(result);
        storeToCsv(request, response, result);
    });
}

/**
 * If the file exist doesnot exist, will create one
 * If the file is null then write header
 * Then store the form data to the file
 * 
 * @param {object} request 
 * @param {object} response 
 * @param {object} result 
 */
function storeToCsv(request, response, result){
     
    var insertCSVHeader ="Item Name,Register's Name,Date,Expression\n"; 
    var insertCSVData = `${result.itemName},${result.name},${result.date},${result.selectInterest}\n`;
    let fd;

    fd = fs.openSync('../data/itemRecord.csv', 'a+');
    var data = fs.readFileSync(fd,'utf8');
    var readData = data.toString();

        if(readData === ""){
            fs.appendFileSync("../data/itemRecord.csv", insertCSVHeader)
            console.log("file was null so header is inserted");
        } 
    fs.appendFileSync(fd, insertCSVData,'utf8');
    console.log('data successfully appended to csv file');
    start.reqStart(request, response);
}

exports.reqImport = reqImport;
exports.reqInsert = reqInsert;
