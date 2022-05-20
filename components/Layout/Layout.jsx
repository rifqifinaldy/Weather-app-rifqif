import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="background">
        <Image
          alt="Weather-app"
          src="/images/background-cold.jpg"
          objectFit="cover"
          layout="fill"
          quality={100}
          priority={true}
        />
      </div>
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
