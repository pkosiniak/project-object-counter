import React, { createRef, useEffect } from 'react';
import { IParam } from '../../../Store/types';
import * as P from './parts';
import { Mark } from '@material-ui/core';

interface FilterColumnProps {
   param?: IParam;
   paramValue: number;
   handleSliderChange: (event: React.ChangeEvent<{}>, newValue: number | number[]) => void
   handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
   handleScrollEvent: (newValue: number) => void;
   size: number;
}

const sliderRef = createRef<HTMLSpanElement>();

const FilterColumn: React.FC<FilterColumnProps> = ({
   param,
   handleSliderChange,
   handleInputChange,
   paramValue,
   handleScrollEvent,
   size
}) => {
   useEffect(() => {
      const wheelEventHandler = (event: WheelEvent) => {
         if (event.deltaY === 0
            || !param
            || paramValue <= param?.min
            || !max
            || paramValue >= max
         ) return;
         handleScrollEvent(event.deltaY > 0 ? 1 : -1);
      }
      sliderRef.current?.addEventListener('wheel', wheelEventHandler);
      return () => {
         sliderRef.current?.removeEventListener('wheel', wheelEventHandler);
      };
   })

   const max = param?.max === 'undefined' ? size : param?.max;
   const marks: Mark[] = param && max
      ? [
         {
            value: param.min,
            label: param.min
         }, {
            value: max,
            label: max
         }
      ] : [];

   const getValue = (value: number, defaultValue?: number) => value < 0
      ? defaultValue ?? value
      : value;

   return (
      <P.FilterParamWrapper>
         <P.H6>{param?.name}</P.H6>
         <P.StyledSlider
            disabled={!param}
            orientation="vertical"
            value={getValue(paramValue, param?.default)}
            aria-labelledby="vertical-slider"
            marks={marks}
            min={param?.min}
            max={max}
            onChange={handleSliderChange}
         />
         <P.NumericInput
            disabled={!param}
            value={getValue(paramValue, param?.default)}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
               step: 1,
               min: param?.min,
               max: max,
               type: 'number',
               'aria-labelledby': 'input-slider',
            }}
         />
      </P.FilterParamWrapper>
   )
}

export default FilterColumn;
