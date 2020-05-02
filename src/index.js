// import our exported modules
var server = require("./server");
var router = require("./router");
var start = require("./requestHandlers/start");
var insert = require("./requestHandlers/insert");
var view = require("./requestHandlers/view");
var upload = require("./requestHandlers/upload");
var showRoom = require("./requestHandlers/showRoom");
var styles = require("./requestHandlers/styles");

// create ‘handle’ object literal
var handle = {};
// using the associative array notation, each array index is an
// object property which points to an appropriate request handler

handle["/css/styles.css"] = styles.reqCss;
handle["/"] = start.reqStart;
handle["/start"] = start.reqStart;
handle["/check"] = start.reqCheck;

handle["/insert"] = insert.reqInsert;
handle["/import"] = insert.reqImport;

handle["/view"] = view.reqView;
handle["/date"] = view.reqDate;
handle["/display"] = view.reqDisplay;

handle["/upload"] = upload.reqUpload;
handle["/show"] = upload.reqShow;
handle["/dispImage"] = upload.dispImage;

handle["/showRoom"] = showRoom.reqShowRoom;

// ***JSON format***
// handle = {
//     "/" : requestHandlers.reqStart,
//     "/start" : requestHandlers.reqStart,
//     "/upload" : requestHandlers.reqUpload,
//     ""
// };

server.startServer(router.route, handle)