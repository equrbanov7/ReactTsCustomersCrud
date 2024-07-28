import { SubmitHandler, useForm } from "react-hook-form";
import { postCustomerInfo } from "../../api/customer";

import "./index.scss";

interface FormInputProps {
    companyName: string;
    contactTitle: string;
    city: string;
    country: string;
  }

const Form = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<FormInputProps>();

    const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
        const customerData = {
          ...data,
          createDate: new Date(),
          liked: false
        };
        try {
          const response = await postCustomerInfo(customerData);
          console.log('Customer added:', response);
          reset();
        } catch (error) {
          console.error('Error adding customer:', error);
        }
      };

  return (
    <div className="Form">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Company Name:</label>
          <input {...register("companyName", { required: true })} />
          {errors.companyName && <span>This field is required</span>}
        </div>
        <div className="form-group">
          <label>Contact Title:</label>
          <input {...register("contactTitle", { required: true })} />
          {errors.contactTitle && <span>This field is required</span>}
        </div>
        <div className="form-group">
          <label>City:</label>
          <input {...register("city", { required: true })} />
          {errors.city && <span>This field is required</span>}
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input {...register("country", { required: true })} />
          {errors.country && <span>This field is required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;


