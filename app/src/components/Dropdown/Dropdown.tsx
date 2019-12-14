import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { colors } from '../../styles/colors';



const theme = createMuiTheme({
   overrides: {
      MuiPaper: {
         root: {
            backgroundColor: colors.darker,
            color: colors.lighter,
         }
      },
      MuiSelect: {
         root: {
            backgroundColor: colors.darker,
            color: colors.lighter,
            '&&:focus': {
               backgroundColor: colors.darker,
               color: colors.lighter,
            }
         },
         icon: {
            fill: colors.lighter
         }
      },
      MuiInput: {
         underline: {
            '&&&&:hover:not($disabled):before': {
               borderColor: colors.lighter,
               color: colors.lighter,
            },
            '&&:before': {
               borderColor: colors.lighter,
               color: colors.lighter,
            },
         }
      }
   }
})

export interface DropdownProps {
   items: {
      name: string,
      value: string
   }[],
   setSelected: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ items, setSelected }) => {
   const [value, setValue] = React.useState<string>(items[0].name ?? '');
   const [isOpen, setIsOpen] = React.useState(false);

   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      setValue(value);
      setSelected(value);
   };

   const handleClose = () => {
      setIsOpen(false);
   };

   const handleOpen = () => {
      setIsOpen(true);
   };

   return (
      <ThemeProvider theme={theme}>
         <FormControl style={{ position: 'fixed' }}>
            <Select
               labelId="dropdown-label"
               id="dropdown"
               open={isOpen}
               onClose={handleClose}
               onOpen={handleOpen}
               value={value}
               onChange={handleChange}
            >
               {items.length > 0 && items.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
               ))}
            </Select>
         </FormControl>
      </ThemeProvider>
   );
};

export default Dropdown;
