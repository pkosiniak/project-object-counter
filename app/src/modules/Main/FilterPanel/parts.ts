import styled from 'styled-components';
import { fontBase } from '../../../styles/fonts';
import { Input, Slider } from '@material-ui/core';
import StyledButton from '../../../components/Button/StyledButton';
import { colors } from '../../../styles/colors';

export const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   height: 100%;
   padding: 8px;
   flex: 0 0 20%;
`;

export const H3 = styled.h3`
   ${fontBase}
   padding: 0;
   margin: 16px 0 0;
   max-width: 140px;
   min-height: 44px;
`;

export const HorizontalWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

export const FilterParamWrapper = styled.span`
   display: flex;
   min-height: 200px;
   height: 280px;
   margin: 8px;
   flex-direction: column;
   align-items: center;
`;


export const H6 = styled.h6`
   ${fontBase}
   max-width: 76px;
   min-height: 24px;
   padding: 0;
   margin: 8px;
   display: flex;
   align-items: center;
`

export const StyledSlider = styled(Slider)`
   color: ${colors.MSBlue};
   & > .MuiSlider-markLabel{
      color: ${colors.lighter};
   }
`;

export const NumericInput = styled(Input)`
   margin: 8px 0;
   width: 52px;
   color: ${colors.lighter};
   
   & > input {
      text-align: center;
   }

   &::before, &::after, &:hover::before{
      border-color: ${colors.lighter};
      color: ${colors.lighter};
   }
`;


export const ApplyButton = styled(StyledButton)`
   margin: 16px 0;
`;