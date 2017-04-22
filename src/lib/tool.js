import timeago from 'timeago.js';
exports.getLastTime = function (time) {
  var timeagoInstance = timeago();
  return timeagoInstance.format(time);
}