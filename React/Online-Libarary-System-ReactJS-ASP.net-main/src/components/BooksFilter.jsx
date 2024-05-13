import React, { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BooksContext } from "../contextApi/ContextApi";

const BooksFilter = () => {
  const { filterResult, setFilterResult,filterBooksByISBN,filterBooksByRackNumber } = useContext(BooksContext);

  const [dropDownBookFormat, setDropDownBookFormat] = useState(false);
  const [checkedOption, setCheckedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleCheckboxChange = (option) => {
    if (option === checkedOption) {
      // If the clicked checkbox is already checked, uncheck it
      setCheckedOption(null);
    } else {
      // If the clicked checkbox is not checked, check it
      setCheckedOption(option);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Regular expression to check if the value is an integer
    const isInteger = /^\d+$/.test(value);
    if (isInteger || value === "") {
      // If the value is an integer or empty string, update the state
      setInputValue(value);
    }
  };

  const handleRefineSearch = (e) => {
    e.preventDefault();
    if(inputValue){
    // Function to check if the checkboxes are checked
    if (checkedOption==="ISBN") {
      filterBooksByISBN(inputValue);
      // Show the input field
    } else if(checkedOption ==="R_N") {
      filterBooksByRackNumber(inputValue);
    }
  }
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    // Function to reset checkboxes
    setCheckedOption(null);
    setInputValue("");
    setFilterResult(null);
  };

  return (
    <>
      <div className=" mt-[80px] bg-[#E5EDE8]">
        <h1 className="text-[45px] font-bold">Filter</h1>

        {/* Book Format */}
        <div>
          {!dropDownBookFormat ? (
            <div className="pt-3">
              <button
                onClick={() => setDropDownBookFormat(!dropDownBookFormat)}
                className="flex items-center justify-between w-[90%] text-[22px] font-bold"
              >
                Book Filter
                <IoIosArrowDown className="text-[#71887B] rotate-180 duration-200 transition-transform" />
              </button>
              <form>
                <ul className="pt-2">
                  <li className="mt-2">
                    <input
                      type="checkbox"
                      id="ISBN"
                      name="ISBN"
                      checked={checkedOption === "ISBN"}
                      onChange={() => handleCheckboxChange("ISBN")}
                    />
                    <label className="text-[#636363] text-[14px] ms-2" htmlFor="ISBN">
                      ISBN
                    </label>
                  </li>
                  <li className="mt-2">
                    <input
                      type="checkbox"
                      id="R_N"
                      name="R_N"
                      checked={checkedOption === "R_N"}
                      onChange={() => handleCheckboxChange("R_N")}
                    />
                    <label className="text-[#636363] text-[14px] ms-2" htmlFor="R_N">
                      R_N
                    </label>
                  </li>
                </ul>
                {/* Input field */}
                {checkedOption && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
                      placeholder={`Enter value for ${checkedOption}`}
                    />
                  </div>
                )}
                {/* Buttons */}
                <div className="mt-6">
                  <button
                    onClick={handleRefineSearch}
                    className="w-full bg-bgbtnHome py-3 shadow-2xl rounded-lg text-white text-[16px] font-semibold"
                  >
                    Refine Search
                  </button>
                  <button
                    onClick={handleResetFilter}
                    className="w-full bg-transparent mt-5 shadow-2xl py-3 rounded-lg text-[#636363] text-[16px] font-semibold"
                  >
                    Reset Filter
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="pt-3">
              <button
                onClick={() => setDropDownBookFormat(!dropDownBookFormat)}
                className="flex items-center justify-between w-[90%] text-[22px] font-bold"
              >
                Book Format
                <IoIosArrowDown className="text-[#71887B] rotate-0 duration-200 transition-transform" />
              </button>
            </div>
          )}
        </div>


      </div>
    </>
  );
};

export default BooksFilter;
