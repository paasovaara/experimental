import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { processenv } from 'processenv';

const config: AxiosRequestConfig = {
	baseURL: 'https://api.harvestapp.com/api/v2/',
	headers: {
		'Content-Type': 'application/json',
		'Harvest-Account-ID': `${processenv('HARVEST_ACCOUNT_ID')}`,
		'User-Agent': 'Harvest-integration',
		'Authorization': `Bearer ${processenv('HARVEST_SECRET')}`,
	},
  timeout: 3000
};

export const harvestClient: AxiosInstance = axios.create(config);

harvestClient.interceptors.response.use((response: AxiosResponse) => {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, (error: AxiosError) => {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	if (error.response) {
		console.error(`Invalid response: ${error.response.status}, ${error.message} `);
	} else if (error.request) {
		console.error(`Request failed: ${error.request}`);
	} else {
		console.error(`Something failed: ${error.message}`);
	}
	return Promise.reject(error);
});
