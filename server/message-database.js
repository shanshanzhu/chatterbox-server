var _ = require("../node_modules/underscore");

var messages = {};

var add = function(message) {
  var room = message.room;
  if (messages[room]) {
    messages[room].unshift(message);
  } else {
    messages[room] = [message];
  }
};

var getChats = function(room, count) {
  if (messages[room]) return messages[room].slice(0, count);
  return [];
};

var getRooms = function() {
  var rooms = [];
  for (var room in messages) {
    rooms.push(room);
  }
  return rooms;
};

exports.add = add;
exports.getChats = getChats;
exports.getRooms = getRooms;