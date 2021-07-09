class Rover {
   // Write code here!+
   constructor(position, mode='NORMAL', generatorWatts=110) {
     this.position=position;
     this.mode=mode;
     this.generatorWatts=generatorWatts;
   }   
   receiveMessage(message) {
          let roverMessage = {};
          let results=[];
     //roverMessage["message"]=message.name;
       if (message.commands) {
       for (let i=0; i<message.commands.length; i++) {
         const command=message.commands[i];
         if (command.commandType === 'STATUS_CHECK') {
           results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         }
         if (command.commandType === 'MODE_CHANGE') {
           this.mode=command.value
           results.push({completed: true})
         }
         if (command.commandType === 'MOVE') {
          //  this.mode=command.value
           if (this.mode === 'LOW_POWER') {
             results.push({completed: false, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
           } else {
             this.position=command.value
             results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})            
           }          
         }              
           
       }
     }
     return {message: message.name, results};
      // if (results==='MOVE')

         
   }
}

module.exports = Rover;