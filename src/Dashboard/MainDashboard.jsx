import React, { useState } from "react";
import Form from "../components/Form";

const MainDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {" "}
      <button
        className="hidden md:block bg-buttons  py-2 px-4 rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setShowForm(true)}
      >
        Add Items
      </button>
      {showForm && <Form setshowForm={setShowForm} />}
    </div>
  );
};

export default MainDashboard;
