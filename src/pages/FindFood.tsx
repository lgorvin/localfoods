import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [docId, setDocId] = useState("");

  //Fetches name of current logged in user.
  const fetchUserName = async () => {
    if (!user || !user?.uid) return;
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data().name);
          setDocId(doc.id);
          console.log(docId);
        });
        console.log("Users are: ", users.join(", "));
      });
    } catch (err) {
      console.error(err);
      //alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <div className="">
        <div>
          <FoodCard />
          {!user && (
            <div className="h-screen w-screen flex justify-center items-center mt-[-50px]">
              <h1 className="text-center text-2xl">
                Please{" "}
                <span className="text-blue-500">
                  <Link to="/login">Log In</Link>
                </span>{" "}
                or{" "}
                <span className="text-blue-500">
                  <Link to="/signup">Sign Up</Link>
                </span>{" "}
                to <br /> view all the wonderful foods local to you!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindFood;
