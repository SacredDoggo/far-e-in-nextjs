"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { preview, logo } from "@/assets";
import { getRandomPrompt } from "@/utils";
import { FormField, Loader } from "@/components";

const CreatePost = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(
          "/api/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        router.push("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate a image or write a prompt");
    }
  };
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "/api/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
          
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt!");
    }
  };

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link href="/">
          <img src={logo.src} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          href="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7xl mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              Create
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
              Create imaginative and visually stunning images with DALL-E AI and
              share them with community
            </p>
          </div>

          <form className="mt-16 max-2-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                handleChange={handleChange}
              />
              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 docus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview.src}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}
                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
              <div className="mt-5 flex gap 5">
                <button
                  type="button"
                  onClick={generateImage}
                  className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {generatingImg ? "Generating..." : "Generate"}
                </button>
              </div>
              <div className="mt-8">
                <p className="mt-2 text-[#666e75] text-[14px]">
                  Once you have created the image you want, you can share it
                  with the community
                </p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {loading ? "Sharing..." : "Share with the community"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default CreatePost;
