/* eslint-disable react/function-component-definition */
import { FC, useEffect } from 'react';
import { BASE_URL } from '../../../../redux/thunks';
import StyledAudioIcon from './Audio.styles';
import { IAudioProps } from './types';

const Audiotrack: FC<IAudioProps> = ({ src }) => {
  const track = new Audio(`${BASE_URL}/${src}`);
  useEffect(() => {
    track.play();
  }, [src]);
  return <StyledAudioIcon onClick={() => track.play()} />
}

const MemoizedAudio = Audiotrack;

export default MemoizedAudio;