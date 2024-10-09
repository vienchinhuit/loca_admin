import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Image, Input, Upload } from "antd";
import { HelmetPage, Loading } from "core/components";
import { HttpStatusCode, txt } from "core/constants";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AboutUs, ConfigAbouUs } from "./type";
import api from "./api";
import { Ckeditor } from "./components";

const { TextArea } = Input;
export default function Content() {
  const titlePage = txt.ABOUT_US_TITLE;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [filebanner, setFileBanner] = useState<File>();

  const [editorData, setEditorData] = useState<string>("");
  const [form] = Form.useForm();
  const queryById = "aboutUs";
  const { data: byId, isLoading } = useQuery({
    queryKey: [queryById],
    queryFn: () => {
      return api.get();
    },
    refetchOnReconnect: true,
  });
  const dataById = byId?.data.data;
  useEffect(() => {
    if (dataById) {
      dataById?.map((data: ConfigAbouUs) => {
        if (data.key === "ABOUT") {
          setImageUrl(
            `${import.meta.env.VITE_BASE_URL_IMAGE}/${data.content?.thumb}`
          );
          setBannerUrl(
            `${import.meta.env.VITE_BASE_URL_IMAGE}/${data.content?.banner}`
          );
          if (data.content.bottom !== null) {
            setEditorData(data.content.bottom);
          } else setEditorData("");
          form.setFieldsValue({
            top: data.content.top,
            bottom: data.content.bottom,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataById, form, setImageUrl, setBannerUrl]);
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

  const handleUploadBanner = (file: File) => {
    // Kiểm tra định dạng file (chỉ cho phép PNG và JPG)
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      // Định dạng không hợp lệ, đặt lỗi
      toast.error("Chỉ cho phép tải lên các tệp PNG hoặc JPG.");
      return false; // Ngăn không cho tải file
    }
    // Nếu định dạng hợp lệ, tiếp tục đọc file
    setFileBanner(file);

    // Đọc file ảnh dưới dạng base64 và lưu vào state để hiển thị
    const reader = new FileReader();
    reader.onload = () => {
      setBannerUrl(reader.result as string); // Lưu kết quả base64 của ảnh
    };
    reader.readAsDataURL(file as unknown as Blob); // Chuyển đổi file sang Blob để đọc
    return false; // Ngăn không gửi file lên server
  };

  const updateMutation = useMutation({
    mutationFn: (body: any) => api.updateAboutUs(body),
  });
  const onFinish = (values: any) => {
    const formData = new FormData();
    if (editorData == "") {
      toast.error("Vui lòng nhập mô tả sản phẩm!");
    }

    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof AboutUs)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        value = value !== undefined && value !== null ? value : "";
        formData.append(key as string, value as string | File);
      });
    }
    if (fileImg) {
      formData.append("file", fileImg);
    }
    if (filebanner) {
      formData.append("banner", filebanner);
    }
    formData.append("bottom", editorData);

    updateMutation.mutate(formData, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          toast.success(res.data.message);
        } else {
          const formError = res.data.errors;
          if (formError) {
            if (formError[0].field == "file") {
              toast.error(formError[0].message);
            } else {
              form.setFields([
                {
                  name: formError[0].field,
                  errors: [formError[0].message], // Gán lỗi cho trường username
                },
              ]);
            }
          }
        }
      },
      onError: () => {
        toast.error(txt.UPDATE_FAILED);
      },
    });
  };

  return (
    <div className="mx-5">
      <HelmetPage title={`${titlePage}`} content={`Quản lý ${titlePage}`} />
      {updateMutation.isPending || isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <Form
          name="formAboutUs"
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          className=""
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="text-center w-full mb-5">
            <div className="flex justify-start py-1">
              <div className="font-medium mr-2">Banner</div>
              <p className="text-gray-400 text-md">
                Kích thước ảnh (900 x 390px)
              </p>
            </div>
            <div className="border-[1px] border-gray-300 h-[300px] flex items-center justify-center">
              {bannerUrl && (
                <>
                  <Image
                    // width={500} // Chiều rộng cố định 500px
                    height="300px"
                    className="object-contain"
                    src={bannerUrl} // URL của ảnh đã chọn
                    alt="Uploaded Image"
                  />
                </>
              )}
            </div>
            <div className="text-red-400"></div>
            <Upload
              // listType="picture-card"
              className="w-full"
              showUploadList={false} // Ẩn danh sách file được tải lên
              beforeUpload={handleUploadBanner} // Xử lý khi ảnh được chọn
            >
              <Button className="w-[100%] bg-green mt-5">
                <UploadOutlined /> Chọn ảnh
              </Button>
            </Upload>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 text-center w-full">
              <div className="flex justify-start py-1">
                <p className="text-gray-400 text-md">
                  Kích thước ảnh (800 x 530px)
                </p>
              </div>
              <div className="border-[1px] border-gray-300 h-[300px] flex items-center justify-center">
                {imageUrl && (
                  <>
                    <Image
                      // width={500} // Chiều rộng cố định 500px
                      height="300px"
                      className="object-contain"
                      src={imageUrl} // URL của ảnh đã chọn
                      alt="Uploaded Image"
                    />
                  </>
                )}
              </div>
              <div className="text-red-400"></div>
              <Upload
                // listType="picture-card"
                className="w-full"
                showUploadList={false} // Ẩn danh sách file được tải lên
                beforeUpload={handleUpload} // Xử lý khi ảnh được chọn
              >
                <Button className="w-[100%] bg-green mt-5">
                  <UploadOutlined /> Chọn ảnh
                </Button>
              </Upload>
            </div>
            <div className="col-span-1">
              <Form.Item
                label={`Mô tả`}
                name="top"
                rules={[
                  { required: true, message: "Dữ liệu không được để trống" },
                ]}
              >
                <TextArea rows={14} placeholder="Mô tả" />
              </Form.Item>
            </div>
          </div>
          {/* <Form.Item
            label={`Nội dung`}
            name="bottom"
            className="mt-2"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          >
            <TextArea rows={15} placeholder="maxLength is 6" />
          </Form.Item> */}
          <div className="mt-5">
            <div className="font-medium mb-2">Nội dung</div>
            <Ckeditor editorData={editorData} setEditorData={setEditorData} />
          </div>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className="text-right mt-5"
          >
            <Button htmlType="submit" className="text-white w-52 py-5 bg-green">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
      {/* <div className="mt-10">
        <Ckeditor />
      </div> */}
    </div>
  );
}
