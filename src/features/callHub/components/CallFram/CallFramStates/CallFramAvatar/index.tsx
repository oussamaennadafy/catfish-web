import React from 'react'

function CallFramAvatar() {
  return (
    <div className='flex bg-[#161931] border border-slate-800 rounded-2xl relative gap-5 overflow-hidden items-center justify-center h-full'>
      {/* shadow  */}
      <div
        className='absolute w-14 md:w-20 lg:w-24 aspect-square rounded-full'
        style={{
          boxShadow: "0px 0px 100px white",
        }}
      />
      {/* circular avatar */}
      <div
        className='w-14 md:w-20 lg:w-24 aspect-square bg-[#ff5252] rounded-full flex items-center justify-center z-0'
      >
        <p className='md:text-lg lg:text-xl'>OE</p>
      </div>
    </div>
  )
}

export default CallFramAvatar