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
} from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [company, setCompany] = useState("");
  const [docId, setDocId] = useState("");
  const [changeName, setChangeName] = useState(false);
  const handleClick = () => setChangeName(!changeName);
  const [allUsers, setAllUsers] = useState("");
  const [supplier, setSupplier] = useState(false);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const fetchUserName2 = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities: any = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
          setDocId(doc.id);
          console.log(docId);
          setCompany(doc.data().company);
          if (doc.data().supplier == true) {
            setSupplier(true);
          }
        });

        console.log("Users are: ", cities.join(", "));
        setAllUsers(cities.join(", "));
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const nameChanger = async () => {
    const nameRef = doc(collection(db, "users"), docId);
    await updateDoc(nameRef, {
      name: newName,
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName2();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <h1 className="mt-2">
          <span className="font-bold">Email:</span> {user?.email}
        </h1>
        <div>
          <span className="font-bold">Name:</span> {allUsers}{" "}
          <h1 onClick={handleClick}>Change?</h1>
          {changeName && (
            <>
              <input
                className="px-2"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full Name"
              />
              <button onClick={nameChanger} className="bg-green-500  px-2">
                Submit
              </button>
            </>
          )}
        </div>
        <h1 className="mt-2">
          <span className="font-bold">Company:</span> {company}
        </h1>
        {supplier ? (
          <h1>
            <span className="font-bold">Account Type:</span> Supplier
          </h1>
        ) : (
          <h1>
            <span className="font-bold">Account Type:</span> Consumer
          </h1>
        )}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
