
export interface IParam {
   name: string;
   min: number;
   max: number | 'undefined';
   default: number;
}

export interface IFilter {
   name: string;
   displayName: string;
   params: IParam[]
}

export interface IFilterList {
   filterList: IFilter[];
}

export interface IImageFilterDict {
   image: Blob;
   filters: IFilter[];
}

export interface IBaseImages {
   original?: File;
   gray?: Blob;
   histogram?: Blob;
}

export interface IImageMeta {
   sizes: {
      x: number,
      y: number,
      maxFilterRange: number
   }
}

export interface ICommandList {
   'commandList': {
      'command': string;
      'args': number[];
   }[];
}

export interface AppState {
   jsonFL: IFilterList;
   selectedFilterId: number;
   imageHistory: IImageFilterDict[];
   selectedImageId: number;
   processedFilterList: IFilter[];
   baseImages: IBaseImages;
   imageMeta: IImageMeta;
   commandList: ICommandList;
   modify: boolean;
}

// ERRORS

export interface AppError {
   jsonFL: boolean;
   images: boolean;
}


// DEFAULTS

export const defaultState: AppState = {
   jsonFL: {
      filterList: []
   },
   selectedFilterId: -1,
   imageHistory: [],
   selectedImageId: -1,
   processedFilterList: [],
   baseImages: {},
   imageMeta: {
      sizes: {
         x: -1,
         y: -1,
         maxFilterRange: -1
      }
   },
   commandList: { 'commandList': [] },
   modify: false,
}
