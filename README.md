# RapidAPI auto update OpenAPI documentation

This action updates the OpenAPI documentation of an API that is hosted by RapidAPI using their [OpenAPI Provisioning API](https://rapidapi.com/rapidapi3-rapidapi-tools/api/openapi-provisioning/)

## Inputs

## `rapidapi-api-key`

**Optional** Your RapidAPI API Key.

## `rapidapi-api-id`

**Optional** Your RapidAPI API ID.

## `openapi-file`

**Optional** The OpenAPI file you want to upload. Default `"openapi.json"`.

## `default-server-url`

**Optional** You can provide a default server url. Default `""`.



## Example usage

```yml
name: Update OpenAPI RapidAPI documentation
on:
  schedule:
    # https://crontab.guru/every-night-at-midnight
    - cron: "0 0 * * *"

jobs:
  update-rapidapi-openapi:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: RapidAPI OpenAPI
      uses: vvatelot/rapidapi-openapi-github-action@v1.2.0
      with:
        rapidapi-api-key: ${{ secrets.RAPIDAPI_API_KEY }}
        rapidapi-api-id: ${{ secrets.RAPIDAPI_API_ID }}
        openapi-file: "my-openapi.json"
        default-url-server: "https://my.api.com:8001/"
```
