import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
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
} from "firebase/firestore";

const SellFood = () => {
  const [user, loading, error] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [docId, setDocId] = useState("");
  const [uid, setUid] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [fetchDesc, setFetchDesc] = useState<
    { title: string; desc: string; user: string; uid: string }[]
  >([]);

  const [fetchTitle, setFetchTitle] = useState([]);
  // const [fetchDesc, setFetchDesc] = useState([]);

  interface Post {
    title: string;
    desc: string;
    user: string;
    uid: string;
  }

  const postArr: Post[] = [];

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

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const titles: any = [];
        const descs: any = [{}];
        querySnapshot.forEach((doc) => {
          titles.push(doc.data().title);
          postArr.push({
            title: doc.data().title,
            desc: doc.data().desc,
            user: doc.data().user,
            uid: doc.data().uid,
          });
        });
        //console.log(postArr);
        //console.log("Post titles are: ", titles.join(", "));
        setFetchTitle(titles);
        setFetchDesc(postArr);
        console.log(fetchDesc);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const postMaker = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      desc: desc,
      user: name,
      uid: uid,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName2();
    fetchPosts();
    for (var product of fetchDesc) {
      console.log(product.title);
      console.log(product.desc);
    }
  }, [user, loading]);
  return (
    <div>
      <div>Supplier Hub</div>
      <div className="flex justify-center">
        <input
          className="px-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Food Item"
        />
        <input
          className="px-2"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <button className="bg-green-500 px-2" onClick={postMaker}>
          Create Post
        </button>
      </div>
      <div>
        <h1 className="text-center mt-10">Your Posts</h1>
        <div>
          {/* {fetchTitle.map((title) => (
            <>
              <h1 key={title}>title: {title}</h1>
            </>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SellFood;
