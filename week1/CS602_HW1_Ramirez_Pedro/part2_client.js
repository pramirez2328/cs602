import net from 'node:net';
import readline from 'node:readline';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var readMessage = function(client) {
	rl.question("Enter Command: ", function (line){
			client.write(line);
			if (line == "bye")
				client.end();
			else {
				setTimeout(function() {
					readMessage(client);
				}, 2000);
			};
	});
};

var client = net.connect({port:3000},
	function(){
		console.log("Connected to server");
		readMessage(client);
	});

client.on('end', function(){
	console.log("Client disconnected...");
	process.exit(0);
});

client.on('data', function(data){
	console.log("...Received", 
    		data.toString());
});





















	