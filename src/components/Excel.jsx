import IconExcel from 'assets/images/icons/excelIcon.jpg';
import * as XLSX from 'xlsx';

// eslint-disable-next-line react/prop-types
function ExcelButton({ data, fileName, sheetName }) {
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return (
    <>
      <img style={{ cursor: 'pointer' }} src={IconExcel} alt="excel" width={60} height={30} onClick={() => downloadExcel(data)} />
    </>
  );
}

export default ExcelButton;
