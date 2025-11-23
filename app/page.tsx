'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setImageUrl(`https://ddragon-webp.lolmath.net/latest/img/profileicon//${data.message.profileIconId}.webp`);
        console.log(`https://ddragon-webp.lolmath.net/latest/img/profileicon//${data.message.profileIconId}.webp`);
      });
  }, [])
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Profile Icon" width={100} height={100} />}
    </div>
  );
}
