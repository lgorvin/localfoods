import React, { useEffect, useState } from "react";
import "animate.css";
import FoodCard from "../components/FoodCard";

const FindFood = () => {
  let [consumerLat, setConsumerLat] = useState(0);
  let [consumerLong, setConsumerLong] = useState(0);

  const [miles, setMiles] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setConsumerLat(position.coords.latitude);
      setConsumerLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold text-center mt-5">GET LOCATION</h1>
        <div className="grid grid-cols-1 mt-10 place-items-center animate__animated animate__backInLeft animate__slow">
          <FoodCard lat={consumerLat} long={consumerLong} miles={miles} />
        </div>
      </div>
    </>
  );
};

export default FindFood;
