import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../columns";
import "./table.css";

export const Table = ({ tableData }) => {
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable({
    columns,
    data: tableData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroups) => (
          <tr {...headerGroups.getHeaderGroupProps()}>
            {headerGroups.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length !== 0 ? (
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={COLUMNS.length}>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
