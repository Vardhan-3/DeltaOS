import { useState, useEffect } from 'react';
import { subscribe } from '../data/store';

export function useStoreRefresh() {
    const [, setTick] = useState(0);
    useEffect(() => {
        const unsub = subscribe(() => setTick(t => t + 1));
        return () => { unsub(); };
    }, []);
}
