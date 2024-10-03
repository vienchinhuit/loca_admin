import { Tabs } from "antd";
import KeyTitle from "./Key";


export default function System() {
  const optionTab = [
    {
      key: "NEWS",
      label: "Bài viết",
      children: <KeyTitle keyTitle='NEWS' keyQuery="newTitle" keyUrl="news"/>,
    },
    {
      key: "BRANCH",
      label: "Hệ thống phân phối",
      children: <KeyTitle keyTitle='BRANCH' keyQuery="branchTitle" keyUrl="branch"/>,
    },
    {
      key: "WHYCHOOSE",
      label: "Vì sao nên chọn",
      children: <KeyTitle keyTitle='WHYCHOOSE' keyQuery="whychooseTitle" keyUrl="why-choose"/>,
    },
    {
      key: "PARTNER",
      label: "Đối tác & Khách hàng",
      children: <KeyTitle keyTitle={'PARTNER'} keyQuery="partnerTitle" keyUrl="partner"/>,
    },
  ];
  return (
    <Tabs
      // tabBarExtraContent={operations()}
      items={optionTab}
    />
  );
}
