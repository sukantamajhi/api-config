import getLocalStorageData from "./getLocalStorageData";

export const getLocalStorage = (key: string) => getLocalStorageData(key);

export const doGetApiCall = async (data: any) => {
	return new Promise(async (resolve, reject) => {
		const token = getLocalStorageData("token");
		console.log(token, "<<-- token")
		const reqstValues = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token || "",
			},
		};
		fetch(data.url, reqstValues)
			.then((response) => {
				if (response.status === 401) {
					localStorage.clear();
				} else {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data, "data")
				resolve(data)
			})
			.catch((error) => reject(error))
		// console.log(reject , "rejecterror");
	});
};

export const doPostApiCall = async (data: any) => {
	console.log(data, "<<-- data");
	return new Promise(async (resolve, reject) => {
		let token: any;
		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token')
		}
		console.log(token, "<<-- token")
		const reqstValues = {
			method: "POST",
			body: JSON.stringify(data.bodyData),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token || "",
			},
		};
		console.log(reqstValues, "<<-- reqstValues");
		fetch(data.url, reqstValues)
			.then((result) => {
				if (result.status === 401) {
					localStorage.clear();
				} else {
					return result.json();
				}
			})
			.then((result) => {
				console.log(result, "<<-- result");
				if (result.token) {
					localStorage.setItem("token", result.token);
				}
				resolve(result);
			})
			.catch((err) => {
				console.log(err, "<<-- err");
				reject(err);
			});
	});
};

export const doUploadMediaApiCall = async (data: any) => {
	console.log(data, "<<-- data");
	return new Promise(async (resolve, reject) => {
		let token: any;
		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token')
		}
		console.log(token, "<<-- token")
		const reqstValues = {
			method: "POST",
			body: data.bodyData,
			headers: {
				Authorization: token || "",
			},
		};
		console.log(reqstValues, "<<-- reqstValues");
		fetch(data.url, reqstValues)
			.then((result) => {
				if (result.status === 401) {
					localStorage.clear();
				} else {
					return result.json();
				}
			})
			.then((result) => {
				console.log(result, "<<-- result");
				if (result.token) {
					localStorage.setItem("token", result.token);
				}
				resolve(result);
			})
			.catch((err) => {
				console.log(err, "<<-- err");
				reject(err);
			});
	});
};

export const doDeleteApiCall = async (data: any) => {
	return new Promise(async (resolve, reject) => {
		let token: any;
		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token')
		}
		console.log(token, "<<-- token")
		const reqstValues = {
			method: "DELETE",
			body: JSON.stringify(data.bodyData),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token || "",
			},
		};
		fetch(data.url, reqstValues)
			.then((response) => {
				if (response.status === 401) {
					localStorage.clear();
					// router.push("/login");
				} else {
					return response.json();
				}
			})
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});
};

export const doPutApiCall = async (data: any) => {
	console.log(data, "<<-- data");
	return new Promise(async (resolve, reject) => {
		let token: any;
		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token')
		}
		console.log(token, "<<-- token")
		const reqstValues = {
			method: "PUT",
			body: JSON.stringify(data.bodyData),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token || "",
			},
		};
		console.log(reqstValues, "<<-- reqstValues");
		fetch(data.url, reqstValues)
			.then((result) => result.json())
			.then((result) => {
				console.log(result, "<<-- result");
				if (result.token) {
					localStorage.setItem("token", result.token);
				}
				resolve(result);
			})
			.catch((err) => {
				console.log(err, "<<-- err");
				reject(err);
			});
	});
};
