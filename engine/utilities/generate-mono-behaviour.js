// (A) LOAD FILE SYSTEM MODULE
// https://nodejs.org/api/fs.html
import fs from 'fs';
import readline from 'readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Question Prompts
let prompt = (query) => new Promise((resolve) => {
    rl.question(query, resolve);
});

let scriptInfo = await (async () => {
    let name = await prompt("Enter name for script: ");
    let scriptLocation = await prompt('Enter directory location: ./');
    rl.close();
    return { name: name, scriptLocation: scriptLocation };
})();


let matches = scriptInfo.name.match(/[a-zA-Z]+/g);
let className = (() => {
    matches.forEach((match, index) => {
        let firstLetter = match.substring(0, 1).toUpperCase();
        let remainingLetters = match.slice(1);
        matches[index] = firstLetter + remainingLetters;
    });
    return matches.join('');
})();

// Used to find out how many directories deep the script is going.
matches = scriptInfo.scriptLocation.match(/[/]/g);

let engineScriptsPath = '../'.repeat(matches != null ? matches.length : 0);
let monoBehaviourTemplate =
`
import { MonoBehaviour, Input, KeyCode } from "${engineScriptsPath}engine/qbcreates-js-engine.js";

export default class ${className} extends MonoBehaviour{

    awake() {
    }

    start() {
    }

    update() {
    }
}`

// (B) WRITE TO FILE
fs.writeFile(`./${scriptInfo.scriptLocation}/${scriptInfo.name}.js`, monoBehaviourTemplate, "utf8", (error, data) => {
    console.log("Write complete");
});