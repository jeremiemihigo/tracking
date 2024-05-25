// eslint-disable-next-line no-undef
// export const lien = 'http://109.199.122.241:5000/bboxx/support';

// export const lien = 'http://trackingback-m9iu.onrender.com/tracker';

// export const lien_post = 'http://localhost:8000/tracker/post';
// export const lien_read = 'http://localhost:8000/tracker/read';
// export const lien_update = 'http://localhost:8000/tracker/update';
export const lien_post = 'https://tracker-0139.onrender.com/tracker/post';
export const lien_read = 'https://tracker-0139.onrender.com/tracker/read';
export const lien_update = 'https://tracker-0139.onrender.com/tracker/update';
export const lienVisiteMenage = 'https://bboxxother.onrender.com/bboxx/support';
// export const lienVisiteMenage = 'http://localhost:4000/bboxx/support';
export const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + localStorage.getItem('auth')
  }
};
export const differenceDays = (date1, date2) => {
  let resultat = (new Date(date1).getTime() - new Date(date2).getTime()) / 86400000;
  return resultat.toFixed(0);
};
export const sla = (index) => {
  return index.delaiPrevu - differenceDays(index.dateFin, index.dateDebut) >= 0 ? 'INSLA' : 'OUTSLA';
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
