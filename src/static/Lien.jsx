// eslint-disable-next-line no-undef
// export const lien = 'http://109.199.122.241:5000/bboxx/support';

// export const lien = 'http://trackingback-m9iu.onrender.com/tracker';
// const serverhost = 'http://localhost:8000';
// const serverhost = 'http://localhost:8000';
// const serverhost = 'https://backendtracking.onrender.com';
// const serverhost = 'http://localhost:4000';
// const serverhostvm = 'http://localhost:40002';
const serverhost = 'https://backendtracker.bboxxvm.com';

// export const lien_post = `http://${server}:8000/tracker/post`;
export const lien_socket = serverhost;
export const lien_post = `${serverhost}/tracker/post`;
export const lien_read = `${serverhost}/tracker/read`;
export const lien_readclient = `${serverhost}/tracker/readclient`;
export const lien_update = `${serverhost}/tracker/update`;
// export const lienVisiteMenage = `${serverhostvm}/bboxx/support`;
export const lienVisiteMenage = `https://visite.bboxxvm.com/bboxx/support`;
export const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + localStorage.getItem('auth')
  }
};
function getDates(dates) {
  const date = new Date(dates);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const differenceDays = (date1, date2) => {
  const dateDifferenceInDays = (dateInitial, dateFinal) => (dateFinal - dateInitial) / 86400000;
  const diff = dateDifferenceInDays(new Date(getDates(date1)), new Date(getDates(date2)));
  return diff;
};
function getFormattedDate(dates) {
  const date = new Date(dates);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const sla = (index) => {
  const dateDifferenceInHours = (dateInitial, dateFinal) => (dateFinal - dateInitial) / 3600000;
  const diff = dateDifferenceInHours(new Date(getFormattedDate(index.dateDebut)), new Date(getFormattedDate(index.dateFin)));
  let delai = index.delaiPrevu * 24;
  return diff > delai ? 'OUTSLA' : 'INSLA';
};
