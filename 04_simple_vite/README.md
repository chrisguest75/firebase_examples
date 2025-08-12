# SIMPLE VITE

TODO:

* Deploy the frontend to firebase.
* Ensure the backend is deployed to cloud run and the /api/count proxy works.
* Add authentication.
* Use firestore for keeping counter

NOTES:

* Hosts a simple backend and interacts with the frontend via API calls.

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

just install
```

## Frontend

Goto the [frontend](./frontend/README.md) directory for more information.

## Backend

Goto the [backend](./backend/README.md) directory for more information.

## Resources

* https://cloud.google.com/functions/pricing-overview
* https://cloud.google.com/functions/pricing-1stgen