"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[508],{386292:(e,t,n)=>{n.d(t,{A:()=>u});var s=n(8145),i=n(718346),o=n(345735),l=n(811942),a=n.n(l),r=n(244414);const c=(0,i.Z)();function d(e){let{value:t,setValue:n,options:i,title:l,propr:a}=e;return(0,r.jsx)(o.A,{value:t,onChange:(e,t)=>{"string"===typeof t?n({title:t}):t&&t.inputValue?n({title:t.inputValue}):n(t)},filterOptions:(e,t)=>c(e,t),selectOnFocus:!0,clearOnBlur:!0,handleHomeEndKeys:!0,id:"free-solo-with-text-demo",options:i,getOptionLabel:e=>"string"===typeof e?e:e.inputValue?e.inputValue:e[""+a],renderOption:(e,t)=>(0,r.jsx)("li",{...e,children:t[""+a]}),sx:{width:"100%"},freeSolo:!0,renderInput:e=>(0,r.jsx)(s.A,{...e,label:l||"Titre"})})}d.propType={value:a().string,setValue:a().func,options:a().array,title:a().string,propr:a().string};const u=d},833269:(e,t,n)=>{n.d(t,{A:()=>w});var s=n(409950),i=n(463464),o=n(428170),l=n(182053),a=n(198587),r=n(58168),c=n(672004),d=n(147896),u=n(559254),p=n(548283),x=n(110178),A=n(107594);function h(e){return(0,A.Ay)("MuiDialogActions",e)}(0,x.A)("MuiDialogActions",["root","spacing"]);var m=n(244414);const v=["className","disableSpacing"],f=(0,u.Ay)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})((e=>{let{ownerState:t}=e;return(0,r.A)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!t.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})})),j=s.forwardRef((function(e,t){const n=(0,p.A)({props:e,name:"MuiDialogActions"}),{className:s,disableSpacing:i=!1}=n,o=(0,a.A)(n,v),l=(0,r.A)({},n,{disableSpacing:i}),u=(e=>{const{classes:t,disableSpacing:n}=e,s={root:["root",!n&&"spacing"]};return(0,d.A)(s,h,t)})(l);return(0,m.jsx)(f,(0,r.A)({className:(0,c.A)(u.root,s),ownerState:l,ref:t},o))})),g=j;var y=n(395876);function w(e){const{confirmDialog:t,setConfirmDialog:n}=e;return(0,m.jsxs)(i.A,{open:t.isOpen,sx:b.dialog,children:[(0,m.jsxs)(o.A,{sx:b.contentDialog,children:[(0,m.jsx)(l.A,{variant:"h6",children:t.title}),(0,m.jsx)(l.A,{variant:"subtitle2",children:t.subTitle})]}),(0,m.jsxs)(g,{sx:b.contentButton,children:[(0,m.jsx)(y.Ay,{type:"primary",onClick:t.onConfirm,children:"Yes"}),(0,m.jsx)(y.Ay,{type:"primary",danger:!0,onClick:()=>n({...t,isOpen:!1}),children:"No"})]})]})}const b={dialog:{padding:"5px",position:"absolute",top:"5px"},contentDialog:{textAlign:"center",width:"20rem"},contentButton:{justifyContent:"center"}}},747348:(e,t,n)=>{n.d(t,{A:()=>x});var s=n(625979),i=n(102660),o=n(702046),l=n(489379),a=n(409950),r=n(914949),c=n(916233),d=function(e,t){return a.createElement(c.A,(0,l.A)((0,l.A)({},e),{},{ref:t,icon:r.A}))};const u=a.forwardRef(d);var p=n(244414);const x=e=>{let{label:t,setValue:n,value:l,showIcon:a}=e;return(0,p.jsx)(s.A,{sx:{width:"100%"},children:(0,p.jsx)(i.A,{size:"small",id:"header-search",startAdornment:(0,p.jsx)(o.A,{position:"start",sx:{mr:-.5},children:a&&(0,p.jsx)(u,{})}),"aria-describedby":"header-search-text",inputProps:{"aria-label":"weight"},value:l,onChange:e=>n(e.target.value),placeholder:t})})}},591927:(e,t,n)=>{n.d(t,{A:()=>c});var s=n(409950),i=n(19647),o=n(23266),l=n(625979),a=n(770006),r=n(244414);const c=function(e){const{label:t,data:n,value:c,setValue:d}=e,[u,p]=s.useState(!1);return(0,r.jsxs)(l.A,{sx:{width:"100%"},children:[(0,r.jsx)(i.A,{id:"demo-controlled-open-select-label",children:t}),(0,r.jsx)(a.A,{labelId:"demo-controlled-open-select-label",id:"demo-controlled-open-select",open:u,onClose:()=>{p(!1)},onOpen:()=>{p(!0)},value:c,label:t,onChange:e=>{d(e.target.value)},children:function(e){return e.map(((e,t)=>(0,r.jsx)(o.A,{value:e.value||e.id,children:e.title},t)))}(n)})]})}},406508:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var s=n(153256),i=n(260899),o=n(752472),l=n(541233),a=n(29246),r=n(833269),c=n(150098),d=n(409950),u=n(315770),p=n(482130),x=n(176231),A=n(339579),h=n(716491),m=n(689505),v=n(672934),f=n(386292),j=n(244414);const g=function(e){let{value:t}=e;const n=(0,A.d4)((e=>null===e||void 0===e?void 0:e.agent.agent)),[s,i]=d.useState(""),[o,r]=l.Ay.useMessage(),c=async e=>{try{e.preventDefault();200===(await a.A.put(u.Fb+"/addMemberTeam",{idTeam:null===t||void 0===t?void 0:t.idTeam,id:null===s||void 0===s?void 0:s._id},u.$W)).status&&(n="Modification effectu\xe9e",i="success",o.open({type:i,content:""+n,duration:3}))}catch(l){console.log(l)}var n,i};return(0,j.jsxs)("div",{style:{minWidth:"25rem"},children:[r,(0,j.jsx)(h.A,{sx:{margin:"10px 0px"},children:(0,j.jsx)(f.A,{value:s,setValue:i,options:n,title:"Agent",propr:"nom"})}),(0,j.jsxs)(m.A,{onClick:e=>c(e),color:"secondary",variant:"contained",children:[(0,j.jsx)(v.A,{fontSize:"small",sx:{marginRight:"10px"}})," Update"]})]})};var y=n(747348),w=n(591927);const b=function(e){let{setTeams:t,team:n}=e;const[s,i]=d.useState(""),[o,r]=d.useState(""),[c,p]=l.Ay.useMessage(),x=(e,t)=>{c.open({type:t,content:""+e,duration:3})};return(0,j.jsxs)("div",{style:{width:"18rem"},children:[p,(0,j.jsx)("div",{children:(0,j.jsx)(y.A,{label:"Title",setValue:i,value:s})}),(0,j.jsx)("div",{style:{margin:"10px 0px"},children:(0,j.jsx)(w.A,{label:"Departement",data:[{id:1,title:"Call center",value:"CALL CENTER MANAGER"},{id:2,title:"Portfolio manager",value:"PORTFOLIO MANAGER"},{id:3,title:"Fraud Managment",value:"FRAUD MANAGMENT"},{id:4,title:"Shop manager",value:"SHOP MANAGER"},{id:5,title:"Responsable Shop",value:"RS"}],value:o,setValue:r})}),(0,j.jsx)("div",{children:(0,j.jsx)(m.A,{onClick:e=>(async e=>{e.preventDefault();try{const e=await a.A.post(u.wp+"/team",{title:s,role:o},u.$W);200===e.status?(t([e.data,...n]),x("Op\xe9ration effectu\xe9e","success")):x(""+e.data,"error")}catch(i){console.log(i)}})(e),variant:"contained",color:"primary",fullWidth:!0,children:"Valider"})})]})};var S=n(625979),C=n(596557),M=n(616497),D=n(93038);const T=function(e){let{value:t}=e;console.log(t);const n=(0,A.d4)((e=>null===e||void 0===e?void 0:e.action.action)),[s,i]=d.useState([]),[o,r]=d.useState(),[c,p]=l.Ay.useMessage();d.useEffect((()=>{i(t.actions)}),[t]),d.useEffect((()=>{(()=>{if(n&&n.length>0){let e=n.filter((e=>{var n;return(null===(n=e.roles[0])||void 0===n?void 0:n.title)===(null===t||void 0===t?void 0:t.role.toUpperCase())}));r(e)}})()}),[t]);const x=async e=>{try{e.preventDefault();200===(await a.A.put(u.Fb+"/addActionTeam",{data:s,id:t._id},u.$W)).status&&(n="Modification effectu\xe9e",i="success",c.open({type:i,content:""+n,duration:3}))}catch(o){console.log(o)}var n,i};return(0,j.jsxs)("div",{style:{minWidth:"30rem"},children:[p,(0,j.jsx)(h.A,{children:o&&o.length>0&&o.map((e=>(0,j.jsx)(S.A,{component:"fieldset",variant:"standard",children:(0,j.jsx)(C.A,{children:(0,j.jsx)(M.A,{onClick:t=>((e,t)=>{t.preventDefault(),s.includes(e)?i(s.filter((t=>t!==e))):i([...s,e])})(e.idAction,t),control:(0,j.jsx)(D.A,{name:e._id,checked:s.includes(e.idAction)}),label:e.title})})},e._id)))}),(0,j.jsxs)(m.A,{onClick:e=>x(e),color:"secondary",variant:"contained",children:[(0,j.jsx)(v.A,{fontSize:"small",sx:{marginRight:"10px"}})," Update"]})]})};const k=function(){var e,t;const[n,A]=d.useState(!1),[h,m]=d.useState([]),[v,f]=d.useState(!1),[y,w]=d.useState(!1),[S,C]=d.useState(!1),[M,D]=d.useState({isOpen:!1,title:"",subTitle:""});d.useEffect((()=>{(async()=>{try{f(!0);const e=await a.A.get(u.EU+"/team",u.$W);200===e.status&&(m(e.data),f(!1))}catch(e){console.log(e)}})()}),[]);const[k,N]=d.useState(),[O,z]=l.Ay.useMessage(),R=(e,t)=>{O.open({type:t,content:""+e,duration:3})};return(0,j.jsxs)(c.A,{children:[z,(0,j.jsxs)(i.Ay,{container:!0,children:[(0,j.jsxs)(i.Ay,{item:!0,lg:4,xs:12,sm:12,md:4,children:[(0,j.jsx)(i.Ay,{className:"gridAdd",sx:{border:"2px dashed black"},onClick:()=>A(!0),children:(0,j.jsxs)("div",{style:{textAlign:"center",fontSize:"12px",fontWeight:"bolder"},children:[(0,j.jsx)(s.A,{}),(0,j.jsx)("p",{children:"click here to add a new team"})]})}),v&&(0,j.jsx)("p",{style:{textAlign:"center",fontSize:"11px",marginTop:"20px"},children:"Loading..."}),(0,j.jsx)(i.Ay,{children:h.map((e=>{var t,n;return(0,j.jsxs)(i.Ay,{className:"team",onClick:t=>(async(e,t)=>{try{t.preventDefault();const n=await a.A.get("".concat(u.EU,"/oneTeam/").concat(e));200===n.status&&N(n.data)}catch(n){console.log(n)}})(e._id,t),children:[(0,j.jsx)("p",{className:"titleTeam",children:e.title}),(0,j.jsx)("p",{className:"actionTeam",children:(null===(t=e.actions)||void 0===t?void 0:t.length)>0?"Action : "+(null===(n=e.actions)||void 0===n?void 0:n.length):"Aucune action"})]},e._id)}))})]}),(0,j.jsx)(i.Ay,{item:!0,lg:8,xs:12,sm:6,md:8,children:k&&k.length>0&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:"divTitle",children:[(0,j.jsx)("p",{children:"Actions"}),(0,j.jsx)(o.A,{size:"small",sx:{position:"absolute",right:"10px"},onClick:()=>w(!0),children:(0,j.jsx)(s.A,{fontSize:"small"})})]}),(0,j.jsx)("ol",{style:{marginLeft:"20px"},children:null===(e=k[0])||void 0===e?void 0:e.action.map((e=>(0,j.jsxs)("li",{children:[e.title,(0,j.jsx)(x.epd,{sx:{cursor:"pointer",marginLeft:"3px"},onClick:()=>{D({isOpen:!0,title:"Deleting an action",subTitle:"this operation will delete the action << ".concat(e.title," >> in this team "),onConfirm:()=>{var t;(async(e,t)=>{const n=await a.A.post(u.wp+"/deleteaction",{document:t,idAction:e},u.$W);200===n.status?R("Deletion completed successfully","success"):R(""+n.data,"error")})(e.idAction,null===(t=k[0])||void 0===t?void 0:t._id)}})},color:"error",fontSize:"small"})]},e._id)))}),(0,j.jsxs)("div",{className:"divTitle",children:[(0,j.jsx)("p",{children:"Members"}),(0,j.jsx)(o.A,{onClick:()=>C(!0),size:"small",sx:{position:"absolute",right:"10px"},children:(0,j.jsx)(s.A,{fontSize:"small"})})]}),(0,j.jsx)("ol",{style:{marginLeft:"20px",fontSize:"12px",fontWeight:700},children:null===(t=k[0])||void 0===t?void 0:t.agents.map((e=>(0,j.jsxs)("li",{children:[e.nom,(0,j.jsx)(x.epd,{onClick:()=>{D({isOpen:!0,title:"Deletion of an agent",subTitle:"this operation will delete << ".concat(e.nom," >> in this team"),onConfirm:()=>{(async e=>{const t=await a.A.post(u.wp+"/deletememberteam",{id:e},u.$W);200===t.status?R("Deletion completed successfully","success"):R(""+t.data,"error")})(e._id)}})},sx:{cursor:"pointer",marginLeft:"3px"},color:"error",fontSize:"small"})]},e._id)))})]})})]}),(0,j.jsx)(p.A,{open:n,setOpen:A,title:"New team",children:(0,j.jsx)(b,{setTeams:m,team:h})}),k&&(0,j.jsx)(p.A,{open:y,setOpen:w,title:"Ajoutez une action",children:(0,j.jsx)(T,{value:k[0]})}),k&&(0,j.jsx)(p.A,{open:S,setOpen:C,title:"Ajoutez un agent",children:(0,j.jsx)(g,{value:k[0]})}),(0,j.jsx)(r.A,{confirmDialog:M,setConfirmDialog:D})]})}},482130:(e,t,n)=>{n.d(t,{A:()=>p});var s=n(409950),i=n(463464),o=n(428170),l=n(240033),a=n(848205),r=n(186835),c=n(182053),d=n(244414);const u=s.forwardRef((function(e,t){return(0,d.jsx)(a.A,{direction:"up",ref:t,...e})}));const p=function(e){let{open:t,children:n,setOpen:s,title:a}=e;return(0,d.jsx)("div",{children:(0,d.jsxs)(i.A,{open:t,TransitionComponent:u,keepMounted:!0,onClose:()=>{s(!1)},"aria-describedby":"alert-dialog-slide-description",children:[(0,d.jsxs)(l.A,{style:{display:"flex",justifyContent:"space-between"},children:[(0,d.jsx)(c.A,{children:a}),(0,d.jsx)(r.A,{fontSize:"small",color:"secondary",style:{cursor:"pointer"},onClick:()=>s(!1)})]}),(0,d.jsx)(o.A,{children:n})]})})}},153256:(e,t,n)=>{n.d(t,{A:()=>o});var s=n(965471),i=n(244414);const o=(0,s.A)((0,i.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},186835:(e,t,n)=>{n.d(t,{A:()=>o});var s=n(965471),i=n(244414);const o=(0,s.A)((0,i.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},672934:(e,t,n)=>{n.d(t,{A:()=>o});var s=n(965471),i=n(244414);const o=(0,s.A)((0,i.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"}),"Save")},596557:(e,t,n)=>{n.d(t,{A:()=>f});var s=n(198587),i=n(58168),o=n(409950),l=n(672004),a=n(147896),r=n(559254),c=n(548283),d=n(110178),u=n(107594);function p(e){return(0,u.Ay)("MuiFormGroup",e)}(0,d.A)("MuiFormGroup",["root","row","error"]);var x=n(939766),A=n(568624),h=n(244414);const m=["className","row"],v=(0,r.Ay)("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.row&&t.row]}})((e=>{let{ownerState:t}=e;return(0,i.A)({display:"flex",flexDirection:"column",flexWrap:"wrap"},t.row&&{flexDirection:"row"})})),f=o.forwardRef((function(e,t){const n=(0,c.A)({props:e,name:"MuiFormGroup"}),{className:o,row:r=!1}=n,d=(0,s.A)(n,m),u=(0,x.A)(),f=(0,A.A)({props:n,muiFormControl:u,states:["error"]}),j=(0,i.A)({},n,{row:r,error:f.error}),g=(e=>{const{classes:t,row:n,error:s}=e,i={root:["root",n&&"row",s&&"error"]};return(0,a.A)(i,p,t)})(j);return(0,h.jsx)(v,(0,i.A)({className:(0,l.A)(g.root,o),ownerState:j,ref:t},d))}))}}]);