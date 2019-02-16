export const reducer = (state,action)=>{
    switch(action.type) {
        case 'loading':
            return { ...state, loading: action.value }
        case'susses':
            return { ...state, susses: action.value }
        case'confirmOperation':
            return { ...state, confirmOperation: action.value }
        case'data':
            return { ...state, data: action.value }
        case'operation':
            return { ...state, operation: action.value }
        case'key':
            return { ...state, key: action.value }
        case'finish':
            return { ...state, finish: action.value }
        case'msg':
            return { ...state, msg: action.value }
        default:
            return state
    }
    
}