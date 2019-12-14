import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import styled from 'styled-components';
import { colors } from '../styles/colors';

export const ImageIconPlaceholder = styled(ImageIcon)`
   color: ${colors.darker};
`;

export const Wrapper = styled.div`
   display: flex;
   flex-grow: 1;
   flex-shrink: 0;
   flex-basis:calc(20vh - 16px);
   border: 1px solid ${colors.lighter};
   justify-content: center;
   align-items: center;
   background-color: ${colors.MSBlue};
`;

const ImagePlaceholder: React.FC = () => {
   return (
      <Wrapper >
         <ImageIconPlaceholder fontSize="large" />
      </Wrapper>
   )
}

export default ImagePlaceholder;
