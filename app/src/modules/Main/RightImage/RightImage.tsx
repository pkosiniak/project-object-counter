import React, { Component, createRef } from 'react';
import { Image } from '../../../components/Image/Image';
import { ISize } from '../../../components/Image/parts';
import { ImageColumn } from '../parts';


interface RightImageProps {
   rightImage: Blob,
}

class RightImage extends Component<RightImageProps, ISize> {
   state = {
      width: 0,
      height: 0
   }

   rightImageRef = createRef<HTMLSpanElement>();

   componentDidMount() {
      window.addEventListener('resize', () => {
         this.setState({
            width: this.rightImageRef.current?.clientWidth ?? 0,
            height: this.rightImageRef.current?.clientHeight ?? 0
         })
      })
   }

   render() {
      const { rightImage } = this.props;
      return (
         <ImageColumn ref={this.rightImageRef} >
            {
               rightImage.size > 0 &&
               <Image
                  imageFit="contain"
                  width={this.rightImageRef.current?.clientWidth}
                  height={this.rightImageRef.current?.clientHeight}
                  src={rightImage}
               />
            }
         </ImageColumn>
      )
   }
}

export default RightImage;
