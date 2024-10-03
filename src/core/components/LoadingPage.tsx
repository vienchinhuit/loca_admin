import loading from "../../assets/images/loading.gif";
export default function LoadingPage() {
  return (
    <div className="w-full h-full fixed z-50 backdrop-blur-sm bg-white/10">
      <div className="flex justify-center">
        <img src={loading} alt="" width={300} className="my-60 -ml-72"/>
      </div>
    </div>
  );
}
