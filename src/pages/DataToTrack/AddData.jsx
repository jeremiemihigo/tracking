import SimpleBackdrop from 'components/Backdrop';
import React from 'react'
import {Grid, Typography} from "@mui/material"
import * as xlsx from 'xlsx';
import {Input} from "antd"
import axios from "axios"
import { config, lien_post } from 'static/Lien';
import { Button } from '../../../node_modules/@mui/material/index';
import { message } from 'antd';

function AddData(){
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState()

    const [messageApi, contextHolder] = message.useMessage();
    const success = (texte, type) => {
      messageApi.open({
        type,
        content: '' + texte,
        duration: 3
      });
    };

    const readUploadFile = (e) => {
        e.preventDefault();
        try {
          if (e.target.files) {
            setOpen(true);
            const reader = new FileReader();
            reader.onload = (e) => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: 'array' });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = xlsx.utils.sheet_to_json(worksheet);
             
              setData(json);
              setOpen(false);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
          }
        } catch (error) {
          success('Error ' + error, "error");
        }
      };

       const sendData = async (e) => {
         e.preventDefault()
    
        try {
            if (data && data.length > 0) {
                const response = await axios.post(
                 lien_post+"/datatotrack",
                 {
                   data,
                   
                 },
                 config
               );
               if(response.status === 413){
                 success("Le fichier ne doit pas depasser 50mb", "error")
               }
               if(response.status === 200){
                 success(response.data, "success")
                 window.location.replace("/tracker/data_to_track")
               }
               if(response.status === 201){
                 success(response.data, "error")
               }
              }else{
                 success("Aucun Client trouvé", "error")
              }
        } catch (error) {
            success(""+error, 'error')
        }
       };
    return(
        <div>
            {contextHolder}
            <SimpleBackdrop open={open}/>
   <Grid container>
        
        <Grid item lg={8} sx={{ paddingLeft: '10px' }}>
          <Typography component="p" noWrap>
            File
          </Typography>
          <Input type="file" name="upload" id="upload" onChange={(e) => readUploadFile(e)} />
        </Grid>
        <Grid item lg={4} sx={{ paddingLeft: '10px' }}>
          <Button color="primary" variant="contained" onClick={(e)=>sendData(e)}>
          sendData
          </Button>
        </Grid>
       

      
      </Grid>
        </div>
    )
}
export default AddData