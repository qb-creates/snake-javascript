let Fs = require('fs');
let Path = require('path');
let JavaScriptObfuscator = require('javascript-obfuscator');
let srcDirectory = Path.join(__dirname, './');
let buildDir = Path.join(__dirname, '/build/qbcreates/');

Fs.rm(buildDir, { recursive: true, force: true }, (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    Fs.mkdirSync(buildDir, { recursive: true }); // Create new directory.
    readDirectory(srcDirectory);
    Fs.copyFileSync(__dirname + "/index.html", Path.join(buildDir, '/index.html'));
});

function readDirectory(dirPath) {
    Fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Could not list directory.", err);
            process.exit(1);
        }

        files.forEach((file, index) => // loop through every file
        {
            let path = Path.join(dirPath, file);

            Fs.stat(path, (err, stat) => {
                if (err) {
                    console.log("error in stating file.", err);
                    return;
                }

                if (stat.isFile() && path.includes('src')) {
                    const newPath = path.replace(srcDirectory, buildDir); // Replace src path with build path.
                    Fs.copyFileSync(path, newPath); // Copy file from old path in src to new path in build.
                    if (newPath.endsWith(".js")) // Check if it is javascript file.
                    {
                        obfuscate(newPath); // Obfuscate copied file in build folder.
                    }
                }
                else if (stat.isDirectory() && path.includes('src')) {
                    var newDir = path.replace(srcDirectory, buildDir); // Replace src path with build path.
                    if (!Fs.existsSync(newDir)) // Check if directory exists or not.
                    {
                        Fs.mkdirSync(newDir); // Create new directory.
                    }
                    readDirectory(path); // Further read the folder.
                }
            });
        });
    });
}

function obfuscate(filePath) {
    let content = Fs.readFileSync(filePath).toString(); // Read the files content.

    let obfuscateOptions = {
        compact: true,
        controlFlowFlattening: true,
        target: 'browser'
    }
    let result = JavaScriptObfuscator.obfuscate(content, obfuscateOptions); // Generated minified and obfuscated code

    Fs.writeFileSync(filePath, result.getObfuscatedCode()); // Write obfuscted and minified code generated back to file.
}