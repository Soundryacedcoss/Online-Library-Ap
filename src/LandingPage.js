import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { contextData } from "./App";
import { contextSearchData } from "./App";
export const LandingPage = () => {
  const [input, setInput] = useState();
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
        value.setBookDetail1([SearchResult.detail[i]])
        console.log(value.BookDetail);
      }
    }
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
