// module-test

var app = require("./app");
var request = require('supertest');
var server = request(app.listen());
var expect = require("chai").expect;

describe("对各种数据格式的解析", () => {

	it("解析multipart/form-data", (done) => {
		(async () => {
			let { body } = await server.post("/test")
				.set('Content-Type', 'multipart/form-data')
                .field("test", "1")
                .field("msg", "2");
            expect(body).to.include.keys("test", "msg");
			done();
		})();
	});

	it("解析application/json", (done) => {
		(async () => {
			let { body } = await server.post("/test")
				.set("Content-Type", "application/json")
				.send({
					"post_test": "1"
				});
			expect(body).to.include.keys("post_test");
			done();
		})();
	});

	it("解析application/x-www-form-urlencoded", (done) => {
		(async () => {
			let { body } = await server.get("/test")
				.set("Content-Type", "application/x-www-form-urlencoded")
				.send({
					"get_test": "1"
				});
			expect(body).to.include.keys("get_test");
			done();
		})();
	});

	it("解析url后面带参数", (done) => {
		(async () => {
			let { body } = await server.get("/test?url_test=1");
			expect(body).to.include.keys("url_test");
			done();
		})();
	});

});







