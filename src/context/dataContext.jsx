import { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({children})=>{
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch("https://backend.jotish.in/backend_dev/gettabledata.php",
                {method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({username:"test", password:"123456"})
                }
            )
            const result = await res.json();
            setData(result.TABLE_DATA.data);
        };
        fetchData();
    },[]);

    return (
        <DataContext.Provider value={{data, setData}}>
            <Outlet />
        </DataContext.Provider>
    )
};

export const useData = () => {
  return useContext(DataContext);
};