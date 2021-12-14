const core = require("@actions/core");
const unirest = require("unirest");
const fs = require("fs");

try {
  const API_URL =
    "https://openapi-provisioning.p.rapidapi.com/v1/apis/" +
    core.getInput("rapidapi-api-id");
  const fileName = core.getInput("openapi-file");

  if (core.getInput("default-server-url") != "") {
    const file = require("./" + fileName);
    file.servers = {
      url: core.getInput("default-server-url"),
    };
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("Updating servers to " + fileName);
    });
  }

  unirest
    .put(API_URL)
    .header("X-RapidAPI-Key", core.getInput("rapidapi-api-key"))
    .header({ "Content-Type": "multipart/form-data" })
    .attach("file", fileName)
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });
} catch (error) {
  core.setFailed(error.message);
}
