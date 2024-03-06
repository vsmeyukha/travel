'use client'

import { useState } from "react";
import Image from "next/image";
import MapComponent from "./components/GoogleMaps";
import D2_small from '@/public/D2_small.png';
import { posts, Post } from "./postsData";
import FiltersForm from "./components/filtersForm";

export default function Home() {
  const [postsData, setPostsData] = useState<Post[]>(posts);

  return (
    <main
      className="
      min-h-screen
      flex 
      flex-col 
      items-center 
      justify-between 
      lg:px-24 
      md:px-12 
      sm:px-6 
      px-0 
      py-6
      sm:py-8
      md:py-12
      lg:py-16"
    >
      <div className="flex items-center justify-center mb-8 gap-3">
        <Image src={D2_small} alt="DRIVE2" height={50} width={50} className="rounded-md" />
        <h1 className="text-4xl font-extrabold">DRIVE2 Путешествия</h1>
      </div>
      <FiltersForm postsData={postsData} setPostsData={setPostsData} />
      <MapComponent postsData={postsData} setPostsData={setPostsData} />
    </main>
  );
}
