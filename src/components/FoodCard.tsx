import React, { FunctionComponent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";

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
  const [miles, setMiles] = useState(0);

  const [test, setTest] = useState<any[]>([]);

  const distance = async (supplierLat: number, supplierLong: number) => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
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

    //setMiles(c * r);

    console.log(`Consumer distance to supplier is ${miles} miles`);
  };

  const arr: number[] = [];

  function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 3956; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    setMiles(d);

    setTest((current) => [...current, d]);

    console.log(test);

    console.log(`lat1: ${lat1}, lon1: ${lon1} lat2: ${lat2}, ${lon2}`);

    console.log(`Consumer distance to supplier is ${d} miles`);
  }

  // Converts numeric degrees to radians
  function toRad(Value: number) {
    return (Value * Math.PI) / 180;
  }

  useEffect(() => {
    const q = query(collection(db, "posts"), where("lat", "<=", props.lat));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = Array<Post>();
      querySnapshot.forEach((doc) => {
        // console.log("Title : ", doc.data().title);
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
    });
  }, [user, loading, props.lat, props.long]);
  return (
    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 duration-300">
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
              {Math.round(test[index] * 10) / 10} {} Miles away
            </h1>
            <h2 className="float-right mr-4 text-sm">
              <span className="font-bold text-xl">£{data.price}</span> per kg
            </h2>
            <p className="mx-4">{data.desc}</p>
            {/* <p>
              location: {data.lat}, {data.long}
              <br />
              {test[index]}
            </p> */}
            <button
              className="mx-4 bg-blue-400 mt-2 rounded-md px-2 hover:scale-105 duration-300"
              onClick={() => {
                calcCrow(data.lat, data.long, props.lat, props.long);
              }}
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
