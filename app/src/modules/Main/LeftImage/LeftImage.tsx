import React, { Component, createRef } from 'react';
import { Image } from '../../../components/Image/Image';
import { ISize } from '../../../components/Image/parts';
import { IBaseImages } from '../../../Store/types';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { ImageColumn } from '../parts';


interface LeftImageProps {
   leftImage: Blob,
   baseImages: IBaseImages,
}

interface LeftImageState extends ISize {
   selected: string;
}

class LeftImage extends Component<LeftImageProps, LeftImageState> {
   state = {
      width: 0,
      height: 0,
      selected: '',
   }

   leftImageRef = createRef<HTMLSpanElement>();

   componentDidMount() {
      window.addEventListener('resize', () => {
         this.setState({
            width: this.leftImageRef.current?.clientWidth ?? 0,
            height: this.leftImageRef.current?.clientHeight ?? 0
         })
      })
   }

   setSelected = (value: string) => {
      if (!value) return;
      this.setState({ selected: value });
   }

   render() {
      const { leftImage, baseImages } = this.props;
      const { selected } = this.state;
      const imageList = [
         {
            image: baseImages.original,
            name: 'Original',
         }, {
            image: baseImages.gray,
            name: 'Grayscale',
         }, {
            image: baseImages.histogram,
            name: 'Histogram',
         },
      ];

      if (leftImage)
         imageList.concat({
            image: leftImage,
            name: 'Previous',
         })

      const items = imageList.map((img) => ({
         name: img.name,
         value: img.name,
      }))

      const image = imageList.find((img) => img.name === selected)?.image
         ?? baseImages.original
         ?? new Blob();

      return (
         <ImageColumn ref={this.leftImageRef}>
            {
               baseImages.original && (
                  <>
                     <Dropdown
                        items={items}
                        setSelected={this.setSelected}
                     />
                     <Image
                        imageFit="contain"
                        width={this.leftImageRef.current?.clientWidth}
                        height={this.leftImageRef.current?.clientHeight}
                        src={image}
                     />
                  </>
               )
            }
         </ImageColumn>
      );
   }
}

export default LeftImage;
