import React, { useState } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import { ICommandList } from '../../../Store/types';

export interface JsonTerminalProps {
   commandList: ICommandList;
}

const JsonTerminal: React.FC<JsonTerminalProps> = ({ commandList }) => {
   // TODO: need for sending commands using JSON terminal
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [value, setValue] = useState('');
   const onJsonChange = (newValue: string) => setValue(newValue)

   return (
      <AceEditor
         placeholder="JSON Terminal"
         mode="json"
         theme="twilight"
         name="JSONTerminal"
         onChange={onJsonChange}
         fontSize={14}
         showPrintMargin={true}
         showGutter={true}
         highlightActiveLine={true}
         value={JSON.stringify(commandList)}
         wrapEnabled
         enableBasicAutocompletion
         enableLiveAutocompletion
         enableSnippets
         tabSize={3}
         setOptions={{
            showLineNumbers: true,
            tabSize: 3,
         }}
         style={{
            minWidth: '400px',
            width: 'initial',
            height: '100%'
         }}
      />
   )
}

export default JsonTerminal
