import React from 'react';
import {
   AppState,
   IFilterList,
   AppError,
   IFilter,
   defaultState,
   IImageFilterDict,
   IBaseImages,
   IImageMeta,
   ICommandList
} from './types';
import axios from 'axios';
import routes from './routes';
import filterListReducer from './filterListReducer';
import { fetchProcessed } from './requests';

export interface StoreProps {
   children: (props: {
      setSelectedFilterId: (filterId: number) => void,
      imageHistoryPush: (image: Blob, filters: IFilter[]) => void,
      setSelectedImageId: (imageId: number, setFilter?: boolean) => void,
      processedFilterListPush: (filter: IFilter, modify: boolean, send?: boolean) => void,
      setBaseImages: (original?: File, gray?: Blob, histogram?: Blob) => void,
      setImageMeta: (imageMeta: IImageMeta) => void,
      setCommandList: (commandList: ICommandList) => void,
      applyFilters: () => void,
      setModify: (modify: boolean) => void,
      jsonFL: IFilterList,
      selectedFilterId: number,
      imageHistory: IImageFilterDict[],
      selectedImageId: number,
      processedFilterList: IFilter[],
      baseImages: IBaseImages,
      imageMeta: IImageMeta,
      commandList: ICommandList;
      modify: boolean;
   }) => React.ReactNode
}

export interface StoreState extends AppState {
   isJsonLoading: boolean;
   hasError: AppError;
}

export type StoreType = StoreState & Partial<AppState>;

class Store extends React.Component<StoreProps, StoreType> {
   state = {
      ...defaultState,
      isJsonLoading: false,
      hasError: {
         jsonFL: false,
         images: false
      }
   }

   componentDidMount() {
      this.setState({ isJsonLoading: true })
      axios.get(routes.filters).then(res => {
         this.setState({ jsonFL: res.data as IFilterList })
      }).catch(error => {
         this.setState({
            hasError: {
               images: this.state.hasError.images,
               jsonFL: true,
            }
         })
      }).finally(() => this.setState({ isJsonLoading: false }));
   }

   setSelectedFilterId = (filterId: number) => {
      this.setState({ selectedFilterId: filterId });
   }

   imageHistoryPush = (image: Blob, filters: IFilter[]) => {
      const images = this.state.imageHistory;
      images.push({ image, filters });
      this.setState({ imageHistory: images });
   }

   setSelectedImageId = (imageId: number, setFilter?: boolean) => {
      this.setState({ selectedImageId: imageId }, () => {
         if (!setFilter) return;

         const { imageHistory, selectedImageId, jsonFL } = this.state;
         const filterList = imageHistory[selectedImageId].filters;

         if (!filterList[filterList.length - 1]?.name) return;

         this.setState({
            processedFilterList: filterList,
            selectedFilterId: jsonFL.filterList.findIndex(
               (fl) => fl.name === filterList[filterList.length - 1].name
            )
         });
      });
   }

   processedFilterListPush = (filter: IFilter, modify: boolean, send?: boolean) => {
      const filterList = this.state.processedFilterList.concat();
      modify
         ? filterList[filterList.length - 1] = filter
         : filterList.push(filter);
      this.setState({
         processedFilterList: filterList,
         commandList: filterListReducer(filterList)
      }, () => {
         if (send) this.applyFilters();
      });
   }

   setCommandList = (commandList: ICommandList) => {
      this.setState({ commandList });
   }

   setBaseImages = (original?: File, gray?: Blob, histogram?: Blob) => {
      this.setState({
         baseImages: {
            original,
            gray,
            histogram
         }
      });
   }

   setImageMeta = (imageMeta: IImageMeta) => {
      this.setState({ imageMeta });
   }

   applyFilters = () => {
      const { commandList, processedFilterList, imageHistory } = this.state;
      const newSelectedId = imageHistory.length;
      fetchProcessed(routes.processor, commandList).then(
         (res) => {
            this.imageHistoryPush(res, processedFilterList);
            this.setSelectedImageId(newSelectedId);
         }
      )
   }

   setModify = (modify: boolean) => this.setState({ modify });

   render = () => {
      return this.props.children({
         setSelectedFilterId: this.setSelectedFilterId,
         imageHistoryPush: this.imageHistoryPush,
         setSelectedImageId: this.setSelectedImageId,
         processedFilterListPush: this.processedFilterListPush,
         setBaseImages: this.setBaseImages,
         setImageMeta: this.setImageMeta,
         setCommandList: this.setCommandList,
         applyFilters: this.applyFilters,
         setModify: this.setModify,
         ...this.state
      });
   }
}

export default Store;
