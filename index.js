const Lynx = require('lynx');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')

let opt = {}; // opt.prefix = 'myPrefix';
const metrics = new Lynx('localhost', 8125, opt); // StatsD IP & Port
const serialPort = new SerialPort('/dev/ttyACM0', 9600);
const newLineSerialParser = serialPort.pipe(new Readline());

metrics.increment('node.app.start'); // Send our first metric

serialPort.on('open', function () {
    console.log('open');
    newLineSerialParser.on('data', function(data) {
        console.log('Incoming data: ' + data);

        let [temperature, humidity, lightLevel] = data.split(',');

        metrics.gauge('arduino.sensor.temperature', temperature);
        metrics.gauge('arduino.sensor.humidity', humidity);
        metrics.gauge('arduino.sensor.lightLevel', lightLevel);
    });
});