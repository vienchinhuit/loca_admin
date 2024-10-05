import { Tabs } from "antd";
import TitleSystem from "./Title";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";
import WhyChoose from "./List";

export default function MainWhyChoose() {
  const titlePage = txt.WHY_CHOOSE_TITLE;
  const optionTab = [
    {
      key: "1",
      label: "Danh sách lý do chọn",
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
