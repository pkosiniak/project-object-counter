import styled from 'styled-components';
import StyledButton from '../../../components/Button/StyledButton';
import { fontBase } from '../../../styles/fonts';

export const Wrapper = styled.span`
   display: flex;
   flex-grow: 1;
`;

export const FiltersLabel = styled.span`
   ${fontBase};
   font-size: 14px;
   line-height: 24px;
`;

interface ButtonProps {
   isLast: boolean
}

export const Button = styled(StyledButton) <ButtonProps>`
   border-right-style: ${({ isLast }) => isLast ? 'solid' : 'none'};
`;

export const ButtonWrapper = styled.span`
   flex: 0 0 auto;
`;
