import SwapVertIcon from "@mui/icons-material/SwapVert";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import "./index.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ENUMS } from "../../pages/Customers";

interface Column {
  name: string;
  isFilterable: boolean;
  key: string;
}

interface TableProps {
  tableColumns: Column[];
  tableItems: Customer[];
  emptyTableMessage: string;
  deleteFunction?: (id: number) => void;
  addFavoritesFunction: (id: number) => void;
  showDeleteColumn: boolean;
  setColumnName: (columnName: string) => void;
  setSortType: Dispatch<SetStateAction<"" | "ASC" | "DESC">>;
  sortType: string;
}

interface Customer {
  id: number;
  companyName: string;
  contactTitle: string;
  city: string;
  country: string;
  createDate: string;
  liked: boolean;
}

const Table = ({
  tableColumns,
  tableItems,
  emptyTableMessage,
  deleteFunction,
  addFavoritesFunction,
  showDeleteColumn = true,
  setColumnName,
  setSortType,
  sortType,
}: TableProps) => {
  const [countOfColumnClick, setCountOfColumnClick] = useState(0);
  const handleHeaderClick = (columnName: string) => {
    if (countOfColumnClick === 0) {
      setColumnName(columnName);
      setSortType(ENUMS.desc);
      setCountOfColumnClick((prev) => prev + 1);
    } else if (countOfColumnClick === 1) {
      setColumnName(columnName);
      setSortType(ENUMS.asc);
      setCountOfColumnClick((prev) => prev + 1);
    } else {
      setColumnName("");
      setSortType("");
      setCountOfColumnClick(0);
    }
  };
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            {tableColumns.map((column, index) => (
              <th
                key={index}
                className={`${column.isFilterable && "tableColumns"}`}
                onClick={() =>
                  column.isFilterable && handleHeaderClick(column.key)
                }
              >
                {column.name}
                {column.isFilterable && (
                  <>
                    {sortType === ENUMS.desc ? (
                      <SouthIcon />
                    ) : sortType === ENUMS.asc ? (
                      <NorthIcon />
                    ) : (
                      <SwapVertIcon />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {tableItems?.length > 0 ? (
          <>
            <tbody>
              {tableItems?.map((tableItem) => (
                <tr key={tableItem.id}>
                  <td>{tableItem.id}</td>
                  <td>{tableItem.companyName} </td>
                  <td>{tableItem.contactTitle}</td>
                  <td>
                    {tableItem.city}, {tableItem.country}
                  </td>
                  {showDeleteColumn && deleteFunction && (
                    <td>
                      <button onClick={() => deleteFunction(tableItem.id)}>
                        Delete
                      </button>
                    </td>
                  )}

                  <td>
                    <button
                      className={!tableItem.liked ? "favorite" : ""}
                      onClick={() => addFavoritesFunction(tableItem.id)}
                    >
                      {tableItem.liked
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <tbody>
              <tr>
                <td colSpan={tableColumns.length}>
                  <div className="TableEmptyInfo">
                    <h3>{emptyTableMessage} </h3>
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Table;
