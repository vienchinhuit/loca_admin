import { Tabs } from "antd";
import System from "./List";
import TitleSystem from "./Title";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";

export default function MainBranch() {
  const titlePage = txt.BRANCH_TITLE;
  const optionTab = [
      {
        key: "1",
        label: "Danh sách hệ thống phân phối",
        children: <System />,
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
