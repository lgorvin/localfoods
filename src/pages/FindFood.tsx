import React, { useEffect, useState } from "react";
import "animate.css";

const FindFood = () => {
  let [lat1, setLat1] = useState(0);
  let [lon1, setLon1] = useState(0);
  // const [lat2, setLat2] = useState(34.534);
  // const [lon2, setLon2] = useState(22.33);

  let lat2 = 50.534162;
  let lon2 = -1.708114;

  const [miles, setMiles] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLat1(position.coords.latitude);
      setLon1(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const distance = () => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 3956;

    // calculate the result

    setMiles(c * r);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-4 mt-10 place-items-center animate__animated animate__backInLeft animate__slow">
          <div>
            <div className="h-[375px] w-[350px] rounded-lg bg-gray-300 shadow-lg hover:scale-110 cursor-pointer duration-300">
              <img
                className="rounded-t-lg h-[200px] w-[350px] mb-4"
                src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/10/redMeat-849360782-770x553-650x428.jpg"
                alt=""
              />

              <div className="h-[45px] w-[45px] border-2 border-gray-600 ml-4 mb-4 shadow-lg bg-black rounded-full">
                <img
                  className="rounded-full h-full w-full shadow-lg"
                  src="https://media.gettyimages.com/id/dv1087037/photo/portrait-of-a-butcher-standing-in-a-butchers-shop-behind-a-chopping-board.jpg?s=1024x1024&w=gi&k=20&c=CzYBjM6OetE_7XtCdx0wzg57SIofMZIkPnE0n1_NxaA="
                  alt=""
                />
              </div>
              <div className="float-right mt-[-50px] mr-16 font-bold">
                <h1>Andrew @ Swindon Butchers</h1>
              </div>

              <h1 className="font-bold inline ml-4 mt-5 text-xl">
                Local Steak
              </h1>
              <h1 className="inline ml-[102px] mt-4 font-bold">
                {Math.round(miles * 10) / 10} Miles away
              </h1>
              <h2 className="float-right mr-4 text-sm">
                <span className="font-bold text-xl">£3.50</span> per kg
              </h2>
              <p className="mx-4">
                Fresh cut steak top quality best of the best
              </p>
            </div>
          </div>
          <div>
            <div className="h-[375px] w-[350px] rounded-lg bg-gray-300 shadow-lg hover:scale-110 cursor-pointer duration-300">
              <img
                className="rounded-t-lg h-[200px] w-[350px] mb-4"
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fruit-1610570153.jpg"
                alt=""
              />

              <div className="h-[45px] w-[45px] border-2 border-gray-600 ml-4 mb-4 shadow-lg bg-black rounded-full">
                <img
                  className="rounded-full h-full w-full shadow-lg"
                  src="https://t3.ftcdn.net/jpg/03/82/02/18/360_F_382021894_YgVpXsRuwFr6lbSqa4uSzDiR9YLqqdtF.jpg"
                  alt=""
                />
              </div>
              <div className="float-right mt-[-50px] mr-[138px] font-bold">
                <h1>Sally @ FreshFruits</h1>
              </div>

              <h1 className="font-bold inline ml-4 mt-5 text-xl">
                Local Fruit
              </h1>
              <h1 className="inline ml-[102px] mt-4 font-bold">
                {Math.round(miles * 10) / 10} Miles away
              </h1>
              <h2 className="float-right mr-4 text-sm">
                <span className="font-bold text-xl">£3.50</span> per kg
              </h2>
              <p className="mx-4">
                Fresh cut steak top quality best of the best
              </p>
            </div>
          </div>
          <div>
            <div className="h-[375px] w-[350px] rounded-lg bg-gray-300 shadow-lg hover:scale-110 cursor-pointer duration-300">
              <img
                className="rounded-t-lg h-[200px] w-[350px] mb-4"
                src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/10/redMeat-849360782-770x553-650x428.jpg"
                alt=""
              />

              <div className="h-[45px] w-[45px] border-2 border-gray-600 ml-4 mb-4 shadow-lg bg-black rounded-full">
                <img
                  className="rounded-full h-full w-full shadow-lg"
                  src="https://media.gettyimages.com/id/dv1087037/photo/portrait-of-a-butcher-standing-in-a-butchers-shop-behind-a-chopping-board.jpg?s=1024x1024&w=gi&k=20&c=CzYBjM6OetE_7XtCdx0wzg57SIofMZIkPnE0n1_NxaA="
                  alt=""
                />
              </div>
              <div className="float-right mt-[-50px] mr-16 font-bold">
                <h1>Andrew @ Swindon Butchers</h1>
              </div>

              <h1 className="font-bold inline ml-4 mt-5 text-xl">
                Local Steak
              </h1>
              <h1 className="inline ml-[102px] mt-4 font-bold">
                {Math.round(miles * 10) / 10} Miles away
              </h1>
              <h2 className="float-right mr-4 text-sm">
                <span className="font-bold text-xl">£3.50</span> per kg
              </h2>
              <p className="mx-4">
                Fresh cut steak top quality best of the best
              </p>
            </div>
          </div>
          <div>
            <div className="h-[375px] w-[350px] rounded-lg bg-gray-300 shadow-lg hover:scale-110 cursor-pointer duration-300">
              <img
                className="rounded-t-lg h-[200px] w-[350px] mb-4"
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fruit-1610570153.jpg"
                alt=""
              />

              <div className="h-[45px] w-[45px] border-2 border-gray-600 ml-4 mb-4 shadow-lg bg-black rounded-full">
                <img
                  className="rounded-full h-full w-full shadow-lg"
                  src="https://t3.ftcdn.net/jpg/03/82/02/18/360_F_382021894_YgVpXsRuwFr6lbSqa4uSzDiR9YLqqdtF.jpg"
                  alt=""
                />
              </div>
              <div className="float-right mt-[-50px] mr-[138px] font-bold">
                <h1>Sally @ FreshFruits</h1>
              </div>

              <h1 className="font-bold inline ml-4 mt-5 text-xl">
                Local Fruit
              </h1>
              <h1 className="inline ml-[102px] mt-4 font-bold">
                {Math.round(miles * 10) / 10} Miles away
              </h1>
              <h2 className="float-right mr-4 text-sm">
                <span className="font-bold text-xl">£3.50</span> per kg
              </h2>
              <p className="mx-4">
                Fresh cut steak top quality best of the best
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindFood;
