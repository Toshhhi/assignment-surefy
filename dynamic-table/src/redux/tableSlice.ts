import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Row{ 
    id : number;
    name : string;
    email: string; 
    age: number;
    designation: string;
}

interface TableState {
  rows: Row[];
  search: string;
  sortField: keyof Row | '';
  sortOrder: 'asc' | 'desc';
}

const initialState : TableState =  { 
    rows: [
        {id : 111, name: 'charul', email: 'charulgiri@123.in' , age: 33, designation: 'manager'},
        {id : 112, name: 'priya', email: 'priyag@123.in' , age: 23, designation: 'technical staff'},
        {id : 113, name: 'rahul', email: 'rahulsingh@123.in' , age: 28, designation: 'developer'}
    ],  
    search: '',       
    sortField: '',
    sortOrder: 'asc', 
};

const tableSlice = createSlice({
    name : 'table', 
    initialState,
    reducers: {
         setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<keyof Row>) => {
      const field = action.payload;
      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortOrder = 'asc';
      }
      state.sortField = field;
    }
  }
});

export const { setSearch, setSort } = tableSlice.actions;
export default tableSlice.reducer;