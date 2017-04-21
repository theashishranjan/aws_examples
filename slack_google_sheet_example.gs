function doPost(e) {
  var sheets = SpreadsheetApp.openById('<SPREADSHEET_ID>');
  var next_row = getNextRow(sheets) + 1;    

  var params = e.parameters;

  // verify token to check if the request is from slack
  if (params.token == "<SLACK_OUTBOUND_WEBHOOK_TOKEN>") {
    // You can send a json and parse it here and put it on different columns
    var user_name = params.text;

    sheets.getRangeByName('date').getCell(next_row,1).setValue(new Date());
    sheets.getRangeByName('user_name').getCell(next_row,1).setValue(user_name.toString());
  }
  
  var params1 = JSON.stringify({'success': true});
  return HtmlService.createHtmlOutput(params1);
}

// GET the next empty row
function getNextRow(sheets) {
  var dates = sheets.getRangeByName("date").getValues();
  for (i in dates) {
    if(dates[i][0] == "") {
      return Number(i);
      break;
    }
  }
}


// Dummy doGet function if your request is GET instead of POST
function doGet(e) {
  var data = JSON.stringify({'success': true});
  return HtmlService.createHtmlOutput(data);
}