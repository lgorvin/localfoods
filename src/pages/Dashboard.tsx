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
  setDoc,
} from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [company, setCompany] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [docId, setDocId] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [changeCompany, setChangeCompany] = useState(false);
  const [addAvatar, setAddAvatar] = useState(false);
  const handleNameChange = () => setChangeName(!changeName);
  const handleCompanyChange = () => setChangeCompany(!changeCompany);
  const handleAvatar = () => setAddAvatar(!addAvatar);
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
          setProfilePic(doc.data().avatar);
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

  const companyChanger = async () => {
    const nameRef = doc(collection(db, "users"), docId);
    await updateDoc(nameRef, {
      company: newCompany,
    });
  };

  const nameChanger = async () => {
    const nameRef = doc(collection(db, "users"), docId);
    await updateDoc(nameRef, {
      name: newName,
    });
  };

  const avatarAdd = async () => {
    const nameRef = doc(collection(db, "users"), docId);
    await updateDoc(nameRef, {
      avatar: avatar,
    });
    setAddAvatar(!addAvatar);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName2();
  }, [user, loading]);
  return (
    <div className="dashboard ">
      <div className="dashboard__container">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex justify-center">
          <div className="bg-gray-400 rounded-full h-[150px] w-[150px] shadow-lg">
            <div className="flex justify-center h-full text-8xl">
              {!addAvatar && (
                <img
                  className="rounded-full h-full w-full mt-[-8px]"
                  src={profilePic}
                  alt=""
                />
              )}
              {addAvatar && (
                <div className="scale-[0.2]">
                  <input
                    className="px-2 mt-2"
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="Image Link"
                  />
                  <button onClick={avatarAdd} className="bg-green-500  px-2">
                    Submit
                  </button>
                  <button onClick={handleAvatar} className="bg-red-500  px-2">
                    Close
                  </button>
                </div>
              )}
            </div>

            {!addAvatar && (
              <h1 onClick={handleAvatar} className="font-bold cursor-pointer">
                Add Profile Picture
              </h1>
            )}

            <img src="" alt="" />
          </div>
        </div>
        <h1 className="mt-8">
          <span className="font-bold">Email:</span> {user?.email}
        </h1>
        <h1 className="mt-2">
          <span className="font-bold">Name:</span> {allUsers}
        </h1>{" "}
        <h1
          className="hover:text-blue-600 cursor-pointer duration-200"
          onClick={handleNameChange}
        >
          Change?
        </h1>
        {changeName && (
          <>
            <input
              className="px-2 mt-2"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full Name"
            />
            <button onClick={nameChanger} className="bg-green-500  px-2">
              Submit
            </button>
            <button onClick={handleNameChange} className="bg-red-500  px-2">
              Close
            </button>
          </>
        )}
        <h1 className="mt-2">
          <span className="font-bold">Company:</span> {company}
        </h1>
        <h1
          className="hover:text-blue-600 cursor-pointer duration-200"
          onClick={handleCompanyChange}
        >
          Change?
        </h1>
        {changeCompany && (
          <>
            <input
              className="px-2 mt-2"
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="Company Name"
            />
            <button onClick={companyChanger} className="bg-green-500  px-2">
              Submit
            </button>
            <button onClick={handleCompanyChange} className="bg-red-500  px-2">
              Close
            </button>
          </>
        )}
        {supplier ? (
          <h1 className="mt-2">
            <span className="font-bold">Account Type:</span> Supplier
          </h1>
        ) : (
          <h1 className="mt-2">
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
