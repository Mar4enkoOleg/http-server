module.exports = function (res) {
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
};
