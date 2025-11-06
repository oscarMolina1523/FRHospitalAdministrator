import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Inventory from "@/entities/inventory.model";
import type { InventoryContextType } from "./TypesContext";
import InventoryService from "@/services/inventory.service";

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
const inventoryService = new InventoryService();

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [inventoriesByDepartment, setInventoriesByDepartment] = useState<Inventory[]>([]);
  const [loadingInventory, setLoadingInventory] = useState<boolean>(false);
  const [errorInventory, setErrorInventory] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchInventories = useCallback(async () => {
    if (isLoaded && inventories.length > 0) return;

    setLoadingInventory(true);
    try {
      const allInventories = await inventoryService.getInventories();
      setInventories(allInventories);
      setIsLoaded(true);
    } catch (error) {
      setErrorInventory("Error fetching inventories: " + error);
    } finally {
      setLoadingInventory(false);
    }
  }, [inventories, isLoaded]);

  const fetchInventoriesByDepartment = useCallback(async () => {
    setLoadingInventory(true);
    try {
      const deptInventories = await inventoryService.getInventoryByDepartment();
      setInventoriesByDepartment(deptInventories);
    } catch (error) {
      setErrorInventory("Error fetching inventories by department: " + error);
    } finally {
      setLoadingInventory(false);
    }
  }, []);

  const refetchInventories = useCallback(async () => {
    setIsLoaded(false); // reset cache
    await fetchInventories();
  }, [fetchInventories]);

  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  return (
    <InventoryContext.Provider
      value={{
        inventories,
        inventoriesByDepartment,
        loadingInventory,
        errorInventory,
        fetchInventories,
        fetchInventoriesByDepartment,
        refetchInventories,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventoryContext must be used within an InventoryProvider");
  }
  return context;
};
