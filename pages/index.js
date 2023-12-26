// import Layout from "@/layouts";
import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Main() {
  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.log("response => ", err));
  }, []);

  return (
    <>
      <LayoutComponent
        metaTitle={"Home"}
        metaDescription={"Informasi utama Next App"}
      >
        {/* Content Styling dengan Global CSS */}
        <div className="content">
          <p>Ini Halaman Home</p>
          <div className="flex gap-6">
            <Image src="/next.png" alt="Next Image" width={200} height={200} />
            <img
              src="/next.png"
              alt="Img html"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
      </LayoutComponent>
    </>
  );
}
