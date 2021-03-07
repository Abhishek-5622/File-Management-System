// Requires 
let fs = require("fs");
let path = require("path");

//View function
function view(dirname, mode) {
    if (mode == "tree") {
        viewTree(dirname, "");
        console.log("Tree view implemented");
    } else if (mode == "flat") {
        viewFlat(path);
        console.log("flat view implemented");
    } else {
        console.log("Wrong mode");
    }
}

//Is file or directory
function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}
//Directory contain other files or not
function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}

//Tree view 
function viewTree(dirpath, indent) {
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(indent + path.basename(dirpath) + "*");
    } else {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);
            viewTree(childPath, indent + "\t");
        }
    }

}

//Flat view
function viewFlat(dirpath, toPrint) {
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            let childPath = path.join(dirpath, content[i]);

            viewFlat(childPath, toPrint + "\\" + content[i]);
        }
    }

}
//Export function
module.exports = {
    viewfn: view
}