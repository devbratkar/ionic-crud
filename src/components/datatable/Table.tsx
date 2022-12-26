import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { USER } from "../../constants/UserTable"
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import "../../styles/table.css"

export function Table(props: any) {
  const history = useHistory()
  function editUser(this: any) {
    history.push(`/user/view/${this.id}`);
  }

  const actions: GridColumns = [
    {
      field: "myactioncol",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <IonButton fill='outline' size='small' onClick={editUser.bind(params.row)}>View / Edit</IonButton>
            <IonButton fill='outline' size='small' color="danger" onClick={props.delete.bind(params.row)}>Delete</IonButton>
          </>
        )
      }
    }
  ]
  
  return (
    <IonPage>
      <IonContent className='table-content'>
        <div style={{ display: 'flex'}}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={USER.concat(actions)}
              rows={props?.rows ?? []}
              autoHeight
              sx={{ backgroundColor: "white", width: "100%" }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
