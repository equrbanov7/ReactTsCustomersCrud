import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getCustomerInfo, updateCustomerInfo } from "../../api/customer";
import "./index.scss";
import { Pagination } from "@mui/material";
import { ENUMS } from "../Customers";

interface Customer {
  id: number;
  companyName: string;
  contactTitle: string;
  city: string;
  country: string;
  createDate: string;
  liked: boolean;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setColumnName] = useState('');
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "">("");

  console.log(columnName)
  const itemsPerPage = 5;
  const tableColumns = [
    { key: "id", name: "ID", isFilterable: false },
    { key: "companyName", name: "Company Name", isFilterable: true },
    { key: "contactTitle", name: "Contact Title", isFilterable: false },
    { key: "country", name: "Address", isFilterable: false },
    { key: "removeFav", name: "Remove From Favorites", isFilterable: false },
  ];

  const emptyTableMessage = "There is not any favorite customer";

  const fetchFavorites = async () => {
    try {
      const data: Customer[] = await getCustomerInfo();
      data.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );

      if (columnName && columnName !== "delete" && columnName !== "addFav") {
        data.sort((a, b) => {
          const key = columnName as keyof Customer;
          if (sortType === ENUMS.desc) {
            if (typeof a[key] === "string" && typeof b[key] === "string") {
              return a[key].localeCompare(b[key]);
            }
          } else if (sortType === ENUMS.asc) {
            if (typeof a[key] === "string" && typeof b[key] === "string") {
              return b[key].localeCompare(a[key]);
            }
          }
          return 0;
        });
      }


      setFavorites(data.filter((customer) => customer.liked));
    } catch (error) {
      console.error("Error fetching customer info:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnName, sortType]);

  const handleAddToFavorites = async (id: number) => {
    const customer = favorites.find((customer) => customer.id === id);
    if (customer) {
      try {
        await updateCustomerInfo(id, { liked: !customer.liked });
        fetchFavorites();
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
  };

  const deleteAllFavorites = async () => {
    try {
      const updatePromises = favorites.map((customer) =>
        updateCustomerInfo(customer.id, { liked: false })
      );
      await Promise.all(updatePromises);
      setCurrentPage(1);
      fetchFavorites();
    } catch (error) {
      console.error("Error updating all favorite customers:", error);
    }
  };

  const handlePageChange = (event: unknown, value: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(event);
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="Favorites">
      {favorites.length > 0 && (
        <button className="RemoveAll" onClick={deleteAllFavorites}>
          Remove All
        </button>
      )}
      <Table
        tableColumns={tableColumns}
        tableItems={currentItems}
        addFavoritesFunction={handleAddToFavorites}
        showDeleteColumn={false}
        emptyTableMessage={emptyTableMessage}
        setColumnName={setColumnName}
        setSortType={setSortType}
        sortType={sortType}
      />

      {favorites.length > itemsPerPage && (
        <div className="CustomersPagination">
          <Pagination
            count={Math.ceil(favorites.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
