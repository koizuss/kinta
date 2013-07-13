console.log('kinta');

var STORAGE_KEY_RECORDS = 'records';

window.addEventListener("DOMContentLoaded", function(){
  var begin = document.getElementById('begin')
  , end = document.getElementById('end')
  , recordsView = document.getElementById('records')
  , records = JSON.parse(window.localStorage[STORAGE_KEY_RECORDS] || '[]')
  , saveStorage = function(records) {
      window.localStorage[STORAGE_KEY_RECORDS] = JSON.stringify(records);
  }
  , updateRecord = function(record, target) {
    target.childNodes[0].innerHTML = record.begin || '';
    target.childNodes[1].innerHTML = record.end || '';
  }
  , addRecord = function(record) {
    var trRecord = document.createElement('tr');
    for(var i = 0; i < 2; i++) {
      trRecord.appendChild(document.createElement('td'));
    }      
    updateRecord(record, trRecord);
    recordsView.appendChild(trRecord);
  };
  
  var toggleBeginEnd = function(event) {
    var recording = event  ? true : false
    , now = new Date().toString()
    , lastRecord = records[records.length - 1] || { end: true }
    , working = lastRecord.end ? false : true;
    
    if(recording) {
      if(working) {
        // stop working
        lastRecord.end = now;
        updateRecord(lastRecord, recordsView.childNodes[records.length]);      
      } else {
        // start working
        lastRecord = { begin: now };
        records.push(lastRecord);
        addRecord(lastRecord);      
      }
      saveStorage(records);
      working = !working;
    }
    
    begin.disabled = working;
    end.disabled = !working;
  };

  begin.addEventListener("click", function(){
    toggleBeginEnd(true);
  }, false);
  
  end.addEventListener("click", function(){
    toggleBeginEnd(true);
  }, false);
  
  for(var i = 0; i < records.length; i++) {
    addRecord(records[i]);
  }
  toggleBeginEnd();
  
}, false);