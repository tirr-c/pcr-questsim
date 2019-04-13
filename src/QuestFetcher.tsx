import React from 'react';

import SimulateResult from './SimulateResult';

import { GqlContext } from './context';
import { GetQuestDropsData } from './graphql';
import { Drop, simulateQuestDrop } from './simulate';

import * as styles from './QuestFetcher.css';

export default function QuestFetcher() {
    const { client } = React.useContext(GqlContext);
    const [fetching, setFetching] = React.useState(false);
    const [partialName, setPartialName] = React.useState('');
    const [questType, setQuestType] = React.useState<'NORMAL' | 'HARD'>('NORMAL');
    const [repeatCount, setRepeatCount] = React.useState<number | undefined>(1);
    const [questName, setQuestName] = React.useState('');
    const [dropsData, setDropsData] = React.useState<Drop[][] | undefined>(undefined);
    const [error, setError] = React.useState<string | undefined>(undefined);

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
    const handleRepeatCountChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === '') {
                setRepeatCount(undefined);
                return;
            }

            const parsed = Number(value);
            if (!Number.isNaN(parsed) && Number.isInteger(parsed) && parsed >= 0) {
                setRepeatCount(parsed);
            }
        },
        [],
    );
    const handleFetchData = React.useCallback(
        async () => {
            if (client == null) {
                return;
            }
            try {
                setError(undefined);
                if (repeatCount == null) {
                    throw new Error('반복 횟수를 입력해 주세요.');
                } else if (repeatCount <= 0) {
                    throw new Error('반복 횟수는 0보다 큰 정수여야 합니다.');
                }

                setFetching(true);
                const { getQuestDrops } = await import('./graphql');
                const result = await getQuestDrops(client, partialName, questType);
                if (result.data.quest == null) {
                    throw new Error('퀘스트가 존재하지 않습니다.');
                }
                const drops = Array.from({ length: repeatCount }, () => simulateQuestDrop(result.data));
                setQuestName(`${result.data.quest.name} ${result.data.quest.area.type}`);
                setDropsData(drops);
            } catch (err) {
                setError(err.message);
            }
            setFetching(false);
        },
        [client, partialName, questType, repeatCount],
    );

    return (
        <div>
            <div className={styles.queryForm}>
                <label htmlFor="partial-name">퀘스트 지역</label>
                <input
                    id="partial-name"
                    value={partialName}
                    onChange={handlePartialNameChange}
                />
                <br />
                <label htmlFor="quest-type">퀘스트 난이도</label>
                <select
                    id="quest-type"
                    value={questType}
                    onChange={handleQuestTypeChange}
                >
                    <option value="NORMAL">노멀</option>
                    <option value="HARD">하드</option>
                </select>
                <br />
                <label htmlFor="repeat-count">반복 횟수</label>
                <input
                    id="repeat-count"
                    type="number"
                    value={repeatCount == null ? '' : String(repeatCount)}
                    onChange={handleRepeatCountChange}
                />
                <button disabled={client == null || fetching} onClick={handleFetchData}>
                    {client == null ? '접속 중' : '실행'}
                </button>
            </div>
            {error != null && <div className={styles.error}>{error}</div>}
            {dropsData != null && (
                dropsData.map(drops => <><hr /><SimulateResult data={drops} /></>)
            )}
        </div>
    );
}
