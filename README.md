
# api-config  
  
This package simplifies data retrieval through a straightforward function call. By passing an object as a parameter to  
these functions, you can effortlessly obtain JSON data as the return output.  
  
### Prerequisites  
  
Here is an illustrative example outlining the necessary steps to enumerate the essential components required for using  
the software, along with clear instructions on how to install each of them.  
  
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
  
**N.B :** bodyData object is mandatory for Post Api call. In other functions it is not mandatory  

### Import  
  
```typescript
import {ApiConfig} from "api-config";   

const apiConfig = new ApiConfig();
```

### Instance Initialization

Initialize an instance of the `apiConfig` class with predefined `baseURL` and `headers` for ease of use.

### Example

```typescript
apiConfig.baseURL = "https://jsonplaceholder.typicode.com/todos";

apiConfig.headers = {
    Authorization: localStorage.getItem("token")
};
```

By utilizing this example, you eliminate the need to repeatedly specify the `baseURL`.

### Usage

```typescript
const data = await apiConfig.get("/todos");
```

Now, with the instance already configured, you can easily make requests without redefining the base URL each time.
  
## getLocalStorageData  
  
### Usage:-
  
Facilitating the retrieval of data from local storage is made simpler. There's no need to manually parse a stringified  JSON object – just pass the key as a parameter to the function.  

### Examples  
  
- A normal string of data  
  
 ```typescript
  apiConfig.getLocalStorageValue("Key")
 ```  

- A stringified JSON data  
  
```typescript  
 apiConfig.getLocalStorageValue("key")   
 ```

As demonstrated, there's no need to parse the JSON object manually. Simply assign a variable within this function, and you can effortlessly retrieve your data stored in local storage.  
***

# Generate Token  
  
### Usage:- 
  
- The generateToken function is designed to create a cipher text token by utilizing the provided data and a given secret  
  key.  
  
- To use this function, two essential inputs are required: a payload and a secret key.  
  
- The term `payload` in this context refers to the string or object that is intended to be encrypted.  
  
- The `secret` is a key necessary for both encrypting and decrypting the payload, and it should be kept confidential.  
  Avoid public disclosure of the secret key.  

### Parameters  
  
```typescript
const payload = {  
 email: "john@doe.com", 
 id: 123
};  
  
const secret = "This is my secret key";   
```

### Input Example  
  
```typescript
apiConfig.generateToken(payload, secret);   
```

### Output Example  
  
`U2FsdGVkX19QVOZV/OYp+rQA5jc6agkp9I+ZlKoVy8peLfPDyA24OxmC+uIDvjM1bzZLqWeA0qYnm38Z5Sb7Yw==`  
  
***

# Decode Token  
  
### Usage:-  
  
- The decodeToken function is specifically designed to decrypt a cipher text token.  
  
- It achieves decryption by utilizing a secret key, which was used during the encryption of the payload.  
  
- To employ this function successfully, two components are necessary: a payload and a confidential secret key.  
  
- The term `token` in this context refers to the specific string that is intended for decryption.  
  
- The term `secret` denotes the crucial key that is required for both encrypting and decrypting the payload.  
  
- It is of utmost importance to keep the secret key private and refrain from any public disclosure.  
  
### Payload  
  
```typescript
const token = "U2FsdGVkX19QVOZV/OYp+rQA5jc6agkp9I+ZlKoVy8peLfPDyA24OxmC+uIDvjM1bzZLqWeA0qYnm38Z5Sb7Yw==";  
  
const secret = "This is my secret key";   
```

### Input Example  
  
```typescript
apiConfig.decodeToken(token, secret);   
```

### Output Example  
  
```json5  
{  
  email: "john@doe.com",  
  id:123  
}  
```  
  
***

# POST  
  
### Usage:-  
  
- Facilitating the execution of a **POST** API request is simplified using this functionality. Just pass an object in  the function's parameter, and the process becomes straightforward.  
  
      The function returns a promise, so you can utilize either the `then/catch` syntax or leverage `async/await` to handle its outcome.  
  
- If there is a token dependency, you have the flexibility to either input your token directly or, if the token is  
  stored in your local storage as a `token`, the function automatically handles this scenario.  
  
- If this is utilized for login purposes, the function automatically stores the `token` in the local storage if it is  
  available in the result.  

### Example:-  
  
let's assume my URL is -  
  
```md
https://jsonplaceholder.typicode.com/todos
```

Instead of employing fetch or Axios, you can streamline your workflow by utilising the following function:  
  
```typescript
let data = await apiConfig.post({  
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
let data = await apiConfig.post({  
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

# GET  
  
### Usage:-  
  
- Executing a **GET** API request is simplified using this function. Pass an object as the parameter to initiate the  process effortlessly.  
  
      The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.  
  
- In the case of a token dependency, you can either input your token directly or, if the `token` is available in your  
  local storage, this function automatically handles the scenario.  
  
### Example  
  
let's assume my url is -  
  
```md
https://jsonplaceholder.typicode.com/todos
```

Instead of resorting to fetch or Axios, you can simplify your approach by utilising the following function:  
  
```typescript
let data = await apiConfig.get({  
 url: "https://jsonplaceholder.typicode.com/todos"
})   
```

If your `authToken` is stored in another storage,  
  
```typescript
let data = await apiConfig.get({  
 url: "https://jsonplaceholder.typicode.com/todos", 
 authToken: "YOUR_TOKEN"
})   
```

You can view the `response` conveniently within the `data` variable.  
  
***

# PUT  
  
### Usage:-  
  
- This function is designed for calling a **PUT** API effortlessly. Provide an object as a parameter to initiate the  process.  
  
   The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.   
- In the presence of a token dependency, you have the flexibility to input your token or, if available in your local  
  storage as a `token`, the function automatically manages this scenario.  

### Example  
  
let's assume my URL is -  
  
```md
https://jsonplaceholder.typicode.com/todos
```

Instead of resorting to fetch or Axios, you can streamline your approach by utilising the following function:  
  
```typescript
let data = await apiConfig.put({  
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
let data = await apiConfig.put({  
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

# PATCH  
  
### Usage:-  
  
- This function is designed for calling a **PATCH** API effortlessly. Provide an object as a parameter to initiate the  process.  
  
   The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.   
- In the presence of a token dependency, you have the flexibility to input your token or, if available in your local  
  storage as a `token`, the function automatically manages this scenario.  

### Example  
  
let's assume my URL is -  
  
```md
https://jsonplaceholder.typicode.com/todos
```

Instead of resorting to fetch or Axios, you can streamline your approach by utilising the following function:  
  
```typescript
let data = await apiConfig.patch({  
 url: "https://jsonplaceholder.typicode.com/todos/1", 
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
let data = await apiConfig.patch({  
 url: "https://jsonplaceholder.typicode.com/todos/1", 
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

# DELETE  
  
### Usage:-  
  
- This function is employed for calling a **DELETE** API seamlessly. Passing an object as a parameter to initiate the  process.  
  
   The function returns a promise, providing the flexibility to handle it using either the `then/catch` syntax or through `async/await`.   
- In the presence of a token dependency, you can either input your token or if the token is available in your local  
  storage as a `token`, this function automatically manages this scenario.  
  
### Example  
  
let's assume my url is -  
  
```md
https://jsonplaceholder.typicode.com/todos
```  
  
Instead of resorting to fetch or Axios, you can streamline your approach by utilising the following function:  
  
```typescript
let data = await apiConfig.delete({  
 url: "https://jsonplaceholder.typicode.com/todos/1", 
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
let data = await apiConfig.delete({  
 url: "https://jsonplaceholder.typicode.com/todos/1", 
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

## Interfaces for function's parameter  
  
## getData  
  
This interface is intended to be used as the parameter for the `doGetApiCall` function.  
  
```typescript
interface getData {  
  url: string, 
  authToken?: string,
}   
```

### Example  
  
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

### Example  
  
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

### Example  
  
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

## genTokenPayload

This interface should be used as one of the paramater called payload for the generateToken function.

```ts
type genTokenPayload = string | Record<string, any> | Array<string | object>
```

### Example

```typescript
const payload: genTokenPayload = {  
 email: "john@doe.com", 
 id: 123
};  
  
const secret: string = "This is my secret key";   

apiConfig.generateToken(payload, secret);
```

***
