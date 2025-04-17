# lancedium

**lancedium** is a freelance service platform for freelancers and clients alike, built with Web3, ICP and Motoko. It aims to provide a decentralized, secure and transparent transactions system, ensuring integrity and high-quality service for the users.

## 🛠️ Initial Project Setup

These instructions are with the assumption that development/setup is being done in a local Windows machine, and the project is being setup for the first time.

**If this has been done before, skip to _Running Local Project Deployment_**

### Installing dfx

1. First, install WSL by simply running this command in an **administrator** mode Command Prompt or Powershell:

```
wsl --install
```

The official guide is [here](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command).

2. Open a WSL terminal window (simply search 'WSL' in Windows Search), then install a Linux Distribution (e.g. Ubuntu), for example:

```
wsl --install -d ubuntu
```

3. Follow [this](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) guide in order to install Node.js within the WSL environment.

4. To confirm whether dfx was installed correctly, close and re-open the WSL terminal and run:

```
dfx --version
```

The output should be the version of the installed dfx.

### Create Developer Identity

Before actually cloning the project, first create a Developer Identity with dfx (if not done already):

```
dfx identity <name> --seed-phrase
dfx identity use <name>
```

Replace `<name>` with any name desired.

### Clone This Project

In Windows, choose a directory to clone to project into. Then, open a Command Prompt terminal in that directory and run the command `wsl`.

This will change the Command Prompt to become a WSL terminal that is currently pointing at the current directory.

Then, simply run this command to clone the project:

```
git clone https://github.com/torpadeka/lancedium.git
```

After cloning, run the following commands:

```
cd lancedium/
npm install
npm run resolvedeps
```

Provide the "passphrase" that was registered with the developer identity when prompted.

This will install required dependencies and initialize, pull and generate required canister files.

## 🖥️ Running Local Project Deployment

To deploy the canisters locally, simply run this command in a WSL terminal currently opened in the project's directory. If you continued from **_Initial Project Setup_**, you should still have this open.

If not, first open a Command Prompt terminal in the project's directory, and run the command `wsl`. This will convert the command prompt terminal to a WSL terminal but in the same directory.

Then, always run this command first:

```
dfx start --clean --background
```

**_This command must be done everytime the machine restarts!_**

After that, run the command:

```
npm run redeploy
```

Again, provide the correct "passphrase" from your developer identity when prompted.

This will deploy all specified canisters in `dfx.json`, including the frontend and the backend. If all goes well, links should be outputted, where they can be visited to access the frontend and the backend.

**However**, it is recommended to run the frontend separately outside the WSL environment, since WSL does not support HMR, and the deployed canisters obviously cannot adjust dynamically to development changes.

To do so, run a separate Command Prompt terminal in the project's directory, and directly run these commands:

```
npm install
npm run frontend
```

Even though the frontend canister is deployed, you can simply use the local frontend development link instead. It will react to live changes in the code, and can still fully functionally call upon the backend functions.

If the backend code is changed though, the canisters will need to be redeployed. In this case, simply run `npm run redeploy` again in a WSL terminal in the project's directory.
