import React, { Component, createRef } from 'react';
import * as P from './parts';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

interface SlideListProps {

}

interface SlideListState {
   isLeftArrowDisabled: boolean,
   isRightArrowDisabled: boolean,
}

class SlideList extends Component<SlideListProps, SlideListState> {
   state = {
      isLeftArrowDisabled: true,
      isRightArrowDisabled: false
   }

   listRef = createRef<HTMLSpanElement>();

   componentDidMount() {
      this.listRef.current?.addEventListener('wheel', (event: WheelEvent) => {
         if (this.listRef.current)
            this.listRef.current.scrollLeft += event.deltaY > 0 ? 300 : -300;
      });
      this.listRef.current?.addEventListener('scroll', () => {
         const ref = this.listRef.current;

         if (ref)
            this.setState({
               isLeftArrowDisabled: ref.scrollLeft <= 0,
               isRightArrowDisabled: ref.scrollLeft >= ref.scrollWidth - ref.clientWidth
            });
      })
   }

   handleArrowClick = (isLeft: boolean) => {
      if (this.listRef.current)
         this.listRef.current.scrollLeft += isLeft ? -100 : 100;
   }

   handleArrowLeftClick = () => this.handleArrowClick(true);

   handleArrowRightClick = () => this.handleArrowClick(false);

   render() {
      const { children } = this.props;
      const { isLeftArrowDisabled, isRightArrowDisabled } = this.state;
      return (
         <>
            <P.ScrollButton
               onClick={this.handleArrowLeftClick}
               disabled={isLeftArrowDisabled}
            >
               <KeyboardArrowLeft />
            </P.ScrollButton>
            <P.HorizontalListWrapper ref={this.listRef}>
               {children}
            </P.HorizontalListWrapper >
            <P.ScrollButton
               onClick={this.handleArrowRightClick}
               disabled={isRightArrowDisabled}
            >
               <KeyboardArrowRight />
            </P.ScrollButton>
         </>
      )
   }
}

export default SlideList;