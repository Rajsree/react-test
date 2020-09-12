import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/Table.js";
//import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Author",
        accessor: "author"
      },
      {
        Header: "Comments",
        accessor: "num_comments"
      },
      {
        Header: "Points",
        accessor: "points"
      }
    ],
    []
  );
    //data state to store the books API data. Its initial value is an empty array
   const [data, setData] = useState([]);
   const searchtopic = 'react';
   const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
   const url = `${API_ENDPOINT}${searchtopic}`

    // Using useEffect to call the API once mounted and set the data.
    useEffect(() => {
      (async () => {
        let result = await axios(url);
        setData(result.data.hits);
        console.log("result analysis :", result.data.hits);
      })();
    }, []);

  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 1,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [searchList, setSearchList] = React.useState("");

  const handleChangeinList = (event) => {
    setSearchList(event.target.value);
  };
  let size = 0;
  const fetchmore = (event) => {
    console.log("Fetching more data");
    size = size + 20;
    (async () => {
      let result = await axios("https://hn.algolia.com/api/v1/search?query=/size=" +size);
      setData(result.data.hits);
      console.log("More data fetched :", result.data.hits);
    })();
  };

  return (
    <div>
      <h1>Connectus Global</h1>
      <div className="basepage">
      <div className="searchgrid">
      <h3>Search input</h3>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <h3>Search in List</h3>
      <label htmlFor="searchList">Search: </label>
      <input id="searchList" type="text" onChange={handleChangeinList} placeholder="Search for book Title "/>
        <List list={stories} searchList={searchList}/>
      </div>
      <hr /><hr />
      <div className="tablegrid">
      <h3>Fetch data to Table, search for title, Sorting/Reverse sorting all columns & Pagination</h3>
      <TableComponent columns={columns} data={data} />
      <button className="more" onClick={() => fetchmore()}>
          <a className="more">Fetch More</a>
      </button>
      </div>
      </div>
    </div>
  );
};

const List = (props) =>
  props.list.filter(item => item['title'].toLowerCase().indexOf(props.searchList.toLowerCase()) > -1).map((filtereditem) => (
    <div key={filtereditem.objectID} className="listStories">
      <span>
        <a href={filtereditem.url}>{filtereditem.title}</a>
      </span>
      <span>{filtereditem.author}</span>
      <span>{filtereditem.num_comments}</span>
      <span>{filtereditem.points}</span>
    </div>
  ));

export default App;
