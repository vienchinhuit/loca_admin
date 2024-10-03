import { Popover } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import classNames from "classnames";
interface Props {
  title: string;
  open: boolean;
  handleOpen: (newOpen: boolean) => void;
  children: React.ReactNode;
  className?: string;
  placement?: TooltipPlacement;
}
export default function PopoverPage({
  title,
  open,
  handleOpen,
  children,
  placement
}: Props) {
  return (
    <Popover
      //  className="h-full w-full text-left text-sm capitalize outline-none bg-gray-100 ml-1"
      content={children}
      trigger="click"
      arrow={false}
      placement={placement ? placement : "bottom"}
      open={open}
      onOpenChange={handleOpen}
    >
      <button
        className={classNames(
          "h-full whitespace-nowrap text-left outline-none bg-white ml-1 text-[14px] px-5 border-[1px] flex items-center",
          {
            "border-blue": open,
            "border-gray-300": !open,
          }
        )}
      >
        <span>{title}</span>
        {open ? (
          <i className="fi fi-rr-caret-up text-[18px] ml-5 text-blue pb-1"></i>
        ) : (
          <i className="fi fi-rr-caret-down text-[18px] ml-5 pb-1"></i>
        )}
      </button>
    </Popover>
  );
}
