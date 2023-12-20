# api-config

This package simplifies data retrieval through a straightforward function call. By passing an object as a parameter to these functions, you can effortlessly obtain JSON data as the return output.

### Prerequisites

Here is an illustrative example outlining the necessary steps to enumerate the essential components required for using the software, along with clear instructions on how to install each of them.

```sh
npm install npm@latest -g
```

## Installing

Using npm :-

```sh
npm i api-config
```

Using yarn :-

```sh
yarn add api-config
```

## API

**N.B :**  bodyData object is mandatory for Post Api call. In other functions it is not mandatory

## getLocalStorageData

Usage :-

Facilitating the retrieval of data from local storage is made simpler. There's no need to manually parse a stringified JSON object – just pass the key as a parameter to the function.

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

As demonstrated, there's no need to manually parse the JSON object. Simply assign a variable within this function, and you can effortlessly retrieve your data stored in local storage.
***

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

- Facilitating the execution of a **POST** API request is simplified using this functionality. Just pass an object in the function's parameter, and the process becomes straightforward.

  	The function returns a promise, so you can utilize either the `then/catch` syntax or leverage `async/await` for handling its outcome.

- If there is a token dependency, you have the flexibility to either input your own token directly or, if the token is stored in your local storage as `token`, the function automatically handles this scenario.

- If this is utilized for login purposes, the function automatically stores the `token` in the local storage if it is available in the result.

### Import

```typescript
import {doPostApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos
```

Instead of employing fetch or axios, you can streamline your workflow by utilizing the following function:

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

If your `authToken` is stored in another storage,

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

You can view the `response` conveniently within the `data` variable.

***

# doGetApiCall

Usage :-

- Executing a **GET** API request is simplified using this function. Simply pass an object as the parameter to initiate the process effortlessly.

  	The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.

- In the case of a token dependency, you can either input your own token directly or, if the `token` is available in your local storage, this function automatically handles the scenario.

### Import

```typescript
import {doGetApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

Instead of resorting to fetch or axios, you can simplify your approach by utilizing the following function:

```typescript
let data = await doGetApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
})
```

If your `authToken` is stored in another storage,

```typescript
let data = await doGetApiCall({
    url: "https://jsonplaceholder.typicode.com/todos",
    authToken: "YOUR_TOKEN",
})
```

You can view the `response` conveniently within the `data` variable.

***

# doPutApiCall

Usage :-

- This function is designed for calling a **PUT** API effortlessly. Simply provide an object as a parameter to initiate the process.

  	The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.

- In the presence of a token dependency, you have the flexibility to input your own token or, if available in your local storage as `token`, the function automatically manages this scenario.

### Import

```typescript
import {doPutApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

Instead of resorting to fetch or axios, you can streamline your approach by utilizing the following function:

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

If your **authToken** is stored in another storage,

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

You can view the `response` conveniently within the `data` variable.

***

# doDeleteApiCall

Usage :-

- This function is employed for calling a **DELETE** API seamlessly. Simply provide an object as a parameter to initiate the process.

  	The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.

- In the presence of a token dependency, you can either input your own token, or if the token is available in your local storage as `token`, this function automatically manages this scenario.

### Import

```typescript
import {doDeleteApiCall} from "api-config";
```

### Example

let's assume my url is -

```typescript
https://jsonplaceholder.typicode.com/todos/1
```

Instead of resorting to fetch or axios, you can streamline your approach by utilizing the following function:

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

You can view the `response` conveniently within the `data` variable.
***

## Interfaces for function's parameter.

## getData

This interface is intended to be used as the parameter for the `doGetApiCall` function.

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

This interface is meant to be used as the parameter for the `doPostApiCall` function.

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

This interface should be used as the parameter for the `doPostApiCall` function.

```ts
interface postData {
    url: string,
    authToken?: string,
    bodyData?: object
}
```

### Example:

**N.B**: The `bodyData` parameter is optional in this context.

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

***