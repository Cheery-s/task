//src/sagas/taskSaga.js
import { call, put, takeEvery} from 'redux-saga/effects';
import { supabase } from '../../config/supabaseClient';
import {
    fetchTasksSuccess,
    fetchTasksFailure,
    addTaskSuccess,
  addTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure
} from '../slices/taskSlice';

// Fething DATA from API
function* fetchTasksSaga(action){
     console.log(
         "payload", action.payload)
    try { console.log(
        " try payload", action.payload)
          const filter = action.payload?.filter || null;// safely destructure filter
        let query = supabase.from('tasks').select('*');
        if(filter && filter !== 'all') {
            query = query.eq('category',  filter);//apply filter if it exists
        }
                const { data,error } = yield call(()=>query);//execute the query
        if (error) throw error;
        console.log('Tasks fetched successfully',data)//debugging line
        yield put(fetchTasksSuccess(data));
    }catch(error){ 
        yield put(fetchTasksFailure(error.message));
    }      
}
// add Task
function* addTaskSaga(action){
    try{console.log('Supabase client:',supabase)//debugging line
      console.log("payload", action.payload)
      // insert the task into Supabasetable
         const {data, error} =yield call(()=>
      supabase.from('tasks').insert([action.payload]).select()
      );
    if (error) throw error;     
   yield put(addTaskSuccess(data[0]));//display added task
    }catch(error){
      yield put(addTaskFailure(error.message))
       console.error("Failed to add task",error)
    }
}
function* updateTaskSaga(action) {
    try {
      console.log('Supabase client:',supabase)//debugging line
      const { data,error } = yield call(()=> 
        supabase.from('tasks')
      .update(action.payload)
      .eq('id', action.payload.id).select()
    );
        if (error) throw error;
      console.log('Task updated successfully',data)
      yield put(updateTaskSuccess(data));
    } catch (error) {
      yield put(updateTaskFailure(error.message))
      console.log("Failed to update task",error);
    }
}
function* deleteTaskSaga(action) {
    try {console.log('Supabase client:',supabase)//debugging line
    const { error } = yield call(()=>
    supabase.from('tasks')
    .delete()
    .eq('id',action.payload)
    );
      if (error) throw error;
        //yield put(deleteTask(data));
      yield put(deleteTaskSuccess(action.payload));// dispatch the deleted task ID
    } catch (error) {
      yield put(deleteTaskFailure(error.message));
      console.log("Failed to delete task:",error);
    }
}

// Watching for actions
function* watchTasks(){

    yield takeEvery('tasks/fetchTasksStart',fetchTasksSaga);
    yield takeEvery('tasks/addTask',addTaskSaga);
    yield takeEvery('tasks/updateTask', updateTaskSaga);
    yield takeEvery('tasks/deleteTask',deleteTaskSaga)
}
export default watchTasks;