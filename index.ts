import getLocalStorageData from "./getLocalStorageData";
import {getData, postData, requestValues, updateData} from "./interfaces";

export {getData, postData, updateData, requestValues}

export const getLocalStorageValue = (key: string) => getLocalStorageData(key);

const apiCall = (data: getData | postData | updateData, reqstValues: requestValues): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            fetch(data.url, reqstValues)
                .then((result) => {
                    if (result.status === 401) {
                        localStorage.clear();
                    } else {
                        return result.json();
                    }
                })
                .then((result) => {
                    if (result.token) {
                        localStorage.setItem("token", result.token);
                    }
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (err) {
            console.log(err, "<<-- error in api call")
            return reject(err)
        }
    })

}

export const doGetApiCall = async (data: getData): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let token;
        if (data.authToken) {
            token = data.authToken
        } else {
            getLocalStorageData("token");
        }
        const reqstValues: requestValues = {
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
                resolve(data)
            })
            .catch((error) => reject(error))
    });
};

export const doPostApiCall = async (data: postData): Promise<any> => {
    return new Promise(async () => {
        let token;
        if (data.authToken) {
            token = data.authToken
        } else {
            getLocalStorageData("token");
        }
        const reqstValues: requestValues = {
            method: "POST",
            body: JSON.stringify(data.bodyData),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token || "",
            },
        };
        await apiCall(data, reqstValues)
    });
};

export const doUploadMediaApiCall = async (data: any): Promise<any> => {
    return new Promise(async () => {
        let token;
        if (data.authToken) {
            token = data.authToken
        } else {
            getLocalStorageData("token");
        }
        const reqstValues: requestValues = {
            method: "POST",
            body: data.bodyData,
            headers: {
                Authorization: token || "",
            },
        };
        await apiCall(data, reqstValues)
    });
};

export const doDeleteApiCall = async (data: updateData): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let token;
        if (data.authToken) {
            token = data.authToken
        } else {
            getLocalStorageData("token");
        }
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

export const doPutApiCall = async (data: updateData): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let token;
        if (data.authToken) {
            token = data.authToken
        } else {
            getLocalStorageData("token");
        }
        const reqstValues = {
            method: "PUT",
            body: JSON.stringify(data.bodyData),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token || "",
            },
        };
        fetch(data.url, reqstValues)
            .then((result) => result.json())
            .then((result) => {
                if (result.token) {
                    localStorage.setItem("token", result.token);
                }
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
