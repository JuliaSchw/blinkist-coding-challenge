import React, { useEffect, useState } from "react";

// Define a type for the CTR data
type CtrData = {
  variation: string;
  ctr: number;
};

const CtrDisplay: React.FC = () => {
  const [ctrs, setCtrs] = useState<CtrData[]>([]);

  useEffect(() => {
    const fetchCtrData = async () => {
      try {
        const res = await fetch("/api/ctr");
        if (!res.ok) {
          throw new Error("Failed to fetch CTR data");
        }
        const data: CtrData[] = await res.json();
        setCtrs(data);
      } catch (error) {
        console.error("Error fetching CTR data:", error);
      }
    };

    fetchCtrData();
  }, []);

  return (
    <div>
      <h2>Click-Through Rates</h2>
      {ctrs.length > 0 ? (
        ctrs.map((ctr, index) => (
          <div key={index}>
            <strong>Variation:</strong> {ctr.variation} <strong>CTR:</strong>{" "}
            {(ctr.ctr * 100).toFixed(2)}%
          </div>
        ))
      ) : (
        <p>Loading CTR data...</p>
      )}
    </div>
  );
};

export default CtrDisplay;
