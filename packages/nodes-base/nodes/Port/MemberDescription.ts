import {
	INodeProperties,
} from 'n8n-workflow';

export const memberOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a member'
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search a member'
            },
            {
                name: 'Get all',
                value: 'getAll',
                description: 'Get all members'
            }
        ],
        default: 'create',
        description: 'The operation to perform.'
    },
] as INodeProperties[];


export const memberFields = [
    {
        displayName: 'Member name',
        name: 'memberName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'member',
                    'interaction'
                ],
                operation: [
                    'search',
                    'create'
                ],
            },
        },
        description: 'Member name.'
    },            
    {
        displayName: 'Source',
        name: 'dataSource',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
                operation: [
                    'search'
                ],
            },
        },
        description: 'Data source.'
    },
    {
        displayName: 'Community Status',
        name: 'communityStatus',
        type: 'multiOptions',
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
                operation: [
                    'getAll',
                ],
            },
        },
        options: [
            {
                name: 'Discover',
                value: 0,
            },
            {
                name: 'Suggestions',
                value: 1,
            },
            {
                name: 'My community',
                value: 2,
            }
        ],
        default: [0,1,2], // Initially selected options
        description: 'The community status of members.',
    },
    {
        displayName: 'Engagement Rating',
        name: 'engagementRating',
        type: 'multiOptions',
        displayOptions: {
            show: {
                communityStatus: [
                    2,
                ],
            },
        },
        options: [
            {
                name: 'Super Fans',
                value: 'Super Fans',
            },
            {
                name: 'Fans',
                value: 'Fans',
            },
            {
                name: 'Losing',
                value: 'Losing',
            },
            {
                name: 'Engaged',
                value: 'Engaged',
            },
            {
                name: 'Promising',
                value: 'Promising',
            },
            {
                name: 'Adrift',
                value: 'Adrift',
            },
            {
                name: 'At Risk',
                value: 'At Risk',
            },
            {
                name: 'Moved On',
                value: 'Moved On',
            },
            {
                name: 'Not Seen',
                value: 'Not Seen',
            },
            {
                name: 'Gone',
                value: 'Gone',
            },
        ],
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
                operation: [
                    'getAll',
                ],
            },
        },
        default: false,
        description: 'If all results should be returned or only up to a given limit.',
    },
    {
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					'member',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 250,
		},
		default: 100,
		description: 'How many results to return.',
	},    
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
                operation: [
                    'getAll',
                ],
            },
        },
        options: [    
            {
                displayName: 'Creation date',
                name: 'creationDate',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'City',
                name: 'city',
                type: 'string',
                default: ''
            },
        ],
    },                
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'member',
                ],
                operation: [
                    'create',
                ],
            },
        },
        options: [
            {
                displayName: 'Language',
                name: 'language',
                type: 'string',
                default: '',
            },            
            {
                displayName: 'Biography',
                name: 'bio',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                default: '',
            },            
            {
                displayName: 'Position',
                name: 'position',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Organization',
                name: 'organization',
                type: 'string',
                default: '',
            },                                    
            {
                displayName: 'Full name',
                name: 'fullName',
                type: 'string',
                default: ''
            },
            {
                displayName: 'Display name',
                name: 'displayName',
                type: 'string',
                default: '',
            },            
            {
                displayName: 'City',
                name: 'city',
                type: 'string',
                default: ''
            },
            {
                displayName: 'Website',
                name: 'website',
                type: 'string',
                default: ''
            },
            {
                displayName: 'Tags',
                name: 'tags',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Discourse profile',
                name: 'discourseProfile',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Twitter profile',
                name: 'twitterProfile',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Github profile',
                name: 'githubProfile',
                type: 'string',
                default: '',
            },
            {
                displayName: 'StackOverflow profile',
                name: 'stackoverflowProfile',
                type: 'string',
                default: '',
            },                                                            
        ],
    },
] as INodeProperties[];