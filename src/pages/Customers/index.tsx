import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Pagination } from "@mui/material";
import {
  deleteCustomerInfo,
  getCustomerInfo,
  updateCustomerInfo,
} from "../../api/customer";

import "./index.scss";

export interface SortEnums {
  asc: "ASC";
  desc: "DESC";
}

// eslint-disable-next-line react-refresh/only-export-components
export const ENUMS: SortEnums = {
  asc: "ASC",
  desc: "DESC"
};

interface Customer {
  id: number;
  companyName: string;
  contactTitle: string;
  city: string;
  country: string;
  createDate: string;
  liked: boolean;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setColumnName] = useState("");
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "">("");

  const itemsPerPage = 5;

  const tableColumns = [
    { key: "id", name: "ID", isFilterable: false },
    { key: "companyName", name: "Company Name", isFilterable: true },
    { key: "contactTitle", name: "Contact Title", isFilterable: false },
    { key: "country", name: "Country", isFilterable: false },
    { key: "delete", name: "Delete", isFilterable: false },
    { key: "addFav", name: "Add To Favorites", isFilterable: false },
  ];

  const emptyTableMessage = "There is not any customer";


  useEffect(() => {
    const fetchData = async () => {
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

        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchData();
  }, [columnName, sortType]);

  const handleDelete = async (id: number) => {
    const confirmMessage = confirm(`Are you sure you want to delete ${id}?`);
    if (confirmMessage) {
      await deleteCustomerInfo(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleAddToFavorites = async (id: number) => {
    const customer = customers.find((customer) => customer.id === id);
    if (customer) {
      try {
        await updateCustomerInfo(id, { liked: !customer.liked });
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === id
              ? { ...customer, liked: !customer.liked }
              : customer
          )
        );
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
  };

  const handlePageChange = (_event: unknown, value: number) => {
    // console.log(event);

    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Table
        tableItems={currentItems}
        tableColumns={tableColumns}
        deleteFunction={handleDelete}
        emptyTableMessage={emptyTableMessage}
        addFavoritesFunction={handleAddToFavorites}
        showDeleteColumn
        setColumnName={setColumnName}
        setSortType={setSortType}
        sortType={sortType}
      />

      {customers.length > itemsPerPage && (
        <div className="CustomersPagination">
          <Pagination
            count={Math.ceil(customers.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerList;
