import { AxiosRequestConfig } from 'axios';

// TODO: we should try not to use any types as it is not safe. Need to do more research on how to type this
export interface ApiRequestPrameters<T = any> {
	url: string;
	config: AxiosRequestConfig<T>;
}

export interface ApiResponse<T = any> {
	data?: T;
	error?: string;
}
