import { InMemoryCache, IntrospectionFragmentMatcher, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const gqlGetQuestDrops = require('./queries/getQuestDrops.gql');
export type EnemyData = {
    name: string;
};
export type RewardData = {
    rate: number;
    equipment?: {
        id: number;
        name: string;
    };
    item?: {
        id: number;
        name: string;
    };
};
export type GetQuestDropsData = {
    quest: {
        waveGroups: {
            possibleWaves: {
                rate: number;
                drops: {
                    by: EnemyData;
                    mana: number;
                    reward: RewardData[];
                }[];
            }[];
        }[];
    };
};

export async function setupApolloClient(endpoint: string): Promise<ApolloClient<NormalizedCacheObject>> {
    const result = await (await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            variables: {},
            query: `
                {
                    __schema {
                        types {
                            kind
                            name
                            possibleTypes {
                                name
                            }
                        }
                    }
                }
            `,
        }),
    })).json();
    const filteredData = result.data.__schema.types.filter((type: any) => type.possibleTypes != null);
    const introspectionQueryResultData = {
        __schema: {
            types: filteredData,
        }
    };
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
    });
    const cache = new InMemoryCache({ fragmentMatcher });
    return new ApolloClient({
        cache,
        link: new HttpLink({
            uri: endpoint,
        }),
    });
}

export function getQuestDrops(
    client: ApolloClient<NormalizedCacheObject>,
    partialName: string,
    type: 'NORMAL' | 'HARD',
): Promise<ApolloQueryResult<GetQuestDropsData>> {
    return client.query({
        query: gqlGetQuestDrops,
        variables: {
            partialName,
            type,
        },
    });
}
