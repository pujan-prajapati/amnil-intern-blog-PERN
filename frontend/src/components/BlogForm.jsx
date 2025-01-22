/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-hot-toast";

export const BlogForm = ({ onBlogCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/blogs`, values);
      toast.success("Blog created successfully");
      form.resetFields();

      if (onBlogCreated) {
        onBlogCreated(response.data.data);
      }

      return response.data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <Form
          className="my-10"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input.TextArea rows={4} placeholder="Content" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image_url"
            rules={[{ required: true, message: "Please provide image url!" }]}
          >
            <Input placeholder="Image url" />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please provide author name!" }]}
          >
            <Input placeholder="Author" />
          </Form.Item>

          <Button htmlType="submit" type="primary" size="large">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
