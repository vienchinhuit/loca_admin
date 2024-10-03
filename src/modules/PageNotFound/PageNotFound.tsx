import NotFound from '../../assets/images/404.gif'
export default function PageNotFound() {
  return (
    <div className='w-full h-full '>
      <img src={NotFound} alt="" className='mx-auto my-[10%]'/>
    </div>
  )
}
