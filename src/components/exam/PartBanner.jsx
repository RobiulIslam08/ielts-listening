// @ts-nocheck
export default function PartBanner({ title, intro }) {
  return (
    <div className="bg-[#F1F2EC] mx-4 w-full  mt-4 mb-8 px-4 py-2 border border-gray-300 rounded-sm">
      <div className="font-bold text-[15px] text-black">{title}</div>
      <div className="text-[14px] text-black mt-1">{intro}</div>
    </div>
  );
}
