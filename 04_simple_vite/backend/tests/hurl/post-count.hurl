# post-count.hurl
POST {{ API_URL }}/api/count
Accept: application/json
Content-Type: application/json

[Options]
output: ./out/post-count.json

{
  "increment": 1
}

HTTP 200

[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.count" exists

