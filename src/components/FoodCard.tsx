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
  orderBy,
  Query,
} from "firebase/firestore";
import { getDistance } from "geolib";

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

const FoodCard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState([] as any[]);

  const [cLat, setCLat] = useState(0);
  const [cLong, setCLong] = useState(0);

  const [distanceSort, setDistanceSort] = useState(false);
  const handleDistanceSort = () => setDistanceSort(!distanceSort);
  const [priceSort, setPriceSort] = useState(false);
  const handlePriceSort = () => setPriceSort(!priceSort);

  //Fetches users name and location from db
  const fetchUserData = async () => {
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
    fetchUserData();
    //Auto sorts posts by which are closest to the user
    let q = query(collection(db, "posts"), orderBy("lat", "desc"));
    //If distance button is clicked the posts are then sorted by furthest away
    if (distanceSort) {
      q = query(collection(db, "posts"), orderBy("lat", "asc"));
    } else if (priceSort) {
      //If Price sort is clicked the posts are sorted by lowest price
      q = query(collection(db, "posts"), orderBy("price", "asc"));
    }
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
  }, [user, loading, cLat, cLong, distanceSort, priceSort]);

  return (
    <>
      {user && (
        <div className="animate__animated animate__fadeInDown animate_slower">
          <h1 className="text-center font-bold mb-2 text-xl">SORT</h1>
          <div className="flex justify-center">
            <button
              onClick={handleDistanceSort}
              className="bg-blue-500 text-white font-bold w-28 py-2 rounded-md mb-10 shadow-md hover:scale-105 active:bg-black duration-300"
            >
              Distance
            </button>
            <button
              onClick={handlePriceSort}
              className="bg-blue-500 text-white font-bold w-28 py-2 ml-4 rounded-md mb-10 shadow-md hover:scale-105 active:bg-black duration-300"
            >
              Price
            </button>
          </div>
        </div>
      )}
      <div className="grid place-items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 duration-300 animate__animated animate__fadeInLeft animate__slower">
        {posts.map((data, index) => (
          <div key={index} className="mb-10">
            <div className="h-[100%] min-h-[400px] max-w-[350px] rounded-lg bg-slate-700 shadow-lg hover:scale-110 cursor-pointer duration-300">
              <img
                className="rounded-t-lg max-h-[200px] min-w-[350px] mb-4"
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
                {Math.round(
                  (getDistance(
                    { latitude: data.lat, longitude: data.long },
                    { latitude: cLat, longitude: cLong },
                    0.1
                  ) /
                    1609.34) *
                    10
                ) / 10}{" "}
                {} Miles away
              </h1>
              <h2 className="float-right mr-4 text-sm text-white">
                <span className="font-bold text-xl">£{data.price}</span> per kg
              </h2>
              <p className="mx-4 text-gray-200">{data.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodCard;
