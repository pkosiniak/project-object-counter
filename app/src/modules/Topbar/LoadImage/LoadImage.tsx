import React, { Component, ChangeEvent } from 'react';
import * as P from './parts';
import dataStrings from '../../../Utils/dataStrings';
import StyledButton from '../../../components/Button/StyledButton';
import routes from '../../../Store/routes';
import { IFilter, IImageMeta } from '../../../Store/types';
import { fetchGray, fetchHistogram, fetchImageMeta } from './requests';


export interface LoadImageProps {
   setBaseImages: (original: File, gray: Blob, histogram: Blob) => void,
   imageHistoryPush: (image: Blob, filters: IFilter[]) => void,
   setImageMeta: (imageMeta: IImageMeta) => void,
   setSelectedImageId: (imageId: number) => void,
   imageHistoryLength: number,
}

interface LoadImageState {
   image: File | null | undefined;
}

class LoadImage extends Component<LoadImageProps, LoadImageState> {

   handleSubmit = (image: File) => {
      const {
         imageHistoryPush,
         setBaseImages,
         setImageMeta,
         setSelectedImageId,
         imageHistoryLength
      } = this.props;
      let gray: Blob = new Blob();
      setBaseImages(image, new Blob(), new Blob());

      const formData = new FormData();
      formData.append('image', image, image.name);

      fetchGray(routes.upload, formData)
         .then((res: Blob | Error) => {
            if (res instanceof Error) return res;
            gray = res;
            imageHistoryPush(res, []);
            setSelectedImageId(imageHistoryLength);
            return null;
         }, (error: Error) => error)
         .then((hasError: Error | null) => {
            if (hasError) return hasError;

            fetchHistogram(routes.histogram).then(
               (res: Blob) => {
                  setBaseImages(image, gray, res)
               }
            );
            fetchImageMeta(routes.imageSize).then(
               (res: IImageMeta) => {
                  setImageMeta(res)
               }
            );
         });
   }

   handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.item(0);
      this.setState({ image: image }, () => {
         if (image)
            this.handleSubmit(image);
      });
   }

   render() {
      return (
         <span>
            <P.UploadInput
               type="file"
               accept="image/*"
               id="uploadImage"
               onChange={this.handleInputChange}
            />
            <label htmlFor="uploadImage">
               <StyledButton
                  variant="outlined"
                  component="span"
               >
                  {dataStrings.Upload}
               </StyledButton>
            </label>
         </span>
      );
   }
}

export default LoadImage