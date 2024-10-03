import { Button, DatePicker, Form, FormInstance, Input, Radio } from "antd";
import { User } from "modules/Users/type";
import { useEffect } from "react";
interface Props {
  form: FormInstance<any>;
  handleCancel: () => void;
  profile?: User;
  onFinish: (values: any) => void;
}
export default function FormInput({ form, handleCancel, profile, onFinish }: Props) {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  useEffect(() => {
    form.setFieldsValue({
      name: profile?.name,
      // username: byId?.data.data.username,
      email: profile?.email,
      phone: profile?.phone,
      // phone: byId?.data.data.phone,
      // publish: byId?.data.data.publish,
    });
  }, [form, profile?.email, profile?.name, profile?.phone]);
  return (
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
        label={`Ngày sinh`}
        name="dob"
        // rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
        className="mt-1"
      >
        <DatePicker
          format={dateFormatList}
          placeholder="Chọn ngày sinh"
          className=" w-full"
        />
      </Form.Item>
      <Form.Item
        label={`Giới tính`}
        name="gender"
        // rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
        className="mt-1"
      >
        <Radio.Group>
          <Radio value={0}>Nam</Radio>
          <Radio value={1}>Nữ</Radio>
          <Radio value={2}>Khác</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={`Địa chỉ`}
        name="address"
        className="mt-2"
        // rules={[{ required: true, message: "Dữ liệu không được để trống" }]}
      >
        <Input placeholder="Số nhà, đường, ..." />
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        className="text-right mt-[15px]"
      >
        <Button className="bg-white" onClick={handleCancel}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" className="ml-3">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
