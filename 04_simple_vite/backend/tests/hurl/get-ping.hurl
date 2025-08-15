# get-ping.hurl
GET {{ API_URL }}/api/ping
Accept: application/json
Content-Type: application/json
Origin: {{ FRONTEND_URL }}

[Options]
output: ./out/get-ping.json

HTTP 200


[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$" isCollection
jsonpath "$.message" == "pong"


