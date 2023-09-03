import React, { useState, useEffect } from "react";
import axios from "axios";
import LazyFlag from "./LazyFlag";
const LazyLoaderFlag = () => {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );

        setFlags(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {flags.map((flag, index) => {
        return (
          <LazyFlag
            key={index}
            flagUrl={flag.flags.png}
            name={flag.name.common}
            alt={flag.flags.alt}
          />
        );
      })}
    </>
  );
};

export default LazyLoaderFlag;
