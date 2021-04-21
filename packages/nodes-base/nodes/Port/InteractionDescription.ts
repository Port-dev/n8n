import {
	INodeProperties,
} from 'n8n-workflow';

export const interactionOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'interaction',
                ],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create an interaction'
            },
        ],
        default: 'create',
        description: 'The operation to perform'
    },
] as INodeProperties[];

export const interactionFields = [
    {
        displayName: 'Type',
        name: 'interactionType',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'interaction',
                ]
            },
        },
        options: [
            {
                name: 'Activity',
                value: 'activity',
                description: 'Activity',
            },
            {
                name: 'Engagement',
                value: 'engagement',
                description: 'Engagement'
            },
        ],
        default: 'activity',
        description: 'Type of interaction'
    },
] as INodeProperties[];