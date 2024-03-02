import React from "react";

const Home = () => {
  const userName = sessionStorage.getItem("Username");
  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <div className="flex p-1 items-start justify-center mx-auto">
        <p className="p-1 items-start justify-center ">Welcome</p>
        <p className="items-start justify-center p-1 text-black">{userName}</p>
      </div>

      <p>
        This is the home page. You can navigate to other pages using the links
        in the header.
      </p>
    </div>
  );
};

export default Home;
