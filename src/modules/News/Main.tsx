import { Tabs } from "antd";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";
import News from "./List";
import TitleNews from "./Title";

export default function MainNews() {
  const titlePage = txt.NEWS_TITLE;
  const optionTab = [
    {
      key: "1",
      label: "Danh sách bài viết",
      children: <News />,
    },
    {
      key: "2",
      label: "Cấu hình",
      children: <TitleNews />,
    },
  ];
  return (
    <div>
      <HelmetPage title={`${titlePage}`} content={`Quản lý ${titlePage}`} />
      <Tabs defaultActiveKey="1" className="mt-5" items={optionTab} />
    </div>
  );
}
