var messages = [{username: "The Boss", text: "Get to work.", roomname: "lobby"}];

var add = function(message) {
  messages.unshift(message);
};

var get = function() {
  return messages;
};

exports.add = add;
exports.get = get;