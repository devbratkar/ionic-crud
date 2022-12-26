import React from "react";
import { useHistory } from "react-router";
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonViewWillLeave,
} from "@ionic/react";

import { FormProps, UserFormData, UserOptions } from "../../types/userTypes";

export const Form: React.FC<FormProps> = (props) => {
  const {
    register,
    control,
    errors,
    formData,
    handleSubmit,
    onSubmit,
    setValue,
    reset,
    watch,
    getValues,
    defaultValues,
  } = props;

  watch();

  const history = useHistory();

  const cancelHandler = () => {
    reset({});
    history.push("/");
  };

  const changeHandlerRHF = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    setValue(name, value);
  };

  useIonViewWillLeave(() => {
    console.log("PAGE LEAVING");
    reset({});
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((item: UserFormData, index: number) => {
        switch (item?.type) {
          case "radio": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel>{item?.label}</IonLabel>
                <IonRadioGroup
                  {...register(item?.name, {
                    required: "This Field is required.",
                    validate: (values) => {
                      if (values === "") return "Field should not be empty.";
                    },
                  })}
                  data-testid={item?.testid}
                  name={item?.name}
                  onIonChange={(e) => {
                    changeHandlerRHF(e);
                  }}
                >
                  <IonGrid>
                    <IonRow>
                      {item?.options &&
                        item
                          ?.options()
                          ?.map((radioItem: UserOptions, index: number) => (
                            <IonCol size="auto" style={{}} key={index}>
                              <IonItem
                                className="radio-item"
                                style={{ "--border-style": "none" }}
                              >
                                <IonLabel>{radioItem?.label}</IonLabel>
                                <IonRadio slot="end" value={radioItem?.value} />
                              </IonItem>
                            </IonCol>
                          ))}
                    </IonRow>
                  </IonGrid>
                </IonRadioGroup>

                <IonNote slot="error" color="danger">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "option": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel position="floating">{item?.label}</IonLabel>
                <IonSelect
                  {...register(item?.name, {
                    required: "This field is required.",
                  })}
                  data-testid={item?.testid}
                  name={item?.name}
                  onIonChange={(e) => {
                    changeHandlerRHF(e);
                  }}
                  placeholder={item?.placeholder}
                >
                  {item?.options &&
                    item
                      ?.options(control._formValues)
                      ?.map((selectItem: UserOptions, index: number) => (
                        <IonSelectOption value={selectItem?.value} key={index}>
                          {selectItem?.label}
                        </IonSelectOption>
                      ))}
                </IonSelect>
                <IonNote slot="error">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "checkbox-group": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel>{item?.label}</IonLabel>
                {item?.options &&
                  item?.options().map((options, index) => {
                    return (
                      <IonItem key={index} style={{ "--border-style": "none" }}>
                        <IonCheckbox
                          style={{ marginRight: "15px" }}
                          {...register(`${item?.name}`, {
                            required: "This field is required.",
                            value: [],
                          })}
                          data-testid={item?.testid}
                          name={`${item?.name}`}
                          checked={control._formValues[item?.name].includes(
                            options?.value
                          )}
                          onIonChange={(e) => {
                            const { name, checked } = e.target;
                            console.log(checked);
                            const data: any[] = getValues(name);
                            if (checked)
                              return setValue(name, [...data, options?.value]);
                            const filterData = data.filter(
                              (item) => item !== options?.value
                            );
                            return setValue(name, [...filterData]);
                          }}
                        ></IonCheckbox>
                        <IonLabel>{options?.label}</IonLabel>
                      </IonItem>
                    );
                  })}
                <IonNote slot="error">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "checkbox": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonCheckbox
                  style={{ marginRight: "15px" }}
                  {...register(item?.name, {
                    required: "Please agree to the terms and conditions.",
                  })}
                  data-testid={item?.testid}
                  checked={Boolean(control._formValues[item?.name])}
                  onIonChange={(e) => {
                    const { name, checked } = e.target;
                    setValue(name, checked);
                  }}
                ></IonCheckbox>
                <IonLabel>{item?.checkboxLabel}</IonLabel>
                <IonNote slot="error">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "date": {
            const { ref, name } = register(item?.name, {
              required: "This field is required.",
            });
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel>{item?.label}</IonLabel>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="datetime"
                    presentation="date"
                    ref={ref}
                    data-testid={item?.testid}
                    name={name}
                    defaultValue={
                      defaultValues[item?.name] &&
                      new Date(defaultValues[item?.name]).toISOString()
                    }
                    max={new Date("01/01/2015").toISOString()}
                    onIonChange={(e) => {
                      changeHandlerRHF(e);
                    }}
                  ></IonDatetime>
                </IonModal>
                <IonNote slot="error">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "textarea": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel position="floating">{item?.label}</IonLabel>
                <IonTextarea
                  enterkeyhint="done"
                  autoGrow={true}
                  {...register(item?.name, {
                    required: "This field is required.",
                  })}
                  data-testid={item?.testid}
                  placeholder={item?.placeholder}
                  onIonInput={(e) => changeHandlerRHF(e)}
                ></IonTextarea>
                <IonNote slot="error">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "text": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel position="floating">{item?.label}</IonLabel>
                <IonInput
                  inputMode="text"
                  enterkeyhint="done"
                  placeholder={item?.placeholder}
                  {...register(item?.name, {
                    required: "This field is required.",
                    validate: (value) => {
                      if (!isNaN(value)) return "Value should not be a number.";
                      return true;
                    },
                  })}
                  data-testid={item?.testid}
                  name={item?.name}
                  onIonChange={(e) => changeHandlerRHF(e)}
                />
                <IonNote slot="error" color="danger">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "mobile": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel position="floating">{item?.label}</IonLabel>
                <IonInput
                  inputMode="numeric"
                  enterkeyhint="done"
                  placeholder={item?.placeholder}
                  {...register(item?.name, {
                    required: "This field is required.",
                    validate: (value) => {
                      if (value === "") return "Required";
                      if (isNaN(value)) return "Values should be a number.";
                      if (value.length !== 10)
                        return "Mobile number should be of 10 characters.";
                    },
                  })}
                  data-testid={item?.testid}
                  name={item?.name}
                  onIonInput={(e) => changeHandlerRHF(e)}
                />
                <IonNote slot="error" color="danger">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          case "email": {
            return (
              <IonItem
                key={index}
                className={`${
                  errors[item?.name] ? "ion-invalid" : "ion-valid"
                }`}
              >
                <IonLabel position="floating">{item?.label}</IonLabel>
                <IonInput
                  inputMode="email"
                  enterkeyhint="done"
                  placeholder={item?.placeholder}
                  {...register(item?.name, {
                    required: "This field is required.",
                    validate: (value) => {
                      if (value === "") return "Required";
                    },
                    pattern: {
                      value: /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Invalid email.",
                    },
                  })}
                  data-testid={item?.testid}
                  name={item?.name}
                  onIonInput={(e) => changeHandlerRHF(e)}
                />
                <IonNote slot="error" color="danger">
                  {`${errors[item?.name] ? errors[item?.name]!.message : ""}`}
                </IonNote>
              </IonItem>
            );
          }
          default:
            return <div key={index}></div>;
        }
      })}
      <div className="form-actions">
        <IonButton
          className="form-cancel"
          type="button"
          onClick={cancelHandler}
          expand="block"
          color="danger"
        >
          Cancel
        </IonButton>
        <IonButton className="form-submit" type="submit" color="success">
          Submit
        </IonButton>
      </div>
    </form>
  );
};
