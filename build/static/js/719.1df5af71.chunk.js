"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[719],{134719:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var i=n(260899),o=n(182053),r=n(902235),l=n(663825),s=n(541397),d=n.n(s),c=n(883426),a=n(409950),p=n(339579),h=n(228429),u=n(259051),x=n.n(u),f=n(244414);const g=function(){var e,t;const n=(0,h.zy)(),{handleLogout:s}=a.useContext(l.m);a.useEffect((()=>{var e;null!==(e=n.state)&&void 0!==e&&e.region||s()}),[]);const u=null===(e=n.state)||void 0===e?void 0:e.data,g=null===(t=n.state)||void 0===t?void 0:t.region,[v,A]=a.useState();a.useEffect((()=>{u?(()=>{const e=Object.keys(d().groupBy(u,"shop_name")),t=Object.keys(d().groupBy(u,"action.idAction"));A({action:t,shop:e})})():s()}),[u]);const m=(e,t,n)=>"shop"===n?u.filter((n=>n.actionEnCours===t&&n.shop_name===e)):"region"===n?u.filter((n=>n.actionEnCours===t&&n.shop_region===e)):void 0,j=(0,p.d4)((e=>{var t;return null===(t=e.action)||void 0===t?void 0:t.action})),y=e=>{var t;if(j&&j.length>0)return null===(t=d().filter(j,{idAction:e})[0])||void 0===t?void 0:t.title},b=e=>{if(j){var t;var n;return(null===(t=j.filter((t=>t.idAction===e))[0])||void 0===t?void 0:t.roles).length>0?null===(n=j.filter((t=>t.idAction===e))[0])||void 0===n?void 0:n.roles[0].title:"maybe a household visit"}return"maybe a household visit"},k=e=>{if(u&&u.length>0){let t=d().filter(u,{actionEnCours:e});return t[t.length-1].updatedAt}return""},C=e=>{if(j&&j.length>0){let t=d().filter(j,{idAction:e})[0];return t.color?t.color:"#fff"}};return(0,f.jsxs)("div",{children:[(0,f.jsx)(c.A,{texte:g}),(0,f.jsx)(i.Ay,{container:!0,children:v&&v.shop.map(((e,t)=>(0,f.jsxs)(i.Ay,{item:!0,lg:3,xs:12,sm:6,md:6,sx:{paddingLeft:"1px"},children:[(0,f.jsx)(i.Ay,{sx:{backgroundColor:"#002d72",borderRadius:"2px",textAlign:"center",color:"#fff"},children:(0,f.jsx)(o.A,{component:"p",noWrap:!0,children:e})}),(0,f.jsx)(i.Ay,{container:!0,children:v.action.map((t=>m(e,t,"shop").length>0&&(0,f.jsx)(i.Ay,{item:!0,lg:12,md:6,xs:6,sm:12,sx:{padding:"2px"},children:(0,f.jsxs)(r.A,{elevation:2,sx:{padding:"5px",backgroundColor:C(t)},children:[(0,f.jsx)("p",{style:{fontSize:"11px",textAlign:"center"},children:y(t)}),(0,f.jsx)(o.A,{component:"p",sx:{fontSize:"9px",textAlign:"center",padding:"0px",margin:"0px"},children:b(t)}),(0,f.jsx)("p",{style:{fontSize:"25px",textAlign:"center",fontWeight:"bolder"},children:m(e,t,"shop").length}),(0,f.jsx)("p",{style:{fontSize:"9px",textAlign:"right"},children:""!==k(t)&&x()(k(t)).fromNow()})]})},t)))})]},t)))})]})}}}]);