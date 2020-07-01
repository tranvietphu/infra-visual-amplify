## Descripption:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/>
This project visualize AWS current running infrastructure. <br/>
Severless architect model is applied in this project by using Aws Amplify framework(Backend as a service) <br/>
https://docs.amplify.aws/cli/teams/overview#setting-up-prod-and-dev-environments<br/>


## Build steps:
### 1. Install aws cli

### 2. Run aws configure

### 3. Install nodejs, yarn, aws-amplify

### 4. Build backend: 

$amplify add env  (env-name)<br/>

$amplify push<br/>

$amplify env checkout (env-name)<br/>

$amplify env pull<br/>

### 5. Build and run frontend on local:

$yarn install<br/>

$yarn start<br/>

### 6. Publish front to cloud:
$amplify publish<br/>

### 7. Go to Aws Cognito User Pool console to create login user:



## Clean env:
amplify env remove <env name><br/>


## Git push:
git remote add origin2 https://github.com/tranvietphu/infra-visual-amplify.git<br/>

git push -u origin2 master<br/>