import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Patient from "@/entities/patient.model";
import type { PatientContextType } from "./TypesContext";
import PatientService from "@/services/patient.service";

const PatientContext = createContext<PatientContextType | undefined>(undefined);
const patientService = new PatientService();

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsByDepartment, setPatientsByDepartment] = useState<Patient[]>([]);
  const [loadingPatient, setLoadingPatient] = useState<boolean>(false);
  const [errorPatient, setErrorPatient] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchPatients = useCallback(async () => {
    if (isLoaded && patients.length > 0) return;

    setLoadingPatient(true);
    try {
      const allPatients = await patientService.getPatients();
      setPatients(allPatients);
      setIsLoaded(true);
    } catch (error) {
      setErrorPatient("Error fetching patients: " + error);
    } finally {
      setLoadingPatient(false);
    }
  }, [patients, isLoaded]);

  const fetchPatientsByDepartment = useCallback(async () => {
    setLoadingPatient(true);
    try {
      const patientsByDept = await patientService.getPatientByDepartment();
      setPatientsByDepartment(patientsByDept);
    } catch (error) {
      setErrorPatient("Error fetching patients by department: " + error);
    } finally {
      setLoadingPatient(false);
    }
  }, []);

  const refetchPatients = useCallback(async () => {
    setIsLoaded(false); // reset cache to force refetch
    await fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <PatientContext.Provider
      value={{
        patients,
        patientsByDepartment,
        loadingPatient,
        errorPatient,
        fetchPatients,
        fetchPatientsByDepartment,
        refetchPatients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatientContext must be used within a PatientProvider");
  }
  return context;
};
