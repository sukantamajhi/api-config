# api-config

This package is used for fetch data easily by calling a function. You just have to pass a object through parameter in
these function and this function will return a json data.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```sh
$ npm install npm@latest -g
```

## Installing

Using npm :-

```sh
$ npm i api-config
```

Using yarn :-

```sh
$ yarn add api-config
```

## API

**N.B :**  bodyData object is mandatory for Post Api call. In other functions it is not mandatory

## getLocalStorageData

Usage :-

Getting localstorage data easier. You don't have to parse the stringified json object just pass the key in the parameter
of the function.

### Import

```typescript
import {getLocalStorageValue} from "api-config";
```

### Examples

- A normal string data
  ```typescript
  getLocalStorageValue("Key")
  ```
- A stringifies json data

  ```typescript
  getLocalStorageValue("key")
  ```

So as you see you don't have to parse the json object. Assign a variable in this function you can get your localstorage
data.

# Generate Token

Usage :-

- The generateToken function is designed to create a cipher text token by utilizing the provided data and a given secret key.

- To use this function, two essential inputs are required: a payload and a secret key.

- The term `payload` in this context refers to the string or object that is intended to be encrypted.

- The `secret` is a key necessary for both encrypting and decrypting the payload, and it should be kept confidential. Avoid public disclosure of the secret key.

### Import

```typescript
import {generateToken} from "api-config";
```

### Parameters

```typescript
const payload = {
    email: "john@doe.com",
    id: 123
};

const secret = "This is my secret key";
```

### Input Example:

```typescript
import {generateToken} from "api-config";

generateToken(payload, secret);
```

### Output Example:

`U2FsdGVkX19QVOZV/OYp+rQA5jc6agkp9I+ZlKoVy8peLfPDyA24OxmC+uIDvjM1bzZLqWeA0qYnm38Z5Sb7Yw==`

***

# Decode Token

Usage :-

- The decodeToken function is specifically designed to decrypt a cipher text token.

- It achieves decryption by utilizing a secret key, which was used during the encryption of the payload.

- To employ this function successfully, two components are necessary: a payload and a confidential secret key.

- The term `token` in this context refers to the specific string that is intended for decryption.

- The term `secret` denotes the crucial key that is required for both encrypting and decrypting the payload.

- It is of utmost importance to keep the secret key private and refrain from any public disclosure.

### Import

```typescript
import {decodeToken} from "api-config";
```

### Payload

```typescript
const token = "U2FsdGVkX19QVOZV/OYp+rQA5jc6agkp9I+ZlKoVy8peLfPDyA24OxmC+uIDvjM1bzZLqWeA0qYnm38Z5Sb7Yw==";

const secret = "This is my secret key";
```

### Input Example:

```typescript
import {decodeToken} from "api-config";

decodeToken(token, secret);
```

### Output Example:

`{
email: "john@doe.com",
id: 123
}`

***

# doPostApiCall

Usage :-

- Calling **POST** api easily with this. You just have to pass a object in the function's parameter.

  	This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your
  localstorage as **token**, then this function is already take care of this.

- If this is using for login purposes, If the **token** is available in the result then token will be automatically
  stored to localstorage.

### Import

```typescript
import {doPostApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos
```

so rather than using fetch or axios, we can use below function:

```typescript
let data = await doPostApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

And if there is your **authToken** in another storage,

```typescript
let data = await doPostApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    authToken: "YOUR_TOKEN",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

You can see your **response** in the **data** variable.
***

# doGetApiCall

Usage :-

- Calling **GET** api easily with this. You just have to pass a object in the function's parameter.

  	This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your
  localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import {doGetApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

so rather than using fetch or axios, we can use below function:

```typescript
let data = await doGetApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
})
```

And if there is your **authToken** in another storage,

```typescript
let data = await doGetApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    authToken: "YOUR_TOKEN",
})
```

You can see your **response** in the **data** variable.

***

# doPutApiCall

Usage :-

- This function is used to call **PUT** api. You just have to pass a object in the function's parameter.

  	This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your
  localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import {doPutApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

so rather than using fetch or axios, we can use below function:

```typescript
let data = await doPutApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

And if there is your **authToken** in another storage,

```typescript
let data = await doPutApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    authToken: "YOUR_TOKEN",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

You can see your **response** in the **data** variable.

***

# doDeleteApiCall

Usage :-

- This function is used to call **DELETE** api. You just have to pass a object in the function's parameter.

  	This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your
  localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import {doDeleteApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

so rather than using fetch or axios, we can use below function:

```typescript
let data = await doDeleteApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

And if there is your **authToken** in another storage,

```typescript
let data = await doDeleteApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    authToken: "YOUR_TOKEN",
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
})
```

You can see your **response** in the **data** variable.

***

## Interfaces for function's parameter.

## getData

This interface should be use for doGetApiCall function’s parameter.

```typescript
interface getData {
    url: string,
    authToken?: string,
}
```

### Example:

```typescript
let data: getData = {
    url: 'https://jsonplaceholder.typicode.com/todos'
}
```

## postData

This interface should be use for doPostApiCall function’s parameter.

```typescript
interface postData {
    url: string,
    authToken?: string,
    bodyData: object
}
```

### Example:

```ts
let data: getData = {
    url: 'https://jsonplaceholder.typicode.com/todos',
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
}
```

## updateData

This interface should be use for doPostApiCall function’s parameter.

```ts
interface postData {
    url: string,
    authToken?: string,
    bodyData?: object
}
```

### Example:

**N.B**: bodyData is optional here.

```ts
let data: updateData = {
    url: 'https://jsonplaceholder.typicode.com/todos',
    bodyData: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
}
```