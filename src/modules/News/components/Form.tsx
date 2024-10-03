import { Button, Checkbox, Form, FormInstance, Input } from "antd";

// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { txt } from "core/constants";
// import userApi from "../api";

interface Props {
  id?: string | number;
  onFinish: (values: any) => void;
  form: FormInstance<any>;
  onClose: () => void;
}
export default function FormInput({ form, onFinish, id, onClose }: Props) {
  // const { data: byIdData } = useQuery({
  //   queryKey: ["userById", id],
  //   queryFn: () => {
  //     return userApi.getById(id as string);
  //   },
  //   enabled: !!id,
  //   refetchOnWindowFocus: true,
  //   refetchOnReconnect: true,
  // });
  // console.log(byIdData);

  // useEffect(() => {
  //   if (id) {
  //     form.setFieldsValue({
  //       name: byIdData?.data.data.name,
  //       username: byIdData?.data.data.username,
  //       email: byIdData?.data.data.email,
  //       phone: byIdData?.data.data.phone,
  //       publish: byIdData?.data.data.publish,
  //     });
  //   }
  // }, [byIdData]);
  return (
    <>
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
          rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={`Tài khoản`}
          name="username"
          rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          className="mt-3"
        >
          <Input />
        </Form.Item>
        {!id ? (
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
            className="mt-3"
            
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

        ) : (
          <></>
        )}

        <Form.Item
          label={`Email`}
          name="email"
          rules={[{ required: true, message: "Dữ liệu không được để trống" }, {type: 'email', message: 'Vui lòng nhập đúng định dạng'}]}
          className="mt-3"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={`Số điện thoại`}
          name="phone"
          rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
          className="mt-3"
        >
          <Input />
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
    </>
  );
}
