import axios from 'axios';
import { ICommandList } from './types';


export const fetchProcessed = async (route: string, jsonData: ICommandList): Promise<Blob> => {
   try {
      const res = await axios.post(route, jsonData, {
         headers: {
            'content-type': 'application/json'
         },
         responseType: 'blob'
      });
      return res.data;
   }
   catch (error) {
      return error;
   }
}