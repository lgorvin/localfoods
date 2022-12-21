import React, { FunctionComponent, useEffect, useState } from "react";
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
} from "firebase/firestore";

interface BioProps {
  miles: number;
  lat: number;
  long: number;
}

interface Post {
  title: string;
  desc: string;
  user: string;
  uid: string;
  date: string;
  image: string;
  price: number;
  company: string;
  avatar: string;
  id: string;
  lat: number;
  long: number;
  children?: JSX.Element | JSX.Element[];
}

const FoodCard: FunctionComponent<BioProps> = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState([] as any[]);
  //   let [consumerLat, setConsumerLat] = useState(0);
  //   let [consumerLong, setConsumerLong] = useState(0);
  //   let [supplierLat, setSupplierLat] = useState(0);
  //   let [supplierLong, setSupplierLong] = useState(0);

  const [miles, setMiles] = useState(0);

  const handleClick = (test: string) => {
    console.log(test);
  };

  const distance = async (supplierLat: number, supplierLong: number) => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    // let supplierLong: number = 0;
    // let supplierLat: number = 0;
    supplierLong = (supplierLong * Math.PI) / 180;
    let long = (props.long * Math.PI) / 180;
    supplierLat = (supplierLat * Math.PI) / 180;
    let lat = (props.lat * Math.PI) / 180;

    // Haversine formula
    let dlon = long - supplierLong;
    let dlat = lat - supplierLat;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(supplierLat) * Math.cos(lat) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 3956;

    // calculate the result

    setMiles(c * r);

    console.log(`Consumer distance to supplier is ${miles} miles`);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), where("lat", "<=", props.lat));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = Array<Post>();
      querySnapshot.forEach((doc) => {
        // console.log("Title : ", doc.data().title);
        console.log("ID : ", doc.id);
        console.log("img : ", doc.data().avatar);
        postData.push({
          title: doc.data().title,
          desc: doc.data().desc,
          user: doc.data().user,
          uid: doc.data().uid,
          date: doc.data().date,
          image: doc.data().image,
          price: doc.data().price,
          company: doc.data().company,
          avatar: doc.data().avatar,
          id: doc.id,
          lat: doc.data().lat,
          long: doc.data().long,
        });
      });

      //distance();

      setPosts(postData);
      console.log(postData);
    });
  }, [user, loading, props.lat, props.long]);
  return (
    <div>
      {posts.map((data, index) => (
        <div key={index} className="mb-10">
          <div className="h-[375px] w-[350px] rounded-lg bg-gray-200 shadow-lg hover:scale-110 cursor-pointer duration-300">
            <img
              className="rounded-t-lg h-[200px] w-[350px] mb-4"
              src={data.image}
              alt=""
            />

            <div className="h-[45px] w-[45px] border-2 border-gray-600 ml-4 mb-4 shadow-lg bg-black rounded-full">
              <img
                className="rounded-full h-full w-full shadow-lg"
                src={data.avatar}
                alt=""
              />
            </div>
            <div className="float-right mt-[-50px] mr-16 font-bold">
              <h1>
                {data.user} @ {data.company}
              </h1>
            </div>

            <h1 className="font-bold inline ml-4 mt-5 text-xl">{data.title}</h1>
            <h1 className="inline ml-[102px] mt-4 font-bold">
              {Math.round(miles * 10) / 10} {} Miles away
            </h1>
            <h2 className="float-right mr-4 text-sm">
              <span className="font-bold text-xl">£{data.price}</span> per kg
            </h2>
            <p className="mx-4">{data.desc}</p>
            <button
              className="mx-4 bg-blue-400 mt-2 rounded-md px-2 hover:scale-105 duration-300"
              onClick={() => distance(data.lat, data.long)}
            >
              Check Distance
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
