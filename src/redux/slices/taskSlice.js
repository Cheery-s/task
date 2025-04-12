//src/redux/slices/taskSlices.js
import { createSlice } from '@reduxjs/toolkit';
const taskSlice = createSlice({
    name: 'tasks',
    initialState:{
        tasks: [],
        loading:false,
        error:null,
        filter:null,
    },
    reducers:{
        fetchTasksStart(state,action){
            state.loading = true; 
            state.error = null;//Reset the error when starting
            state.filter = action.payload?.filter;//store the filter in the state
        },
        fetchTasksSuccess(state, action){
            state.tasks = action.payload; 
            state.loading = false;
        },
        fetchTasksFailure(state,action){
            state.error = action.payload;
            state.loading =false;
        },
        addTaskStart(state){
            state.loading=true;
        },
        addTaskSuccess(state,action){
            state.tasks.push(action.payload);
            state.loading=false;
        },
        addTaskFailure(state,action){
            state.error = action.payload;
            state.loading =false;
        },
        updateTaskStart(state) {
            state.loading = true;
          },
        updateTaskSuccess(state,action){
            const index = state.tasks.findIndex((t)=> t.id === action.payload.id);
            if(index !== -1){
                state.tasks[index] = action.payload;
                state.loading = false;
            }
        },
        updateTaskFailure(state,action){
            state.error = action.payload;
            state.loading =false;
        },
        deleteTaskStart(state) {
            state.loading = true;
          },
        deleteTaskSuccess(state,action){
           state.tasks = state.tasks.filter((t)=>t.id !== action.payload)
            state.loading = false;
        },
        deleteTaskFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
          }
    }
})
export const {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    addTaskStart,
    addTaskSuccess,
    addTaskFailure,
    updateTaskStart,
    updateTaskSuccess,
    updateTaskFailure,
    deleteTaskStart,
    deleteTaskSuccess,
    deleteTaskFailure
} = taskSlice.actions
export default taskSlice.reducer;