import React from 'react';

import Icon, { IconType } from './Icon';
import { RewardData } from './graphql';

import * as styles from './DropIcon.css';

interface Props {
    drop: RewardData;
}

export default function DropIcon(props: Props) {
    const { drop } = props;
    let iconNode;
    if (drop.equipment != null) {
        iconNode = (
            <Icon
                key={drop.equipment.id}
                type={IconType.Equipment}
                iconId={drop.equipment.id}
                alt={drop.equipment.name}
                title={drop.equipment.name}
            />
        );
    } else if (drop.item != null) {
        iconNode = (
            <Icon
                key={drop.item.id}
                type={IconType.Item}
                iconId={drop.item.id}
                alt={drop.item.name}
                title={drop.item.name}
            />
        );
    } else {
        return null;
    }

    return (
        <div className={styles.container}>
            {iconNode}
            <span className={styles.count}>{drop.count}</span>
        </div>
    );
}
