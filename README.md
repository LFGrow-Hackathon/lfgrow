## Introduction

This project is built using react, tailwindcss and Moralis ([documentation](https://docs.moralis.io/introduction/readme)) for our backend. 
We are also heavily using the built-in Moralis React SDK, here is the [documentation](https://github.com/MoralisWeb3/react-moralis).

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Zilly-social/Zilly.git
cd Zilly
yarn install
```

You will need to setup your .env file for your Moralis server key. 
They can be found in "View Details" on the Moralis server page. 

```sh
touch .env 

VITE_REACT_APP_MORALIS_SERVER_URL=""
VITE_REACT_APP_MORALIS_APPLICATION_ID=""
```

You're then ready to launch the app on localhost

```sh
yarn start
```
