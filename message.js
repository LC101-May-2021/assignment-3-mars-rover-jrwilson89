class Message {
   // Write code here!
   constructor(name, commands) {
     this.name=name;
     if (!name) {
       throw Error("Message name required.");
     }
     this.commands=commands     
   }
}

//let message = new Message("homer", "move")

module.exports = Message;

// class Command {
//    constructor(commandType, value) {
//      this.commandType = commandType;
//      if (!commandType) {
//        throw Error("Command type required.");
//      }
//      this.value = value;
//    }
 
//  }
 
//  module.exports = Command;

/*
 it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Message name required.'));
  });

  it("constructor sets name", function() {
    let message = new Message('New message!');
    expect(message.name).toEqual('New message!');
  });

  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    expect(message.commands).toEqual(commands);
*/