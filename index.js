const core = require("@actions/core");
const editJsonFile = require("edit-json-file");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

try {
  const rapidApiUrlHost = 'openapi-provisioning.p.rapidapi.com';
  const rapidApiUrl =
    "https://" + rapidApiUrlHost + "/v1/apis/" +
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

  const data = new FormData();
  data.append("file", fs.createReadStream(fileName));

  const options = {
    method: 'PUT',
    url: rapidApiUrl,
    headers: {
      'X-RapidAPI-Key': core.getInput("rapidapi-key"),
      'X-RapidAPI-Host': rapidApiUrlHost,
      ...data.getHeaders()
    },
    data: data
  };

  axios.request(options).then(function () {
    console.log("🎉 Open API Documentation updated to RapidAPI");
  }).catch(function (error) {
    console.log("🚨 Error when uploading Open API documentation to RapidAPI:")
    core.setFailed(error);
  })
} catch (error) {
  console.log("🚨 Error when updating Open API documentation to RapidAPI:")
  core.setFailed(error);
}