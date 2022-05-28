import { ADD_ITEM, DELETE_ITEM, RESET_ITEM } from "../constant"

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: item,
  }
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item
  }
}

export function resetItem(){
  return {
    type: RESET_ITEM
  }
}