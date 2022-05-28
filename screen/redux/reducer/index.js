import { ADD_ITEM, DELETE_ITEM, RESET_ITEM } from "../constant";

const initialState = [];

export function itemReducer(state = initialState, action){
    switch(action.type){
        case ADD_ITEM:
            return [...state, action.payload];
        case DELETE_ITEM:
            return [...state].filter(element => element.id !== action.payload.id);
        case RESET_ITEM: 
            return [];
        default:
            return state;
    }
}