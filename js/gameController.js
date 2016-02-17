function onGetDevices(ports){
  if (ports.length > 0) {
    $.each(ports, function(key, value) {
      $('#serial-select').append($('<option></option>').attr('value', value.path).text(value.path));
    });
  }
  else {
    $('#serial-select').append($('<option disabled>No devices detected!</option>'));
    $('#serial-select').prop('disabled', true);
    $("#choose-serial-port").prop('disabled', true);
  }
};

function onConnect(connectionInfo){
  connectionId = connectionInfo.connectionId;
};

$('#choose-serial-port').on('click', function(){
  var selectedPort = $('#serial-select').val();
  chrome.serial.connect(selectedPort, {bitrate: 9600}, onConnect);
  $('#start-game').fadeIn();
});

var onReceiveCallback = function(info) {
  if (info.connectionId == connectionId && info.data) {
    var str = ab2str(info.data);
    if (str.split(',').length == 11) {
      buttonStates = str.split(',');
      startButton = buttonStates.pop();
    };
  };
};

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

chrome.serial.onReceive.addListener(onReceiveCallback);
