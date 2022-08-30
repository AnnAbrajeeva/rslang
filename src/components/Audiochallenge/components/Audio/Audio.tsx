/* eslint-disable no-plusplus */
/* eslint-disable react/function-component-definition */
import { FC, useEffect } from 'react';
import { BASE_URL } from '../../../../redux/thunks';
import StyledAudioIcon from './Audio.styles';
import { IAudioProps } from './types';


const Audiotrack: FC<IAudioProps> = ({ src, count, setcount }) => {
    const page = window.document.location.pathname;
    const track = new Audio(`${BASE_URL}/${src}`);
    useEffect(() => {
        const user = localStorage.getItem('authData');
        setcount(count + 1);
        if (count === 0 && !user && page === '/games/audio-calll') {
            console.log('');      
        }
        else {
            track.play();
        }
    }, [src]);
    return <StyledAudioIcon onClick={() => track.play()} />
}

const MemoizedAudio = Audiotrack;

export default MemoizedAudio;