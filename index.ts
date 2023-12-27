import {genTokenPayload, getData, IResponse, postData, updateData} from "./interfaces";
import CryptoJS = require("crypto-js");

export {getData, postData, updateData};

// export const getLocalStorageValue = (key: string) => {
// 	if (typeof window === "undefined") {
// 		return null;
// 	} else {
// 		const data = localStorage.getItem(key);
// 		if (data) {
// 			try {
// 				return JSON.parse(data);
// 			} catch (error) {
// 				return data;
// 			}
// 		} else {
// 			return null;
// 		}
// 	}
// };

export const generateToken = (
	payload: genTokenPayload,
	secret: string
) => {
	try {
		return CryptoJS.AES.encrypt(
			typeof payload === "string" ? payload : JSON.stringify(payload),
			secret
		).toString();
	} catch (error) {
		console.error(error, "<<-- error in generateToken");
		return error;
	}
};

export const decodeToken = (token: string, secret: string) => {
	try {
		const bytes = CryptoJS.AES.decrypt(token, secret);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		console.error(error, "<<-- error in decodeToken");
		return error;
	}
};

// export const doPostApiCall = async (data: postData) => {
// 	return new Promise(async (resolve, reject) => {
// 		let token;
// 		if (data.authToken) {
// 			token = data.authToken;
// 		} else {
// 			getLocalStorageValue("token");
// 		}
// 		const requestValues = {
// 			method: "POST",
// 			body: JSON.stringify(data.bodyData),
// 			headers: {
// 				"Content-Type": "application/json",
// 				Accept: "application/json",
// 				Authorization: token || "",
// 			},
// 		};
// 		fetch(data.url, requestValues)
// 			.then((result) => {
// 				if (result.status === 401) {
// 					localStorage.clear();
// 				} else {
// 					return result.json();
// 				}
// 			})
// 			.then((result) => {
// 				if (result.token) {
// 					localStorage.setItem("token", result.token);
// 				}
// 				resolve(result);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			});
// 	});
// };

// export const doUploadMediaApiCall = async (data: any) => {
// 	return new Promise(async (resolve, reject) => {
// 		let token;
// 		if (data.authToken) {
// 			token = data.authToken;
// 		} else {
// 			getLocalStorageValue("token");
// 		}
// 		const requestValues = {
// 			method: "POST",
// 			body: data.bodyData,
// 			headers: {
// 				Authorization: token || "",
// 			},
// 		};
// 		fetch(data.url, requestValues)
// 			.then((result) => {
// 				if (result.status === 401) {
// 					localStorage.clear();
// 				} else {
// 					return result.json();
// 				}
// 			})
// 			.then((result) => {
// 				if (result.token) {
// 					localStorage.setItem("token", result.token);
// 				}
// 				resolve(result);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			});
// 	});
// };
//
// export const doDeleteApiCall = async (data: updateData) => {
// 	return new Promise(async (resolve, reject) => {
// 		let token;
// 		if (data.authToken) {
// 			token = data.authToken;
// 		} else {
// 			getLocalStorageValue("token");
// 		}
// 		const requestValues = {
// 			method: "DELETE",
// 			body: JSON.stringify(data.bodyData),
// 			headers: {
// 				"Content-Type": "application/json",
// 				Accept: "application/json",
// 				Authorization: token || "",
// 			},
// 		};
// 		fetch(data.url, requestValues)
// 			.then((response) => {
// 				if (response.status === 401) {
// 					localStorage.clear();
// 					// router.push("/login");
// 				} else {
// 					return response.json();
// 				}
// 			})
// 			.then((data) => resolve(data))
// 			.catch((error) => reject(error));
// 	});
// };
//
// export const doPutApiCall = async (data: updateData) => {
// 	return new Promise(async (resolve, reject) => {
// 		let token;
// 		if (data.authToken) {
// 			token = data.authToken;
// 		} else {
// 			getLocalStorageValue("token");
// 		}
// 		const requestValues = {
// 			method: "PUT",
// 			body: JSON.stringify(data.bodyData),
// 			headers: {
// 				"Content-Type": "application/json",
// 				Accept: "application/json",
// 				Authorization: token || "",
// 			},
// 		};
// 		fetch(data.url, requestValues)
// 			.then((result) => result.json())
// 			.then((result) => {
// 				if (result.token) {
// 					localStorage.setItem("token", result.token);
// 				}
// 				resolve(result);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			});
// 	});
// };

export class ApiConfig {
	constructor(
		public baseURL?: string,
		public headers?: object
	) {
	}

	protected isValidUrl = (url: string): boolean => {
		const urlPattern: RegExp = /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})([/\w .-]*)*\/?$/;

		return urlPattern.test(url);
	}

	protected newUrl = (url: string): string => {
		return this.isValidUrl(url) ? url : `${this.baseURL}${url}`
	}

	public getLocalStorageValue(key: string) {
		if (typeof window === "undefined") {
			return null;
		} else {
			const data = localStorage.getItem(key);
			if (data) {
				try {
					return JSON.parse(data);
				} catch (error) {
					return data;
				}
			} else {
				return null;
			}
		}
	};

	protected CallApi(url: string, requestValues?: object) {
		return new Promise(async (resolve, reject): Promise<IResponse | any> => {
			fetch(this.newUrl(url), requestValues)
				.then((response) => {
					if (response.status === 401) {
						localStorage.clear();
						return reject("Unauthorized")
					} else {
						return response.json();
					}
				})
				.then((data) => {
					if (data.token || data.access_token) {
						localStorage.setItem("token", (data.token || data.access_token))
					}
					return resolve(data);
				})
				.catch((error) => reject(error));
		})
	}

	public get(data: getData) {
		return new Promise(async (resolve, reject) => {
			let token;
			if (data.authToken) {
				token = data.authToken;
			} else {
				this.getLocalStorageValue("token");
			}
			const requestValues = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token || "",
					...this.headers,
				},
			};

			try {
				return resolve(await this.CallApi(data.url, requestValues))
			} catch (e) {
				return reject(e);
			}
		});
	}

	post(data: postData) {
		return new Promise(async (resolve, reject) => {
			let token;
			if (data.authToken) {
				token = data.authToken;
			} else {
				this.getLocalStorageValue("token");
			}
			const requestValues = {
				method: "POST",
				body: JSON.stringify(data.bodyData),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token || "",
					...this.headers
				},
			};
			try {
				return resolve(await this.CallApi(data.url, requestValues))
			} catch (e) {
				return reject(e);
			}
		})
	}

	put(data: updateData) {
		return new Promise(async (resolve, reject) => {
			let token;
			if (data.authToken) {
				token = data.authToken;
			} else {
				this.getLocalStorageValue("token");
			}
			const requestValues = {
				method: "PUT",
				body: JSON.stringify(data.bodyData),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token || "",
					...this.headers
				},
			};
			try {
				return resolve(await this.CallApi(data.url, requestValues))
			} catch (e) {
				return reject(e);
			}
		})
	}

	patch(data: updateData) {
		return new Promise(async (resolve, reject) => {
			let token;
			if (data.authToken) {
				token = data.authToken;
			} else {
				this.getLocalStorageValue("token");
			}

			const requestValues = {
				method: "PATCH",
				body: JSON.stringify(data.bodyData),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token || "",
					...this.headers
				},
			};

			try {
				return resolve(await this.CallApi(data.url, requestValues))
			} catch (e) {
				return reject(e);
			}
		})
	}

	delete(data: updateData) {
		return new Promise(async (resolve, reject) => {
			let token;
			if (data.authToken) {
				token = data.authToken;
			} else {
				this.getLocalStorageValue("token");
			}

			const requestValues = {
				method: "DELETE",
				body: JSON.stringify(data.bodyData),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token || "",
					...this.headers
				},
			};

			try {
				return resolve(await this.CallApi(data.url, requestValues))
			} catch (e) {
				return reject(e);
			}
		})
	}
}