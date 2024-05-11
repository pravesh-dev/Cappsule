import React from "react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";

function App() {
  // const [data, setData] = useState('');
  // const getData = async (e)=>{
  //   let response = await fetch('https://backend.cappsule.co.in/api/v1/new_search?q=paracetamol&pharmacyIds=1,2,3');
  //   let data = await response.json();
  //   let formattedData = JSON.stringify(data)
  //   console.log(data.data.medicineSuggestions)
  //   // setData(data.data.medicineSuggestions)
  // }
  const [textInput, setTextInput] = useState('');
  const isSearched = false;

  return (
    // <div className='w-full h-screen flex flex-col gap-3 justify-center items-center'>
    //   <div className='w-[80vw] min-h-[70vh] border'>{data}</div>
    //   <button className='bg-blue-600 px-4 py-2 rounded-md' onClick={getData}>Get data</button>
    // </div>
    <div className="w-full min-h-screen flex gap-10 flex-col items-center py-14">
      <h1 className="text-2xl font-medium tracking-wider">
        Cappsule Web Development
      </h1>
      <div className="shadow-[0_0_20px_#00000038] w-[70vw] h-14 rounded-[30px] flex justify-between items-center px-10">
        <div className="relative">
          <GoSearch className={`text-2xl ${isSearched ? "hidden" : "block"}`} />
          <FaArrowLeftLong
            className={`text-2xl ${isSearched ? "block" : "hidden"}`}
          />
        </div>
        <input
          type="search"
          placeholder="Type your medicine name here"
          className="w-[90%] h-full pl-4 border-none outline-none"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value)
          }}
        />
        <button className="text-lg font-bold text-blue-900">Search</button>
      </div>
      <div className="w-[70%] min-h-[60vh] border-t-[3px] py-10">
        {/* <div className="w-full h-[40vh] flex justify-center items-center text-xl font-bold text-black/50">
          "Find medicines with amazing discount"
        </div> */}
        <div className="w-full h-52 bg-gradient-to-r from-white to-blue-200/40 shadow-[0_0_13px_#00000028] rounded-2xl"></div>
      </div>
    </div>
  );
}

export default App;
