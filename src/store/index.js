import React from "react";
import LoginStore from "./login.store";
import UserStore from "./user.store";
import ChannelStore from "./channel.store";


class RootStore {
    constructor(){
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
    }
}
const StoreContext = React.createContext(new RootStore())
export const useStore = ()=> React.useContext(StoreContext)