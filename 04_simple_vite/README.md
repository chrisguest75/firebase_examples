# SIMPLE VITE

TODO:

* Add authentication.
* Use firestore for keeping counter

NOTES:

* Hosts a simple backend and interacts with the frontend via API calls.
* Adds a commitId and buildTime
* Can deploy to firebase channels
* The backend supports CORS.
* Use firebase hosting or cloudrun

## Configure

```sh
gcloud auth login

# docker login
gcloud auth configure-docker europe-west2-docker.pkg.dev

# copy and fill out
cp .env.template .env
```

## Install

```sh
nvm use

# deploy into a channel
just deploy-firebase my-channel
```

## Frontend

Goto the [frontend](./frontend/README.md) directory for more information.

## Backend

Goto the [backend](./backend/README.md) directory for more information.

## Testing

```sh
# fill in the .env files
API_BASE_URL="https://xxxx.europe-west2.run.app"
FRONTEND_URL="https://xxxx.europe-west2.run.app"

# deploy using cloudrun
just deploy

cd backend/tests/hurl

just get-ping production
just get-count production
just get-count-cors-fail production
```

## Resources

* https://cloud.google.com/functions/pricing-overview
* https://cloud.google.com/functions/pricing-1stgen
* https://vite.dev/guide/env-and-mode
* https://datatracker.ietf.org/doc/html/rfc9110
* https://tsoa-community.github.io/reference/index.html
* The firebase.json file [here](https://firebase.google.com/docs/cli#the_firebasejson_file)