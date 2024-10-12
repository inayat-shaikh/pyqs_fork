function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Sheet1');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      switch(header) {
        case 'timestamp':
          return new Date();
        case 'Time':
          return e.parameter['Time'];
        case 'Date':
          return e.parameter['Date'];
        case 'IP Address':
          return e.parameter['IPAddress'];
        case 'Browser':
          return e.parameter['Browser'];
        case 'Device':
          return e.parameter['Device'];
          case 'StableIdentifier':
          return e.parameter['StableIdentifier'];
        default:
          return e.parameter[header];
      }
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}

// Function to handle GET requests for checking if accessKey is registered
function doGet(e) {
  try {
    if (!e || !e.parameter || !e.parameter.accessKey) {
      throw new Error('Missing or malformed accessKey parameter');
    }

    var accessKey = e.parameter.accessKey;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    var data = sheet.getDataRange().getValues();

    // Check if the accessKey is registered in the sheet
    var isRegistered = data.some(row => row.includes(accessKey));

    return ContentService
      .createTextOutput(JSON.stringify({ isRegistered: isRegistered }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error checking accessKey: ' + error.message);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// function doPost(e) {
//   var lock = LockService.getScriptLock()
//   lock.tryLock(10000)

//   try {
//     var doc = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = doc.getSheetByName('Sheet1');

//     var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//     var nextRow = sheet.getLastRow() + 1;

//     var newRow = headers.map(function(header) {
//       switch(header) {
//         case 'timestamp':
//           return new Date();
//         case 'Time':
//           return e.parameter['Time'];
//         case 'Date':
//           return e.parameter['Date'];
//         default:
//           return e.parameter[header];
//       }
//     });

//     sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//   catch (e) {
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//   finally {
//     lock.releaseLock();
//   }
// }

// function doGet(e) {
//   try {
//     if (!e || !e.parameter || !e.parameter.accessKey) {
//       throw new Error('Missing or malformed accessKey parameter');
//     }

//     var accessKey = e.parameter.accessKey;
//     var doc = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = doc.getSheetByName('Sheet1');
//     var data = sheet.getDataRange().getValues();

//     // Check if the accessKey is registered
//     var isRegistered = data.some(row => row.includes(accessKey));

//     return ContentService
//       .createTextOutput(JSON.stringify({ 'isRegistered': isRegistered }))
//       .setMimeType(ContentService.MimeType.JSON);
//   } catch (error) {
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'error': error.message }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }
