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
export const differenceDays = (date1, date2) => {
  if (date1 && date2) {
    return ((date1 - date2) / 86400000).toFixed(0);
  }
};
export const sla = (index) => {
  let delai = index.delaiPrevu * 86400000;
  let diff = index.dateFin - index.dateDebut;
  return ((delai - diff) / 86400000).toFixed(0) < 0 ? 'OUTSLA' : 'INSLA';
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
