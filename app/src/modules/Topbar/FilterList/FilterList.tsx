import React, { useState } from 'react';
import dataStrings from '../../../Utils/dataStrings';
import * as P from './parts';
import SlideList from '../../../components/SlideList/SlideList';
import { IFilterList } from '../../../Store/types';

export interface FilterListProps {
   jsonFL: IFilterList,
   setSelectedFilterId: (filterId: number) => void,
   setModify: (modify: boolean) => void,
   isBinaryImage: boolean
}

const FilterList: React.FC<FilterListProps> = ({
   jsonFL, setSelectedFilterId, setModify, isBinaryImage
}) => {
   const [selected, setSelected] = useState(-1);
   const { filterList } = jsonFL;

   const handleClick = (index: number) => {
      setSelected(index);
      setSelectedFilterId(index);
      setModify(false);
   }

   return (
      <P.Wrapper>
         <P.FiltersLabel>
            {dataStrings.Filters}
         </P.FiltersLabel>
         <SlideList>
            {
               filterList && filterList.map((filter, i) => (
                  <P.ButtonWrapper key={'filter_' + i} >
                     <P.Button
                        disabled={i !== 0 ? !isBinaryImage : false}
                        variant="outlined"
                        isLast={i === filterList.length - 1 || !isBinaryImage}
                        onClick={() => handleClick(i)}
                        value={i}
                        boldText={selected === i}
                     >
                        {filter.displayName}
                     </P.Button>
                  </P.ButtonWrapper>
               ))
            }
         </SlideList>
      </P.Wrapper>
   )
}

export default FilterList;
