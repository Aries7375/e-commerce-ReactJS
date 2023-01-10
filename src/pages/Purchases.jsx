import axios from "axios";
import React, { useEffect, useState } from "react";
import PurchaseCard from "../components/purchases/PurchaseCard";
import getConfig from "../utils/getConfig";

const Purchases = () => {
  const [purchasesList, setPurchasesList] = useState();
  useEffect(() => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases";
    axios
      .get(URL, getConfig())
      .then((res) => setPurchasesList(res.data.data.purchases))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="purchases-main-cont">
      <div className="route">
        <a href="/">Home</a>
        <div></div>
        <p>Purchases</p>
      </div>
      <h2>My purchases</h2>
      <div className="purchases-cont">
        {purchasesList?.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      </div>
    </section>
  );
};

export default Purchases;
