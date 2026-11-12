import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface LocationData {
  district: string;
  state: string;
  country: string;
}

interface EnvironmentInfo {
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  temperature?: number;
  humidity?: number;
  ph?: number;
  rainfall?: number;
  soil_type?: string;
  [key: string]: any;
}

interface CropRecommendation {
  crop: string;
  probability?: number;
  score?: number;
  [key: string]: any;
}

interface AnalysisData {
  location: LocationData;
  coordinates: Coordinates;
  environment: EnvironmentInfo | null;

  predictedCrop: string | null;

  topCrops: CropRecommendation[];

  finalRecommendations: any[];

  agriculturalScore?: number;
  nutritionScore?: number;
  genomicScore?: number;
  finalScore?: number;

  createdAt: string;
}

interface AnalysisContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: React.Dispatch<
    React.SetStateAction<AnalysisData | null>
  >;
  clearAnalysisData: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider = ({
  children,
}: AnalysisProviderProps) => {
  const [analysisData, setAnalysisData] =
    useState<AnalysisData | null>(null);

  const clearAnalysisData = () => {
    setAnalysisData(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        clearAnalysisData,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);

  if (!context) {
    throw new Error(
      "useAnalysis must be used inside an AnalysisProvider"
    );
  }

  return context;
};

export type {
  AnalysisData,
  LocationData,
  Coordinates,
  EnvironmentInfo,
  CropRecommendation,
};