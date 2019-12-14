import React, { Component, createRef } from 'react';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import SlideList from '../../../components/SlideList/SlideList';
import * as P from "./parts";
import WithWrapperImage from '../../../components/Image/WithWrapperImage';


export interface HistorySliderOwnProps {
   imageHistory: Blob[];
}

export interface HistorySliderProps {
   setSelectedImageId: (imageId: number, setFilter?: boolean) => void;
   selectedImageId: number;
   setModify: (modify: boolean) => void,
}

export type HistorySliderType = HistorySliderProps & HistorySliderOwnProps;

class HistorySlider extends Component<HistorySliderType> {

   wrapperRef = createRef<HTMLSpanElement>();

   render() {
      const { imageHistory, setSelectedImageId, setModify,
      } = this.props;

      const handleClick = (index: number) => {
         setSelectedImageId(index, true);
         setModify(true);
      }

      return (
         <P.Wrapper ref={this.wrapperRef}>
            <SlideList>
               {
                  imageHistory.length > 0
                     ?
                     imageHistory.map((img, i) => (
                        <WithWrapperImage
                           key={'history_' + i}
                           onClick={() => handleClick(i)}
                           image={img}
                           imageFit="cover"
                           square={this.wrapperRef.current?.clientHeight}
                        />
                     ))
                     : (<ImagePlaceholder />)
               }
            </SlideList>
         </P.Wrapper>
      );
   }
}

export default HistorySlider;
