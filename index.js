#!/user/bin/env node
'use strict';

const program = require('commander');
var path = require('path');
var fs = require('fs')
var urlencode = require('urlencode');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

program
    .version(require('./package.json').version)
    .option('-f, --filename [filename]', 'html file name.', './index.html')
    .option('-t, --title [string]', 'write html title.', 'title')
    .option('-u, --urlencode [string]', 'encode. utf8,gbk', 'no_encode')
    .parse(process.argv);

// 转换路径
var cuffilename = path.resolve(program.filename);

// 标识是否检查参数
var isCheckParam = true;
if ((fs.existsSync(cuffilename) === false) && (program.create === false)) {
    console.log("file not exists! [" + cuffilename + "]");
    isCheckParam = false;
}

if (isCheckParam === true) {
    var htmlSource = fs.readFileSync(cuffilename, "utf8");
    const dom = new JSDOM(htmlSource);
    // console.log(dom.window.document.head.querySelector("title").textContent);
    var cur_encode = 'utf8';
    if (program.urlencode) {
        cur_encode = program.urlencode;
        if ("no_encode" === cur_encode) {
            cur_encode = "";
        }
    }
    if (cur_encode === "") {
        dom.window.document.head.querySelector("title").textContent = program.title;
    } else {
        dom.window.document.head.querySelector("title").textContent = urlencode(program.title, cur_encode);
    }

    // console.log("dom.serialize():" + dom.serialize());
    fs.writeFileSync(cuffilename, dom.serialize());
}