/* eslint-disable */
import { FC, useEffect } from 'react';
import { BASE_URL } from '../../../../redux/thunks';
import StyledAudioIcon from './Audio.styles';
import { IAudioProps } from './types';
import { isGameBeforeDic } from '../../../Games page/Games'

const Audiotrack: FC<IAudioProps> = ({ src, count, setcount }) => {  
    const track = new Audio(`${BASE_URL}/${src}`);
    useEffect(() => {
        const user = localStorage.getItem('authData');
        setcount(count + 1);
            
        if (count === 0 && !user && isGameBeforeDic) {
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