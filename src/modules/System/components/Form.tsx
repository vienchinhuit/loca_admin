import {
  Button,
  Form,
  FormInstance,
  Input,
} from "antd";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import brandApi from "../api";
import { Loading } from "core/components";

interface Props {
  id?: string | number;
  onFinish: (values: any) => void;
  form: FormInstance<any>;
  onClose: () => void;
}

const { TextArea } = Input;
export default function FormInput({ form, onFinish, id, onClose }: Props) {
  const queryById = "systemById";
  const { data: byId, isLoading } = useQuery({
    queryKey: [queryById, id],
    queryFn: () => {
      return brandApi.getById(id as string);
    },
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    if (id) {
      form.setFieldsValue({
        name: byId?.data.data.name,
        des: byId?.data.data.des,
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
      )}
    </>
  );
}
