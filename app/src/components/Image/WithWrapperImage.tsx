import React, { Component, createRef } from 'react';
import { Wrapper, ISize, ImageFitProps } from './parts';
import Image from './Image';


interface WithWrapperImageProps extends ImageFitProps {
   image: Blob;
   onClick: () => void;
   square?: number;
}

class WithWrapperImage extends Component<WithWrapperImageProps, ISize> {
   state = {
      width: 0,
      height: 0
   }

   wrapperRef = createRef<HTMLDivElement>();

   componentDidMount() {
      window.addEventListener('resize', () => {
         this.setState({
            width: this.wrapperRef.current?.clientWidth ?? 0,
            height: this.wrapperRef.current?.clientHeight ?? 0
         });
      })
   }

   render() {
      const { image, onClick, imageFit, square } = this.props;
      const { height, width } = this.state;
      return (
         <Wrapper
            onClick={onClick}
            ref={this.wrapperRef}
            width={square}
            height={square}>
            {image.size > 0 &&
               <Image
                  imageFit={imageFit}
                  width={square ?? this.wrapperRef.current?.clientWidth ?? width}
                  height={square ?? this.wrapperRef.current?.clientHeight ?? height}
                  src={image}
               />}
         </Wrapper>
      )
   }
}

export default WithWrapperImage;
