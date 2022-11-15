import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { contextData } from "./App";
import { contextSearchData } from "./App";
export const LandingPage = () => {
  const [input, setInput] = useState();
  const [BookDetail, setBookDetail] = useState([]);
  const value = useContext(contextData);
  const SearchResult = useContext(contextSearchData);
  const InputHandler = (e) => {
    setInput(e.target.value);
  };
  const SearchHandler = () => {
    console.log(value.BookDetail);
    fetch(`https://openlibrary.org/search.json?q=${input}&has_fulltext=true`)
      .then((response) => response.json())
      .then((val) => {
        let temp=val.docs.slice(0,10)
        SearchResult.setDetail(temp)
      });
    console.log(SearchResult.detail);
  };
  const ImageHandler = (val) => {
    for (let i = 0; i < SearchResult.detail.length; i++) {
      if (val === SearchResult.detail[i].key) {
        BookDetail.push(SearchResult.detail[i]);
        setBookDetail(BookDetail);
        console.log(BookDetail.length);
        if (BookDetail.length === 1) {
          console.log("if");
          value.BookDetail1.push(BookDetail);
          value.setBookDetail1(...value.BookDetail1);
          console.log(value.BookDetail1);
          break;
        } else if (BookDetail.length > 1) {
          console.log("else");
          var ot1 = BookDetail.slice(-1);
          console.log(ot1);
          value.setBookDetail1(ot1);
          console.log(value.BookDetail1);
        }
        console.log("remainIndex", value.BookDetail1);
      }
    }
    // console.log(data[0].key);
    console.log(BookDetail);
  };

  return (
    
    <div className="LandingPage">
      <h2>Welcome to my Library</h2>
      <input type="search" onChange={InputHandler} /> {" "}
      <button className="SearchBUtoon" onClick={SearchHandler}>
        Search
      </button>
      <div className="BookDiv">
        {SearchResult.detail.map((item) => (
          <>
            <div className="wrap">
              <Link onClick={() => ImageHandler(item.key)} to={"/BookDetail"}>
                <img
                  src={`//covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`}
                  alt=""
                />
              </Link>{" "}
              <h4>{item.title}</h4>
              <br /> First Publish Year {item.first_publish_year}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
