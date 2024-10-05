import { Tabs } from "antd";
import TitleSystem from "./Title";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";
import WhyChoose from "./List";

export default function MainPartner() {
  const titlePage = txt.PARTNER_TITLE;
  const optionTab = [
    {
      key: "1",
      label: "Đối tác & Khách hàng",
      children: <WhyChoose />,
    },
    {
      key: "2",
      label: "Cấu hình",
      children: <TitleSystem />,
    },
  ];
  return (
    <div>
      <HelmetPage title={`${titlePage}`} content={`Quản lý ${titlePage}`} />
      <Tabs defaultActiveKey="1" className="mt-5" items={optionTab} />
    </div>
  );
}
