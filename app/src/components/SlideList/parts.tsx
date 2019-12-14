import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { IconButton } from '@material-ui/core';

export const HorizontalList = styled.ul`
   display: flex;
   overflow-x: auto;
   overflow-y: hidden;
   list-style: none;
   margin: 0;
   padding: 0;
`;

export const HorizontalListItem = styled.li`
   display: inline-block;
`;

export const HorizontalListWrapper = styled.span`
   overflow-x: auto;
   overflow-y: hidden;
   display: flex;
   flex-grow: 1;
   width: 0;
   &::-webkit-scrollbar {
      height: 0px;
   }
   scroll-snap-type: x mandatory;
   scroll-behavior: smooth;
`;

export const ScrollButton = styled(IconButton)`
   padding: 0;
   border-radius: 0;
   color: ${colors.lighter};
   border: 1px solid ${colors.lighter};
`;