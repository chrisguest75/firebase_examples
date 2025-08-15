
variable "IMAGE_NAME" {
  default = "simple-vite"
}
variable "IMAGE_TAG" {
  default = "latest"
}
variable "IMAGE_COMMIT_ID" {
  default = "UNKNOWN"
}
variable "IMAGE_BUILD_TIME" {
  default = "UNKNOWN"
}
variable "API_BASE_URL" {
  default = ""
}

#***********************************************
# Simple Vite images
#***********************************************

target "image-amd64" {
  args = {
    VERSION = "0.0.0+unknown"
    COMMIT_ID = "${IMAGE_COMMIT_ID}"
    BUILD_TIME = "${IMAGE_BUILD_TIME}"    
    API_BASE_URL = "${API_BASE_URL}"    
  }
  context = "."
  platforms = ["linux/amd64"]
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_NAME}_amd64:${IMAGE_TAG}"]
  output = ["type=docker"]
}

target "image-arm64" {
  args = {
    VERSION = "0.0.0+unknown"
    COMMIT_ID = "${IMAGE_COMMIT_ID}"
    BUILD_TIME = "${IMAGE_BUILD_TIME}"
    API_BASE_URL = "${API_BASE_URL}"           
  }
  context = "."
  platforms = ["linux/arm64"]
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_NAME}_arm64:${IMAGE_TAG}"]
  output = ["type=docker"]
}

target "push-cloudrun-image-amd64" {
  args = {
    VERSION = "0.0.0+unknown"
    COMMIT_ID = "${IMAGE_COMMIT_ID}"
    BUILD_TIME = "${IMAGE_BUILD_TIME}"
    API_BASE_URL = "${API_BASE_URL}"         
  }
  context = "."
  platforms = ["linux/amd64"]
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_TAG}"]
  output = ["type=docker"]
}

group "default" {
  targets = [
    "image-arm64",
    "image-amd64",
    ]
}