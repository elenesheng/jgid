import React, { useContext, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { SettingsStateContext, TimerStateContext } from '@/app/contexts/TimerContext';

const WhiteNoisePlayer = () => {
    const settings = useContext(SettingsStateContext)!;
    const { isWhiteNoise } = settings;
    const soundRef = useRef<Howl | null>(null);
    const timer = useContext(TimerStateContext)!;

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
            if (isWhiteNoise && timer.isRunning) {
                soundRef.current.play();
            } else {
                soundRef.current.pause();
            }
        }
    }, [isWhiteNoise, timer.isRunning]);

    return null;
};

export default WhiteNoisePlayer;
