"use strict";
const createRouter = require("@arangodb/foxx/router");
const router = createRouter();

module.context.use(router);
// continued
router
	.get("/hello-world", function (req, res) {
		res.send("Hello World!");
	})
	.response(["text/plain"], "A generic greeting.")
	.summary("Generic greeting")
	.description("Prints a generic greeting.");
