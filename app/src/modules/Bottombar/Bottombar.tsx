import React from 'react';
import * as P from "./parts";
import dataStrings from '../../Utils/dataStrings';
import JsonTerminal, { JsonTerminalProps } from './JsonTerminal/JsonTerminal';
import HistorySlider, { HistorySliderProps } from './HistorySlider/HistorySlider';
import { IImageFilterDict } from '../../Store/types';

export interface BottombarProps {
   imageHistory: IImageFilterDict[];
}

export type BottombarTypes = HistorySliderProps & BottombarProps & JsonTerminalProps;

const Bottombar: React.FC<BottombarTypes> = ({
   selectedImageId,
   setSelectedImageId,
   imageHistory,
   commandList,
   setModify,
}) => {

   const images = imageHistory.map((pair) => pair.image)

   return (
      <P.Wrapper>
         <P.InternalWrapper>
            <P.TerminalLabel>
               {dataStrings.JSON_Terminal}
            </P.TerminalLabel>
            <JsonTerminal
               commandList={commandList}
            />
         </P.InternalWrapper>
         <P.VerticalSpace16 />
         <P.InternalWrapper>
            <HistorySlider
               setModify={setModify}
               setSelectedImageId={setSelectedImageId}
               imageHistory={images}
               selectedImageId={selectedImageId}
            />
         </P.InternalWrapper>
      </P.Wrapper>
   )
}

export default Bottombar

