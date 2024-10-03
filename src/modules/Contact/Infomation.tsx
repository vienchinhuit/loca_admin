import { Button, Form, Image, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { InformationConfig, InformationContact } from "./type";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { txt } from "core/constants";
import { toast } from "react-toastify";
import { Loading } from "core/components";

export default function Infomation() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();
  const [form] = Form.useForm();
  const queryById = "infomation";
  const { data: byId, isLoading } = useQuery({
    queryKey: [queryById],
    queryFn: () => {
      return api.getInfo();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const dataById = byId?.data.data;
  useEffect(() => {
    if (dataById) {
      dataById?.map((data: InformationConfig) => {
        if (data.key === "CONTACT") {
          setImageUrl(
            `${import.meta.env.VITE_BASE_URL_IMAGE}/${data.content.thumb}`
          );
          form.setFieldsValue({
            name: data.content.name,
            tax_code: data.content.tax_code,
            address: data.content.address,
            phone: data.content.phone,
            email: data.content.email,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataById, form, setImageUrl]);

  // Xử lý khi người dùng tải ảnh lên
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

  const updateMutation = useMutation({
    mutationFn: (body: any) => api.updateInfo(body),
  });
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof InformationContact)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        value = value !== undefined && value !== null ? value : "";
        formData.append(key as string, value as string | File);
      });
    }
    if (fileImg) {
      formData.append("file", fileImg);
    }
    updateMutation.mutate(formData, {
      onSuccess: (res) => {
        // if (res.data.statusCode == HttpStatusCode.Ok) {
        toast.success(res.data.message);
        // } else {
        //   const formError = res.data.errors;
        //   if (formError) {
        //     form.setFields([
        //       {
        //         name: formError[0].field,
        //         errors: [formError[0].message], // Gán lỗi cho trường username
        //       },
        //     ]);
        //   }
        // }
      },
      onError: () => {
        toast.error(txt.UPDATE_FAILED);
      },
    });
  };

  return (
    <div className=" mx-5">
      {updateMutation.isPending || isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 text-center w-full">
            <div className="flex justify-start py-1">
              <p className="text-gray-400 text-md">
                Kích thước ảnh (600 x 220px)
              </p>
            </div>
            <div className="border-[1px] border-gray-300 h-[400px] flex items-center justify-center">
              {imageUrl && (
                <Image
                  // width={500} // Chiều rộng cố định 500px
                  height="100px"
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
          </div>
          <div className="col-span-1">
            <Form
              name="form"
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label={`Tiêu đề`}
                name="name"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={`Mã số thuế`}
                name="tax_code"
                className="mt-1"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={`Địa chỉ`}
                name="address"
                className="mt-1"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={`Số điện thoại`}
                name="phone"
                className="mt-1"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={`Email`}
                name="email"
                className="mt-1"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                className="text-right mt-[15px]"
              >
                <Button
                  htmlType="submit"
                  className="text-white w-52 py-5 bg-green"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
