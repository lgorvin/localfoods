import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
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

const SellFood = () => {
  const [user, loading, error] = useAuthState(auth);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [docId, setDocId] = useState("");
  const [uid, setUid] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [supplierLat, setSupplierLat] = useState(0);
  const [supplierLong, setSupplierLong] = useState(0);

  interface Post {
    title: string;
    desc: string;
    user: string;
    uid: string;
    date: string;
    image: string;
    price: number;
    id: string;
    lat: number;
    long: number;
    children?: JSX.Element | JSX.Element[];
  }

  const postArr: Post[] = [];

  const [posts, setPosts] = useState([] as any[]);

  const fetchUserName2 = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities: any = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data().title);
          setName(doc.data().name);
          setUid(doc.data().uid);
          setDocId(doc.id);
        });
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleSubmit = (event: any) => {
    console.log("handleSubmit ran");
    event.preventDefault();

    // 👇️ clear all input values in the form
    setTitle("");
    setDesc("");
    setImage("");
    setPrice("");
  };

  const postMaker = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      desc: desc,
      user: name,
      uid: uid,
      date: new Date().toUTCString(),
      image: image,
      price: parseFloat(price),
      id: id,
      lat: supplierLat,
      long: supplierLong,
    });

    console.log("Document written with ID: ", docRef.id);
  };

  const deletePost = async (id: any) => {
    try {
      console.log(
        `Post with ID: ${id.currentTarget.getAttribute(
          "data-value"
        )} has been deleted.`
      );
      await deleteDoc(
        doc(db, "posts", id.currentTarget.getAttribute("data-value"))
      );
    } catch (err) {
      console.error(err);
      alert("error");
    }
  };

  const fetchAdvice = async () => {
    try {
      //setLoading(true);
      axios
        .get(
          `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${supplierLat}&longitude=${supplierLong}&localityLanguage=en&key=bdc_e206f75416ee4fbbae4027b1b2c05421`
        )
        .then((res) => {
          //setAll(res.data);
          console.log(res.data.city);
          //setLoading(false);
        })
        .catch((err) => {
          //setLoading(false);
          console.log("not working");
        });
    } catch (error) {
      //setLoading(false);

      console.log("Used all API credits");
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setSupplierLat(position.coords.latitude);
      setSupplierLong(position.coords.longitude);
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName2();

    const q = query(
      collection(db, "posts"),
      where("uid", "==", user?.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = Array<Post>();
      querySnapshot.forEach((doc) => {
        // console.log("Title : ", doc.data().title);
        console.log("ID : ", doc.id);
        console.log("Date : ", doc.data().date);
        postData.push({
          title: doc.data().title,
          desc: doc.data().desc,
          user: doc.data().user,
          uid: doc.data().uid,
          date: doc.data().date,
          image: doc.data().image,
          price: doc.data().price,
          id: doc.id,
          lat: doc.data().lat,
          long: doc.data().long,
        });
      });
      //console.log(postData);
      setPosts(postData);
    });
  }, [user, loading]);
  return (
    <div>
      <div>
        <h1 className="text-center font-black text-5xl my-10">Supplier Hub</h1>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="px-2 py-2 rounded-l-lg"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Food Item"
          />
          <input
            className="px-2 py-2"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Link to Image"
          />
          <input
            className="px-2 py-2"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
          <input
            className="px-2 py-2"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price £"
          />
          <input
            onClick={getLocation}
            className="bg-blue-200 px-2 py-2"
            type="button"
            value="Location"
          />
          <button
            type="submit"
            className="bg-green-500 px-2 py-2 shadow-lg rounded-r-lg"
            onClick={postMaker}
          >
            Create Post
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-center font-bold text-2xl mt-6 mb-4">Your Posts</h1>
        <div>
          <div>
            {posts.map((data, index) => (
              <div key={index} className="grid grid-cols-7 place-items-center">
                <h1 className="mx-2 my-2">
                  <span className="font-bold">Title:</span> {data.title}
                </h1>{" "}
                <h1 className="my-2">
                  <span className="font-bold">Description:</span> {data.desc}
                </h1>
                <h1 className="my-2">
                  {" "}
                  <span className="font-bold">Price:</span> £{data.price}
                </h1>
                <div>
                  <h1 className="font-bold">Image:</h1>
                  <img src={data.image} alt="No Image" />
                </div>
                <h1 className="my-2">
                  <span className="font-bold">Date:</span> {data.date}
                </h1>
                <h1 className="mx-2 my-2">
                  {" "}
                  <span className="font-bold">User:</span> {data.user}
                </h1>
                <button
                  className="bg-red-400 text-white font-bold py-2 px-2 rounded-md"
                  data-value={data.id}
                  onClick={deletePost}
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellFood;
