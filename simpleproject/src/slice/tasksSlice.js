import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

let initialState={
    tasksList:[],
     isLoading:false,
     error:''
}

let Basic_url = "https://jsonplaceholder.typicode.com/posts?&_start=0&_limit=5";

//GET
export const gettingDataFromServer= createAsyncThunk(
    "data/gettingDataFromServer",
     async (task,{rejectWithValue}) =>{
         let response =await fetch(`https://jsonplaceholder.typicode.com/posts?&_start=${task}&_limit=5`);
         if(response.ok){
            let jsonResponse= await response.json();
            return jsonResponse;
         }else{
            return rejectWithValue({error:"no data found"});
         }
        }
  )


let tasksSlice = createSlice({
    name:'tasksSlice',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder
               .addCase(gettingDataFromServer.pending,(state)=>{
                  state.isLoading=true;
               })
               .addCase(gettingDataFromServer.fulfilled,(state,action)=>{
                   state.isLoading=false;
                   state.error='';
                   console.log(action.payload);
                   state.tasksList=[...state.tasksList,...action.payload];
               })
               .addCase(gettingDataFromServer.rejected,(state,action)=>{
                   state.error=action.payload.error;
                   state.isLoading=false;
                   state.tasksList=[];
               })
               
    }
})

export default tasksSlice.reducer