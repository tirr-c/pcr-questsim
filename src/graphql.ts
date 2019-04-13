import React from 'react';
import { InMemoryCache, IntrospectionFragmentMatcher, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

export type Client = ApolloClient<NormalizedCacheObject>;
export const GqlContext = React.createContext<{ client?: Client }>({ client: undefined });

const gqlGetQuestDrops = require('./queries/getQuestDrops.gql');
export type EnemyData = {
    name: string;
    unit: {
        id: number;
    };
};
export type RewardData = {
    rate: number;
    count?: number;
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
        name: string;
        area: {
            type: 'NORMAL' | 'HARD' | 'ADVENTURE';
        };
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
    } | null;
};

export async function setupApolloClient(endpoint: string): Promise<Client> {
    const result = await (await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        mode: 'cors',
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
    client: Client,
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
