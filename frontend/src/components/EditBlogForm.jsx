/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd";

export const EditBlogForm = ({
  title,
  content,
  image_url,
  author,
  onSubmit,
}) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <Form
          className="my-10"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ title, content, image_url, author }}
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

          <Form.Item>
            <Button htmlType="submit" type="primary" block size="large">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
