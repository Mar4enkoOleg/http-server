const { createServer } = require("http");
const requestMessageHandler = require("./message.handler");
const authHandler = require("./auth.handler");
const notFoundHandler = require("./not-found.handler");
const jwt = require("jsonwebtoken");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  console.log(req.rawHeaders);

  const index = req.rawHeaders.indexOf("Authorization");
  const token = req.rawHeaders[index + 1];

  try {
    jwt.verify(token.slice(0, 7).toString(), "secret");
  } catch (error) {
    res.end(error.toString());
  }

  switch (req.url) {
    case "/messages":
      requestMessageHandler(req, res);
      break;

    case "/auth":
      authHandler(req, res);
      break;

    default:
      notFoundHandler(res);
      break;
  }
};
const server = createServer(requestListener);
server.listen(3000, () => {
  console.log("Started");
});
