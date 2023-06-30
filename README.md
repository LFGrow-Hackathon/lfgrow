

![image](https://github.com/LFGrow-Hackathon/lfgrow/assets/33808300/ac8578f6-1790-4b58-a0c6-5c9bfcde704f)

https://ethglobal.com/events/lfgrow/home


## Introduction

This project is built using react, tailwindcss and Moralis ([documentation](https://docs.moralis.io/introduction/readme)) for our backend. 
We are also heavily using the built-in Moralis React SDK, here is the [documentation](https://github.com/MoralisWeb3/react-moralis).

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/LFGrow-Hackathon/lfgrow.git
cd lfgrow
yarn install
```

You will need to setup your .env file for your Moralis server key. 
They can be found in "View Details" on the Moralis server page. 

Add this to your .env file:
```sh
REACT_APP_MORALIS_SERVER_URL=""
REACT_APP_MORALIS_APPLICATION_ID=""
ALCHEMY_APIKEY=""
```

You're then ready to launch the app on localhost

```sh
yarn dev
```
