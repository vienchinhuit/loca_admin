import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import api from "./api";
import { toast } from "react-toastify";
import { KeyTitle, KeyTitleConfig } from "./type";
import { HttpStatusCode, txt } from "core/constants";
import { Loading } from "core/components";
export default function TitlePartner() {
  const [form] = Form.useForm();
  const { data: byId, isLoading } = useQuery({
    queryKey: ["partner"],
    queryFn: () => {
      return api.getKeyTitle("PARTNER");
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const dataById = byId?.data.data;
  useEffect(() => {
    if (dataById) {
      dataById?.map((data: KeyTitleConfig) => {
        if (data.key === "PARTNER") {
          form.setFieldsValue({
            name: data.content.name,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataById, form]);

  const updateMutation = useMutation({
    mutationFn: (body: any) => api.updateKeyTitle(body, "partner"),
  });
  const onFinish = (values: KeyTitle) => {
    updateMutation.mutate(values, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          toast.success(res.data.message);
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
        toast.error(txt.UPDATE_FAILED);
      },
    });
  };
  return (
    <div className="mx-5">
      {updateMutation.isPending || isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
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
