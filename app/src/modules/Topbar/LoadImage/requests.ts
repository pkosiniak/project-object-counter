import axios from 'axios';
import { IImageMeta } from '../../../Store/types';

export const fetchGray = async (route: string, formData: FormData): Promise<Blob | Error> => {
   return await axios.post(route, formData, {
      headers: {
         'content-type': 'multipart/form-data'
      },
      responseType: 'blob'
   }).then(
      (res) => {
         return res.data as Blob
      }
   ).catch((error: Error) => error);
}

export const fetchHistogram = async (route: string): Promise<Blob> => {
   try {
      const res = await axios.get(route, {
         responseType: "blob"
      });
      return res.data as Blob;
   }
   catch (error) {
      return error;
   }
}

export const fetchImageMeta = async (route: string): Promise<IImageMeta> => {
   try {
      const res = await axios.get(route, {
         responseType: "json"
      });
      return res.data;
   }
   catch (error) {
      return error;
   }
}
