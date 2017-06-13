/// <reference path="../src/global.d.ts" />

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import * as $ from 'jquery'

const doc = new JSDOM('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
const globalAny: any = global;

global.document = doc;
global.window = win;
global.$ = $;
