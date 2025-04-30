'use client';

import { useState } from "react";
import { useEffect } from "react";
import { MotionValue } from "./motion-value.js";

export function MVList() {
    const [values, setValues] = useState([]);
    const [names, setNames] = useState([]);
    const [modifiers, setModifiers] = useState([]);

    useEffect(() => {
        async function fetchMotionData() {
            try {
                const response = await fetch("https://mhw-db.com/motion-value");
                if (!response.ok) {
                    throw new Error("Failed to fetch motion data");
                }
                const data = await response.json();
                
            } catch (error) {
                setError(error.message);
            }
        }
    })
}