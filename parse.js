var jsdom = require("jsdom"),
    fs = require("fs");

var jquery = fs.readFileSync("../bower_components/jquery/dist/jquery.js", "utf-8");

var html = fs.readFileSync("./async.docset/Contents/Resources/Documents/index.html", "utf-8");

(function doIt(html) {
    jsdom.env(
        html, ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if (errors) {
                console.log(errors);
            }
            var $ = window.$;
						

						var basePath = 'index.html';
            // Collections
						//
            console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"Collections\", \"Category\", \""+basePath + "#collections" +"\");");
						console.log("-- Functions of Collections");
            var collectionsList = $("#collections").next().children("li");
            $(collectionsList).each(function (index) {
                var $this = $(this);
                var name = $this.text();
                var path = basePath + $this.children("a").attr("href");
                console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"" + name + "\", \"Function\", \"" + path + "\");");
            });

            console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"Control-flow\", \"Category\", \""+basePath + "#control-flow" +"\");");
            // Control Flow
            console.log("-- Functions of Control Flow");
            var controlFlowList = $("#control-flow").next().children("li");
            $(controlFlowList).each(function (index) {
                var $this = $(this);
                var name = $this.text();
                var path = 'index.html' + $this.children("a").attr("href");
                console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"" + name + "\", \"Function\", \"" + path + "\");");
            });

            console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"Utils\", \"Category\", \""+basePath + "#utils" +"\");");
            // Utils
            console.log("-- Functions of Utils");
            var controlFlowList = $("#utils").next().children("li");
            $(controlFlowList).each(function (index) {
                var $this = $(this);
                var name = $this.text();
                var path = 'index.html' + $this.children("a").attr("href");
                console.log("INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES (\"" + name + "\", \"Function\", \"" + path + "\");");
            });

        }
    );
})(html);
