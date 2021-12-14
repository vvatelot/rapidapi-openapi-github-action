const core = require("@actions/core");
const unirest = require("unirest");

const API_URL =
  "https://openapi-provisioning.p.rapidapi.com/v1/apis/" +
  core.getInput("rapidapi-api-id");

if (core.getInput("default-server-url") != "") {
  // Update file with default server
  // Multiple servers ?
}

unirest
  .put(API_URL)
  .header("X-RapidAPI-Key", core.getInput("rapidapi-api-key"))
  .header({ "Content-Type": "multipart/form-data" })
  .attach("file", core.getInput("openapi-file"))
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });
