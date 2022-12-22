import React, { FunctionComponent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
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
  const [miles, setMiles] = useState(0);

  const [cLat, setCLat] = useState(0);
  const [cLong, setCLong] = useState(0);

  const [test, setTest] = useState<any[]>([]);
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
    console.log(`lat1: ${lat1}, lon1: ${lon1} lat2: ${lat2}, ${lon2}`);
    console.log(`Consumer distance to supplier is ${d} miles`);
  }

  // Converts numeric degrees to radians
  function toRad(Value: number) {
    return (Value * Math.PI) / 180;
  }

  const fetchUserName2 = async () => {
    if (!user || !user?.uid) return;
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data().name);
          //setDocId(doc.id);
          setCLat(doc.data().lat);
          setCLong(doc.data().long);
        });
        console.log("Users are: ", users.join(", "));
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    fetchUserName2();
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
      setPosts(postData);
    });
  }, [user, loading, props.lat, props.long]);

  return (
    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 duration-300">
      {posts.map((data, index) => (
        <div key={index} className="mb-10">
          <div className="h-[100%] min-h-[400px] max-w-[400px] rounded-lg bg-slate-700 shadow-lg hover:scale-110 cursor-pointer duration-300">
            <img
              className="rounded-t-lg max-h-[200px] min-w-[400px] mb-4"
              src={data.image}
              alt=""
            />

            <div className="ml-4 mb-4 font-bold text-2xl text-white">
              <h1>
                {data.user} @ {data.company}
              </h1>
            </div>
            <div className="float-right mt-[-50px] mx-4 h-[60px] w-[60px] bg-black rounded-full font-bold text-2xl text-white">
              <img
                className="rounded-full h-full w-full shadow-lg"
                src={data.avatar}
                alt=""
              />
            </div>

            <h1 className="font-bold inline ml-4 mt-5 text-xl text-white">
              {data.title}
            </h1>
            <h1 className="ml-4 mt-2 font-bold text-white">
              {Math.round(test[index] * 10) / 10} {} Miles away
            </h1>

            <h2 className="float-right mr-4 text-sm text-white">
              <span className="font-bold text-xl">£{data.price}</span> per kg
            </h2>
            <p className="mx-4 text-gray-200">{data.desc}</p>

            <button
              className="mx-4 my-4 bg-blue-400 mt-2 rounded-md px-2 hover:scale-105 duration-300"
              onClick={() => {
                calcCrow(data.lat, data.long, cLat, cLong);
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
