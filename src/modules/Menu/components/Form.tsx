import { Button, Form, FormInstance, Input, Checkbox } from "antd";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "core/components";
import api from "../api";

interface Props {
  id?: string | number;
  onFinish: (values: any) => void;
  form: FormInstance<any>;
  onClose: () => void;
}

export default function FormInput({ form, onFinish, id, onClose }: Props) {
  const queryById = "menuById";
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
        link: byId?.data.data.link,
        is_footer: byId?.data.data.is_footer,
        is_main: byId?.data.data.is_main,
        publish: byId?.data.data.publish
      });
    }
  }, [byId, form, id]);

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
          <Form.Item label={`Tiêu đề`} name="name">
            <Input />
          </Form.Item>
          <Form.Item label={`Link`} name="link">
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
            name="is_main"
            label=""
            className="mt-2"
            layout="horizontal"
            valuePropName="checked" // Để làm việc với giá trị boolean
          >
            <Checkbox defaultChecked={false}>Hiển thị top</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_footer"
            label=""
            className="mt-2"
            layout="horizontal"
            valuePropName="checked" // Để làm việc với giá trị boolean
          >
            <Checkbox defaultChecked={false}>Hiển thị footer</Checkbox>
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
      )}
    </>
  );
}
