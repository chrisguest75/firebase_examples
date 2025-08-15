# get-count.hurl
GET {{ API_URL }}/api/count
Accept: application/json
Content-Type: application/json
Origin: {{ FRONTEND_URL }}

[Options]
output: ./out/get-count.json

HTTP 200


[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
header "Access-Control-Allow-Origin" == {{ FRONTEND_URL }}
jsonpath "$" isCollection
jsonpath "$.count" exists
