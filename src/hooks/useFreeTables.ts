import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks"

export const useFreeTables = () => {
    const tables = useAppSelector(state => state.tables.list)
    const [freeTables, setFreeTables] = useState(
        tables.filter((table) => table.status === "free")
    );
    
    useEffect(() => {
        setFreeTables(tables.filter((table) => table.status === "free"));
    }, [tables]);

    return freeTables
}