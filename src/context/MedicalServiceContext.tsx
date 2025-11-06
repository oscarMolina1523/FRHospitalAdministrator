import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import MedicalService from "@/entities/medicalService.model";
import type { MedicalServiceContextType } from "./TypesContext";
import MedicalServiceService from "@/services/medicalService.service";

const MedicalServiceContext = createContext<MedicalServiceContextType | undefined>(undefined);
const medicalServiceService = new MedicalServiceService();

export const MedicalServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicalServices, setMedicalServices] = useState<MedicalService[]>([]);
  const [medicalServicesByDepartment, setMedicalServicesByDepartment] = useState<MedicalService[]>([]);
  const [loadingMedicalService, setLoadingMedicalService] = useState<boolean>(false);
  const [errorMedicalService, setErrorMedicalService] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchMedicalServices = useCallback(async () => {
    if (isLoaded && medicalServices.length > 0) return;

    setLoadingMedicalService(true);
    try {
      const allServices = await medicalServiceService.getMedicalServices();
      setMedicalServices(allServices);
      setIsLoaded(true);
    } catch (error) {
      setErrorMedicalService("Error fetching medical services: " + error);
    } finally {
      setLoadingMedicalService(false);
    }
  }, [medicalServices, isLoaded]);

  const fetchMedicalServicesByDepartment = useCallback(async () => {
    setLoadingMedicalService(true);
    try {
      const servicesByDept = await medicalServiceService.getMedicalServiceByDepartment();
      setMedicalServicesByDepartment(servicesByDept);
    } catch (error) {
      setErrorMedicalService("Error fetching medical services by department: " + error);
    } finally {
      setLoadingMedicalService(false);
    }
  }, []);

  const refetchMedicalServices = useCallback(async () => {
    setIsLoaded(false); // reset cache
    await fetchMedicalServices();
  }, [fetchMedicalServices]);

  useEffect(() => {
    fetchMedicalServices();
  }, [fetchMedicalServices]);

  return (
    <MedicalServiceContext.Provider
      value={{
        medicalServices,
        medicalServicesByDepartment,
        loadingMedicalService,
        errorMedicalService,
        fetchMedicalServices,
        fetchMedicalServicesByDepartment,
        refetchMedicalServices,
      }}
    >
      {children}
    </MedicalServiceContext.Provider>
  );
};

export const useMedicalServiceContext = () => {
  const context = useContext(MedicalServiceContext);
  if (!context) {
    throw new Error("useMedicalServiceContext must be used within a MedicalServiceProvider");
  }
  return context;
};
