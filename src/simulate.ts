import * as random from 'random-js';

import { EnemyData, GetQuestDropsData, RewardData } from './graphql';

export interface Rated {
    rate: number;
}

export interface Drop {
    wave: number;
    enemy: EnemyData;
    mana: number;
    drop: RewardData;
}

const rng = new random.Random(random.browserCrypto);

function chooseOne<T extends Rated>(list: T[]): T {
    let value = rng.realZeroToOneExclusive();
    for (const item of list) {
        if (value < item.rate) {
            return item;
        }
        value -= item.rate;
    }
    return list[list.length - 1];
}

export function simulateQuestDrop(data: GetQuestDropsData): Drop[] {
    if (data.quest == null) {
        throw new Error('퀘스트 정보가 없습니다.');
    }
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

export function sumDrops(data: Drop[][]): Drop[] {
    const bins = new Map<string, Drop>();
    for (const list of data) {
        for (const reward of list) {
            if (reward.drop.item != null) {
                const key = `item/${reward.drop.item.id}`;
                if (!bins.has(key)) {
                    bins.set(key, {
                        wave: 0,
                        enemy: { name: '', unit: { id: 0 } },
                        mana: 0,
                        drop: {
                            rate: 0,
                            count: 0,
                            item: { ...reward.drop.item },
                        },
                    });
                }
                const bin = bins.get(key)!;
                bin.mana += reward.mana;
                bin.drop.count! += reward.drop.count!;
            }
            if (reward.drop.equipment != null) {
                const key = `equipment/${reward.drop.equipment.id}`;
                if (!bins.has(key)) {
                    bins.set(key, {
                        wave: 0,
                        enemy: { name: '', unit: { id: 0 } },
                        mana: 0,
                        drop: {
                            rate: 0,
                            count: 0,
                            equipment: { ...reward.drop.equipment },
                        },
                    });
                }
                const bin = bins.get(key)!;
                bin.mana += reward.mana;
                bin.drop.count! += reward.drop.count!;
            }
        }
    }
    return [...bins.values()];
}
