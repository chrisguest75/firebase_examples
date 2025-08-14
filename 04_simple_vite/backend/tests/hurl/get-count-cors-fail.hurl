# get-count.hurl
GET {{ API_URL }}/api/count
Accept: application/json
Content-Type: application/json
Origin: https://evil.example

[Options]
output: ./out/get-count-cors.json

HTTP 200

[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
header "Access-Control-Allow-Origin" not exists
jsonpath "$" isCollection
