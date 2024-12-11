'use client';

import { useState, useEffect } from "react";

export function Weapon({ name, type, rarity, attack, elements, damageType, attributes }) {

    return (
        <div>
            <h3>Name: {name}</h3>
            <p>Type: {type}</p>
            <p>Rarity: {rarity}</p>
            <p>Attack: {attack}</p>
            <p>Elements: {elements}</p>
            <p>PartBreak Type: {damageType}</p>
            <p>Affinity: {attributes}</p>
        </div>
    );
}

