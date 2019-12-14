import React from 'react';
import Main from "../modules/Main/Main";
import Topbar from '../modules/Topbar/Topbar';
import Bottombar from '../modules/Bottombar/Bottombar';
import * as P from "./parts";
import { StylesProvider } from '@material-ui/core/styles';
import Store from '../Store/Store';

const App: React.FC = () => {
   return (
      <StylesProvider injectFirst>
         <P.GlobalStyle />
         <Store>
            {({
               imageMeta,
               baseImages,
               imageHistory,
               imageHistoryPush,
               jsonFL,
               processedFilterListPush,
               selectedFilterId,
               selectedImageId,
               setBaseImages,
               setSelectedFilterId,
               setSelectedImageId,
               setImageMeta,
               applyFilters,
               commandList,
               modify,
               setModify,

            }) => {
               const rightImage = () => imageHistory.length
                  ? imageHistory[selectedImageId >= 0 ? selectedImageId : imageHistory.length - 1].image
                  : new Blob();
               const leftImage = () => imageHistory.length > 1
                  ? imageHistory[imageHistory.length - 1].image
                  : new Blob();
               return (
                  <P.AppWrapper>
                     <Topbar
                        imageHistoryPush={imageHistoryPush}
                        setSelectedImageId={setSelectedImageId}
                        jsonFL={jsonFL}
                        setBaseImages={setBaseImages}
                        setSelectedFilterId={setSelectedFilterId}
                        imageHistoryLength={imageHistory.length}
                        setImageMeta={setImageMeta}
                        setModify={setModify}
                        isBinaryImage={commandList.commandList.length > 0}
                     />
                     <Main
                        modify={modify}
                        processedFilterListPush={processedFilterListPush}
                        applyFilters={applyFilters}
                        rightImage={rightImage()}
                        leftImage={leftImage()}
                        selectedFilter={jsonFL.filterList[selectedFilterId]}
                        imageMeta={imageMeta}
                        baseImages={baseImages}
                     />
                     <Bottombar
                        imageHistory={imageHistory}
                        selectedImageId={selectedImageId}
                        setSelectedImageId={setSelectedImageId}
                        commandList={commandList}
                        setModify={setModify}
                     />
                  </P.AppWrapper>
               )
            }}
         </Store>
      </StylesProvider>
   );
};

export default App;
