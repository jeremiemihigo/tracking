/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import SimpleBackdrop from 'components/Backdrop';
import React, { createContext } from 'react';
import { config, lien_post } from 'static/Lien';
import * as xlsx from 'xlsx';
export const CreateContexte = createContext();

const ContexteAnalyse = (props) => {
  const [open, setOpen] = React.useState(false);
  const [sending, setSending] = React.useState('');
  const readUploadFile = (e, setData) => {
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
      alert('Error ' + error);
    }
  };
  const [visited, setVisited] = React.useState();
  const [track, setTrack] = React.useState([]);
  const [allAdresse, setAllAdresse] = React.useState();
  const [appelSortant, setAppelSortant] = React.useState();
  const sendData = async () => {
    setSending(true);
    if (track.length > 0) {
      const response = await axios.post(
        lien_post + '/client',
        {
          data: track
        },
        config
      );
      console.log(response);
    } else {
    }
  };

  return (
    <CreateContexte.Provider
      value={{
        sendData,
        readUploadFile,
        sending,
        setOpen,
        //updated
        setVisited,
        visited,
        setAllAdresse,
        allAdresse,
        appelSortant,
        setAppelSortant,
        setTrack,
        track
      }}
    >
      {props.children}
      {open && <SimpleBackdrop open={open} />}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteAnalyse);
