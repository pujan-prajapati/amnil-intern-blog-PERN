/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { Button, Modal } from "antd";
import { FaTrash, FaPen } from "react-icons/fa6";
import toast from "react-hot-toast";
import { EditBlogForm } from "./EditBlogForm";

export const MyBlogs = ({ blogs, setBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const showModal = (id) => {
    setIsModalOpen(id);
  };

  const handleUpdate = async (id, values) => {
    try {
      const response = await axios.put(`${API_URL}/blogs/${id}`, values);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? response.data.data : blog))
      );

      toast.success("Blog updated successfully");

      setIsModalOpen(null);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(null);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      setBlogs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="container">
      {blogs.length === 0 ? (
        <h2 className="text-orange-600 italic text-center my-10">
          No blogs found
        </h2>
      ) : (
        <div className="grid grid-cols-3 gap-5 my-10">
          {blogs.map((blog) => (
            <div key={blog.id} className="shadow-md rounded-md">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-72 object-cover rounded-t-md p-3"
              />

              <div className="pb-5 px-4 space-y-2">
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <p className="text-gray-600">{blog.content}</p>
                <p className="italic">Author: {blog.author}</p>
                <div className="flex gap-3 pt-3 justify-end">
                  <Button type="primary" onClick={() => showModal(blog.id)}>
                    <FaPen />
                  </Button>
                  <Modal
                    title="Edit Blog"
                    open={isModalOpen === blog.id}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <EditBlogForm
                      title={blog.title}
                      content={blog.content}
                      image_url={blog.image_url}
                      author={blog.author}
                      onSubmit={(values) => handleUpdate(blog.id, values)}
                    />
                  </Modal>

                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(blog.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
