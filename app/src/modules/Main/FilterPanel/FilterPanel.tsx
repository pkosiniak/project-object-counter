import React, { Component } from 'react';
import * as P from './parts'
import dataStrings from '../../../Utils/dataStrings';
import { IFilter } from '../../../Store/types';
import FilterColumn from './FilterColumn';

interface FilterPanelOwnProps {
   maxSize: number,
   isImageLoaded: boolean,
}

export interface FilterPanelProps {
   processedFilterListPush: (filter: IFilter, modify: boolean, send?: boolean) => void,
   modify: boolean,
   selectedFilter?: IFilter,
   applyFilters: () => void,
}

type FilterPanelType = FilterPanelProps & FilterPanelOwnProps;

interface FilterPanelState {
   firstParamValue: number,
   secondParamValue: number,
}

class FilterPanel extends Component<FilterPanelType, FilterPanelState> {
   constructor(props: FilterPanelType) {
      super(props)
      this.state = {
         firstParamValue: -1,
         secondParamValue: -1,
      }
   }

   componentDidUpdate(prevProps: FilterPanelType) {
      const selectedFilter = this.props.selectedFilter
      if ((!prevProps.selectedFilter && selectedFilter)
         || (prevProps.selectedFilter?.name !== selectedFilter?.name)
      ) {
         if (selectedFilter.params[0])
            this.setState({ firstParamValue: selectedFilter.params[0].default })
         if (selectedFilter.params[1])
            this.setState({ secondParamValue: selectedFilter.params[1].default })
      }
   }

   handleFirstSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
      this.setState({ firstParamValue: typeof newValue === 'number' ? newValue : newValue[0] });
   }

   handleSecondSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
      this.setState({ secondParamValue: typeof newValue === 'number' ? newValue : newValue[0] });
   }

   handleFirstInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      this.setState({ firstParamValue: Number(event.target.value) });
   }

   handleSecondInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      this.setState({ secondParamValue: Number(event.target.value) });
   }

   handleFirstScrollEvent = (newValue: number) => {
      this.setState({ firstParamValue: this.state.firstParamValue + newValue });
   }
   handleSecondScrollEvent = (newValue: number) => {
      this.setState({ secondParamValue: this.state.secondParamValue + newValue });
   }

   handleApplyClick = () => {
      const { selectedFilter, processedFilterListPush, modify } = this.props;
      const { firstParamValue, secondParamValue } = this.state;
      if (!selectedFilter) return;


      const newFilter = selectedFilter;
      if (newFilter.params.length > 0)
         newFilter.params[0].default = firstParamValue;
      if (newFilter.params.length > 1)
         newFilter.params[1].default = secondParamValue;
      processedFilterListPush(newFilter, modify, true);

   }

   render() {
      const { selectedFilter, maxSize, isImageLoaded } = this.props;
      const { firstParamValue, secondParamValue } = this.state;

      const firstParams = selectedFilter?.params[0];
      const secondParams = selectedFilter?.params[1];

      return (
         <P.Wrapper>
            <P.H3>{selectedFilter?.displayName || dataStrings.SelectFilter}</P.H3>
            <P.HorizontalWrapper>
               {firstParams && (
                  <FilterColumn
                     handleInputChange={this.handleFirstInputChange}
                     handleSliderChange={this.handleFirstSliderChange}
                     handleScrollEvent={this.handleFirstScrollEvent}
                     paramValue={firstParamValue}
                     param={firstParams}
                     size={maxSize}
                  />
               )}
               {secondParams && (
                  <FilterColumn
                     handleInputChange={this.handleSecondInputChange}
                     handleSliderChange={this.handleSecondSliderChange}
                     handleScrollEvent={this.handleSecondScrollEvent}
                     paramValue={secondParamValue}
                     param={secondParams}
                     size={maxSize}
                  />
               )}
            </P.HorizontalWrapper>
            <P.ApplyButton
               boldText={true}
               disabled={!selectedFilter || !isImageLoaded}
               variant="outlined"
               size="large"
               onClick={this.handleApplyClick}
            >
               {dataStrings.Apply}
            </P.ApplyButton>
         </P.Wrapper>
      )
   }
}

export default FilterPanel;
