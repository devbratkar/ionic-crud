import { IonText } from "@ionic/react"
import { Box } from "@mui/material"

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
    name: "dob", label: "Date of Birth: ", type: "date", renderCell: (params) => {
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
    name: "hobbies", label: "Hobbies: ", type: "array", renderCell: (params) => {
      return (
        <Box sx={{
          display: "grid", gridAutoColumns: "repeat(2 , 1fr)"
        }}>
          {typeof params?.hobbies === "object" ? params?.hobbies?.join(", ") ?? "" : params.hobbies ?? ""}
          {/* <ol style={{
            display: "flex", flexWrap: 'wrap'
          }}>
            {params?.hobbies?.map((item, index) => (
              <li style={{marginRight: "40px"}} key={index}>{item}</li>
            ))}
          </ol> */}
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