import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const topbarHeight = 36;

export const TopbarWrapper = styled.div`
   width: 100vw;
   height: ${topbarHeight}px;
   background-color: ${colors.dark};
   display: flex;
`;