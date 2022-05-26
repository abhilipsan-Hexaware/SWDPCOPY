const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const SSH = require('simple-ssh');
global.templatepath;

function main(){

	createTemplate();
}

main();

function createTemplate(){
	const axios = require('axios');
	let result;
	var url = 'http://rapidxcodegenerator-dev.centralus.cloudapp.azure.com:8080/project/create';
	axios.post(url, JSON.parse('{"project": "MongoTemplate","database": "mongodb"}'), {
	  
	}).then(response => {
	  result = response.data;
	  ssh(result);
	}).catch(exception => {
	  throw exception;
	})	
}

// function to ssh into a remote host.
function ssh(result){
	console.log('inside the system')
	
	var ssh_options = new SSH({
	    host: '52.173.9.41',
	    user: 'rapidxuser',
	    pass: 'Hexaware@2022',
		baseDir: result.path
	});
    
	ssh_options.exec('git init', {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	})
	.exec('git remote add origin https://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@github.com/ChristyLeela/RapidX.git', {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	})
	.exec('git add .', {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	})
	.exec(`git commit -m 'template pushed'`, {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	})
	.exec('git push -u origin master', {
	    out: function(stdout) {
	        console.log(stdout);
	    }
	})
	.exec(`rm -rf ${ssh_options.baseDir}`, {
	    out: function(stdout) {
			console.log(stdout);
			    }
	}).start();


	// ssh_options.exec('ls -l', {
	//     out: function(stdout) {
	//         console.log(stdout);
	//     }
	// }).start();

	// .exec('ls -l', {
	//     out: function(stdout) {
	//         console.log(stdout);
	//     }
	// })
	// .exec('git clone https://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@github.com/HexaInnovLab/Tensai.git', {
	// 	    out: function(stdout) {
	// 			console.log(stdout);
	// 		}
	// 	})
	// .exec('ls -l', {
	//     out: function(stdout) {
	//         console.log(stdout);
	// 		ssh_options.baseDir='/home/rapidouser/rapidotemplate/Tensai';
	// console.log(ssh_options.baseDir);
	//     }
	// })
	// .exec('git remote set-url origin https://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@github.com/ChristyLeela/Rapido.git', {
	//     out: function(stdout1) {
	//         console.log('seturl'+stdout1);
	//     }
	// })
	// .exec('git remote -v', {
	// 	    out: function(stdout2) {
	// 	        console.log('check url'+stdout2);
	// 	    }
	// 	})
	
	ssh_options.on('error', function(err) {
		console.log('Oops, something went wrong.');
		console.log(err);
		ssh_options.end();
	});
	
	}

