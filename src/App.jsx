import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";

function App() {
  const [salts, setSalts] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [formHeights, setFormHeights] = useState({});
  const [strengthHeights, setStrengthHeights] = useState({});
  const [packagingHeights, setPackagingHeights] = useState({});
  const [isFormHidden, setIsFormHidden] = useState({});
  const [isStrengthHidden, setIsStrengthHidden] = useState({});
  const [isPackagingHidden, setIsPackagingHidden] = useState({});

  const getData = async () => {
    let url = "https://backend.cappsule.co.in/api/v1/new_search?q=";
    let response = await fetch(`${url}paracetamol&pharmacyIds=1,2,3`);
    let data = await response.json();
    setSalts(data.data.saltSuggestions);
    console.log(data.data.saltSuggestions)
  };

  useEffect(() => {
    if (salts.length > 0) {
      setInitialSelectedValues();
    }
  }, [salts]);

  const setInitialSelectedValues = () => {
    const initialValues = {};
    const initialFormHeights = {};
    const initialStrengthHeights = {};
    const initialPackagingHeights = {};
    const initialIsFormHidden = {};
    const initialIsStrengthHidden = {};
    const initialIsPackagingHidden = {};
    
    salts.forEach((salt, index) => {
      const firstForm = Object.keys(salt.salt_forms_json)[0];
      const firstStrength = Object.keys(salt.salt_forms_json[firstForm])[0];
      const firstPackaging = Object.keys(salt.salt_forms_json[firstForm][firstStrength])[0];
      
      initialValues[index] = {
        form: firstForm,
        strength: firstStrength,
        packaging: firstPackaging,
      };
      initialFormHeights[index] = "4.5rem";
      initialStrengthHeights[index] = "4.5rem";
      initialPackagingHeights[index] = "4.5rem";
      initialIsFormHidden[index] = true;
      initialIsStrengthHidden[index] = true;
      initialIsPackagingHidden[index] = true;
    });

    setSelectedValues(initialValues);
    setFormHeights(initialFormHeights);
    setStrengthHeights(initialStrengthHeights);
    setPackagingHeights(initialPackagingHeights);
    setIsFormHidden(initialIsFormHidden);
    setIsStrengthHidden(initialIsStrengthHidden);
    setIsPackagingHidden(initialIsPackagingHidden);
  };

  const handleShowMore = (index, type) => {
    if (type === "form") {
      setFormHeights((prev) => ({ ...prev, [index]: "auto" }));
      setIsFormHidden((prev) => ({ ...prev, [index]: false }));
    } else if (type === "strength") {
      setStrengthHeights((prev) => ({ ...prev, [index]: "auto" }));
      setIsStrengthHidden((prev) => ({ ...prev, [index]: false }));
    } else if (type === "packaging") {
      setPackagingHeights((prev) => ({ ...prev, [index]: "auto" }));
      setIsPackagingHidden((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleHideMore = (index, type) => {
    if (type === "form") {
      setFormHeights((prev) => ({ ...prev, [index]: "4.5rem" }));
      setIsFormHidden((prev) => ({ ...prev, [index]: true }));
    } else if (type === "strength") {
      setStrengthHeights((prev) => ({ ...prev, [index]: "4.5rem" }));
      setIsStrengthHidden((prev) => ({ ...prev, [index]: true }));
    } else if (type === "packaging") {
      setPackagingHeights((prev) => ({ ...prev, [index]: "4.5rem" }));
      setIsPackagingHidden((prev) => ({ ...prev, [index]: true }));
    }
  };

  const renderForms = (salt, index) => {
    return Object.keys(salt.salt_forms_json).map((key, formIndex) => (
      <button
        key={formIndex}
        className="px-3 py-1 text-sm border-2 border-black rounded-lg font-semibold"
      >
        {key}
      </button>
    ));
  };

  const renderStrengths = (salt, index) => {
    if (!selectedValues[index]) return null;
    const form = selectedValues[index].form;
    return Object.keys(salt.salt_forms_json[form]).map((strength, strengthIndex) => (
      <button
        key={strengthIndex}
        className="px-2 py-1 text-sm border-2 border-black rounded-lg font-semibold"
      >
        {strength}
      </button>
    ));
  };

  const renderPackagings = (salt, index) => {
    if (!selectedValues[index]) return null;
    const form = selectedValues[index].form;
    const strength = selectedValues[index].strength;
    return Object.keys(salt.salt_forms_json[form][strength]).map((packaging, packagingIndex) => (
      <button
        key={packagingIndex}
        className="px-2 py-1 text-sm border-2 border-black rounded-lg font-semibold"
      >
        {packaging}
      </button>
    ));
  };

  return (
    <div className="w-full min-h-screen flex gap-10 flex-col items-center py-14">
      <button className="bg-blue-600 px-4 py-2 rounded-md" onClick={getData}>
        Get data
      </button>
      <h1 className="text-2xl font-medium tracking-wider">
        Cappsule Web Development
      </h1>
      <div className="shadow-[0_0_20px_#00000038] w-[70vw] h-14 rounded-[30px] flex justify-between items-center px-10">
        <div className="relative">
          <GoSearch className={`text-2xl ${textInput ? "hidden" : "block"}`} />
          <FaArrowLeftLong className={`text-2xl ${textInput ? "block" : "hidden"}`} />
        </div>
        <input
          type="search"
          placeholder="Type your medicine name here"
          className="w-[90%] h-full pl-4 border-none outline-none"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
        <button className="text-lg font-bold text-blue-900">Search</button>
      </div>
      <div className="w-[70%] min-h-[60vh] border-t-[3px] py-10 flex flex-col gap-6">
        {salts.length === 0 ? (
          <div className="w-full h-[40vh] flex justify-center items-center text-xl font-bold text-black/50">
            "Find medicines with amazing discount"
          </div>
        ) : (
          salts.map((salt, index) => (
            <div
              key={index}
              className="w-full min-h-52 bg-gradient-to-r from-white to-blue-200/40 shadow-[0_0_13px_#00000028] rounded-2xl flex justify-between p-8"
            >
              <div className="min-h-full w-[30%] flex flex-col gap-3 justify-between">
                <div className="flex gap-4 relative">
                  <h3 className="w-20 text-black/90 mt-1">Form:</h3>
                  <div
                    className={`w-52 flex gap-2 flex-wrap ${
                      Object.keys(salt.salt_forms_json).length > 4 && `h-[${formHeights[index]}] overflow-hidden`
                    }`}
                  >
                    {renderForms(salt, index)}
                  </div>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json).length > 4 ? "block" : "hidden"
                    }  ${isFormHidden[index] ? "block" : "hidden"}`}
                    onClick={() => handleShowMore(index, "form")}
                  >
                    more..
                  </button>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json).length > 4 ? "block" : "hidden"
                    } ${isFormHidden[index] ? "hidden" : "block"}`}
                    onClick={() => handleHideMore(index, "form")}
                  >
                    hide..
                  </button>
                </div>
                <div className="flex gap-4 relative">
                  <h3 className="w-20 text-black/90 mt-1">Strength:</h3>
                  <div
                    className={`w-52 flex gap-1 flex-wrap duration-300 ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 &&
                      `h-[${strengthHeights[index]}] overflow-hidden py-1`
                    }`}
                  >
                    {renderStrengths(salt, index)}
                  </div>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 ? "block" : "hidden"
                    }  ${isStrengthHidden[index] ? "block" : "hidden"}`}
                    onClick={() => handleShowMore(index, "strength")}
                  >
                    more..
                  </button>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 ? "block" : "hidden"
                    } ${isStrengthHidden[index] ? "hidden" : "block"}`}
                    onClick={() => handleHideMore(index, "strength")}
                  >
                    hide..
                  </button>
                </div>
                <div className="flex gap-4 relative">
                  <h3 className="w-20 text-black/90 mt-1">Packaging:</h3>
                  <div
                    className={`w-52 flex gap-1 flex-wrap duration-300 ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form]?.[selectedValues[index]?.strength] || {}).length > 4 &&
                      `h-[${packagingHeights[index]}] overflow-hidden py-1`
                    }`}
                  >
                    {renderPackagings(salt, index)}
                  </div>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form]?.[selectedValues[index]?.strength] || {}).length > 4 ? "block" : "hidden"
                    }  ${isPackagingHidden[index] ? "block" : "hidden"}`}
                    onClick={() => handleShowMore(index, "packaging")}
                  >
                    more..
                  </button>
                  <button
                    className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                      Object.keys(salt.salt_forms_json[selectedValues[index]?.form]?.[selectedValues[index]?.strength] || {}).length > 4 ? "block" : "hidden"
                    } ${isPackagingHidden[index] ? "hidden" : "block"}`}
                    onClick={() => handleHideMore(index, "packaging")}
                  >
                    hide..
                  </button>
                </div>
              </div>
              <div className="min-h-full w-[25%] flex flex-col justify-center items-center">
                <h3 className="font-bold">{salt.salt}</h3>
                <p className="font-medium text-blue-900">
                  Tablet | 100mg | 5 strips
                </p>
              </div>
              <div className="min-h-full w-[25%] flex justify-center items-center">
                <h3 className="flex items-end text-3xl font-bold tracking-tighter">
                  From <FaIndianRupeeSign className="-mr-1 ml-1" />
                  <span>80</span>
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
