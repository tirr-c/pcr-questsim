import * as random from 'random-js';

import { EnemyData, GetQuestDropsData, RewardData } from './graphql';

interface Rated {
    rate: number;
}

interface Drop {
    wave: number;
    enemy: EnemyData;
    mana: number;
    drop: RewardData;
}

const rng = new random.Random(random.browserCrypto);

function chooseOne<T extends Rated>(list: T[]): T {
    const value = rng.realZeroToOneExclusive();
    for (const item of list) {
        if (value < item.rate) {
            return item;
        }
    }
    return list[list.length - 1];
}

export function simulateQuestDrop(data: GetQuestDropsData): Drop[] {
    const rewards = [];
    const groups = data.quest.waveGroups;
    for (let i = 0; i < groups.length; ++i) {
        const group = groups[i];
        const wave = chooseOne(group.possibleWaves);
        for (const drop of wave.drops.filter(drop => drop.reward.length > 0)) {
            const reward = chooseOne(drop.reward);
            rewards.push({
                wave: i + 1,
                enemy: drop.by,
                mana: drop.mana,
                drop: reward,
            });
        }
    }
    return rewards;
}
