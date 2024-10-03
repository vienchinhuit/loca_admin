import building from "../../assets/images/building.gif";
export default function PageBuilding() {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={building} alt="" width={350} className=""/>
        <p>Chúng tôi đang xây dựng, vui lòng quay lại sau!</p>
      </div>
    </div>
  );
}
