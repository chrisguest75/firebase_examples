# Firebase Authentication

Demonstrate how to create a simple firebase authentication application

## Reason

Firebase is a quick way of providing authentication to an application.  

TODO:

* Get user image
* Serve up the frontend build folder from backend docker.

## Create

Follow CLI installation instructions [../README.md](../README.md)  

```sh
cd ./frontend
npx create-react-app frontend
npm install firebase


cd ./frontend
npm run start

# create a firebase project
firebase projects:create cg-02-auth-001 

firebase apps:create --project cg-02-auth-001 WEB cg-02-auth-001-app


firebase apps:sdkconfig WEB 1:xxxxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxx 



Add google authentication - cg-02-auth-001

Add firebase-config.js

Add login handler

```


## Resources

* https://blog.devgenius.io/firebase-authentication-with-custom-node-js-express-backend-2ae9c04571b5

https://github.com/firebase/firebase-tools

https://firebase.google.com/docs/auth/web/google-signin

https://medium.com/@paulbreslin/is-it-safe-to-expose-your-firebase-api-key-to-the-public-7e5bd01e637b

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository

https://javascript.plainenglish.io/how-you-can-serve-react-js-build-folder-from-an-express-end-point-127e236e4d67

