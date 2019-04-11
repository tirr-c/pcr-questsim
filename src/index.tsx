import React from 'react';
import ReactDOM from 'react-dom';

import { setupApolloClient, getQuestDrops } from './graphql';
import { simulateQuestDrop } from './simulate';

setupApolloClient(AMES_ENDPOINT).then(client => {
    return getQuestDrops(client, '7-1', 'NORMAL');
}).then(result => {
    for (let i = 1; i <= 5; ++i) {
        console.log(`=== Trial ${i} ===`);
        const rewards = simulateQuestDrop(result.data);
        let totalMana = 0;
        for (const reward of rewards) {
            const name = reward.enemy.name;
            totalMana += reward.mana;
            const drop = reward.drop;
            let dropText = '';
            if (drop.equipment != null) {
                dropText = `equipment ${drop.equipment.name}[${drop.equipment.id}]`;
            } else if (drop.item != null) {
                dropText = `item ${drop.item.name}[${drop.item.id}]`;
            } else {
                dropText = 'nothing';
            }

            console.log(`Wave ${reward.wave}: ${dropText} from ${name}`);
        }
        console.log(`Dropped ${totalMana} Mana`);
    }
});

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <div />,
    app,
);

if (module.hot) {
    module.hot.dispose(() => {
        document.body.removeChild(app);
    });
}
