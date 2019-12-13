"use strict"

var path = require('path');
var fs = require('fs');

class LogGrabber {

    constructor(path) {
        this.path = path;
        this.recFindByExt.bind(this);
    }

    grabLogs(){
        return this.recFindByExt(this.path);
    }

    recFindByExt(base, files, result) {
        let ext = 'log';

        files = files || fs.readdirSync(base);
        result = result || [];


        files.forEach(
            function (file) {
                var newbase = path.join(base,file);
                if (fs.statSync(newbase).isDirectory()) {
                    result = this.recFindByExt(newbase, fs.readdirSync(newbase), result)
                } else {
                    if ( file.substr(-1*(ext.length+1)) == '.' + ext ) {
                        result.push(newbase);
                    }
                }
            }, this
        );
        console.log(result);
        return result;
    }
}


module.exports = LogGrabber;
