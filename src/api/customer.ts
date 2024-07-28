import {instance} from "./index.ts";

const ENUMS = {
    customers: "customers"
};

export const getCustomerInfo = async () => {
  const res = await instance.get(`/${ENUMS.customers}`);
  return res.data;
};

export const postCustomerInfo = async (data: {
  companyName: string;
  contactTitle: string;
  city: string;
  country: string;
  createDate: Date;
  liked: boolean;
}) => {
  const res = await instance.post(`/${ENUMS.customers}`, data);
  return res.data;
};

export const updateCustomerInfo = async (
  id: number,
  data: { liked: boolean }
) => {
  const res = await instance.patch(`/${ENUMS.customers}/${id}`, data);
  return res.data;
};

export const deleteCustomerInfo = async (id: number) => {
  const res = await instance.delete(`/${ENUMS.customers}/${id}`);
  return res.data;
};
