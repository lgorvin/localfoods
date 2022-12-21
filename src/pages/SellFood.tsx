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
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

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
    company: string;
    avatar: string;
    id: string;
    lat: number;
    long: number;
    children?: JSX.Element | JSX.Element[];
  }

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
          setCompany(doc.data().company);
          setAvatar(doc.data().avatar);
        });
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleSubmit = (event: any) => {
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
      company: company,
      avatar: avatar,
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
  }, [user, loading]);
  return (
    <div>
      <div>
        <h1 className="text-center font-black text-5xl my-10">Supplier Hub</h1>
      </div>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-1 lg:grid-cols-4 mx-10 duration-500"
          onSubmit={handleSubmit}
        >
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
          <></>
          <div className="flex justify-center lg:w-[95vw] w-[80vw] mt-4 ">
            <div>
              <svg
                className="absolute ml-[10px] mt-[10px] scale-150 hover:rotate-90 active:scale-125 cursor-pointer  duration-300 bi bi-geo-alt"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
              >
                <path
                  //style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1"
                  d="M7.994-.002c-2.48 0-4.5 2.02-4.5 4.5a.5.5 0 0 0 .024.158c.042 1.579.726 2.96 1.53 4.24.832 1.323 1.795 2.563 2.413 3.829a.5.5 0 0 0 .894.01c.65-1.265 1.662-2.507 2.536-3.829.873-1.322 1.619-2.75 1.619-4.4a.5.5 0 0 0-.033-.186C12.38 1.925 10.413-.002 7.994-.002zm0 1c1.94 0 3.5 1.561 3.5 3.5a.5.5 0 0 0 .01.107c-.03 1.308-.634 2.52-1.447 3.75-.688 1.041-1.466 2.116-2.137 3.233-.637-1.112-1.371-2.185-2.024-3.223C5.103 7.102 4.51 5.86 4.51 4.505a.5.5 0 0 0-.008-.087A3.488 3.488 0 0 1 7.994.998zm0 2.002c-.822 0-1.5.678-1.5 1.5S7.172 6 7.994 6c.823 0 1.5-.678 1.5-1.5S8.817 3 7.994 3zm0 1c.282 0 .5.218.5.5 0 .282-.218.5-.5.5a.493.493 0 0 1-.5-.5c0-.282.218-.5.5-.5zm4.09 5.227a.5.5 0 0 0-.18.966c.997.404 1.638.933 1.914 1.42.277.487.27.908-.091 1.426-.725 1.036-3.036 1.954-5.674 1.965-2.639.01-4.982-.883-5.748-1.922-.383-.52-.402-.943-.145-1.428.258-.484.875-1.018 1.856-1.43a.5.5 0 1 0-.387-.921c-1.12.47-1.937 1.102-2.352 1.883-.415.78-.343 1.722.223 2.49 1.132 1.534 3.711 2.34 6.559 2.328 2.847-.012 5.402-.837 6.488-2.39.543-.777.58-1.723.14-2.495-.438-.772-1.273-1.394-2.408-1.853a.5.5 0 0 0-.195-.04z"
                  color="#fff"
                  enable-background="accumulate"
                  font-family="sans-serif"
                  font-weight="400"
                  overflow="visible"
                />
              </svg>
              <input
                onClick={getLocation}
                className="bg-green-400 rounded-l-lg px-4 py-2 "
                type="button"
                value=" "
              ></input>
            </div>
            <button
              type="submit"
              className="bg-green-400 hover:scale-105 hover:rounded-l-lg duration-300 text-white font-bold px-2 py-2 shadow-lg rounded-r-lg"
              onClick={postMaker}
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-center font-bold text-2xl mt-6 mb-4">Your Posts</h1>
        <div>
          <div>
            {posts.map((data, index) => (
              <>
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 place-items-center md:mx-10 mx-4 duration-500"
                >
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
                  <div className="group">
                    <h1 onClick={handleModal} className="font-bold ">
                      Image:
                    </h1>
                    <img
                      className="h-[150px] w-[150px]"
                      src={data.image}
                      alt="No Image"
                    />
                  </div>
                  <h1 className="mx-2 my-2">
                    <span className="font-bold">Date:</span> {data.date}
                  </h1>
                  <h1 className="mx-2 my-2">
                    {" "}
                    <span className="font-bold">User:</span> {data.user}
                  </h1>
                  <h1 className="mx-2 my-2">
                    {" "}
                    <span className="font-bold">Company:</span> {data.company}
                  </h1>
                  <button
                    className="bg-red-400 text-white font-bold py-2 px-2 rounded-md mb-10 lg:mb-0"
                    data-value={data.id}
                    onClick={deletePost}
                  >
                    DELETE
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellFood;
