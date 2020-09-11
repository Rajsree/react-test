import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/Table";

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

    // Using useEffect to call the API once mounted and set the data.
    useEffect(() => {
      (async () => {
        let result = await axios("https://hn.algolia.com/api/v1/search?query=react");
        setData(result.data.hits);
        console.log("result analusis :", result.data.hits);
      })();
    }, []);
  
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
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

  return (
    <div>
      <h1>Connectus Global</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <hr />

      <List list={stories} />

      <TableComponent columns={columns} data={data} />
      
    </div>
  );
};

const List = (props) =>
  props.list.map((item) => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));

export default App;
