import { Button, Form, FormInstance, Image, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { Loading } from "core/components";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
interface Props {
  id?: string | number;
  onFinish: (values: any) => void;
  form: FormInstance<any>;
  onClose: () => void;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  // fileImg: File | undefined;
  setFileImg: React.Dispatch<React.SetStateAction<File | undefined>>;
}
const { TextArea } = Input;
export default function FormInput({
  form,
  onFinish,
  id,
  onClose,
  // fileImg,
  imageUrl,
  setFileImg,
  setImageUrl,
}: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const queryById = "ById";
  const { data: byId, isLoading } = useQuery({
    queryKey: [queryById, id],
    queryFn: () => {
      return api.getById(id as string);
    },
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    if (id) {
      setImageUrl(
        `${import.meta.env.VITE_BASE_URL_IMAGE}/${byId?.data.data.image}`
      );
      form.setFieldsValue({
        name: byId?.data.data.name,
        des: byId?.data.data.des,
      });
    }
  }, [byId, form, id, setImageUrl]);

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

  return (
    <>
      {isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-start py-1">
            <p className="text-gray-400 text-md">
              Kích thước ảnh (500 × 500px)
            </p>
          </div>
          <div className="border-[1px] border-gray-300 h-[200px] flex items-center justify-center">
            {imageUrl && (
              <Image
                // width={500} // Chiều rộng cố định 500px
                height="200px"
                className="object-contain"
                src={imageUrl} // URL của ảnh đã chọn
                alt="Uploaded Image"
              />
            )}
          </div>
          <Upload
            // listType="picture-card"
            className="w-full"
            showUploadList={false} // Ẩn danh sách file được tải lên
            beforeUpload={handleUpload} // Xử lý khi ảnh được chọn
          >
            <button className="w-[100%]">
              <UploadOutlined /> Chọn ảnh
            </button>
          </Upload>

          <Form
            name="form"
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label={`Tiêu đề`} name="name">
              <Input />
            </Form.Item>
            <Form.Item label={`Mô tả`} name="des" className="mt-1">
              <TextArea
                showCount
                maxLength={350}
                // onChange={onChange}
                placeholder="Nội dung"
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              className="text-right mt-[25px]"
            >
              <Button className="bg-white" onClick={onClose}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" className="ml-3">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}
