import React, { useState } from "react";
import { object, string, boolean, number, array } from "yup";
import { useFormik } from "formik";
import { Form } from "../../components/form/Form";
import { USER_FORM, userInitialState } from "../../constants/FormSource";
import "../../styles/adduser.css";
import {
  addUser,
  getOneUser,
  updateOneUser,
} from "../../services/users/userServices";
import { useHistory, useLocation, useParams } from "react-router";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  IonPage,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "../../styles/navbar.css";
import { IonHeaderWrapper } from "../../components/ionwrapper/IonHeaderWrapper";
import { useForm } from "react-hook-form";
import { User } from "../../types/userTypes";
import { AxiosError } from "axios";

type Params = {
  id?: string;
};

const userValidation = object({
  firstName: string().required("Enter your first name."),
  lastName: string().required("Enter your last name."),
  email: string().email().required("Enter your email."),
  mobile: number()
    .typeError("Mobile number should be number.")
    .required("Enter your mobile number.")
    .test("len", "Must be exactly 10 characters.", (val) => {
      if (!val) return false;
      return val.toString().length === 10;
    }),
  hobbies: array().min(1).required("Select atleast one."),
  dob: string()
    .test((val: string | any): boolean => {
      if (new Date(val).getTime() > new Date("01,01,2015").getTime())
        return false;
      return true;
    })
    .required("Please select Date of Birth.."),
  gender: string().required("Please select gender."),
  country: string().required("Select country."),
  state: string().required("Select state."),
  city: string().required("Select city."),
  address: string().required("Enter your address."),
  termsAndConditions: boolean()
    .nullable()
    .required("Agree to the terms and conditions."),
});

export const AddUser: React.FC = () => {
  const history = useHistory();
  const path = useLocation().pathname;
  const params: Params = useParams();
  const [userSchema, setUserSchema] = useState<User>(userInitialState);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, defaultValues },
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...userSchema },
  });
  const [present] = useIonToast();

  document.title =
    params?.id && path.includes("user/edit") ? "Edit User" : "Add User";

  const presentToast = (message: string) => {
    present({
      message,
      duration: 1500,
      position: "top",
    });
  };

  const handleAddUser = async (values: User) => {
    console.log(values);
    const hobbies = values.hobbies.join(",");
    if (params?.id && path.includes("user/edit")) {
      return await updateOneUser(params?.id, { ...values, hobbies })
        .then((res) => {
          formik.resetForm();
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    await addUser({ ...values, hobbies })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        presentToast(message);
      });
  };

  const formik = useFormik({
    initialValues: userSchema,
    validationSchema: userValidation,
    onSubmit: handleAddUser,
  });

  useIonViewDidEnter(() => {
    if (params?.id && path.includes("user/edit")) {
      return getOneUser(params?.id)
        .then((res) => {
          const hobbies = res?.data?.data?.hobbies?.split(",");
          setUserSchema({ ...res.data.data, hobbies });
          reset({ ...res.data.data, hobbies });
        })
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    }
    return reset(userInitialState);
  }, [path, history, params?.id]);

  useIonViewWillLeave(() => {
    reset(userInitialState);
  });

  return (
    <IonPage>
      <IonHeaderWrapper title="Add User">
        <div className="add-user-container">
          <div className="add-user-box">
            <div className="add-user-heading">
              {params?.id && path.includes("user/edit") ? (
                <h2>Edit User</h2>
              ) : (
                <h2>Add User</h2>
              )}
              <HiOutlineUserCircle className="add-user-icon" />
              <hr />
            </div>
            <Form
              formData={USER_FORM}
              onSubmit={handleAddUser}
              // formHook={formHook}
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              handleSubmit={handleSubmit}
              reset={reset}
              watch={watch}
              defaultValues={defaultValues}
              getValues={getValues}
            />
          </div>
        </div>
      </IonHeaderWrapper>
    </IonPage>
  );
};
