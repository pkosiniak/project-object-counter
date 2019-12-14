import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { colors } from '../../styles/colors';

interface StyledButtonMUIComponent {
   component?: string
}

interface ExtendedStyledButtonProps {
   boldText?: boolean
}

export type StyledButtonProps = StyledButtonMUIComponent & ExtendedStyledButtonProps;

export const StyledButton = styled(Button) <StyledButtonProps>`
   color: ${colors.lighter};
   border-radius: 0%;
   border-color: ${colors.lighter};
   font-weight:  ${({ boldText }) => boldText ? 'bold' : 'normal'};
`;


export default StyledButton;