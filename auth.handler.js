const jwt = require("jsonwebtoken");
const notFoundHandler = require("./not-found.handler");
const { STATUS_CODES } = require("http");

module.exports = function (req, res) {
  if (req.method !== "POST") notFoundHandler(res);
  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const parsedData = Buffer.concat(chunks);

    if (JSON.parse(parsedData).password !== "1111") {
      res.writeHead(401);
      res.end(STATUS_CODES[401]);
    } else {
      const token = jwt.sign({ user: "iam" }, "secret");

      res.writeHead(200);
      res.end(token);
    }
  });
};
