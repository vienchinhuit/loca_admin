interface Props {
    name: string
}
export default function ImageDefault({name}: Props) {
  return (
    <div className="w-full h-full rounded-[100%] bg-blueDark object-cover flex justify-center items-center">
      <span className="text-white">{name}</span>
    </div>
  )
}
