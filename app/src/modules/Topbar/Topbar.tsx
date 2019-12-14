import React from 'react'
import * as P from './parts'
import LoadImage, { LoadImageProps } from './LoadImage/LoadImage';
import FilterList, { FilterListProps } from './FilterList/FilterList';

export type TopbarProps = LoadImageProps & FilterListProps;


const Topbar: React.FC<TopbarProps> = ({
   imageHistoryPush,
   setBaseImages,
   jsonFL,
   setSelectedFilterId,
   setImageMeta,
   setSelectedImageId,
   imageHistoryLength,
   setModify,
   isBinaryImage
}) => {
   return (
      <P.TopbarWrapper>
         <LoadImage
            setImageMeta={setImageMeta}
            imageHistoryPush={imageHistoryPush}
            setBaseImages={setBaseImages}
            setSelectedImageId={setSelectedImageId}
            imageHistoryLength={imageHistoryLength}
         />
         <FilterList
            setModify={setModify}
            jsonFL={jsonFL}
            setSelectedFilterId={setSelectedFilterId}
            isBinaryImage={isBinaryImage}
         />
      </P.TopbarWrapper>
   )
}

export default Topbar;
