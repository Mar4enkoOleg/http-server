const fs = require("fs");
const notFoundHandler = require("./not-found.handler");
const { STATUS_CODES } = require("http");
const cookieParser = require("./cookie-parser");

module.exports = function (req, res) {
  switch (req.method) {
    case "GET":
      const readedData = fs.readFileSync("data.json");

      const cookies = cookieParser(req);
      console.log("Cookies: " + cookies);

      res.writeHead(200);
      res.end(readedData);
      break;

    case "POST":
      const chunks = [];
      let newData = JSON.parse(fs.readFileSync("data.json"));

      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        const parsedData = Buffer.concat(chunks);
        newData.elements.push(JSON.parse(parsedData));
        fs.writeFileSync("data.json", JSON.stringify(newData));
      });

      res.writeHead(201, { "Set-Cookie": `test=123` });
      res.end(JSON.stringify({ status: STATUS_CODES[201] }));
      break;

    case "DELETE":
      fs.writeFileSync(
        "data.json",
        JSON.stringify({
          elements: [],
        })
      );

      res.writeHead(204);
      res.end(JSON.stringify({ status: STATUS_CODES[204] }));
      break;

    default:
      notFoundHandler(res);
      break;
  }
};
