import { IFilter } from './types';

const filterListReducer = (filterList: IFilter[]) => {
   return {
      'commandList': filterList.map((filter) => ({
         'command': filter.name,
         'args': filter.params.map(param => param.default)
      }))
   }
}

export default filterListReducer;