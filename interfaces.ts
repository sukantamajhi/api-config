export interface postData {
	url: string,
	authToken?: string,
	bodyData: object
}

export interface getData {
	url: string,
	authToken?: string | null | undefined,
}

export interface updateData {
	url: string,
	authToken?: string,
	bodyData?: object
}

export interface IResponse {
	token: string;
	access_token: string
}

export type genTokenPayload = string | Record<string, any> | Array<string | object>