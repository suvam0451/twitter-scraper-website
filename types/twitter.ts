export type UserMetaData = {
    data?: {
        id: string;
        name: string;
        username: string;
    };
    errors?: {
        value: string;
        detail: string;
        title: string;
        resource_type: string;
        parameter: string;
        resource_id: 'syannhaine';
        type: 'https://api.twitter.com/2/problems/resource-not-found';
    };
};

export type UserTweetsResponse = {
    data: {
        id: string;
        possibly_sensitive: boolean;
        text: string;
    }[];
    meta: {
        oldest_id: string;
        newest_id: string;
        result_count: 100;
        next_token: string;
    };
};