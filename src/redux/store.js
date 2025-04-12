// store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import taskReducer from "./slices/taskSlice";
import authReducer from "./slices/authSlice";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  //getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;









// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";
// import taskReducer from "./slices/taskSlice";
// import authReducer from "./slices/authSlice";
// //create the sagaMiddleware
// const sagaMiddleware = createSagaMiddleware();
// // Configure the Redux store
// const store = configureStore({
//     reducer:{
//         tasks:taskReducer,//add Reducers here
//             auth: authReducer,
//     },
    
//    middleware: (getDefaultMiddleware)=>
//     // getDefaultMiddleware().concat(sagaMiddleware,logger),//add middleware
//     getDefaultMiddleware().concat(sagaMiddleware),//add middleware
//    devTools: process.env.NODE_ENV !== 'production'
// });
// //Run the rootSaga
// sagaMiddleware.run(rootSaga);
// export default store;