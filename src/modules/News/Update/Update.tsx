import { Button, Checkbox, Form, Image, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import Ckeditor from "../components/Ckeditor";
import { InfoCircleOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpStatusCode, path, txt } from "core/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { News } from "../type";
const { TextArea } = Input;
export default function Update() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();
  const [editorData, setEditorData] = useState<string>("");
  const [id, setId] = useState<number>();
  const { data: byId } = useQuery({
    queryKey: ["newById"],
    queryFn: () => {
      return api.getBySlug(slug as string);
    },
    staleTime: 0,
  });
  const news = byId?.data.data;

  useEffect(() => {
    form.resetFields();
    if (news) {
      setImageUrl(`${import.meta.env.VITE_BASE_URL_IMAGE}/${news.image_url}`);
      if (news.content) {
        setEditorData(news.content);
      }
      setId(news.id);
      form.setFieldsValue({
        title: news?.title,
        heading: news?.heading,
        description: news?.description,
        meta_keywords: news?.meta_keywords,
        meta_description: news?.meta_description,
        publish: news?.publish,
        // Thêm các trường khác nếu cần
      });
    }
  }, [slug, form, news]);

  const handleUpload = (file: File) => {
    // Kiểm tra định dạng file (chỉ cho phép PNG và JPG)
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      // Định dạng không hợp lệ, đặt lỗi
      toast.error("Chỉ cho phép tải lên các tệp PNG hoặc JPG.");
      return false; // Ngăn không cho tải file
    }
    // Nếu định dạng hợp lệ, tiếp tục đọc file
    setFileImg(file);

    // Đọc file ảnh dưới dạng base64 và lưu vào state để hiển thị
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string); // Lưu kết quả base64 của ảnh
    };
    reader.readAsDataURL(file as unknown as Blob); // Chuyển đổi file sang Blob để đọc
    return false; // Ngăn không gửi file lên server
  };

  const update = useMutation({
    mutationFn: (body: any) => api.update(id || 0, body),
  });
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof News)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        if (key === "content") return;
        if (key === "publish" && typeof value === "boolean") {
          value = value === true ? "1" : "0";
        }
        value = value !== undefined && value !== null ? value : "";
        formData.append(key as string, value as string | File);
      });
    }
    if (fileImg) {
      formData.append("file", fileImg);
    }
    formData.append("content", editorData);
    update.mutate(formData, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          toast.success(res.data.message);
          form.resetFields();
          // resetQuery();
          navigate(`${path.ROUTE_ADMIN}${path.ROUTE_NEWS}`);
          setFileImg(undefined);
          setEditorData("");
        } else {
          const formError = res.data.errors;
          if (formError) {
            form.setFields([
              {
                name: formError[0].field,
                errors: [formError[0].message], // Gán lỗi cho trường username
              },
            ]);
          }
        }
      },
      onError: () => {
        toast.error(txt.CREATE_FAILED);
      },
    });
  };
  return (
    <Form
      name="form"
      form={form}
      layout="vertical"
      className="p-5 mt-8"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 text-center w-full">
          <div className="flex justify-start py-1">
            <p className="text-gray-400 text-md">
              Kích thước ảnh (600 × 450px)
            </p>
          </div>
          <div className="border-[1px] border-gray-300 h-[300px] flex items-center justify-center relative">
            <div className="absolute">
              {imageUrl && (
                <Image
                  // width={500} // Chiều rộng cố định 500px
                  width="60%"
                  className="object-contain"
                  src={imageUrl} // URL của ảnh đã chọn
                  alt="Uploaded Image"
                />
              )}
            </div>
          </div>
          <div className="w-[100%] relative">
            <Upload
              // listType="picture-card"
              className="w-[100%] absolute left-0 right-0"
              showUploadList={false} // Ẩn danh sách file được tải lên
              beforeUpload={handleUpload} // Xử lý khi ảnh được chọn
            >
              <Button className="w-[100%] bg-green ">
                <UploadOutlined /> Chọn ảnh
              </Button>
            </Upload>
          </div>
          <Form.Item
            label={`Tiêu đề`}
            name="heading"
            className="mt-12"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={`Mô tả`} name="description">
            <TextArea
              showCount
              maxLength={350}
              // onChange={onChange}
              placeholder="Nội dung"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
        </div>
        <div className="col-span-1">
          <Form.Item
            label={`Title`}
            name="title"
            className="mt-1"
            tooltip={{
              title:
                "Tiêu đề trang hiệu quả nhất dài khoản 10-70 ký tự, bao gồm cả khoảng trắng",
              icon: <InfoCircleOutlined />,
            }}
          >
            <TextArea
              showCount
              maxLength={70}
              // onChange={onChange}
              placeholder="Tiêu đề"
              style={{ height: 35, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            label={`Meta Keywords`}
            name="meta_keywords"
            className="mt-1"
          >
            <TextArea
              showCount
              maxLength={350}
              // onChange={onChange}
              placeholder="Nội dung"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            label={`Meta Descriptions`}
            name="meta_description"
            className="mt-1"
            tooltip={{
              title:
                "Tiêu đề trang hiệu quả nhất dài khoản 160-300 ký tự, bao gồm cả khoảng trắng",
              icon: <InfoCircleOutlined />,
            }}
          >
            <TextArea
              showCount
              maxLength={350}
              // onChange={onChange}
              placeholder="Nội dung"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            name="publish"
            label=""
            className="mt-2"
            layout="horizontal"
            valuePropName="checked" // Để làm việc với giá trị boolean
          >
            <Checkbox defaultChecked={true}>Hoạt động</Checkbox>
          </Form.Item>
        </div>
      </div>
      <div className="mt-5">
        <div className="font-medium mb-3">Nội dung</div>
        <Ckeditor editorData={editorData} setEditorData={setEditorData} />
      </div>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        className="text-right mt-[25px]"
      >
        <Button
          className="bg-white"
          onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_NEWS}`)}
        >
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" className="ml-3">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
}
