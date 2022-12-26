import { IonText } from "@ionic/react"
import { Box } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"
import { User } from "../types/userTypes"

export const UserView = [
  {
    name: "firstName", label: "First Name: ", type: "text"
  },
  {
    name: "lastName", label: "Last Name: ", type: "text",
  },
  {
    name: "email", label: "Email: ", type: "text"
  },
  {
    name: "mobile", label: "Mobile: ", type: "text",
  },
  {
    name: "dob", label: "Date of Birth: ", type: "date", renderCell: (params: any) => {
      const dob = new Date(params?.dob).toDateString()
      return <IonText>{dob}</IonText>
    }
  },
  {
    name: "gender", label: "Gender: ", type: "text"
  },
  {
    name: "country", label: "Country: ", type: "text"
  },
  {
    name: "state", label: "State: ", type: "text"
  },
  {
    name: "city", label: "City: ", type: "text"
  },
  {
    name: "hobbies", label: "Hobbies: ", type: "array", renderCell: (params: any) => {
      return (
        <Box sx={{
          display: "grid", gridAutoColumns: "repeat(2 , 1fr)"
        }}>
          {typeof params?.hobbies === "object" ? params?.hobbies?.join(", ") ?? "" : params.hobbies ?? ""}
        </Box>
      )
    }
  },
  {
    name: "address", label: "Address: ", type: "text"
  },
  {
    name: "termsAndConditions", label: "Terms and Conditions: ", type: "status"
  },
]