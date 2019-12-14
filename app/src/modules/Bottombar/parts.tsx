import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { fontBase } from '../../styles/fonts';

export const BottombarHeight = 20;

export const Wrapper = styled.div`
   display: flex;
   justify-content: stretch;
   width: 100%;
   height: ${BottombarHeight}%;
   background-color: ${colors.dark};
   padding: 8px 16px;
`;

export const InternalWrapper = styled.span`
   display: flex;
   flex-direction: column;
   width: 50%;
`;

export const TerminalLabel = styled.h6`
   ${fontBase};
   font-size: 10px;
   margin: 4px;
   padding: 0;
`;

export const VerticalSpace16 = styled.span`
   width: 16px;
`;