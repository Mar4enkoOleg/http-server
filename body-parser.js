module.exports = function (req) {
  const chunks = [];
  let parsedData;

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    parsedData = Buffer.concat(chunks);
  });
  return parsedData;
};
