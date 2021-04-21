import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject,
} from 'n8n-workflow';

export async function portApiRequest(this: IHookFunctions | ILoadOptionsFunctions | IExecuteFunctions | IExecuteSingleFunctions, method: string, document: string, body: any = {}, qs: IDataObject = {}, uri?: string): Promise<any> { // tslint:disable-line:no-any

    const authToken = await getToken.call(this);
	const portApiBase = this.getNodeParameter('portApiBase', 0) as string;
    console.log(`${portApiBase}${document}`);
    const options: OptionsWithUri = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        method,
        qs,
        body,
        uri: uri || `${portApiBase}${document}`,
        json: true
    }
    
	try {
		return await this.helpers.request!(options);

	} catch (error) {
		throw error;
	}
}

export async function getToken(this: IHookFunctions | ILoadOptionsFunctions | IExecuteFunctions | IExecuteSingleFunctions): Promise<any> { // tslint:disable-line:no-any
	const portApiBase = this.getNodeParameter('portApiBase', 0) as string;
    const credentials = this.getCredentials('portApi') as IDataObject;
	if (credentials === undefined) {
		throw new Error('No credentials got returned!');
	}

    const authOptions: OptionsWithUri = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        form: {
            'client_id': credentials.user,
            'client_secret': credentials.password,
            'grant_type': 'client_credentials',
        },
        uri: `${portApiBase}oauth/token`,
        json: true,
    };

	try {
		const response = await this.helpers.request!(authOptions);

		if (typeof response === 'string') {
			throw new Error('Response body is not valid JSON. Change "Response Format" to "String"');
		}

		return response.access_token;
	} catch (error) {
		throw error;
	}
}
