import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IDataObject,
} from 'n8n-workflow';

import { 
    portApiRequest,
} from './GenericFunctions';

import {
    searchMemberPayload, 
    createMemberPayload,
    getAllMembersPayload,    
} from './Payloads';

import {
    memberFields,
    memberOperations,
} from './MemberDescription';

import {
    interactionFields,
    interactionOperations
} from './InteractionDescription';

export class Port implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Port',
        name: 'port',
        icon: 'file:port.svg',
        group: ['transform'],
        version: 1,
        description: 'Port API',
        defaults: {
            name: 'Port',
            color: '#1A82e2',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'portApi',
                required: true,
            },
        ],
        properties: [
            // Node properties which the user gets displayed and
            // can change on the node.
            {
                displayName: 'Port API base',
                name: 'portApiBase',
                type: 'string',
                required: true,
                default: 'https://port-api-stage.appgreenhouse.io/api/v2/',
                description: 'Port API base',
            },
            {
                displayName: 'Tenant URI',
                name: 'tenantUri',
                type: 'string',
                required: true,
                default: '',
                description: 'URI of a Port tenant',
            },            
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Member',
                        value: 'member',
                    },
                    {
                        name: 'Interaction',
                        value: 'interaction'
                    }
                ],
                default: 'member',
                required: true,
                description: 'Resource to consume.'
            },
            // MEMBER
            ...memberOperations,
            ...memberFields,
            // INTERACTIONS
            ...interactionOperations,
            ...interactionFields                            
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length as unknown as number;        
        let responseData;
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        const tenantUri = this.getNodeParameter('tenantUri', 0) as string;       
        for (let i = 0; i < length; i++) {
            if (resource === 'member') {
                if (operation === "getAll") {                
                    const returnAll = this.getNodeParameter('returnAll', 0) as boolean;
                    const communityStatus = this.getNodeParameter('communityStatus', 0) as number[];
                    const engagementRating = this.getNodeParameter('engagementRating', 0) as string[];

                    const returnData: IDataObject[] = [];
                    const pageSize = 50;

                    let payload = getAllMembersPayload(tenantUri, 0, pageSize, communityStatus, engagementRating);
                    responseData = await portApiRequest.call(this, 'POST', 'search/member', payload);
                    let totalMembers = responseData['count'];
                    returnData.push.apply(returnData, responseData['items']);

                    let numberEntries;
                    if(returnAll){
                        numberEntries = totalMembers;
                    }else{
                        const limit = this.getNodeParameter('limit', 0) as number;
                        numberEntries = limit;
                    }                
                    let pagesToFetch = Math.ceil(numberEntries/pageSize);
                    let lastPageSize = numberEntries % pageSize;

                    for(let page = 1; page < pagesToFetch; page++){
                        if(page === pagesToFetch - 1){
                            payload = getAllMembersPayload(tenantUri, page, lastPageSize, communityStatus, engagementRating);
                        }else{
                            payload = getAllMembersPayload(tenantUri, page, pageSize, communityStatus, engagementRating);
                        }
                        responseData = await portApiRequest.call(this, 'POST', 'search/member', payload);
                        returnData.push.apply(returnData, responseData['items']);
                    }                
                    responseData = returnData;
                }
                if (operation === 'search') {
                    const dataSource = this.getNodeParameter('dataSource', 0) as string;
                    const memberName = this.getNodeParameter('memberName', 0) as string;                
                    let payload = searchMemberPayload(tenantUri, dataSource, memberName);
                    responseData = await portApiRequest.call(this, 'POST', 'search/member', payload);
                }
                if(operation === 'create'){
                    const dataSource = this.getNodeParameter('dataSource', 0) as string;
                    const memberName = this.getNodeParameter('memberName', 0) as string;
                    let payload = createMemberPayload(memberName,dataSource);
                    responseData = await portApiRequest.call(this, 'POST', `documents/integration-member/${tenantUri}`, payload);                   
                }
            }
            if (resource === 'interaction') {
                if (operation === 'create') {
                    //Auth in Port API with given creds
                    const memberName = this.getNodeParameter('memberName', 0) as string;                
                    //let payload = createInteraction()
                    //responseData = await portApiRequest.call(this, 'POST', `api/v2/documents/${tenantUri}?create_relationship_type=interaction%20of%20member&relationship_to_uri=${tenantUri}/${memberName}>`, payload);                
                }
            }
            if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}
        }
        // Map data to n8n data
        return [this.helpers.returnJsonArray(returnData)];
    }
}