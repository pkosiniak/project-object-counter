import React from 'react';
import { StyledImage, ImageStyleType } from './parts'

const getImage = (base64Image: Blob) => {
   return URL.createObjectURL(base64Image)
};

export interface ImageProps extends ImageStyleType {
   src: Blob;
}

export const Image: React.FC<ImageProps> = ({ src, width, height, imageFit }) => (
   <StyledImage width={width} height={height} imageFit={imageFit} src={getImage(src)} />
)

export default Image;
