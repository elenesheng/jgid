"use client";

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EXPIRATION_TIME } from '../lib/constants';

interface StoredItem<T> {
    value: T;
    timestamp: number;
}

export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
    expireAfter12Hours: boolean = false
): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsedItem: StoredItem<T> = JSON.parse(item);
                if (expireAfter12Hours && Date.now() - parsedItem.timestamp > EXPIRATION_TIME) {
                    window.localStorage.removeItem(key);
                    return initialValue;
                }
                return parsedItem.value;
            }
            return initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const item: StoredItem<T> = { value: storedValue, timestamp: Date.now() };
                window.localStorage.setItem(key, JSON.stringify(item));
            } catch (error) {
                console.error(error);
            }
        }
    }, [storedValue, key]);

    useEffect(() => {
        if (expireAfter12Hours) {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsedItem: StoredItem<T> = JSON.parse(item);
                if (Date.now() - parsedItem.timestamp > EXPIRATION_TIME) {
                    window.localStorage.removeItem(key);
                    setStoredValue(initialValue);
                }
            }
        }
    }, [key, initialValue, expireAfter12Hours]);

    return [storedValue, setStoredValue];
}
