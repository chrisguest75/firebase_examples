# put-count.hurl
PUT {{ API_URL }}/api/count
Accept: application/json
Content-Type: application/json
Origin: {{ FRONTEND_URL }}

[Options]
output: ./out/post-count.json

{
  "value": 3
}

HTTP 200

[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.count" exists
jsonpath "$.count" == 3
