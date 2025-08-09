# get-swagger.hurl
GET {{ API_URL }}/docs/
Accept: text/html

[Options]
output: ./out/swagger.json

HTTP 200


[Asserts]
header "Content-Type" == "text/html; charset=utf-8"

