import React from "react";
import LoginStore from "./login.store";

class RootStore {
    constructor(){
        this.loginStore = new LoginStore()
    }
}
const StoreContext = React.createContext(new RootStore())
export const useStore = ()=> React.useContext(StoreContext)