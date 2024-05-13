import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BooksContext } from "../contextApi/ContextApi";

const BooksDisplayCol = () => {
  const { Books } = useContext(BooksContext);

  return (
    <>
      <div>
        <h1 className="text-black text-[22px] font-bold">Related books</h1>
        <div className="flex flex-row flex-wrap items-start justify-around">
          {Books.map((book) => (
            <Link
              to={`/booksStroe/${book.booktitle}`}
              key={book.booktitle}
              className="flex items-center gap-3 my-5 shadow-[0_4px_9px_-4px_#71887B]"
            >
              <div className="w-fill">
                <img
                  className="rounded-md"
                  src={`data:image/png;base64,${(book.bookimage)}`}
                  alt={book.booktitle}
                />
              </div>
              <div>
                <p className="flex items-center bg-[#FF7A00] gap-2 text-[12px] text-white w-fit px-2 py-1 rounded-[31px]">
                  <FaStar />
                  4.5
                </p>
                <h1 className="text-black text-[14px] font-bold">
                  {book.booktitle > 16
                    ? book.booktitle.slice(0, 16) + "..."
                    : book.booktitle}
                </h1>
                <p className=" text-bgbtn text-[20px] font-bold">
                  600
                  EGP
                </p>
             
              </div>
            </Link>
          )).slice(0, 4)}
        </div>
      </div>
    </>
  );
};

export default BooksDisplayCol;

