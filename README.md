## Descripption:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project visualize AWS current running infrastructure. 
Severless architect model is applied in this project by using Aws Amplify framework(Backend as a service) 
https://docs.amplify.aws/cli/teams/overview#setting-up-prod-and-dev-environments


## Build steps:
### 1. Install aws cli

### 2. Run aws configure

### 3. Install nodejs, yarn, aws-amplify

### 4. Build backend: 
$amplify add env  (env-name)
$amplify push

$amplify env checkout (env-name)
$amplify env pull

### 5. Build and run frontend on local:
$yarn install
$yarn start

### 6. Publish front to cloud:
$amplify publish

### 7. Go to Aws Cognito User Pool console to create login user:



## Clean env:
amplify env remove <env name>


## Git push:
git remote add origin2 https://github.com/tranvietphu/infra-visual-amplify.git
git push -u origin2 master