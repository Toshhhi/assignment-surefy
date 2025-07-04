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
  page: number;
}

const initialState : TableState =  { 
    rows: [
        {id : 111, name: 'Charul', email: 'charulgiri@123.in' , age: 33, designation: 'Manager'},
        {id : 112, name: 'Priya', email: 'priyag@123.in' , age: 23, designation: 'Technical staff'},
        {id : 113, name: 'Rahul', email: 'rahulsingh@123.in' , age: 28, designation: 'Developer'},
        { id: 114, name: 'Anjali Mehra', email: 'anjali.mehra@xyz.in', age: 26, designation: 'HR Executive' },
        { id: 115, name: 'Karan Malhotra', email: 'karan.m@abc.in', age: 31, designation: 'Product Manager' },
        { id: 116, name: 'Sneha Kapoor', email: 'sneha.kapoor@workmail.in', age: 29, designation: 'Business Analyst' },
        { id: 117, name: 'Aman Verma', email: 'aman.verma@tech.in', age: 27, designation: 'Frontend Developer' },
        { id: 118, name: 'Divya Singh', email: 'divya.singh@code.in', age: 25, designation: 'UI/UX Designer' },
        { id: 119, name: 'Rohit Sinha', email: 'rohit.sinha@org.in', age: 34, designation: 'Project Manager' },
        { id: 120, name: 'Isha Gupta', email: 'isha.gupta@xyz.in', age: 22, designation: 'Intern' },
        { id: 121, name: 'Vikram Shah', email: 'vikram.shah@abc.in', age: 32, designation: 'QA Engineer' },
        { id: 122, name: 'Neha Rathi', email: 'neha.rathi@company.in', age: 28, designation: 'Backend Developer' },
        { id: 123, name: 'Manish Patel', email: 'manish.p@xyz.in', age: 30, designation: 'Technical Lead' },
        { id: 124, name: 'Preeti Nair', email: 'preeti.nair@abc.in', age: 26, designation: 'Marketing Associate' },
        { id: 125, name: 'Abhishek Das', email: 'abhishek.das@startup.in', age: 29, designation: 'DevOps Engineer' },
        { id: 126, name: 'Riya Chawla', email: 'riya.chawla@xyz.in', age: 24, designation: 'Customer Support' },
        { id: 127, name: 'Saurabh Joshi', email: 'saurabh.j@tech.in', age: 33, designation: 'System Admin' },
        { id: 128, name: 'Megha Jain', email: 'megha.jain@org.in', age: 27, designation: 'Graphic Designer' },
        { id: 129, name: 'Arjun Yadav', email: 'arjun.y@xyz.in', age: 28, designation: 'Mobile Developer' },
        { id: 130, name: 'Tanvi Bansal', email: 'tanvi.b@abc.in', age: 25, designation: 'Business Dev Executive' },
        { id: 131, name: 'Deepak Mishra', email: 'deepak.mishra@startup.in', age: 35, designation: 'CTO' },
        { id: 132, name: 'Shalini Rao', email: 'shalini.rao@company.in', age: 26, designation: 'Content Writer' },
        { id: 133, name: 'Aditya Khanna', email: 'aditya.khanna@xyz.in', age: 29, designation: 'Cloud Engineer' },

    ],  
    search: '',       
    sortField: '',
    sortOrder: 'asc', 
    page: 1,
};

const tableSlice = createSlice({
    name : 'table', 
    initialState,
    reducers: {
         setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
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
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRows: (state, action: PayloadAction<Row[]>) => {
    state.rows = action.payload;
    }
  }
});

export const { setSearch, setSort, setPage, setRows} = tableSlice.actions;
export default tableSlice.reducer;