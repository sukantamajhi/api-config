import pino from "pino";
import {
    genTokenPayload,
    getData,
    IResponse,
    postData,
    tokenData,
    updateData,
} from "./interfaces";

import * as CryptoJS from "crypto-js";

export { getData, postData, updateData, pino };

export const createLogger = (level: pino.Level = "info") =>
    pino({
        level,
        transport: {
            target: "pino-pretty",
            options: { colorize: true },
        },
    });

export class ApiConfig {
    private log: pino.Logger;

    constructor(
        public baseURL: string = "",
        public headers: Record<string, string> = {},
        logLevel: pino.Level = "info"
    ) {
        this.log = createLogger(logLevel);
    }

    public generateToken(payload: genTokenPayload, secret: string): string {
        try {
            const stringPayload = typeof payload === "string" ? payload : JSON.stringify(payload);
            return CryptoJS.AES.encrypt(stringPayload, secret).toString();
        } catch (error) {
            this.log.error(error, "Error in generateToken");
            throw error;
        }
    }

    public decodeToken(token: string, secret: string): tokenData {
        try {
            const bytes = CryptoJS.AES.decrypt(token, secret);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            this.log.error(error, "Error in decodeToken");
            throw error;
        }
    }

    public getLocalStorageValue(key: string): any {
        if (typeof window === "undefined") return null;
        const data = localStorage.getItem(key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    private async makeRequest(method: string, data: getData | postData | updateData): Promise<any> {
        const token = data.authToken || this.getLocalStorageValue("token");
        const requestValues = {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token || "",
                ...this.headers,
            },
            ...(method !== "GET" && { body: JSON.stringify((data as postData | updateData).bodyData) }),
        };

        try {
            return await this.CallApi(data.url, requestValues);
        } catch (e) {
            this.log.error(e, `Error in ${method.toLowerCase()} api call`);
            throw e;
        }
    }

    public get = (data: getData) => this.makeRequest("GET", data);
    public post = (data: postData) => this.makeRequest("POST", data);
    public put = (data: updateData) => this.makeRequest("PUT", data);
    public patch = (data: updateData) => this.makeRequest("PATCH", data);
    public delete = (data: updateData) => this.makeRequest("DELETE", data);

    private isValidUrl = (url: string): boolean =>
        /^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})([/\w .-]*)*\/?$/.test(url);

    private newUrl = (url: string): string =>
        this.isValidUrl(url) ? url : `${this.baseURL}${url}`;

    protected async CallApi(url: string, requestValues?: RequestInit): Promise<IResponse | any> {
        try {
            const response = await fetch(this.newUrl(url), requestValues);
            if (response.status === 401) {
                localStorage.clear();
                throw new Error("Unauthorized");
            }
            const data = await response.json();
            if (data.token || data.access_token) {
                localStorage.setItem("token", data.token || data.access_token);
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export class PinoLogger {
    public log: pino.Logger;

    constructor(logLevel: pino.Level = "info") {
        this.log = createLogger(logLevel);
    }
}