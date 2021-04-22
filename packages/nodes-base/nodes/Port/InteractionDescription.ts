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
                description: 'Engagement',
            },
            {
                name: 'Note',
                value: 'note',
                description: 'Note',
            }
        ],
        default: 'activity',
        description: 'Type of interaction',
    },
    {
        displayName: 'Description',
        name: 'interactionDescription',
        type: 'string',
        displayOptions: {
            show: {
                resource: [
                    'interaction',
                ]
            },
        },
        required: true, 
        description: 'The description of the interaction',        
    },
    {
        displayName: 'Score name',
        name: 'scoreName',
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
                name: 'Engagement',
                value: 'engagement',
            },
            {
                name: 'Reach',
                value: 'reach',
            },
            {
                name: 'Relevance',
                value: 'relevance',
            }
        ],
        default: 'Engagement',
        required: true,
        description: 'Type of score related to the interaction.'
    },
    {
        displayName: 'Score size',
        name: 'scoreSize',
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
                name: 'S',
                value: 'S',
            },
            {
                name: 'M',
                value: 'M',
            },
            {
                name: 'L',
                value: 'L',
            }
        ],
        default: 'M',
        required: true,
        description: 'Score size related to the interaction.'
    },    
    {
		displayName: 'Score value',
		name: 'scoreValue',
		type: 'number',
        displayOptions: {
            show: {
                resource: [
                    'interaction',
                ]
            },
        },
		typeOptions: {
			minValue: 1,
			maxValue: 250,
		},
		default: 50,
		description: 'Score value assigned to the interaction.',
	},        
] as INodeProperties[];