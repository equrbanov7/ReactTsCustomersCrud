import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getCustomerInfo, updateCustomerInfo } from "../../api/customer";
import "./index.scss";

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
  const [favorites, setFavorities] = useState<Customer[]>([]);
  const tableColumns = [
    "ID",
    "Company Name",
    "Contact Title",
    "Adress",
    "Remove From Favorites",
  ];
  const emptyTableMessage = "There is not any favorite customer";

  useEffect(() => {
    const fetchData = async () => {
      const data: Customer[] = await getCustomerInfo();

      data.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );

      setFavorities(data.filter((customer) => customer.liked));
    };

    fetchData();
  }, []);

  const handleAddToFavorites = async (id: number) => {
    const customer = favorites.find((customer) => customer.id === id);
    if (customer) {
      try {
        await updateCustomerInfo(id, { liked: !customer.liked });
        setFavorities((prevCustomers) =>
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

  const deleteAllFavorities = async () => {
    try {
      const updatePromises = favorites.map((customer) =>
        updateCustomerInfo(customer.id, { liked: false })
      );
      await Promise.all(updatePromises);
      setFavorities([]);
    } catch (error) {
      console.error("Error updating all favorite customers:", error);
    }
  };

  return (
    <div className="Favorites">
      {favorites.length > 0 && (
        <button className="RemoveAll" onClick={deleteAllFavorities}>
          Remove All
        </button>
      )}

      <Table
        tableColumns={tableColumns}
        tableItems={favorites}
        addFavoritesFunction={handleAddToFavorites}
        showDeleteColumn={false}
        emptyTableMessage={emptyTableMessage}
      />
    </div>
  );
};

export default Favorites;
