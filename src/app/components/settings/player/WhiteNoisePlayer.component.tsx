import React, { useContext, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { SettingsStateContext } from '@/app/contexts/TimerContext';

const WhiteNoisePlayer = () => {
    const settings = useContext(SettingsStateContext)!;
    const { isRunning, isWhiteNoise } = settings;
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        soundRef.current = new Howl({
            src: ['/sound/whitenoise.mp3'],
            loop: true
        });

        return () => {
            if(soundRef.current) {
                soundRef.current.unload();
            }
        };
    }, []);

    useEffect(() => {
        if (soundRef.current) {
            if (isRunning && isWhiteNoise) {
                soundRef.current.play();
            } else {
                soundRef.current.pause();
            }
        }
    }, [isRunning, isWhiteNoise]);

    return null;
};

export default WhiteNoisePlayer;
