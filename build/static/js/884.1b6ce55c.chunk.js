"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[884],{386292:(e,t,i)=>{i.d(t,{A:()=>u});var n=i(8145),l=i(718346),s=i(345735),r=i(811942),o=i.n(r),a=i(244414);const d=(0,l.Z)();function c(e){let{value:t,setValue:i,options:l,title:r,propr:o}=e;return(0,a.jsx)(s.A,{value:t,onChange:(e,t)=>{"string"===typeof t?i({title:t}):t&&t.inputValue?i({title:t.inputValue}):i(t)},filterOptions:(e,t)=>d(e,t),selectOnFocus:!0,clearOnBlur:!0,handleHomeEndKeys:!0,id:"free-solo-with-text-demo",options:l,getOptionLabel:e=>"string"===typeof e?e:e.inputValue?e.inputValue:e[""+o],renderOption:(e,t)=>(0,a.jsx)("li",{...e,children:t[""+o]}),sx:{width:"100%"},freeSolo:!0,renderInput:e=>(0,a.jsx)(n.A,{...e,label:r||"Titre"})})}c.propType={value:o().string,setValue:o().func,options:o().array,title:o().string,propr:o().string};const u=c},602698:(e,t,i)=>{i.d(t,{A:()=>r});var n=i(716491),l=i(8145),s=i(244414);const r=function(e){let{setValue:t,value:i,placeholder:r}=e;return(0,s.jsx)(n.A,{component:"form",sx:{"& .MuiTextField-root":{width:"100%"}},autoComplete:"on",children:(0,s.jsx)(l.A,{onChange:e=>t(e.target.value),id:"outlined-multiline-static",value:i,fullWidth:!0,label:r,multiline:!0,rows:4})})}},528784:(e,t,i)=>{i.d(t,{A:()=>x});var n=i(689505),l=i(282960),s=i(477515),r=i(386292),o=i(602698),a=i(409950),d=i(339579),c=i(161683),u=i(244414);const p=function(e){let{setHex:t,hex:i}=e;return(0,u.jsx)(c.A,{style:{marginLeft:20},color:i,onChange:e=>{t(e.hex)}})};const x=function(e){let{edit:t,status:i}=e;const[c,x]=a.useState(""),[h,j]=a.useState(1),[v,f]=a.useState("#fff"),A=(0,d.wA)(),m=(0,d.d4)((e=>{var t;return null===(t=e.role)||void 0===t?void 0:t.role})),[g,y]=a.useState(""),[S,C]=a.useState("");return a.useEffect((()=>{t&&(x(t.title),j(t.delai))}),[t]),(0,u.jsxs)("div",{style:{width:"30rem"},children:[(0,u.jsx)("div",{style:{marginTop:"10px"},children:m&&!t&&(0,u.jsx)(r.A,{value:g,setValue:y,options:m,title:"Select Role",propr:"title"})}),(0,u.jsx)("div",{style:{margin:"10px 0px"},children:(0,u.jsx)(s.A,{onChange:e=>x(e.target.value),value:c,placeholder:"Ajoutez un main principal"})}),(0,u.jsx)("div",{style:{margin:"10px 0px"},children:(0,u.jsx)(s.A,{onChange:e=>j(e.target.value),type:"number",value:h,placeholder:"D\xe9lai"})}),(0,u.jsxs)("div",{style:{margin:"10px 0px",display:"flex"},children:[(0,u.jsx)(p,{setHex:f,hex:v}),(0,u.jsx)("div",{style:{marginLeft:"10px"},children:(0,u.jsx)(o.A,{setValue:C,value:S,placeholder:"Objectif"})})]}),(0,u.jsx)("div",{children:(0,u.jsx)(n.A,{onClick:t?e=>(e=>{e.preventDefault(),A((0,l.kl)({title:c,_id:t._id})),x(""),y(""),j("")})(e):e=>(e=>{e.preventDefault();let t={title:c,idStatus:i,idRole:null===g||void 0===g?void 0:g.id,delai:h,color:v,objectif:S};A((0,l.LR)(t)),x(""),f("#fff"),y(""),j(""),C("")})(e),color:"primary",variant:"contained",children:"Valider"})})]})}},456884:(e,t,i)=>{i.r(t),i.d(t,{default:()=>b});var n=i(240379),l=i(783274),s=i(752472),r=i(182053),o=i(663825),a=i(150098),d=i(409950),c=i(339579),u=i(228429),p=i(482130),x=i(324513),h=i(260899),j=i(528784),v=i(745427),f=i(477515),A=i(689505),m=i(383936),g=i(244414);const y=function(e){let{edit:t,idProcess:i}=e;const[n,l]=d.useState(""),s=(0,c.wA)();return d.useEffect((()=>{t&&l(t.texte)}),[t]),(0,g.jsxs)("div",{style:{width:"16rem"},children:[(0,g.jsx)("div",{style:{marginTop:"10px"}}),(0,g.jsx)("div",{style:{margin:"10px 0px"},children:(0,g.jsx)(f.A,{onChange:e=>l(e.target.value),value:n,placeholder:"Ajoutez un main principal"})}),(0,g.jsx)("div",{children:(0,g.jsx)(A.A,{onClick:t?e=>(e=>{e.preventDefault(),s((0,m.gx)({title:n,_id:t.id})),l("")})(e):e=>(e=>{e.preventDefault();let t={title:n,idProcess:i};s((0,m.jV)(t)),l("")})(e),color:"primary",variant:"contained",children:"Valider"})})]})};var S=i(386292),C=i(189939);const w=function(e){let{edit:t}=e;const[i,n]=d.useState(""),l=(0,c.wA)(),s=(0,c.d4)((e=>{var t;return null===(t=e.main)||void 0===t?void 0:t.main})),[r,o]=d.useState("");return d.useEffect((()=>{t&&n(t.texte)}),[t]),(0,g.jsxs)("div",{style:{width:"16rem"},children:[(0,g.jsx)("div",{style:{marginTop:"10px"},children:s&&!t&&(0,g.jsx)(S.A,{value:r,setValue:o,options:s,title:"Select main process",propr:"title"})}),(0,g.jsx)("div",{style:{margin:"10px 0px"},children:(0,g.jsx)(f.A,{onChange:e=>n(e.target.value),value:i,placeholder:"Ajoutez un main principal"})}),(0,g.jsx)("div",{children:(0,g.jsx)(A.A,{onClick:t?e=>(e=>{e.preventDefault(),l((0,C.Jj)({title:i,_id:t.id})),n(""),o("")})(e):e=>(e=>{e.preventDefault();let t={title:i,idMainProcess:r.idMainProcess};l((0,C.wb)(t)),n(""),o("")})(e),color:"primary",variant:"contained",children:"Valider"})})]})},k=e=>{let{id:t}=e;const i=(0,u.Zp)(),n=(0,c.d4)((e=>{var t;return null===(t=e.process)||void 0===t?void 0:t.process})),[l,o]=d.useState(),[f,A]=d.useState(!1),[m,S]=d.useState(!1),[C,k]=d.useState(!1),[b,V]=d.useState("");d.useEffect((()=>{n.length>0&&o(n.filter((e=>e.idMainProcess===t)))}),[t,n]);const[z,O]=d.useState(),[D,L]=d.useState("");return(0,g.jsxs)(h.Ay,{container:!0,children:[(0,g.jsx)(h.Ay,{item:!0,lg:7,children:(0,g.jsx)(a.A,{children:l&&l.length>0&&(0,g.jsxs)(v.A,{striped:!0,children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{children:"#"}),(0,g.jsx)("th",{children:"Process"}),(0,g.jsx)("th",{children:"Actions"})]})}),(0,g.jsx)("tbody",{children:l.map(((e,t)=>{var i;return(0,g.jsxs)("tr",{onClick:()=>O(e),className:"rows",children:[(0,g.jsx)("td",{children:t+1}),(0,g.jsxs)("td",{children:[e.title,(0,g.jsx)(r.A,{component:"p",sx:{fontSize:"10px"},noWrap:!0,children:null===(i=e.agent)||void 0===i?void 0:i.nom})]}),(0,g.jsx)("td",{children:(0,g.jsx)(s.A,{size:"small",color:"secondary",onClick:()=>((e,t)=>{V({texte:e,id:t}),k(!0)})(e.title,e._id),children:(0,g.jsx)(x.A,{})})})]},e._id)}))})]})})}),(0,g.jsx)(h.Ay,{item:!0,lg:.1}),(0,g.jsx)(h.Ay,{item:!0,lg:4.9,children:z&&(0,g.jsx)(a.A,{title:z.title,sx:{position:"relative"},children:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(r.A,{component:"div",onClick:()=>S(!0),style:{position:"absolute",top:"20px",right:"50px",cursor:"pointer"},children:(0,g.jsx)(x.A,{})}),z.status.length>0?(0,g.jsx)("ol",{children:z&&z.status.map((e=>(0,g.jsxs)("li",{children:[e.title," ",(0,g.jsx)(r.A,{component:"span",onClick:()=>{var t;i("/".concat(null===(t=e)||void 0===t?void 0:t.idStatus),{replace:!0})},className:"action",children:"Details"}),(0,g.jsx)(r.A,{component:"span",className:"action",onClick:t=>function(e,t){e.preventDefault(),L(null===t||void 0===t?void 0:t.idStatus),A(!0)}(t,e),children:"Add"})]},e._id)))}):(0,g.jsx)("p",{children:"Aucun status"})]})})}),(0,g.jsx)(p.A,{open:C,setOpen:k,title:"Edit process",children:(0,g.jsx)(w,{edit:b})}),z&&(0,g.jsx)(p.A,{open:m,setOpen:S,title:"Add status",children:(0,g.jsx)(y,{idProcess:null===z||void 0===z?void 0:z.idProcess})}),(0,g.jsx)(p.A,{open:f,setOpen:A,title:"Add action",children:(0,g.jsx)(j.A,{status:D})})]})};const b=function(){const e=(0,u.zy)().state.id,t=(0,c.d4)((e=>{var t;return null===(t=e.main)||void 0===t?void 0:t.main})),[i,x]=d.useState(),[h,j]=d.useState(!1),{handleLogout:v}=d.useContext(o.m);return d.useEffect((()=>{if(t&&t.length>0){let i=t.filter((t=>t._id===e));i.length>0?x(i[0]):(localStorage.removeItem("auth"),window.location.replace("/tracker/login"))}e||v()}),[e]),(0,g.jsxs)(a.A,{title:i?i.title:"",children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(l.A,{title:"Add process",children:(0,g.jsx)(s.A,{onClick:()=>j(!0),size:"small",color:"primary",sx:{marginBottom:"10px"},children:(0,g.jsx)(n.A,{fontSize:"small",color:"inherit"})})}),(0,g.jsx)(r.A,{component:"h4"}),i&&(0,g.jsx)(k,{id:i.idMainProcess})]}),(0,g.jsx)(p.A,{open:h,setOpen:j,title:"Add process",children:(0,g.jsx)(w,{})})]})}},482130:(e,t,i)=>{i.d(t,{A:()=>p});var n=i(409950),l=i(463464),s=i(428170),r=i(240033),o=i(848205),a=i(186835),d=i(182053),c=i(244414);const u=n.forwardRef((function(e,t){return(0,c.jsx)(o.A,{direction:"up",ref:t,...e})}));const p=function(e){let{open:t,children:i,setOpen:n,title:o}=e;return(0,c.jsx)("div",{children:(0,c.jsxs)(l.A,{open:t,TransitionComponent:u,keepMounted:!0,onClose:()=>{n(!1)},"aria-describedby":"alert-dialog-slide-description",children:[(0,c.jsxs)(r.A,{style:{display:"flex",justifyContent:"space-between"},children:[(0,c.jsx)(d.A,{children:o}),(0,c.jsx)(a.A,{fontSize:"small",color:"secondary",style:{cursor:"pointer"},onClick:()=>n(!1)})]}),(0,c.jsx)(s.A,{children:i})]})})}},324513:(e,t,i)=>{i.d(t,{A:()=>a});var n=i(489379),l=i(409950);const s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"};var r=i(916233),o=function(e,t){return l.createElement(r.A,(0,n.A)((0,n.A)({},e),{},{ref:t,icon:s}))};const a=l.forwardRef(o)}}]);