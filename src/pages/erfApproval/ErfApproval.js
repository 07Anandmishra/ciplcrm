import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ErfApproval = () => {
  const {pathname} = useLocation()


  const id = pathname.replace("/erfapproval/","")
  const [data,setData] = useState('')
  const [note,setNote] = useState('')

  const erfData = async ()=>{
    const requestErf = await fetch(`${process.env.REACT_APP_API_URL}lead/assignlink/${id}`,
    {
      method:'get'
    }
    )
    const response = await requestErf.json()
    console.log("repsonse",response)
    if(response){
      setData(response)
    }
  }

  useEffect(() => {
    erfData()
  }, [pathname])


  const handleClick = async(e)=>{
    console.log(e)
    await fetch(`${process.env.REACT_APP_API_URL}lead/approved/${id}`,{
      method:'post',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify({
        note:`${note}`,
        status:`${e}`
      })
    })
    window.open("about:blank", "_self");
    window.close()
  }
  
  return (
    <div className=' h-full'>
      <div className='p-4'>
        <h2 className='flex p-2 justify-center bg-gradient-to-r rounded-t from-cyan-300 to-green-400 font-semibold text-white text-2xl'>ERF Approval</h2>
        <div>
          <div className='grid lg:grid-cols-3 grid-cols-2'>
            <div className='p-2 w-full'>
              <label>Department</label>
              <input type="text" value={data?.data?.department?.name} className="block w-full p-2 border rounded " disabled/>
            </div>
            <div className='p-2 w-full'>
              <label>Project Manager</label>
              <input type="text" value={data?.data?.project_manager} className="block w-full p-2 border rounded " disabled/>
            </div>
            <div className='p-2 w-full'>
              <label>Budget</label>
              <input type="number" value={data?.data?.position_budgeted} className="block w-full p-2 border rounded " disabled/>
            </div>
          </div>
          <div className='grid lg:grid-cols-3 grid-cols-2'>
            <div className='p-2 w-full'>
              <label>Recruitment Type</label>
              <input type="text" value={data?.data?.recruitment_type} className="block w-full p-2 border rounded " disabled/>
            </div>
            <div className='p-2 w-full'>
              <label>ERF Generated By</label>
              <input type="text" value={data?.data?.user?.name} className="block w-full p-2 border rounded " disabled/>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 grid-cols-1'>
            <div className='p-2 w-full'>
              <label>Project Decription</label>
              <textarea type="text" value={data?.data?.job_description} className="block w-full p-2 border rounded " disabled/>
            </div>
          </div>
        </div>
          <div className='flex bg-gray-100 m-2 rounded justify-center px-[20%]'>
            <div className='p-2 w-full justify-center'>
              <label>Remarks</label>
              <textarea type="text" onChange={(e)=>setNote(e.target.value)} className="block w-full p-2 border rounded "/>
            </div>
          </div>
          <div className='flex bg-gray-100 m-2 rounded justify-center px-[20%]'>
            <div className='p-2 w-full justify-center text-center'>
              <label className='text-center text-lg font-semibold'>Approval</label>
              <div className=" w-full p-2 justify-between rounded ">
                <button className='px-10 py-2 bg-green-500 text-white mr-4' onClick={()=>{
                  
                  handleClick(1)
                }}
                >Yes</button>
                <button className='px-10 py-2 bg-red-500 text-white ml-4' onClick={()=>{
                 
                  handleClick(2)
                  }}>No</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ErfApproval