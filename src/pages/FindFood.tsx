import React, { useEffect, useState } from "react";
import "animate.css";
import FoodCard from "../components/FoodCard";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const FindFood = () => {
  const [user, loading, error] = useAuthState(auth);
  let [consumerLat, setConsumerLat] = useState(0);
  let [consumerLong, setConsumerLong] = useState(0);

  const [docId, setDocId] = useState("");

  const fetchUserName2 = async () => {
    if (!user || !user?.uid) return;
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities: any = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
          setDocId(doc.id);
          console.log(docId);
        });
        console.log("Users are: ", cities.join(", "));
      });
    } catch (err) {
      console.error(err);
      //alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setConsumerLat(position.coords.latitude);
      setConsumerLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    fetchUserName2();
  }, [user, loading, consumerLat, consumerLong]);

  return (
    <>
      <div className="">
        <div className="mt-10  ">
          <FoodCard />
        </div>
      </div>
    </>
  );
};

export default FindFood;
