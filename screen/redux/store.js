import { legacy_createStore as createStore } from "redux";

import { itemReducer } from "./reducer";

export const store = createStore(itemReducer)