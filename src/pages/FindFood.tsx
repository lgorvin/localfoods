import React, { useEffect, useState } from "react";
import "animate.css";
import FoodCard from "../components/FoodCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import {
  doc,
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  updateDoc,
  addDoc,
  orderBy,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const FindFood = () => {
  let [consumerLat, setConsumerLat] = useState(0);
  let [consumerLong, setConsumerLong] = useState(0);
  // const [lat2, setLat2] = useState(34.534);
  // const [lon2, setLon2] = useState(22.33);

  let lat2 = 51.534162;
  let long2 = -1.708114;

  const [miles, setMiles] = useState(0);

  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setConsumerLat(position.coords.latitude);
      setConsumerLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    distance();
  }, []);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     setConsumerLat(position.coords.latitude);
  //     setConsumerLong(position.coords.longitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  //   distance();
  // }, []);

  const distance = () => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    consumerLong = (consumerLong * Math.PI) / 180;
    long2 = (long2 * Math.PI) / 180;
    consumerLat = (consumerLat * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = long2 - consumerLong;
    let dlat = lat2 - consumerLat;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(consumerLat) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 3956;

    // calculate the result

    setMiles(c * r);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-5">GET LOCATION</h1>
        <div className="grid grid-cols-1 mt-10 place-items-center animate__animated animate__backInLeft animate__slow">
          <FoodCard lat={consumerLat} long={consumerLong} miles={miles} />
        </div>
      </div>
    </>
  );
};

export default FindFood;
