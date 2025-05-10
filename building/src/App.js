import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Splash from "./components/Splash";
import Trip from "./components/Trip";
import "./css/app.css";

// const fetchData = (FilE_NAME) => {
//   const res = axios.get(
//     `https://raw.githubusercontent.com/1023sherry/UAM_NEW/main/uam/src/data/${FilE_NAME}.json`
//   );
//   const data = res.then((r) => r.data);
//   return data;
// };

console.log("NODE_ENV:", process.env.NODE_ENV);


const fetchData = (fileName) => {
  const baseURL = process.env.NODE_ENV === "production"
    ? `https://raw.githubusercontent.com/camuslab/building/main/building/src/data/`
    : `${process.env.PUBLIC_URL}/data/`;
  
  return axios.get(`${baseURL}${fileName}.json`).then((r) => r.data);
};


const App = () => {

  const [building, setBuilding] = useState([]);

  const [isloaded, setIsLoaded] = useState(false);

  const getData = useCallback(async () => {

    const BUILDING = await Promise.all([
      fetchData("building_verport_part1"),
      fetchData("building_verport_part2"),
      fetchData("building_verport_part3"),
      fetchData("building_verport_part4"),
      fetchData("building_verport_part5"),
    ]);

    setBuilding((prev) => BUILDING.flat());


    setIsLoaded(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="container">
      {!isloaded && <Splash />}
      {isloaded && (
        <Trip 
   
              building={building}


              />
      )}
    </div>
  );
};

export default App;
