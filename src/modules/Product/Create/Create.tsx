import { Button, Checkbox, Form, Image, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Ckeditor from "../components/Ckeditor";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { HttpStatusCode, path, txt } from "core/constants";
import { useNavigate } from "react-router-dom";
import { Product } from "../type";
const { TextArea } = Input;
export default function CreateProduct() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();
  const [editorData, setEditorData] = useState<string>("");
  const [editorDataSpecification, setEditorDataSpecification] =
    useState<string>("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    setEditorData("");
  }, []);
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

  const create = useMutation({
    mutationFn: (body: any) => api.create(body),
  });
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof Product)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        if (key === "content") return;
        if (key === "specification") return;
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
    formData.append("specification", editorDataSpecification);
    create.mutate(formData, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          toast.success(res.data.message);
          form.resetFields();
          // resetQuery();
          navigate(`${path.ROUTE_ADMIN}${path.ROUTE_PRODUCT}`);
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
  const onCancel = () => {
    navigate(`${path.ROUTE_ADMIN}${path.ROUTE_PRODUCT}`);
    setEditorData("");
  };
  return (
    <Form
      name="form"
      form={form}
      layout="vertical"
      className="p-5 mt-8"
      initialValues={{ remember: true, publish: true }}
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
            {imageUrl && (
              <Image height={300} src={imageUrl} alt="Uploaded Image" />
            )}
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
        </div>
        <div className="col-span-1">
          <Form.Item
            label={`Tên sản phẩm`}
            name="name"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={`Mô tả`} name="des">
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
            <Checkbox defaultChecked={true}>Hiển thị</Checkbox>
          </Form.Item>
        </div>
      </div>
      <div className="mt-20">
        <div className="font-medium text-[14px] mb-2">Nội dung</div>
        <Ckeditor editorData={editorData} setEditorData={setEditorData} />
      </div>
      <div className="mt-10">
        <div className="font-medium text-[14px] mb-2">Thông số kỹ thuật</div>
        <Ckeditor
          editorData={editorDataSpecification}
          setEditorData={setEditorDataSpecification}
        />
      </div>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        className="text-right mt-[25px]"
      >
        <Button className="bg-white" onClick={() => onCancel()}>
          Hủy
        </Button>
        <Button  htmlType="submit" className="ml-3 bg-green text-white">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
}
