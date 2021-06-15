
import { createContext, useReducer } from "react";

let authorizationContext = createContext();

export default authorizationContext;

let initialState = {
    token: "",
}

function changeState(state, action) {
    switch (action.type) {
        case "ADD":
            let newToken = { token: action.payload };
            return newToken;
        default:
            throw new Error("there is an error");
    }
}
export function AuthorizationContextProvider(props) {
    let [state, dispatch] = useReducer(changeState, initialState);
    return (
        <authorizationContext.Provider value={{
            state, dispatch
        }}>
            {props.children}
        </authorizationContext.Provider>
    )
}

