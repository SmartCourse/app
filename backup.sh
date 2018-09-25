#!/bin/bash -e

type=staging
storage_account=smartcoursebackups
container_name=db-backups
blob_name=b1
access_key="$STORAGE_KEY"
file=smartcourse.db
file_len=`cat $file | wc -c`

blob_store_url="blob.core.windows.net"
authorization="SharedKey"

request_method="PUT"
request_date=$(TZ=GMT date "+%a, %d %h %Y %H:%M:%S %Z")
storage_service_version="2018-03-28"

# HTTP Request headers
x_ms_date_h="x-ms-date:$request_date"
x_ms_version_h="x-ms-version:$storage_service_version"
#x_ms_blob_content_h="x-ms-blob-content-disposition:attachment; filename=$file"
x_ms_blob_h="x-ms-blob-type:BlockBlob"

# Build the signature string
canonicalized_headers="${x_ms_blob_h}\n${x_ms_date_h}\n${x_ms_version_h}"
canonicalized_resource="/${storage_account}/${container_name}/${blob_name}"

string_to_sign="${request_method}\n\n\n$file_len\n\ntext/plain; charset=UTF-8\n\n\n\n\n\n\n${canonicalized_headers}\n${canonicalized_resource}"

# Decode the Base64 encoded access key, convert to Hex.
decoded_hex_key="$(echo -n $access_key | base64 -d -w0 | xxd -p -c256)"

# Create the HMAC signature for the Authorization header
signature=$(printf "$string_to_sign" | openssl dgst -sha256 -mac HMAC -macopt "hexkey:$decoded_hex_key" -binary |  base64 -w0)

authorization_header="Authorization: $authorization $storage_account:$signature"

cmd="curl -X PUT -T \"./$file\" -H \"$x_ms_blob_h\" -H \"$x_ms_date_h\" -H \"Content-Type: text/plain; charset=UTF-8\" -H \"$x_ms_version_h\" -H \"$authorization_header\" -H 'User-Agent:' -H 'Accept:' -H \"Content-Length: $file_len\" -d @$file \"https://${storage_account}.${blob_store_url}/${container_name}/${blob_name}\""

echo $cmd

read -d '' TMP_CMDS << EOF || true
{
    "command": "$cmd",
    "dir": "site/wwwroot"
}

EOF
curl -u $AZURE_USER:$AZURE_PASS \
    --header "Content-Type: application/json" \
    --request POST \
    --data "$TMP_CMDS" \
    https://smartcourse-$type.scm.azurewebsites.net/api/command
