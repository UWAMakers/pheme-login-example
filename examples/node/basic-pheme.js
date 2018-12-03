const inquirer = require('inquirer');
const request = require('request-promise-native');
//read in the .env file to use as env variables https://github.com/motdotla/dotenv
require('dotenv').config();

const loginRequest = (user, pass, token) => {
    if(!token) token = process.env.API_TOKEN;
    
    const options = {
        method: 'POST',
        uri: 'https://auth.uwamakers.com/api/login',
        body: {
            user: user,
            pass: pass,
            token: token
        },
        json: true,
    };

    return request(options);
};

const askForLogin = async ()=>{

    // send a prompt to the console, asking for their login details
    const promptSchema = [
        {
            name: 'user',
            type: 'string',
            message: 'What is your UWA Pheme number?',
            validate: (v)=> /^\d{8}$/.test(v) ? true : 'Invalid number, should be 8 digits long',
        },
        {
            name: 'pass',
            type: 'password',
            message: 'What is your UWA Pheme password?',
        },
        {
            name: 'token',
            type: 'password',
            message: 'What is your API Token? (process.env.API_TOKEN)',
        },
    ];

    let {user, pass, token} = await inquirer.prompt(promptSchema);

    //send the details and get the result
    const result = await loginRequest(user, pass, token);

    if(result.success === false) {
        console.error(`There was a problem logging you in: ${result.message}`);
        askForLogin();
    } else {
        console.log(`Welcome ${result.user.fullname}!`);
        console.log('The following are the details we found:');
        for(let i in result.user) console.log(`  ${i}: "${result.user[i]}"`);
    }
};

askForLogin();
