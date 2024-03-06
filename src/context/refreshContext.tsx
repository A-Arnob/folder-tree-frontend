import React from "react";
import { PropsWithChildren, createContext, useState } from "react";
// import { userTokenData } from "../components/SignIn";
// import { User } from "../hooks/useUser";


interface refreshType{
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}


export const RefreshContext = createContext<refreshType>({
  refresh: false,
  setRefresh: () => {}
});

export const RefreshContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [refresh, setRefresh] = useState(false);

    return (
        <>
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
                {props.children}
            </RefreshContext.Provider>
        </>
    )
}

export const useRefreshContext = () => {
    const context = React.useContext(RefreshContext);
    if (context === undefined) {
        throw new Error(
            "useRefreshContext must be used within a RefreshProvider"
        );
    }
    return context;
};