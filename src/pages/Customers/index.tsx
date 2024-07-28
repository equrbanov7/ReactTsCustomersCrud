import { useEffect, useState } from "react";
import Table from "../../components/Table";
import {
  deleteCustomerInfo,
  getCustomerInfo,
  updateCustomerInfo,
} from "../../api/customer";

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
  // const [searchValue, setSearchValue] = useState("");
  const tableColumns = [
    "ID",
    "Company Name",
    "Contact Title",
    "Adress",
    "Delete",
    "Add To Favorites",
  ];
  const emptyTableMessage = "There is not any customer";

  useEffect(() => {
    const fetchData = async () => {
      const data: Customer[] = await getCustomerInfo();

      data.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );

      setCustomers(data);
    };

    fetchData();
  }, []);

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

  return (
    <div>
      <Table
        tableItems={customers}
        tableColumns={tableColumns}
        deleteFunction={handleDelete}
        emptyTableMessage={emptyTableMessage}
        addFavoritesFunction={handleAddToFavorites}
        showDeleteColumn
      />
    </div>
  );
};

export default CustomerList;
