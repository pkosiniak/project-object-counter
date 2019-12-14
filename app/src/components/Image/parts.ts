import styled, { css } from 'styled-components';
import { colors } from '../../styles/colors';

export interface ISize {
   width?: number;
   height?: number;
}

export interface ImageFitProps {
   imageFit?: 'contain' | 'cover';
}

export type ImageStyleType = ISize & ImageFitProps;

export const Wrapper = styled.div<ISize>`
   display: flex;
   flex-grow: 1;
   flex-shrink: 0;
   flex-basis:calc(20vh - 16px);
   border: 1px solid ${colors.lighter};
   justify-content: center;
   align-items: center;
   background-color: ${colors.MSBlue};
   ${({ width, height }) => {
      return width && height && css`
      width: ${width}px;
      height: ${height}px;
      flex-grow: 0;
   ` }}
`;

export const StyledImage = styled.img<ImageStyleType>`
   object-fit: ${({ imageFit = 'contain' }) => imageFit};
   ${({ width, height }) => {
      return width && height && css`
      width: ${width}px;
      height: ${height}px;
   ` }};
   image-rendering: pixelated;
`;
