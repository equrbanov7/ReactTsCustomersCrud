import "./index.scss";

interface TableProps {
  tableColumns: string[];
  tableItems: Customer[];
  emptyTableMessage: string;
  deleteFunction?: (id: number) => void;
  addFavoritesFunction: (id: number) => void;
  showDeleteColumn: boolean;
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
}: TableProps) => {
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            {tableColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        {tableItems?.length > 0 ? (
          <>
            <tbody>
              {tableItems?.map((tableItem) => (
                <tr key={tableItem.id}>
                  <td>{tableItem.id}</td>
                  <td>{tableItem.companyName}</td>
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
                    <button onClick={() => addFavoritesFunction(tableItem.id)}>
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
