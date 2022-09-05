import { VolumeUp } from '@mui/icons-material';
import styled from 'styled-components';

export const StyledResultsItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  text-transform: none;
  font-size: 1.2rem;
`;

export const StyledAudioIcon = styled(VolumeUp)`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
