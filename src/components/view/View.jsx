import { IonCol, IonGrid, IonItem, IonRow, IonText } from '@ionic/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export const BoxWrapper = ({ children, className, sx }) => (
  <Box
    sx={{
      display: "grid", gridTemplateColumns: "repeat(2,1fr)", marginBottom: "10px", ...sx
    }}
    className={className || ""}
  >
    {children}
  </Box>
)

export const StatusBox = ({ children, className, sx, color }) => {
  const colorEnum = {
    "success": "rgba(0,128,0,0.7)", "rejected": "rgba(128,0,0,0.7)"
  };
  return (
    <IonText
      style={{ backgroundColor: colorEnum[color] ?? "", width: "max-content", padding: "4px 6px", borderRadius: "4px", ...sx }}
      className={className || ""}
    >
      {children}
    </IonText>
  )
}

export const View = (props) => {
  return (
    <>
      <IonItem style={{
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
                if (item?.renderCell) return (
                  <IonRow key={index}>
                    <IonCol>
                      <Typography fontWeight={700}>{item?.label}</Typography>
                    </IonCol>
                    <IonCol>
                      {item?.renderCell(props?.data) ?? ""}
                    </IonCol>
                  </IonRow>
                )
                switch (item?.type) {
                  case "status": return (
                    <IonRow key={index}>
                      <IonCol>
                        <Typography fontWeight={700}>{item?.label}</Typography>
                      </IonCol>
                      <IonCol>
                        <StatusBox color={props?.data[item?.name] ? "success" : "rejected"}>
                          {props?.data[item?.name] ? "Agreed" : "Rejected"}
                        </StatusBox>
                      </IonCol>
                    </IonRow>
                  )
                  default: return (
                    <IonRow key={index}>
                      <IonCol>
                        <Typography fontWeight={700}>{item?.label}</Typography>
                      </IonCol>
                      <IonCol>
                        <Typography>{props?.data[item?.name] ?? ""}</Typography>
                      </IonCol>
                    </IonRow>
                  )
                }
              })}
            </IonGrid>
          </IonRow>
          <IonRow style={{float: "right"}}>
            {props?.children &&
              <IonItem style={{
                "--background": "transparent",
                "--border-style": "none"
              }}>
                {props?.children}
              </IonItem>
            }
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  )
}
