"use strict";
const createRouter = require("@arangodb/foxx/router");
const db = require("@arangodb").db;
const errors = require("@arangodb").errors;
const aql = require("@arangodb").aql;

const router = createRouter();

module.context.use(router);
// continued

router
	.get("/import/accounts/:search", function (req, res) {
		const search = req.pathParams.search;

		const users = db._query(aql`
            FOR user IN usersAlias
                SEARCH user.displayName IN TOKENS(${search}, "text_ru")
                SORT user.displayName
                RETURN DISTINCT {
                    id: user.publicId || user.id,
                    name: user.displayName,
                    link: CONCAT("https://yandex.ru/q/profile/", user.publicId)
                }
        `);

		res.send(users);
	})
	.response(["application/json"], "Accounts list")
	.summary("List of accounts ready to import")
	.description("Prints JSON with user accounts from q");

router
	.get("/import/accounts/", function (req, res) {
		const users = db._query(aql`
            FOR user IN usersAlias
                SORT user.displayName
                RETURN DISTINCT {
                    id: user.publicId || user.id,
                    name: user.displayName,
                    link: CONCAT("https://yandex.ru/q/profile/", user.publicId)
                }
        `);

		res.send(users);
	})
	.response(["application/json"], "Accounts list")
	.summary("List of accounts ready to import")
	.description("Prints JSON with user accounts from q");
