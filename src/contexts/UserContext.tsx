import { createContext, Dispatch, SetStateAction } from "react";

interface UserContext {
    activeUser: number,
    setActiveUser?: Dispatch<SetStateAction<number>>,
}

export const UserContext = createContext<UserContext>({ activeUser: 1 });
