import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import { variables } from "../components/Variables.js";

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  var[filterResult,setFilterResult]=useState(null);
  var [bookSearchResult, setBookSearchResult] = useState(null);
  const [Books, setBooks] = useState([]);
  const [addBooks, setAddBooks] = useState([]);
  const [booksCart, setBooksCart] = useState([]);
  const [removeBook, setRemoveBook] = useState();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [gridBtn, setGridBtn] = useState(false);
  const { bookTitle } = useParams();
  const userid =sessionStorage.getItem('userid');
  var [bookSearch, setBookSearch] = useState({
    author: "",
    booktitle:""
  });

  const [formData, setFormData] = useState({
    author: "",
  });useEffect(() => {
    if (userid) { // Check if userid exists
      axios
        .get(variables.BOOK_SERV_API + "GetAllAvailableBooks/" + userid)
        .then((res) => setBooks(res.data))
        .catch((error) => {
          console.log(error); // Log the error object to inspect its structure
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });
  
            } else if (error.response.status === 404) {
              toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });
  
            } else {
              toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
            }
          } else {
            toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
          }
          return;
        });
    }
  }, []); // empty dependency array
  
  

  const addBooksCart = (id) => {
    const isBookInCart = addBooks.some((book) => book.id === id);
    if (!isBookInCart) {
      const searchedBook = Books.find((book) => book.id === id);
      if (searchedBook) {
        setAddBooks([...addBooks, { ...searchedBook, quantity: 1 }]);
        Swal.fire({
          title: "Success!",
          icon: "success",
        }).then((data) => {
          if (data.isConfirmed) {
            axios
              .post("http://localhost:4000/cart", {
                ...searchedBook,
                quantity: 1,
              })
              .catch((err) => console.log(err));
          }
        });
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const removeFromCart = (book) => {
    Swal.fire({
      title: `Are You Sure To Delete ${book.volumeInfo.title} ?`,
      icon: "warning",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        Swal.fire("Deleted", "", "success");
        axios
          .delete(`http://localhost:4000/cart/${book.id}`)
          .then((res) => addBooksCart());
      }
    });
  };

  const searchBooks = (e) => {
   
      axios
      .get(variables.SEARCH_SERV_API + `SearchWithBookTitle/`+userid+`?booktitle=${e}`)
      .then((res) => {setBookSearchResult(res.data); console.log(res.data)})
      .catch((error) => {
        setBookSearchResult([]);
        console.log(error); // Log the error object to inspect its structure
        if (error.response) {
          if (error.response.status === 400) {

          } else if (error.response.status === 404) {

          } else {
            toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
          }
        } else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });
  
      console.log(bookSearchResult);
  
  };

  
  const filterBooksByISBN = (e) => {
    axios
    .get(variables.BOOK_SERV_API + `GetBookByISBN/`+e)
    .then((res) => {setFilterResult([res.data]); console.log(res.data)})
    .catch((error) => {
      setFilterResult([]);
      console.log(error); // Log the error object to inspect its structure
      if (error.response) {
        if (error.response.status === 400) {
        } else if (error.response.status === 404) {

        } else {
          toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      } else {
        toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
      }
    });
    
  }
  const filterBooksByRackNumber=(e)=>{
    axios
    .get(variables.BOOK_SERV_API + `GetRackBooks/`+e)
    .then((res) => {setFilterResult(res.data); console.log(res.data)})
    .catch((error) => {
      setFilterResult([]);
      console.log(error); // Log the error object to inspect its structure
      if (error.response) {
        if (error.response.status === 400) {

        } else if (error.response.status === 404) {

        } else {
          toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      } else {
        toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
      }
    });

    console.log(bookSearchResult);

};


  // const searchBooks = ({ title, author, isbn }) => {
  //   const searchResult = Books.filter((book) => {
  //     const bookTitle = book.volumeInfo.title.toLowerCase();
  //     const bookAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(',').toLowerCase() : '';
  //     const bookISBN = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10').identifier.toLowerCase() : '';

  //     const titleMatch = title ? bookTitle.includes(title.toLowerCase()) : true;
  //     const authorMatch = author ? bookAuthor.includes(author.toLowerCase()) : true;
  //     const isbnMatch = isbn ? bookISBN === isbn.toLowerCase() : true;

  //     return titleMatch && authorMatch && isbnMatch;
  //   });

  //   setBookSearchResult(searchResult);
  //   console.log(searchResult);
  // };

  return (
    <BooksContext.Provider
      value={{
        Books,
        advancedSearch,
        setAdvancedSearch,
        gridBtn,
        setGridBtn,
        addBooksCart,
        booksCart,
        removeFromCart,
        bookSearch,
        setBookSearch,
        searchBooks,
        bookSearchResult,
        bookSearch,
        setBookSearchResult,
        filterResult,
        setFilterResult,
        filterBooksByRackNumber,
        filterBooksByISBN
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
<ToastContainer />

export default BooksProvider;
