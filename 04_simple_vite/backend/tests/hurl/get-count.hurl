# get-count.hurl
GET {{ API_URL }}/api/count
Accept: application/json
Content-Type: application/json

[Options]
output: ./out/get-count.json

HTTP 200


[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$" isCollection
