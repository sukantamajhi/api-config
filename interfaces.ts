export interface postData {
    url: string,
    authToken?: string,
    bodyData: object
}

export interface getData {
    url: string,
    authToken?: string,
}

export interface updateData {
    url: string,
    authToken?: string,
    bodyData?: object
}

export interface requestValues {
    headers: {
        Authorization: string,
        Accept?: string,
        "Content-Type"?: string
    },
    body?: string | any,
    method: string
}