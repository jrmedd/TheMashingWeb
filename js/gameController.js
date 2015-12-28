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

var connectionId = -1;

function onConnect(connectionInfo){
  connectionId = connectionInfo.connectionId;
  console.log(connectionId);
};

$('#choose-serial-port').on('click', function(){
  var selectedPort = $('#serial-select').val();
  chrome.serial.connect(selectedPort, {bitrate: 9600}, onConnect);
});

var onReceiveCallback = function(info) {
  count += 1;
  if (info.connectionId == connectionId && info.data) {
    var str = ab2str(info.data);
  };
};

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

chrome.serial.onReceive.addListener(onReceiveCallback);
