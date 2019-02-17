import { createStore } from 'redux'
import { reducer } from './reducers'

const initialState = {
    loading:true,
    susses:null,
    msg:null,
    confirmOperation:false,
    data:null,
    operation:null,
    key:null,
    finish:{
        susses:null,
        msg:null,
        trxid:null
    },
    ButtomSingin:false
}

export const store = createStore( reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);