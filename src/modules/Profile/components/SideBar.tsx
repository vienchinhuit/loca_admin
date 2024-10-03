import classNames from "classnames";
import { ImageDefault } from "core/components";
import { User } from "modules/Users/type";
interface Props {
    profile?: User;
    option: number
    
  }
export default function SideBar({profile, option}:Props) {
  return (
    <div>
      <div className="p-5 rounded-tl-lg rounded-tr-lg bg-white">
        <div className="flex text-[35px] mx-auto w-[100px] h-[100px]">
          <ImageDefault name={"B"} />
        </div>
        <div className="leading-10 text-center mt-5">
          <div className="text-[24px] font-bold">{profile?.name}</div>
          <div className="text-[15px] text-gray-400">NV00231</div>
        </div>
      </div>
      <div className="leading-5 bg-white rounded-bl-lg rounded-br-lg">
        <div className="">
          <ul className="text-[17px] rounded-md">
            <li>
              <button
                onClick={() => {}}
                className={classNames(
                  "flex py-[10px] px-[15px] w-full items-center border-l-[5px] hover:border-gray-300 ",
                  {
                    "text-blueDark bg-[#e7e9f8] border-blueDark hover:border-blueDark":
                      option === 1,
                    "text-gray-500 border-white hover:bg-[#f5f5f5]":
                      option !== 1,
                  }
                )}
              >
                <i
                  className={classNames(
                    "fi fi-rr-user mt-[1px] text-[20px]",
                    {
                      "text-blueDark": option === 1,
                      "": option !== 1,
                    }
                  )}
                ></i>
                <div className="ml-1 text-[14px]">Thông tin</div>
              </button>
            </li>
            <li>
              <button
                onClick={() => {}}
                className={classNames(
                  "flex py-[10px] px-[15px] w-full  items-center border-l-[5px] hover:border-gray-300",
                  {
                    "font-semibold text-blueDark bg-[#e7e9f8] border-blueDark hover:border-blueDark":
                      option === 2,
                    "text-gray-500 border-white hover:bg-gray-100":
                      option !== 2,
                  }
                )}
              >
                <i
                  className={classNames(
                    "fi fi-rr-user mt-[1px] text-[20px]",
                    {
                      "text-blueDark": option === 2,
                      "": option !== 2,
                    }
                  )}
                ></i>
                <div className="ml-1 text-[14px]">Đổi mật khẩu</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
