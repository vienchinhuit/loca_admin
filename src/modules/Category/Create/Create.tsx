import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Ckeditor from "../components/Ckeditor";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { HttpStatusCode, path, txt } from "core/constants";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
export default function CreateCategory() {
  const [editorData, setEditorData] = useState<string>("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    setEditorData('')
  },[])
  
  const create = useMutation({
    mutationFn: (body: any) => api.create(body),
  });
  const onFinish = (values: any) => {
     if (editorData == null) {
      toast.error("Vui lòng nhập nội dung danh mục!");
    } else {
      const result = {
        ...values,
        publish: values.publish ? values.publish : '1',
        content: editorData
      }
      // if (values && typeof values === "object") {
      //   (Object.keys(values) as (keyof News)[]).forEach((key) => {
      //     let value = values[key];
      //     if (key === "content") return;
      //     if (key === "publish" && typeof value === "boolean") {
      //       value = value === true ? "1" : "0";
      //     }
      //     value = value !== undefined && value !== null ? value : "";
      //     formData.append(key as string, value as string | File);
      //   });
      // }

      // formData.append("file", fileImg);
      // formData.append("content", editorData);
      create.mutate(result, {
        onSuccess: (res) => {
          if (res.data.statusCode == HttpStatusCode.Ok) {
            toast.success(res.data.message);
            form.resetFields();
            // resetQuery();
            navigate(`${path.ROUTE_ADMIN}${path.ROUTE_CATEGORY}`);
            setEditorData('');
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
    }
  };
  const onCancel = () => { 
    navigate(`${path.ROUTE_ADMIN}${path.ROUTE_CATEGORY}`)
    setEditorData('')
  }
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
        <div className="col-span-1 w-full">
          <Form.Item
            label={`Tiêu đề`}
            name="heading"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`Mô tả`}
            name="description"
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
            <Checkbox defaultChecked={true}>Hiển thị</Checkbox>
          </Form.Item>
        </div>
        <div className="col-span-1">
          <Form.Item
            label={`Title`}
            name="title"
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
          
        </div>
      </div>
      <div className="mt-5">
        <div className="font-medium mt-5 bt-3">Nội dung</div>
        <Ckeditor editorData={editorData} setEditorData={setEditorData} />
      </div>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        className="text-right mt-[25px]"
      >
        <Button
          className="bg-white"
          onClick={()=>onCancel()}
        >
          Hủy
        </Button>
        <Button htmlType="submit" className="ml-3 bg-green text-white">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
}
