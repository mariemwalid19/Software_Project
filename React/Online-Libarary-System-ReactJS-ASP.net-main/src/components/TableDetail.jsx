import React from "react";

const TableDetail = ({ book }) => {
  return (
    <>
      <div className="ps-3 lg:ps-0">
        <h1 className="text-[22px] font-bold text-black my-5">Details</h1>
        <table className="min-w-full divide-y divide-gray-200 my-5">
          <tbody className="bg-white divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-[#4D4D4D] text-white rounded-t-lg">
                Book Title
              </td>
              <td className="px-6 py-4 whitespace-nowrap kg:text-[20px] text-base font-medium">
                {book.bookTitle}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap bg-[#4D4D4D] text-white">
                Author
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">
              {book.author}
              </td>
            </tr>
           
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap bg-[#4D4D4D] text-white">
                Page Count
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">
               291    
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap bg-[#4D4D4D] text-white">
                description
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">
              {book.description}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap bg-[#4D4D4D] text-white">
               Publiched Date
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">
              10/2/2020    
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableDetail;
