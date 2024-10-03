import { Button, Checkbox, Form, FormInstance, Input } from "antd";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../api";
import { Loading } from "core/components";
const { TextArea } = Input;
interface Props {
  id?: string | number;
  onFinish: (values: any) => void;
  form: FormInstance<any>;
  onClose: () => void;
}
export default function FormInput({ form, onFinish, id, onClose }: Props) {
  const queryById = "userById"
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
      form.setFieldsValue({
        name: byId?.data.data.name,
        email: byId?.data.data.email,
        phone: byId?.data.data.phone,
        address: byId?.data.data.address,
        content: byId?.data.data.content,
        publish: byId?.data.data.publish,
      });
    }
  }, [byId, form, id]);

  // const { data: roleData } = useQuery({
  //   queryKey: ["roles"],
  //   queryFn: () => {
  //     return roleApi.getAll({ active: 1 });
  //   },
  // });

  // const roleList = roleData?.data.data;
  // const optionsRole = roleList?.map((item: any) => ({
  //   value: item.id,
  //   label: item.name,
  // }));

  return (
    <>
      {isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <Form
          name="form"
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={`Họ và tên`}
            name="name"
            className="mt-1"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`Email`}
            name="email"
            rules={[
              { required: true, message: "Dữ liệu không được để trống" },
              { type: "email", message: "Vui lòng nhập đúng định dạng" },
            ]}
            className="mt-1"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`Số điện thoại`}
            name="phone"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
            className="mt-1"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`Địa chỉ`}
            name="address"
            rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
            className="mt-1"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={`Nội dung`}
            name="content"
            className="mt-1"
          >
            <TextArea
              showCount
              maxLength={350}
              // onChange={onChange}
              placeholder="Nội dung"
              style={{ height: 300, resize: "none" }}
            />
          </Form.Item>
          <Form.Item
            name="publish"
            label=""
            className="mt-2"
            layout="horizontal"
            valuePropName="checked" // Để làm việc với giá trị boolean
          >
            <Checkbox defaultChecked={true}>Kích hoạt</Checkbox>
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className="text-right mt-[15px]"
          >
            <Button className="bg-white" onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" className="ml-3">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
