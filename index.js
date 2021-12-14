const core = require("@actions/core");
const unirest = require("unirest");
const editJsonFile = require("edit-json-file");

try {
  const rapidApiUrl =
    "https://openapi-provisioning.p.rapidapi.com/v1/apis/" +
    core.getInput("rapidapi-api-id");
  const serverDefaultUrl = core.getInput("default-server-url");
  const fileName = core.getInput("openapi-file");

  if (serverDefaultUrl != "") {
    let file = editJsonFile(fileName);
    file.append("servers", { url: serverDefaultUrl });
    file.save();
    console.log("Updating servers to " + fileName);
    console.log(file.toObject());
  }

  unirest
    .put(rapidApiUrl)
    .header("X-RapidAPI-Key", core.getInput("rapidapi-api-key"))
    .header({ "Content-Type": "multipart/form-data" })
    .attach("file", fileName)
    .end(function (result) {
      if (result.error) {
        core.setFailed(error.message);
      }
      console.log(result.status, result.headers, result.body);
    });
} catch (error) {
  core.setFailed(error.message);
}
