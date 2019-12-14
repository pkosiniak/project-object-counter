import styled from 'styled-components';
import { colors } from "../../styles/colors";
import { BottombarHeight } from "../Bottombar/parts";
import { topbarHeight } from "../Topbar/parts";

export const MainContainer = styled.div`
   display: flex;
   justify-content: space-around;
   position: relative;
   flex-direction: row;
   width: 100%;
   height: calc(${100 - BottombarHeight}% - ${topbarHeight}px);
   padding: 8px;
`;

export const FilterColumn = styled.span`
   background-color: ${colors.dark};
   margin: 8px 0;
   /* TODO: maybe less ? */
   min-width: 200px;
   min-height: 400px;
`;

export const ImageColumn = styled.span`
   background-color: ${colors.MSBlue};
   margin: 8px 0;
   /* TODO: maybe less ? */
   min-width: 400px;
   min-height: 400px;
   flex: 0 0 40%;
`;
