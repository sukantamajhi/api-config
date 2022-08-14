interface postData {
    url: string,
    authToken?: string,
    bodyData: object
}

interface getData {
    url: string,
    authToken?: string,
}

interface putData {
    url: string,
    authToken?: string,
    bodyData?: object
}