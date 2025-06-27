# README

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org) [![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)  

A repository containing some simple Firebase examples.  

## Conventional Commits

NOTE: This repo has switched to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0). It requires `pre-commit` and `commitizen` to help with controlling this.  

```sh
# install pre-commmit (prerequisite for commitizen)
brew install pre-commit
brew install commitizen
# conventional commits extension
code --install-extension vivaxy.vscode-conventional-commits

# install hooks
pre-commit install --hook-type commit-msg --hook-type pre-push
```

## Prerequisites

NOTE: Firebase CLI v11.0.1 is incompatible with Node.js v14.16.0 Please upgrade Node.js to version >= 14.18.0

```sh
brew info firebase-cli

curl -sL https://firebase.tools | bash

# get the version of the firebase cli tool
nvm use
firebase --version  
```

## 01 - static website

Demonstrates a simple static website on `firebase`  
[README.md](./01_static_website/README.md)  

## Resources

* Firebase channel [here](https://www.youtube.com/firebase)  
* Firebase console [here](https://firebase.google.com/)
* What’s the relationship between Firebase and Google Cloud? [here](https://medium.com/google-developers/whats-the-relationship-between-firebase-and-google-cloud-57e268a7ff6f)

