import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Department from "@/entities/department.model";
import type { DepartmentContextType } from "./TypesContext";
import DepartmentService from "@/services/department.service";

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);
const departmentService = new DepartmentService();

export const DepartmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartment, setLoadingDepartment] = useState<boolean>(false);
  const [errorDepartment, setErrorDepartment] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchDepartments = useCallback(async () => {
    if (isLoaded && departments.length > 0) return;

    setLoadingDepartment(true);
    try {
      const allDepartments = await departmentService.getDepartments();
      setDepartments(allDepartments);
      setIsLoaded(true);
    } catch (error) {
      setErrorDepartment("Error fetching departments: " + error);
    } finally {
      setLoadingDepartment(false);
    }
  }, [departments, isLoaded]);

  const refetchDepartments = useCallback(async () => {
    setIsLoaded(false); // reset cache to force refetch
    await fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        loadingDepartment,
        errorDepartment,
        fetchDepartments,
        refetchDepartments,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartmentContext = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error("useDepartmentContext must be used within a DepartmentProvider");
  }
  return context;
};
