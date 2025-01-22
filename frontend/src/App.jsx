import { useState } from "react";
import { BlogForm } from "./components/BlogForm";
import { Header } from "./components/Header";
import { MyBlogs } from "./components/MyBlogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const handleNewBlog = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]); // Add new blog at the top
  };

  return (
    <>
      <section className="container my-10 bg-gray-50 rounded-md p-5">
        <Header title={"CREATE A BLOG"} />

        <BlogForm onBlogCreated={handleNewBlog} />
      </section>
      <MyBlogs blogs={blogs} setBlogs={setBlogs} />
    </>
  );
};

export default App;
