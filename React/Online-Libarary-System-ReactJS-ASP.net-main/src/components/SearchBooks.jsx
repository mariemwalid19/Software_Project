import React, { useContext } from "react";
import { BooksContext } from "../contextApi/ContextApi";

const SearchBooks = () => {
    const { bookSearchResult } = useContext(BooksContext);
  

    return (
        <>
            <div className="container mx-auto bg-white w-full">
                {bookSearchResult &&
                    bookSearchResult.map((book) => (
                        <div >
                            <h1>book</h1>
                        </div>
                    )) || <div>Loading...</div>
                    
                    }{<div>Loading...</div>}
            </div>
        </>
    );
};

export default SearchBooks;