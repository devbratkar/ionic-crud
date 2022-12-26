import React, { useState } from "react";
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
import { AxiosError, AxiosResponse } from "axios";

type Params = {
  id?: string;
};

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
      return await updateOneUser(Number(params?.id), { ...values, hobbies })
        .then((res: AxiosResponse) => {
          history.push("/");
        })
        .catch((err: AxiosError) => {
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

  useIonViewDidEnter(() => {
    if (params?.id && path.includes("user/edit")) {
      return getOneUser(Number(params?.id))
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
