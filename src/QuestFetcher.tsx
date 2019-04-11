import React from 'react';

import SimulateResult from './SimulateResult';

import { GetQuestDropsData, GqlContext, getQuestDrops } from './graphql';
import { Drop, simulateQuestDrop } from './simulate';

export default function QuestFetcher() {
    const { client } = React.useContext(GqlContext);
    const [fetching, setFetching] = React.useState(false);
    const [partialName, setPartialName] = React.useState('');
    const [questType, setQuestType] = React.useState<'NORMAL' | 'HARD'>('NORMAL');
    const [dropsData, setDropsData] = React.useState<Drop[] | undefined>(undefined);

    const handlePartialNameChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPartialName(e.target.value);
        },
        [],
    );
    const handleQuestTypeChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setQuestType(e.target.value as ('NORMAL' | 'HARD'));
        },
        [],
    );
    const handleFetchData = React.useCallback(
        async () => {
            if (client == null) {
                return;
            }
            setFetching(true);
            const result = await getQuestDrops(client, partialName, questType);
            const drops = simulateQuestDrop(result.data);
            setDropsData(drops);
            setFetching(false);
        },
        [client, partialName, questType],
    );

    return (
        <div>
            <label htmlFor="partial-name">퀘스트 지역</label>
            <input
                id="partial-name"
                value={partialName}
                onChange={handlePartialNameChange}
            />
            <label htmlFor="quest-type">퀘스트 난이도</label>
            <select
                id="quest-type"
                value={questType}
                onChange={handleQuestTypeChange}
            >
                <option value="NORMAL">노멀</option>
                <option value="HARD">하드</option>
            </select>
            <button disabled={client == null || fetching} onClick={handleFetchData}>
                {client == null ? '접속 중' : '실행'}
            </button>
            {dropsData != null && <SimulateResult data={dropsData} />}
        </div>
    );
}
