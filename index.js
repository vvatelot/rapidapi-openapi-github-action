const core = require("@actions/core");
const editJsonFile = require("edit-json-file");
const FormData = require("form-data");
const fs = require("fs");
const fetch = require('node-fetch');


try {
  const rapidApiUrlHost = 'openapi-provisioning.p.rapidapi.com';
  const serverDefaultUrl = core.getInput("default_server_url");
  const fileName = core.getInput("openapi_file");
  const rapidapiApiKey = core.getInput("rapidapi_api_key");
  const rapidapiApiId = core.getInput("rapidapi_api_id");
  const rapidApiUrl = "https://" + rapidApiUrlHost + "/v1/apis/" + rapidapiApiId;

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
    headers: {
      'X-RapidAPI-Key': rapidapiApiKey,
      'X-RapidAPI-Host': rapidApiUrlHost,
      ...data.getHeaders()
    },
    body: data
  };

  fetch(rapidApiUrl, options)
    .then(() => {
      console.log("🎉 Open API Documentation successfuly updated to RapidAPI");
    })
    .catch((error) => {
      console.log("🚨 Error when uploading Open API documentation to RapidAPI:")
      core.setFailed(error);
    });
} catch (error) {
  console.log("🚨 Error when updating Open API documentation to RapidAPI:")
  core.setFailed(error);
}