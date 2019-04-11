import React from 'react';

import DropIcon from './DropIcon';
import { Drop } from './simulate';

interface Props {
    data: Drop[];
}

export default function SimulateResult(props: Props) {
    const { data } = props;
    const totalMana = data.reduce((acc, reward) => acc + reward.mana, 0);
    const nodes = data.map((reward, idx) => {
        const drop = reward.drop;
        let iconNode = undefined;
        if (drop.equipment != null || drop.item != null) {
            return <DropIcon key={idx} drop={drop} />;
        } else {
            return null;
        }
    }).filter(node => node != null);

    return (
        <>
            <div>
                {nodes}
            </div>
            <div>Mana: {totalMana}</div>
        </>
    );
}
