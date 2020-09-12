import React, {useState} from "react";
import { useTable, useFilters, useSortBy, usePagination} from "react-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';

export default function Table({ columns, data }) {

  // state creation
const [filterInput, setFilterInput] = useState("");

// Updating the state on input changes
const handleFilterChange = e => {
  const value = e.target.value || undefined;
  setFilter("title", value);
  setFilterInput(value);
};


  // Using the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, 
    prepareRow,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 2, pageSize: 5 },
  },
  useFilters,
  useSortBy,
  usePagination);


  return (
    <div>
    <input  value={filterInput}  onChange={handleFilterChange}  placeholder={"Search book title"} />
    <pre>

     </pre>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}
              className={
                column.isSorted
                  ? column.isSortedDesc
                    ? "sort-desc"
                    : "sort-asc"
                  : ""
            }
            >{column.render("Header")} { column.isSorted ? column.isSortedDesc ? <span> &#9660; </span> : <span>&#9650;</span> : ""}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <ul className="pagination">
              <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <a className="page-link">First</a>
              </li>
              <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <a className="page-link">{'<'}</a>
              </li>
              <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                  <a className="page-link">{'>'}</a>
              </li>
              <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <a className="page-link">Last</a>
              </li>
              <li>
                  <a className="page-link">
                      Page{' '}
                      <strong>
                          {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                  </a>
              </li>

              <select
                  className="form-control"
                  value={pageSize}
                  onChange={e => {
                      setPageSize(Number(e.target.value))
                  }}
                  style={{ width: '120px', height: '38px' }}
              >
                  {[5, 10, 20].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                      </option>
                  ))}
              </select>
          </ul>
  </div>
  );
}
