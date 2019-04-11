import React from 'react';

import { Drop } from './simulate';

interface Props {
    data: Drop[];
}

export default function SimulateResult(props: Props) {
    const { data } = props;
    const totalMana = data.reduce((acc, reward) => acc + reward.mana, 0);
    const nodes = data.map((reward, idx) => {
        const drop = reward.drop;
        let dropText = '';
        if (drop.equipment != null) {
            dropText = `equipment ${drop.equipment.name}[${drop.equipment.id}]`;
        } else if (drop.item != null) {
            dropText = `item ${drop.item.name}[${drop.item.id}]`;
        } else {
            dropText = 'nothing';
        }
        return (
            <div key={idx}>
                <div>{reward.enemy.name}</div>
                <div>{dropText}</div>
            </div>
        );
    });

    return (
        <>
            {nodes}
            <div>Mana: {totalMana}</div>
        </>
    );
}
