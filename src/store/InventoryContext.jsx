import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getAllInventory } from "../services/inventoryApi";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadInventory = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllInventory();
      setInventory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      inventory,
      setInventory,
      loading,
      error,
      loadInventory,
    }),
    [inventory, loading, error, loadInventory],
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }

  return context;
}
