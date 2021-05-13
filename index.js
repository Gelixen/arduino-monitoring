const lynx = require('lynx');

let opt = {}; // opt.prefix = 'myPrefix';
const metrics = new lynx('localhost', 8125, opt); // StatsD IP & Port

metrics.increment('node.app.start'); // Send our first metric

function updateTempGauge() {
    metrics.gauge('arduino.sensor.temp', Math.random() * 10);
    setTimeout(updateTempGauge, 1000);
}

updateTempGauge();