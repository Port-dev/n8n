export function searchMemberPayload(tenantUri : string, dataSource: string, member: string) {
    return {
        "filters": [
            {
                "field": "firstsegmenturi",
                "op": "eq",
                "args": {
                    "values": [
                        tenantUri
                    ]
                }
            },
            {
                "field": "type",
                "op": "eq",
                "args": {
                    "values": [
                        6
                    ]
                }
            },
           {
                "field": `data.sources.${dataSource}.aggregated_ids.string_user_id`,
                "op": "containsanytexts",
                "args": {
                    "values": [
                        member
                    ]
                }
            }
     
        ],
        "paging": {
            "page": 0,
            "pagesize": 1
        }
    };
}
//@TODO refactor
export function getAllMembersPayload(tenantUri: string, 
                                     page: number, 
                                     pageSize: number, 
                                     communityStatus: number[], 
                                     engagementRating?: string[]){

    let engagementRatingString;
    if(typeof engagementRating !== 'undefined'){
        engagementRatingString = `
        ,
        {
            "field": "data.scores.engagement.rating",
            "op":"strin",
            "args": {
                "values" : [
                    ${'"' + engagementRating.join('","') + '"'}
                ]
            }
        }`; 
    }else{
        engagementRatingString = '';
    }

    return JSON.parse(`{
        "filters": [
            {
                "field": "firstsegmenturi",
                "op": "eq",
                "args": {
                    "values": [
                        "${tenantUri}"
                    ]
                }
            },
            {
                "field": "type",
                "op": "eq",
                "args": {
                    "values": [
                    6
                    ]
                }
            },    
            {
                "field": "data.additional_data.community_status",
                "op": "intin",
                "args": {
                    "values" : [${communityStatus}]
                }
            }
            ${engagementRatingString}                
        ],
        "paging": {
            "page": ${page},
            "pagesize": ${pageSize}
        }
    }`);
}


export function createMemberPayload(memberUri: string, 
                                    sourceName: string, 
                                    bio?: string,
                                    creationDate?: Date,
                                    fullName?: string,
                                    imageUrl?: string,
                                    city?: string,
                                    profileUrl?: string,
                                    website?: string,
                                    additionalData : any = {}){
    let payload = JSON.parse(`
    {
        "type": 6,
         "uri": "${memberUri}",
         "data": {
           "sources": {
             "${sourceName}" : { 
               "items": [
                 {
                   "bio": "${bio}",
                   "created_date": "${creationDate}",
                   "display_name": "${memberUri}",
                   "full_name": "${fullName}",
                   "image_url": "${imageUrl}",
                   "location": {
                     "city": "${city}"
                   },
                   "profile_url": "${profileUrl}",
                   "string_user_id": "abc", 
                   "website": "${website}"
                 }
               ]
             }
           }
        }
    }`);
    console.log(JSON.stringify(payload));
    return payload;
}

export function createInteractionPayload(interactionType: string,                                          
                                         description: string, 
                                         scoreName: string,
                                         scoreValue: number,
                                         scoreSize: string,
                                         uri:string = 'interaction', 
                                         link?: string,                                          
                                         postTitle?: string, 
                                         postBody?: string){
    const interactionDict: { [key : string]: number} = {
        "engagement" : 8,
        "activity" : 9,
        "note" :4
    };  
   
    let payload:any = {
        "type": interactionDict[interactionType],
        "uri": uri,
        "data": {
            "description": description,
            "scores": [
                {
                    "name": scoreName,
                    "original_value": scoreValue,
                    "size": scoreSize,
                }
            ]
        }
    };

    if(link){
        payload.link = link;
    }
    if(postTitle){
        payload.post_title = postTitle;
    }
    if(postBody){
        payload.post_body = postBody;
    }
    
    console.log(JSON.stringify(payload));
    return payload;
}