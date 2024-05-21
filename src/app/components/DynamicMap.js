"use client";

// import MyMap from "./MapCenteredPlainLeaflet";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "../style/page.css";

function DynamicMap(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateData = async () => {
    setLoading(true);
    await fetch("/api/db", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    updateData();
  }, [props.dep]);

  const MyDynamicMap = useMemo(() => dynamic(
    () => import("./MapCenteredPlainLeaflet")
      .then((mod) => mod.default), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
  ), [],
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <MyDynamicMap data={data}/>
  );
}

export default DynamicMap;
