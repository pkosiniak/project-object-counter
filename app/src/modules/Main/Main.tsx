import React from 'react';
import * as P from "./parts";
import FilterPanel, { FilterPanelProps } from './FilterPanel/FilterPanel';
import { IImageMeta, IBaseImages } from '../../Store/types';
import RightImage from './RightImage/RightImage';
import LeftImage from './LeftImage/LeftImage';

interface MainProps {
   leftImage: Blob,
   baseImages: IBaseImages,
   rightImage: Blob,
   imageMeta: IImageMeta
}

export type MainType = MainProps & FilterPanelProps;

const Main: React.FC<MainType> = ({
   selectedFilter,
   processedFilterListPush,
   applyFilters,
   modify,
   rightImage,
   imageMeta,
   baseImages,
   leftImage
}) => (
      <P.MainContainer>
         <LeftImage baseImages={baseImages} leftImage={leftImage} />
         <RightImage rightImage={rightImage} />
         <P.FilterColumn >
            <FilterPanel
               maxSize={imageMeta.sizes.maxFilterRange}
               selectedFilter={selectedFilter}
               processedFilterListPush={processedFilterListPush}
               applyFilters={applyFilters}
               modify={modify}
               isImageLoaded={rightImage.size > 0}
            />
         </P.FilterColumn>
      </P.MainContainer>
   );


export default Main;
