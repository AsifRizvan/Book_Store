
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
  };

const  bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{
        addBook: (state,action)=>{
            state.books.push(action.payload)
        },
        deleteBook:(state,action)=>{
            state.books = state.books.filter(book=>book.id!=action.payload)
        },
        editBook:(state,action)=>{
            const index = state.books.findIndex(book=>book.id==action.payload.id)
            if(index!=-1){
                state.books[index] = action.payload
            }
        }
    }
})

export const { addBook , deleteBook , editBook } = bookSlice.actions
export default bookSlice.reducer