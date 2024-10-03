import { User } from "modules/Users/type";

interface Props {
  profile?: User;
  showModal: () => void;
}
export default function Notification({ profile, showModal }: Props) {
  return (
    <div className="leading-10 pb-5 px-5 relative text-[15px] font-normal">
      <div
        onClick={() => showModal()}
        className="absolute right-10 w-11 h-11 rounded-lg flex justify-center items-center text-[20px] border-[1px] border-[#30a4ee] hover:bg-lightBlue text-[#30a4ee]"
      >
        <button>
          <i className="fi fi-rr-user-pen ml-1"></i>
        </button>
      </div>
      <div className="flex items-center">
        <i className="fi fi-rr-id-card-clip-alt text-[20px] text-gray-500"></i>

        <span className="font-bold ml-2 text-gray-500">Tài khoản: </span>
        <span className="ml-1 ">{profile?.username}</span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>

        <span className="font-bold ml-2 text-gray-500">Email: </span>
        <span className="ml-1 ">{profile?.email}</span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6  text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>

        <span className="font-bold ml-2 text-gray-500">Số điện thoại: </span>
        <span className="ml-1 "> {profile?.phone}</span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6  text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        <span className="font-bold ml-2 text-gray-500">Ngày sinh: </span>
        <span className="ml-1 "> 01-01-2003</span>
      </div>
      <div className="flex items-center">
        <i className="fi fi-rr-venus-mars text-[20px]  text-gray-500"></i>
        <span className="font-bold ml-2 text-gray-500">Giới tính: </span>
        <span className="ml-1 "> Nam</span>
      </div>
      <div className="flex items-center">
        <i className="fi fi-rr-marker text-[20px]  text-gray-500"></i>
        <span className="font-bold ml-2 text-gray-500">Địa chỉ: </span>
        <span className="ml-1 ">
          Hiệp Bình, KDC Hồng Long, Hiệp Bình Phước, Thủ Đức, TP.Hồ Chí Minh
        </span>
      </div>
    </div>
  );
}
