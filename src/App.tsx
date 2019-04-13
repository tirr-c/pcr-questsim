import React from 'react';

import QuestFetcher from './QuestFetcher';

import { GqlContext } from './context';
import { Client } from './graphql';

export default function App() {
    const [client, setClient] = React.useState<Client | undefined>(undefined);
    React.useEffect(() => {
        import('./graphql')
            .then(({ setupApolloClient }) => setupApolloClient(AMES_ENDPOINT))
            .then(setClient);
    }, []);

    return (
        <GqlContext.Provider value={{ client }}>
            <h2>프리코네R 퀘스트 시뮬레이터</h2>
            <QuestFetcher />
        </GqlContext.Provider>
    );
}
