const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it ("constructor sets position and default values for mode and generatorWatts", function() {
    let roverCons=new Rover(300)
    let roverConsVal=[roverCons.position, roverCons.mode, roverCons.generatorWatts];
    expect(roverConsVal).toEqual([300, "NORMAL", 110]);
  });
  it ("response returned by receiveMessage contains name of message", function() {
    let testMessage=new Message("Jupiter");  
    let roverCons=new Rover(300);
    let testMessageVal=roverCons.receiveMessage(testMessage).message;
    expect(testMessageVal).toEqual("Jupiter");
  });
  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testMessage=new Message("Jupiter")
    let roverCons=new Rover(300)
    let roverConsVal=[roverCons.position, roverCons.mode, roverCons.generatorWatts];
    let testMessageVal=roverCons.receiveMessage(testMessage).message;
    expect(roverConsVal, testMessageVal).toEqual([300, "NORMAL", 110], "Jupiter");
  });
  it ("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}}]);
  });
  it ("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}]);
    expect(rover.mode).toEqual('LOW_POWER');
  });
  it ("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 45678)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual(
      [
        {completed: true},
        {
          completed: false, 
          roverStatus: {mode: 'LOW_POWER', generatorWatts: 110, position: 87382098}
        }
      ]
        
        );    
  });
  it ("responds with position for move command", function() {
     let commands = [new Command('MOVE', 45678)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 45678}}])

  });
});

/*
it ("", function() {

  });
*/

// describe("Message class", function() {

//   it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
//     expect( function() { new Message();}).toThrow(new Error('Message name required.'));
//   });

//   it("constructor sets name", function() {
//     let message = new Message('New message!');
//     expect(message.name).toEqual('New message!');
//   });

//   it("contains a commands array passed into the constructor as 2nd argument", function() {
//     let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
//     let message = new Message('Another message!', commands);
//     expect(message.commands).toEqual(commands);
//   });

// });