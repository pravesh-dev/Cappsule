import React, { useEffect } from "react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";

function App() {
  const [salts, setSalts] = useState([]);

  const getData = async (e) => {
    let url = "https://backend.cappsule.co.in/api/v1/new_search?q=";
    let response = await fetch(`${url}paracetamol&pharmacyIds=1,2,3`);
    let data = await response.json();
    setSalts(data.data.saltSuggestions);
    console.log(data.data.saltSuggestions);
  };

  const [textInput, setTextInput] = useState("");
  const [height, setHeight] = useState("4.5rem");
  const isSearched = false;
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [isStrengthHidden, setIsStrengthHidden] = useState(true);
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    if (salts.length > 0) {
      setInitialSelectedValues();
    }
  }, [salts]);

  const handleShowMore = (type) => {
    if (type === "form") {
      setHeight("auto");
      setIsFormHidden(false);
    } else if (type === "strength") {
      setHeight("auto");
      setIsStrengthHidden(false);
    }
  };

  const handleHideMore = (type) => {
    if (type === "form") {
      setHeight("4.5rem");
      setIsFormHidden(true);
    } else if (type === "strength") {
      setHeight("4.5rem");
      setIsStrengthHidden(true);
    }
  };

  const setInitialSelectedValues = () => {
    const initialValues = {};
    salts.map((salt, index) => {
      const firstForm = Object.keys(salt.salt_forms_json)[0];
      const firstStrength = Object.keys(salt.salt_forms_json[firstForm])[0];
      const firstPackaging = Object.keys(
        salt.salt_forms_json[firstForm][firstStrength]
      )[0];
      initialValues[index] = {
        form: firstForm,
        strength: firstStrength,
        packaging: firstPackaging,
      };
    });
    setSelectedValues(initialValues);
  };

  const renderForms = (salt) => {
    return Object.keys(salt.salt_forms_json).map((key, index) => (
      <button
        key={index}
        className="px-3 py-1 text-sm border-2 border-black rounded-lg font-semibold"
      >
        {key}
      </button>
    ));
  };

  const renderStrengths = (salt, index) => {
    if (!selectedValues[index]) return null;
    const form = selectedValues[index].form;
    return Object.keys(salt.salt_forms_json[form]).map(
      (strength, strengthIndex) => {
        return (
          <button
            key={strengthIndex}
            className="px-2 py-1 text-sm border-2 border-black rounded-lg font-semibold"
          >
            {strength}
          </button>
        );
      }
    );
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
          <GoSearch
            className={`text-2xl ${isSearched ? "hidden" : "block"}`}
          />
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
          salts.map((salt, index) => {
            return (
              <div
                key={index}
                className="w-full min-h-52 bg-gradient-to-r from-white to-blue-200/40 shadow-[0_0_13px_#00000028] rounded-2xl flex justify-between p-8"
              >
                <div className="min-h-full w-[30%] flex flex-col gap-3 justify-between">
                  <div className="flex gap-4 relative">
                    <h3 className="w-20 text-black/90 mt-1">Form:</h3>
                    <div
                      className={`w-52 flex gap-2 flex-wrap ${
                        salt.available_forms.length > 4 &&
                        `h-[${height}] overflow-hidden`
                      }`}
                    >
                      {renderForms(salt)}
                    </div>
                    <button
                      className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                        salt.available_forms.length > 4 ? "block" : "hidden"
                      }  ${isFormHidden ? "block" : "hidden"}`}
                      onClick={() => handleShowMore("form")}
                    >
                      more..
                    </button>
                    <button
                      className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                        salt.available_forms.length > 4 ? "block" : "hidden"
                      } ${isFormHidden ? "hidden" : "block"}`}
                      onClick={() => handleHideMore("form")}
                    >
                      hide..
                    </button>
                  </div>
                  <div className="flex gap-4 relative">
                    <h3 className="w-20 text-black/90 mt-1">Strength:</h3>
                    <div
                      className={`w-52 flex gap-1 flex-wrap ${
                        Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 &&
                        `h-[${height}] overflow-hidden py-1`
                      }`}
                    >
                      {renderStrengths(salt, index)}
                    </div>
                    <button
                      className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                        Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 ? "block" : "hidden"
                      }  ${isStrengthHidden ? "block" : "hidden"}`}
                      onClick={() => handleShowMore("strength")}
                    >
                      more..
                    </button>
                    <button
                      className={`absolute left-full bottom-0 text-blue-900 font-bold ${
                        Object.keys(salt.salt_forms_json[selectedValues[index]?.form] || {}).length > 4 ? "block" : "hidden"
                      } ${isStrengthHidden ? "hidden" : "block"}`}
                      onClick={() => handleHideMore("strength")}
                    >
                      hide..
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="w-20 text-black/90 mt-1">Packaging:</h3>
                    <div className=" w-52 flex gap-1 flex-wrap">
                      <button className="px-2 py-1 text-sm border-2 border-black rounded-lg font-semibold">
                        5 strips
                      </button>
                      <button className="px-3 py-1 text-sm border-2 border-black rounded-lg font-semibold">
                        10 strips
                      </button>
                    </div>
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
                  {/* <h3 className="w-52 px-3 py-2 text-sm font-semibold text-center bg-white border-2 border-blue-600/30 rounded-md">No stores selling this product in near you</h3> */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;