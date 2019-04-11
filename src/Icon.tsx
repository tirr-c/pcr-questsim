import React from 'react';

export enum IconType {
    Unit,
    Equipment,
    EquipmentInvalid,
    Item,
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    iconId: number;
    type: IconType;
}

function getBasePath(type: IconType): string {
    switch (type) {
        case IconType.Unit: return 'unit';
        case IconType.Equipment: return 'equipment';
        case IconType.EquipmentInvalid: return 'equipment/invalid';
        case IconType.Item: return 'item';
        default: ((type: never) => { throw new Error(`Invalid icon type ${type}`); })(type);
    }
}

export default function Icon(props: Props) {
    const { iconId, type, ...imgProps } = props;
    const url = new URL(`/icons/${getBasePath(type)}/${iconId}.png`, AMES_STATICS);
    return <img {...imgProps} src={url.toString()} />;
}
