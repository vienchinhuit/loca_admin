import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import api from "./api";
import { Loading } from "core/components";
import { toast } from "react-toastify";
import { HttpStatusCode, txt } from "core/constants";
import { SocialConfig } from "./type";

export default function Social() {
  const [form] = Form.useForm();
  const queryById = "social";
  const { data: byId, isLoading } = useQuery({
    queryKey: [queryById],
    queryFn: () => {
      return api.getSocial();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const dataById = byId?.data.data;
  useEffect(() => {
    if (dataById) {
      dataById?.map((data: SocialConfig) => {
        if (data.key === "SOCIAL") {
          form.setFieldsValue({
            facebook: data.content.facebook,
            zalo: data.content.zalo,
            youtube: data.content.youtube,
            tiktok: data.content.tiktok,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataById, form]);

  // Xử lý khi người dùng tải ảnh lên

  const updateMutation = useMutation({
    mutationFn: (body: any) => api.updateSocial(body),
  });
  const onFinish = (values: any) => {
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
    <div className=" mx-5">
      {updateMutation.isPending || isLoading ? (
        <div className="items-center justify-center text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <Form
              name="formSocial"
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label={`Facebook`} name="facebook">
                <Input />
              </Form.Item>
              <Form.Item label={`Zalo`} name="zalo">
                <Input />
              </Form.Item>
              <Form.Item label={`Youtube`} name="youtube">
                <Input />
              </Form.Item>
              <Form.Item label={`Tiktok`} name="tiktok">
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
          <div className="col-span-1 text-center w-full"></div>
        </div>
      )}
    </div>
  );
}
