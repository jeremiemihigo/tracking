import { FileCopy } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

// eslint-disable-next-line react/prop-types
function ExcelButton({ data, title, fileName, sheetName }) {
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return (
    <>
      <Button color="success" variant="contained" disabled={data ? false : true} onClick={() => downloadExcel(data)}>
        <FileCopy fontSize="small" /> <span className="ml-2">{title}</span>
      </Button>
    </>
  );
}

export default ExcelButton;
