
# api-config

This package is used for fetch data easily by calling a function.  You just have to pass a object through parameter in these function and this function will return a json data.


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

Getting localstorage data easier. You don't have to parse the stringified json object just pass the key in the parameter of the function.

### Import

```typescript
import { getLocalStorageValue } from "api-config";
```

### Examples

- A normal string data
	```typescript
	getLocalStorageValue("Key")
	```
- A stringified json data

	```typescript
	getLocalStorageValue("key")
	```
So as you see you don't have to parse the json object. Assign a variable in this function you can get your localstorage data.


# doPostApiCall

Usage :-

- Calling **POST** api easily with this. You just have to pass a object in the function's parameter.

		This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your localstorage as **token**, then this function is already take care of this.

- If this is using for login purposes, If the **token** is available in the result then token will be automatically stored to localstorage.

### Import

```typescript
import { doPostApiCall } from "api-config";
```

### Example

let's assume my url is -
```typescript
https://jsonplaceholder.typicode.com/todos
```

and body to be send in the server is:

```javascript
"userId": 1,
"id": 1,
"title": "delectus aut autem",
"completed": false
```

so rather than using fetch or axios, we can use below function:

```typescript
let data = await doPostApiCall({
	url:"https://jsonplaceholder.typicode.com/todos",
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
	url:"https://jsonplaceholder.typicode.com/todos",
	authToken:"YOUR_TOKEN",
	bodyData: {
		"userId": 1,
		"id": 1,
		"title": "delectus aut autem",
		"completed": false
	}
})
```

You can see your **response** in the **data** variable.


# doGetApiCall

Usage :-

- Calling **GET** api easily with this. You just have to pass a object in the function's parameter.

		This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import { doGetApiCall } from "api-config";
```

### Example

let's assume my url is -
```typescript
https://jsonplaceholder.typicode.com/todos/1
```


so rather than using fetch or axios, we can use below function:

```typescript
let data = await doGetApiCall({
	url:"https://jsonplaceholder.typicode.com/todos",
})
```

And if there is your **authToken** in another storage,

```typescript
let data = await doGetApiCall({
	url:"https://jsonplaceholder.typicode.com/todos",
	authToken:"YOUR_TOKEN",
})
```

You can see your **response** in the **data** variable.

# doPutApiCall

Usage :-

- This function is used to call **PUT** api. You just have to pass a object in the function's parameter.

		This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import { doPutApiCall } from "api-config";
```

### Example

let's assume my url is -
```typescript
https://jsonplaceholder.typicode.com/todos/1
```


so rather than using fetch or axios, we can use below function:

```typescript
let data = await doPutApiCall({
	url:"https://jsonplaceholder.typicode.com/todos",
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
	url:"https://jsonplaceholder.typicode.com/todos",
	authToken:"YOUR_TOKEN",
	bodyData: {
		"userId": 1,
		"id": 1,
		"title": "delectus aut autem",
		"completed": false
	}
})
```

You can see your **response** in the **data** variable.


# doDeleteApiCall

Usage :-

- This function is used to call **DELETE** api. You just have to pass a object in the function's parameter.

		This function returns promise so either you have to use then catch or async/await.

- If there is any token token dependency you can either enter your own token or if the token is available in your localstorage as **token**, then this function is already take care of this.

### Import

```typescript
import { doDeleteApiCall } from "api-config";
```

### Example

let's assume my url is -
```typescript
https://jsonplaceholder.typicode.com/todos/1
```


so rather than using fetch or axios, we can use below function:

```typescript
let data = await doDeleteApiCall({
	url:"https://jsonplaceholder.typicode.com/todos",
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
	url:"https://jsonplaceholder.typicode.com/todos",
	authToken:"YOUR_TOKEN",
	bodyData: {
		"userId": 1,
		"id": 1,
		"title": "delectus aut autem",
		"completed": false
	}
})
```

You can see your **response** in the **data** variable.


## Interfaces for function's parameter.

## getData

This interface should be use for doGetApiCall function???s parameter.

```ts
interface getData {
	url: string,
	authToken?: string,
}
```

### Example:
```ts
let data: getData = {
	url: 'https://jsonplaceholder.typicode.com/todos'
}
```

## postData

This interface should be use for doPostApiCall function???s parameter.
```ts
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
	bodyData:{
		"userId": 1,
		"id": 1,
		"title": "delectus aut autem",
		"completed": false
	}
}
```

## updateData

This interface should be use for doPostApiCall function???s parameter.
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
	bodyData:{
		"userId": 1,
		"id": 1,
		"title": "delectus aut autem",
		"completed": false
	}
}
```