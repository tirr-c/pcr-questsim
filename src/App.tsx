import React from 'react';

import QuestFetcher from './QuestFetcher';
import { Client, GqlContext, setupApolloClient } from './graphql';

export default function App() {
    const [client, setClient] = React.useState<Client | undefined>(undefined);
    React.useEffect(() => {
        setupApolloClient(AMES_ENDPOINT).then(setClient);
    }, []);

    return (
        <GqlContext.Provider value={{ client }}>
            <h1>프리코네R 드랍 시뮬레이터</h1>
            <QuestFetcher />
        </GqlContext.Provider>
    );
}
