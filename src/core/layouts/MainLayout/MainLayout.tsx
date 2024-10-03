import { memo, useState } from "react";
import { SideBar } from "../../components";
import Header from "core/components/Header";
import classNames from "classnames";
interface Props {
  children?: React.ReactNode;
}

function MainLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-full h-full block">
      <div
        className={classNames(
          "sideBar fixed top-0 left-0 bottom-0 block z-50 bg-[#FFF] border-r border-[#EFEFEF]  menu-transition-2",
          {
            "w-[80.5px]": collapsed == true,
            "w-[230px]": collapsed == false,
          }
        )}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <Header />
      <div
        className={classNames("pt-[30px] menu-transition", {
          "ml-[80px] ": collapsed == true,
          "ml-[230px] ": collapsed == false,
        })}
      >
        <div className="main">{children}</div>
      </div>
    </div>
  );
}
const LayoutMain = memo(MainLayout);
export default LayoutMain;
