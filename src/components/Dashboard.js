import React from "react";
import useUser from "../hooks/useUser";

function Dashboard() {
  const { data, isLoading, error } = useUser();
  if (error) {
    console.log("something wrong happened", error);
  } else {
    console.log(data);
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
