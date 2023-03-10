import { Theme } from "@emotion/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { PropsWithChildren } from "react";

type BoxWrapperType = {
  className?: string;
  sx?: SxProps<Theme>;
};
export const BoxWrapper: React.FC<PropsWithChildren<BoxWrapperType>> = ({
  children,
  className,
  sx,
}) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      marginBottom: "10px",
      ...sx,
    }}
    className={className || ""}
  >
    {children}
  </Box>
);

type StatusBoxType = {
  color?: "success" | "rejected";
};
export const StatusBox: React.FC<
  PropsWithChildren<BoxWrapperType & StatusBoxType>
> = ({ children, className, sx, color }) => {
  const colorEnum = {
    success: "rgba(0,128,0,0.7)",
    rejected: "rgba(128,0,0,0.7)",
  };
  return (
    <IonText
      style={{
        backgroundColor: color ? colorEnum[color] ?? "" : "",
        width: "max-content",
        padding: "4px 6px",
        borderRadius: "4px",
        ...sx,
      }}
      className={className || ""}
    >
      {children}
    </IonText>
  );
};

type Props = {
  children: ReactJSXElement;
  data: any;
  format: any[];
};
export const View: React.FC<Props> = (props) => {
  return (
    <>
      <IonItem
        style={{
          "--background": "transparent",
          "--border-style": "none",
          padding: "30px 20px",
          width: "70vw",
          margin: "auto",
        }}
      >
        <IonGrid>
          <IonRow>
            <IonGrid>
              {props?.format?.map((item, index) => {
                if (item?.renderCell)
                  return (
                    <IonRow key={index}>
                      <IonCol>
                        <Typography fontWeight={700}>{item?.label}</Typography>
                      </IonCol>
                      <IonCol>{item?.renderCell(props?.data) ?? ""}</IonCol>
                    </IonRow>
                  );
                switch (item?.type) {
                  case "status":
                    return (
                      <IonRow key={index}>
                        <IonCol>
                          <Typography fontWeight={700}>
                            {item?.label}
                          </Typography>
                        </IonCol>
                        <IonCol>
                          <StatusBox
                            color={
                              props?.data[item?.name] ? "success" : "rejected"
                            }
                          >
                            {props?.data[item?.name] ? "Agreed" : "Rejected"}
                          </StatusBox>
                        </IonCol>
                      </IonRow>
                    );
                  default:
                    return (
                      <IonRow key={index}>
                        <IonCol>
                          <Typography fontWeight={700}>
                            {item?.label}
                          </Typography>
                        </IonCol>
                        <IonCol>
                          <Typography>
                            {props?.data[item?.name] ?? ""}
                          </Typography>
                        </IonCol>
                      </IonRow>
                    );
                }
              })}
            </IonGrid>
          </IonRow>
          <IonRow style={{ float: "right" }}>
            {props?.children && (
              <IonItem
                style={{
                  "--background": "transparent",
                  "--border-style": "none",
                }}
              >
                {props?.children}
              </IonItem>
            )}
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};
