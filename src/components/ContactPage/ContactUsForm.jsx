import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import countryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const submitContactForm = async (data) => {
    console.log("logging data", data);
    try {
      setLoading(true);
      // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      const response = { status: "ok" };
      console.log("Loogging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <div>
            {/* firstName */}
            <div className="flex flex-col">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
                className="text-black"
              />
              {errors.firstname && <span>Enter your First name</span>}
            </div>
            {/* lastName */}

            <div className="flex flex-col">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter Last name"
                {...register("lastname")}
                className="text-black"
              />
            </div>
          </div>

          {/* email */}
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="text-black"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Enter your email</span>}
          </div>
          {/* phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber">Phone Number</label>
            <div className="flex flex-row gap-5">
              {/* dropdown */}
              <div className="flex w-[80px] gap-5 ">
                <select
                  name="dropdown"
                  id="dropdown"
                  {...register("countrycode", { required: true })}
                >
                  {countryCode.map((element, index) => {
                    return (
                      <option value={element.code} key={index}>
                        {element.code}-{element.country}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="12345 6789"
                  className="text-black"
                  {...register("email", { required: true,maxLength:{value:10,message:"Invalid phone number"} , minLength:{value:8,message:"Invalid phone number"}})}
                />
               
              </div>
            </div>
            {
                    errors.phoneNo&&(
                        <span>{errors.phoneNo.message}</span>
                    )
                }
          </div>

          {/* message */}
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter your message hear"
              {...register("message", { required: true })}
              className="text-black"
            ></textarea>
            {errors.message && <span>Pleae Enter your message</span>}
          </div>

          <button
            type="submit"
            className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactUsForm;
