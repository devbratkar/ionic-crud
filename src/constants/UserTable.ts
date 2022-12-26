import { GridColumns } from "@mui/x-data-grid"

export const USER: GridColumns = [
  {
    field: "sno",
    headerName: "S.No",
    width: 68,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => {
      return (
        `${params.row.firstName ?? ""} ${params.row.lastName ?? ""}`  
      )
    }
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 150,
    renderCell: (params) => {
      const dob = new Date(params?.row?.dob).toDateString()
      return `${dob}`
    }
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 150,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
  },
  {
    field: "state",
    headerName: "State",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "hobbies",
    headerName: "Hobbies",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
]

