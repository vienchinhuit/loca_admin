import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import authApi from "./api";
import { HttpStatusCode, txt } from "../../core/constants";
import { AppContext } from "../../core/contexts/app.context";
import "./../../assets/css/login.css";
import { HelmetPage } from "core/components";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo/logo.png"

interface FormData {
  username: string;
  password: string;
}


export default function Login() {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
  });
  const onFinish = async (values: any) => {
    loginAccountMutation.mutate(values, {
      onSuccess: async (res) => {
        const response = res.data;
        if (
          response.statusCode == HttpStatusCode.NotFound ||
          response.statusCode == HttpStatusCode.BadRequest
        ) {
          const formError = res.data.errors;
          if (formError) {
            form.setFields([
              {
                name: formError[0].field,
                errors: [formError[0].message], // Gán lỗi cho trường username
              },
            ]);
          }
        } else {
          setIsAuthenticated(true);
        }
      },
      onError: () => {
        toast.error("Đăng nhập thất bại!");
      },
    });
  };

  const [username, setUsername] = useState<string>("");
  return (
    <div className="background">
      <div className="container">
        <HelmetPage title={txt.LOGIN} content={txt.LOGIN} />
        <div className="login_page mx-auto pt-[10%]">
          <img
            className="fade mx-auto h-[80px]"
            alt={Logo}
            src={Logo}
          />
          <div className="my-7 text-[20px] text-center font-semibold">
            Đăng nhập vào tài khoản của bạn
          </div>
          <Form form={form} name="login" onFinish={onFinish} scrollToFirstError>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tài khoản",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Tài khoản đăng nhập"
                className="h-12 border-[1px] border-[#d3d5d7] focus:border-blue  rounded-[50px] px-[20px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Mật khẩu đăng nhập"
                className="h-12 border-[1px] border-[#d3d5d7] focus:border-blue mt-4 rounded-[50px] px-[20px]"
              />
            </Form.Item>
            <div className="w-full flex justify-end px-[5px] mt-2">
              <a href="#" className="text-right my-2 text-blueDark">Quên mật khẩu</a>
            </div>
            <Form.Item className="text-center mt-3">
              <Button
                className={
                  username == ""
                    ? "btn-login px-20 py-7 hover:bg-[#094BFF] rounded-[50px]"
                    : "btn-login px-20 py-7 rounded-[50px]"
                }
                htmlType="submit"
                disabled={loginAccountMutation.isPending || username == ""}
              >
                {loginAccountMutation.isPending && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-300 w-4"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                <div className="font-semibold text-[16px] text-white">
                  Đăng nhập
                </div>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
