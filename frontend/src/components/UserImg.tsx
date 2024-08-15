"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "../assets/LOGO.svg";

export default function UserImg() {
  const [userImg, setUserImg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUserImg = localStorage.getItem("userImg");
      setUserImg(storedUserImg || Logo);
    } catch (error) {
      setUserImg(Logo);
    }
  }, []);

  return <Image src={userImg || Logo} alt="User Image" className="w-1/12" />;
}
