import { Button, Form, FormInstance, Input } from "antd";
import { AuthChange } from "./type";
import { useMutation } from "@tanstack/react-query";
import authApi from "./api";
import { toast } from "react-toastify";
import { HttpStatusCode } from "core/constants";
import { useContext } from "react";
import { AppContext } from "core/contexts/app.context";

interface Props {
  form: FormInstance<any>;
  handleCancel: () => void;
}

export default function ChangePassword({ form, handleCancel }: Props) {
    const { setIsAuthenticated } = useContext(AppContext);
  const changePasswordAuthMutation = useMutation({
    mutationFn: (body: AuthChange) => authApi.changePassword(body),
  });
  const onFinish = async (values: any) => {
    changePasswordAuthMutation.mutate(values, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          form.resetFields();
          setIsAuthenticated(false)
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
        toast.error("Đổi mật khẩu thất bại");
      },
    });
  };
  return (
    <div className="change-pass-form">
      <Form 
        labelCol={{
          span: 8,
        }}
        form={form} name="login" 
        onFinish={onFinish} 
        scrollToFirstError
      >
        <Form.Item
          name="password"
          label='Mật khẩu hiện tại'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Mật khẩu đăng nhập hiện tại"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label='Mật khẩu mới'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Mật khẩu đăng nhập"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          className="text-right my-5"
        >
          <Button
            className="bg-white"
              onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="ml-3">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
