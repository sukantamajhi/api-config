import pino from "pino";
import {
    genTokenPayload,
    getData,
    IResponse,
    postData,
    tokenData,
    updateData,
} from "./interfaces";
import CryptoJS = require("crypto-js");

export { getData, postData, updateData };

export const logger = (level?: pino.Level) =>
    pino({
        level: level || "fatal",
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
            },
        },
    });

export class ApiConfig {
    constructor(
        public baseURL?: string,
        public headers?: object,
        public logLevel: string = "fatal"
    ) {}

    public generateToken(payload: genTokenPayload, secret: string): tokenData {
        try {
            return CryptoJS.AES.encrypt(
                typeof payload === "string" ? payload : JSON.stringify(payload),
                secret
            ).toString();
        } catch (error) {
            logger().error(error, "<<-- error in generateToken");
            return error;
        }
    }

    public decodeToken(token: string, secret: string): tokenData {
        try {
            const bytes = CryptoJS.AES.decrypt(token, secret);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            logger().error(error, "<<-- error in decodeToken");
            return error;
        }
    }

    public getLocalStorageValue(key: string): any {
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
                return resolve(await this.CallApi(data.url, requestValues));
            } catch (e) {
                logger().error(e, "<<== Error in get api call");
                return reject(e);
            }
        });
    }

    public post(data: postData) {
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
                    ...this.headers,
                },
            };
            try {
                return resolve(await this.CallApi(data.url, requestValues));
            } catch (e) {
                logger().error(e, "<<== Error in post api call");
                return reject(e);
            }
        });
    }

    public put(data: updateData) {
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
                    ...this.headers,
                },
            };
            try {
                return resolve(await this.CallApi(data.url, requestValues));
            } catch (e) {
                logger().error(e, "<<== Error in put api call");
                return reject(e);
            }
        });
    }

    public patch(data: updateData) {
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
                    ...this.headers,
                },
            };

            try {
                return resolve(await this.CallApi(data.url, requestValues));
            } catch (e) {
                logger().error(e, "<<== Error in patch api call");
                return reject(e);
            }
        });
    }

    public delete(data: updateData) {
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
                    ...this.headers,
                },
            };

            try {
                return resolve(await this.CallApi(data.url, requestValues));
            } catch (e) {
                logger().error(e, "<<== Error in delete api call");
                return reject(e);
            }
        });
    }

    protected isValidUrl = (url: string): boolean => {
        const urlPattern: RegExp =
            /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})([/\w .-]*)*\/?$/;

        return urlPattern.test(url);
    };

    protected newUrl = (url: string): string => {
        return this.isValidUrl(url) ? url : `${this.baseURL}${url}`;
    };

    protected CallApi(url: string, requestValues?: object) {
        return new Promise(
            async (resolve, reject): Promise<IResponse | any> => {
                fetch(this.newUrl(url), requestValues)
                    .then((response) => {
                        if (response.status === 401) {
                            localStorage.clear();
                            return reject("Unauthorized");
                        } else {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        if (data.token || data.access_token) {
                            localStorage.setItem(
                                "token",
                                data.token || data.access_token
                            );
                        }
                        return resolve(data);
                    })
                    .catch((error) => reject(error));
            }
        );
    }
}
