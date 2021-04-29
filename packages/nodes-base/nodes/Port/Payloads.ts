import { id } from "rhea";
import { addAdditionalFields } from "../Telegram/GenericFunctions";

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


export function createMemberPayload(memberUri: string, additionalFields: any){    

    let language = additionalFields.language;
    let bio = additionalFields.bio;
    let description = additionalFields.description;
    let position = additionalFields.position;
    let organization = additionalFields.organization;
    let fullName = additionalFields.fullName;
    let displayName = additionalFields.displayName;
    let city = additionalFields.city;
    let website = additionalFields.website;
    let tags = additionalFields.tags;
    let discourseProfile = additionalFields.discourseProfile;
    let twitterProfile = additionalFields.twitterProfile;
    let githubProfile = additionalFields.githubProfile;
    let stackoverflowProfile = additionalFields.stackoverflowProfile;

    let payload:any = {
        "type":6,
        "uri": memberUri,
        "data":{
           "sources":{
              "discourse":{
                 "items":[
                    {
                       "profile_url": (discourseProfile)? discourseProfile : "",
                    }
                 ]
              },
              "twitter":{
                 "items":[
                    {
                       "string_user_id": (twitterProfile)? twitterProfile : "",
                    }
                 ]
              },
              "github":{
                 "items":[
                    {
                       "string_user_id": (githubProfile)? githubProfile : "",
                    }
                 ]
              },
              "stackoverflow":{
                 "items":[
                    {
                        "string_user_id": (stackoverflowProfile)? stackoverflowProfile : "",
                    }
                 ]
              }
           }
        }
    }    
    if(language){
        payload.language = language;
    }
    if(description){
        payload.description = description;
    }
    if(bio){
        payload.data.bio = bio;
    }
    if(position){
        payload.data.position = position;
    }
    if(organization){
        payload.data.org = organization;
    }
    if(fullName){
        payload.data.full_name = fullName;
    }
    if(displayName){
        payload.data.display_name = displayName;
    }
    if(website){
        payload.data.website = website;
    }
    if(city){
        payload.data.location = {};
        payload.data.location.city = city;
    }
    if(tags){
        payload.data.tags = tags;
    }

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