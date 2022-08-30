import { VolumeUp } from '@mui/icons-material';
import styled from 'styled-components';

const StyledAudioIcon = styled(VolumeUp)`
  margin-bottom: 30px;
  margin-right: 15px;
  font-size: 2rem;
  line-height: 3rem;
  cursor: pointer;
  color: #111827;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 980px) {
    margin-bottom: 0;
  }
`;

export default StyledAudioIcon;
