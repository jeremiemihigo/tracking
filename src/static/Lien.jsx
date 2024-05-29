// eslint-disable-next-line no-undef
// export const lien = 'http://109.199.122.241:5000/bboxx/support';

// export const lien = 'http://trackingback-m9iu.onrender.com/tracker';
const server = 'localhost';
const serverhost = 'tracker-0139.onrender.com';
// const serverhost = 'http://localhost:8000';
// const serverhost = 'tracker-0139.onrender.com';

// export const lien_post = `http://${server}:8000/tracker/post`;
export const lien_socket = `http://${server}:800`;
// export const lien_read = `http://${server}:8000/tracker/read`;
// export const lien_update = `http://${server}:8000/tracker/update`;
export const lien_post = `${serverhost}/tracker/post`;
export const lien_read = `${serverhost}/tracker/read`;
export const lien_update = `${serverhost}/tracker/update`;
export const lienVisiteMenage = `${serverhost}/bboxx/support`;
// export const lienVisiteMenage = `http://${server}:4000/bboxx/support`;
export const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + localStorage.getItem('auth')
  }
};
export const differenceDays = (date1, date2) => {
  if (date1 && date2) {
    let resultat = (new Date(date1).getTime() - new Date(date2).getTime()) / 86400000;
    return resultat.toFixed(0);
  }
};
export const sla = (index) => {
  return index.delaiPrevu - differenceDays(index.dateFin, index.dateDebut) < 0 ? 'OUTSLA' : 'INSLA';
};

export const allpermissions = (user) => {
  return ['SYSTEM AND DATA', 'MANAGING DIRECTOR', 'SUPER USER'].includes(user);
};
export const addTeams = (user) => {
  return ['SYSTEM AND DATA', 'MANAGING DIRECTOR', 'SUPER USER', 'FRAUD MANAGMENT', 'PORTFOLIO MANAGER', 'CALL CENTER MANAGER'].includes(
    user
  );
};
export const returnCategorie = (user) => {
  if (['FIELD'].includes(user)) {
    return 'field';
  }
  if (['RS', 'SHOP MANAGER', 'CALL OPERATOR', 'PROCESS OFFICER'].includes(user)) {
    return 'team';
  }
  if (['FRAUD MANAGMENT', 'PORTFOLIO MANAGER', 'CALL CENTER MANAGER'].includes(user)) {
    return 'managment';
  }
  if (['ZBM'].includes(user)) {
    return 'ZBM';
  }
};
