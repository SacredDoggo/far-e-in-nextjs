"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaGithub } from 'react-icons/fa';

import { logo } from "@/assets";
import { FormField, Loader, Card } from "@/components";

const RenderCards = ({ data, title }: { data: { _id: string, name: string, prompt: string, photo: string }[] | undefined; title: string }) => {
  if (data !== undefined && data?.length > 0) {
    return (
      <>
        {data.map((post) => (
          <Card key={post["_id"]} {...post} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<{ _id: string, name: string, prompt: string, photo: string }[]>();

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<{ _id: string, name: string, prompt: string, photo: string }[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "/api/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      const searchResults = allPosts?.filter(
        (item: { name: string, prompt: string }) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );

      setSearchResult(searchResults);
    }, 500);
  };

  return (
    <>
      
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7xl mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              The Community Showcase
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI
            </p>
          </div>

          <div className="mt-16">
            <FormField
              labelName="Search Post"
              type="text"
              name="text"
              placeholder="Search Post"
              value={searchText}
              handleChange={handleSearchChange}
            />
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchText && (
                  <h2 className="font-medium text-[#666e75] text-xl mb-3">
                    Showing results for{" "}
                    <span className="text-[#222328]">{searchText}</span>
                  </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                  {searchText ? (
                    <RenderCards
                      data={searchResult}
                      title="No search results found"
                    />
                  ) : (
                    <RenderCards data={allPosts} title="No posts found" />
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
