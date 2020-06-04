(this["webpackJsonpcodezilla-hours"]=this["webpackJsonpcodezilla-hours"]||[]).push([[0],{118:function(e,t,a){e.exports=a(145)},123:function(e,t,a){},145:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(15),l=a.n(i),o=(a(123),a(11)),c=a.n(o),s=a(16),u=a(14),d=a(50),m=a(35),p=a(41),f=a(210),h=a(215),g=a(59),b=a(104),v=a(181),y=a(212),E=a(78),k=a.n(E);k.a.initializeApp({apiKey:"AIzaSyAkvaF-lqt8ZxyBwcNlwrHhj-Pp3Ev54pI",authDomain:"codezilla-hours.firebaseapp.com",databaseURL:"https://codezilla-hours.firebaseio.com",projectId:"codezilla-hours",storageBucket:"codezilla-hours.appspot.com",messagingSenderId:"634823174203",appId:"1:634823174203:web:ca40af276111cfae66541e",measurementId:"G-DR0KK33WCW"});var w=k.a,j=a(12),N=a(184),O=a(186),C=a(217),x=a(187),S=a(94),T=a.n(S),D=Object(v.a)((function(e){return{appBar:{backgroundColor:"#7d518",color:"#fff"},menuButton:{marginRight:e.spacing(2)},highlight:{backgroundColor:Object(j.a)("rgba(103, 213, 24)",.1)},title:{flexGrow:1},avatar:{marginRight:e.spacing(2),backgroundColor:"transparent"}}}));function I(e){var t=e.profile,a=D();return r.a.createElement("div",null,r.a.createElement(N.a,{position:"static",className:a.appBar},r.a.createElement(O.a,null,r.a.createElement(C.a,{className:a.avatar},r.a.createElement("img",{src:"./Icon-white.svg",alt:"CODEZILLA logo",height:"100%",width:"100%"})),r.a.createElement(g.a,{variant:"h6",className:a.title},"CODEZILLA Hours"),r.a.createElement(x.a,{component:m.b,color:"inherit",to:"/",exact:!0,activeClassName:a.highlight},"Urenstaat"),r.a.createElement(x.a,{component:m.b,color:"inherit",to:"/template",activeClassName:a.highlight},"Template"),t.isAdmin&&r.a.createElement(x.a,{component:m.b,color:"inherit",to:"/admin",activeClassName:a.highlight},"Beheer"),r.a.createElement(x.a,{color:"inherit",startIcon:r.a.createElement(T.a,null)},t.displayName))))}var H=a(51),W=a(95),P=a(96),L=a(107),B=a(105),A=a(208),R={getHours:function(e,t){return Object(s.a)(c.a.mark((function a(){var n;return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=w.firestore(),a.next=4,n.collection("months").where("month","==",Number(e)).where("year","==",Number(t)).get();case 4:return a.abrupt("return",a.sent);case 5:case"end":return a.stop()}}),a)})))()},getHoursForProfile:function(e,t,a){return Object(s.a)(c.a.mark((function n(){var r,i;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=w.firestore(),n.next=3,r.collection("months").where("month","==",Number(e)).where("year","==",Number(t)).where("profileId","==",a).get();case 3:return i=n.sent,n.abrupt("return",i.docs.map((function(e){var t=e.data();return t.id=e.id,t})));case 5:case"end":return n.stop()}}),n)})))()},getHoursWithId:function(e){return Object(s.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=w.firestore(),t.next=3,a.collection("months").doc(e).get();case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()},updateHours:function(e,t){var a=this;return Object(s.a)(c.a.mark((function n(){var r;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=w.firestore(),n.next=3,r.collection("months").doc(e).set({client:a.transformToString(t.client),days:a.processDays(t.days),profile:t.profile,profileId:a.transformToString(t.profileId),project:a.transformToString(t.project),year:a.transformToString(t.year),month:a.transformToString(t.month),approved:!!t.approved&&t.approved});case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})))()},updateHourList:function(e){return Object(s.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=w.firestore(),n=a.batch(),e.forEach((function(e){if(e.id&&""!==e.id){var t=a.collection("months").doc(e.id);n.update(t,e)}})),t.abrupt("return",n.commit());case 4:case"end":return t.stop()}}),t)})))()},getTemplate:function(e){return Object(s.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=w.firestore(),t.next=3,a.collection("template").doc(e).get();case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()},updateTemplate:function(e,t,a,n,r){return Object(s.a)(c.a.mark((function i(){var l;return c.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return l=w.firestore(),i.next=3,l.collection("template").doc(e).set({days:t,client:a,project:n,profileName:r});case 3:return i.abrupt("return",i.sent);case 4:case"end":return i.stop()}}),i)})))()},processDays:function(e){var t=this;return e.map((function(e,a){return{day:e.day?e.day:a+1,dayOfTheWeek:e.dayOfTheWeek?e.dayOfTheWeek:a+1,isWeekend:!!e.isWeekend&&e.isWeekend,worked:t.transformToString(e.worked),overtime:t.transformToString(e.overtime),sick:t.transformToString(e.sick),holiday:t.transformToString(e.holiday),publicHoliday:t.transformToString(e.publicHoliday),available:t.transformToString(e.available),education:t.transformToString(e.education),other:t.transformToString(e.other),standBy:t.transformToString(e.standBy),kilometers:t.transformToString(e.kilometers),explanation:t.transformToString(e.explanation)}}))},transformToString:function(e){return e||""}},M=function(e,t){return Object(s.a)(c.a.mark((function a(){var n,r,i;return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:n="",a.t0=t,a.next="intern"===a.t0?4:"extern"===a.t0?6:8;break;case 4:return n="HJewFyx0vL",a.abrupt("break",10);case 6:return n="H1gnFUldtI",a.abrupt("break",10);case 8:return n="",a.abrupt("break",10);case 10:if(""!==n){a.next=12;break}return a.abrupt("return");case 12:return r={template:{shortid:n},data:e,options:{reports:{save:!0}}},a.next=15,fetch("https://codezilla.jsreportonline.net/api/report",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json",Authorization:"Basic c2FuZGVyQGNvZGV6aWxsYS5ubDphVFNSYzNATWp3UjZQU0A="},body:JSON.stringify(r)}).then((function(e){return e.blob()})).then((function(t){var a=window.URL.createObjectURL(t),n=document.createElement("a");n.href=a,n.download=e.id+".pdf",document.body.appendChild(n),n.click(),n.remove()}));case 15:return i=a.sent,a.abrupt("return",i);case 17:case"end":return a.stop()}}),a)})))()},F=[{id:"worked",description:"Gewerkt",enabled:!0},{id:"overtime",description:"Overwerk",enabled:!0},{id:"sick",description:"Ziek",enabled:!0},{id:"holiday",description:"Verlof",enabled:!0},{id:"publicHoliday",description:"Feestdag",enabled:!0},{id:"available",description:"Beschikbaar",enabled:!1},{id:"education",description:"Opleiding",enabled:!1},{id:"other",description:"Overig",enabled:!1},{id:"standBy",description:"StandBy",enabled:!1},{id:"kilometers",description:"Kilometers",enabled:!1}],z=[{id:1,description:"Januari"},{id:2,description:"Februari"},{id:3,description:"Maart"},{id:4,description:"April"},{id:5,description:"Mei"},{id:6,description:"Juni"},{id:7,description:"Juli"},{id:8,description:"Augustus"},{id:9,description:"September"},{id:10,description:"Oktober"},{id:11,description:"November"},{id:12,description:"December"}],V=[2020,2021,2022,2023,2024,2025],Z=["2020, 1, 1","2020, 4, 13","2020, 4, 27","2020, 5, 5","2020, 5, 21","2020, 6, 1","2020, 12, 25","2020, 12, 26","2021, 1, 1","2021, 4, 5","2021, 4, 27","2021, 5, 24","2021, 5, 31","2021, 12, 25","2021, 12, 26","2022, 1, 1","2022, 4, 18","2022, 4, 27","2022, 5, 26","2022, 6, 6","2022, 12, 25","2022, 12, 26","2023, 1, 1","2023, 4, 10","2023, 4, 27","2023, 5, 18","2023, 5, 28","2023, 12, 25","2023, 12, 26"],K=function(e){var t=F.map((function(e){return e}));t.unshift({description:"Dag",id:"day",enabled:!0}),t.push({description:"Toelichting",id:"explanation",enabled:!0});var a=t.map((function(e){return e.description})).join(","),n=e.days.map((function(e){return t.map((function(t){return e[t.id].toString()})).join(",")}));n.unshift(a);var r="data:text/csv;charset=utf-8,"+n.join("\n"),i=encodeURI(r),l=document.createElement("a");l.setAttribute("href",i),l.setAttribute("download","uren-intern - "+e.profile.displayName+".csv"),document.body.appendChild(l),l.click()},U=a(194),G=a(219),J=a(214),q=a(197),Y=a(188),Q=a(108),X=a(221),$=a(37),_=a.n($),ee=a(98),te=a.n(ee),ae=a(189),ne=a(190),re=a(192),ie=a(147),le=a(193),oe=a(97),ce=a.n(oe);function se(e){var t=e.messages,a=r.a.useState(null),n=Object(u.a)(a,2),i=n[0],l=n[1],o=Boolean(i),c=o?"simple-popover":void 0;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,{"aria-label":"Validation messages",onClick:function(e){l(e.currentTarget)}},r.a.createElement(ae.a,{badgeContent:t.length,color:"error"},r.a.createElement(ce.a,null))),r.a.createElement(ne.a,{id:c,open:o,anchorEl:i,onClose:function(){l(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},r.a.createElement(re.a,null,t.map((function(e,t){return r.a.createElement(ie.a,{key:t},r.a.createElement(le.a,{primary:e}))})))))}var ue=Object(v.a)((function(e){return{alert:{color:"red"},spacingLeft:{marginLeft:e.spacing(2)},spacingRight:{marginRight:e.spacing(2)},right:{marginLeft:"auto",display:"inline-flex",justifyContent:"flex-end",alignItems:"center"}}})),de=z,me=V,pe=(new Date).getFullYear(),fe=(new Date).getMonth()+1,he=function(e){var t=e.isTemplate,a=e.client,n=e.project,i=e.expandColumns,l=e.handleInputChange,o=e.applyTemplate,c=e.getReport,s=e.getCSV,d=e.validationMessages,m=e.saved,p=e.approved,f=ue(),h=r.a.useState(null),b=Object(u.a)(h,2),v=b[0],y=b[1],E=Boolean(v),k=function(){y(null)};return t?r.a.createElement(ge,{classes:f,client:a,project:n,approved:p,handleInputChange:l}):r.a.createElement(O.a,{disableGutters:!0},r.a.createElement(U.a,{className:f.spacingLeft},r.a.createElement(G.a,{id:"select-month-label"},"Maand"),r.a.createElement(J.a,{labelId:"select-month-label",id:"select-month-label",defaultValue:fe,onChange:function(e){return l("month",e.target.value)}},de.map((function(e){return r.a.createElement(q.a,{value:e.id,key:e.id},e.description)})))),r.a.createElement(U.a,{className:f.spacingLeft},r.a.createElement(G.a,{id:"select-year-label"},"Jaar"),r.a.createElement(J.a,{labelId:"select-year-label",id:"select-year-label",defaultValue:pe,onChange:function(e){return l("year",e.target.value)}},me.map((function(e){return r.a.createElement(q.a,{value:e,key:e},e)})))),r.a.createElement(ge,{classes:f,client:a,project:n,approved:p,handleInputChange:l}),(null===d||void 0===d?void 0:d.length)>0?r.a.createElement(se,{messages:d}):null,r.a.createElement("div",{className:f.right},m?r.a.createElement(g.a,{variant:"overline",display:"block",className:f.spacingLeft},"Opgeslagen"):null,p?r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{color:"primary",className:f.spacingRight}),r.a.createElement(g.a,{className:f.spacingRight},"Akkoord")):null,r.a.createElement("div",null,r.a.createElement(Y.a,{"aria-label":"more","aria-controls":"header-menu","aria-haspopup":"true",id:"headerMenuButton",onClick:function(e){y(e.currentTarget)}},r.a.createElement(te.a,null)),r.a.createElement(Q.a,{id:"headerMenu",anchorEl:v,keepMounted:!0,open:E,onClose:k},r.a.createElement(q.a,{onClick:function(){o(),k()},disabled:Boolean(p),id:"applyTemplate"},"Pas template toe"),r.a.createElement(q.a,{onClick:function(){l("expandColumns",i=!i),k()},id:"expandColumns"},"Toon alle velden"),r.a.createElement(q.a,{onClick:function(){c("intern"),k()},id:"getInternReport"},"Download interne PDF"),r.a.createElement(q.a,{onClick:function(){c("extern"),k()},id:"getExternReport"},"Download externe PDF"),r.a.createElement(q.a,{onClick:function(){s(),k()},id:"getInternalCSV"},"Download interne CSV")))))},ge=function(e){var t=e.classes,a=e.client,n=e.project,i=e.handleInputChange,l=e.approved;return r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,{className:t.spacingLeft,id:"client",label:"Klant",value:a,disabled:l,onChange:function(e){return i("client",e.target.value)}}),r.a.createElement(X.a,{className:t.spacingLeft,id:"project",label:"Project",value:n,disabled:l,onChange:function(e){return i("project",e.target.value)}}))},be=a(205),ve=a(110),ye=a(206),Ee=a(207),ke=a(199),we=a(200),je=a(220),Ne=a(100),Oe=a.n(Ne),Ce=a(198),xe=F,Se=function(e){var t=e.expandColumns,a=e.days;return a.length?r.a.createElement(Ce.a,null,r.a.createElement(ke.a,null,r.a.createElement(we.a,null," Totaal"),r.a.createElement(we.a,null),xe.map((function(e){return e.enabled||t?r.a.createElement(we.a,{align:"right",key:"footer-"+e.id},function(e){return a.map((function(t){return t[e]})).reduce((function(e,t){return Number(e)+Number(t)}))}(e.id)):null})),r.a.createElement(we.a,{align:"right"}))):null},Te=a(106),De=Object(v.a)((function(e){return{textField:{width:"90%"}}})),Ie=function(e){var t=e.row,a=e.column,n=e.days,i=e.handleChange,l=e.save,o=e.readOnly,c=De(),s=r.a.useState(t[a]),d=Object(u.a)(s,2),m=d[0],p=d[1];r.a.useEffect((function(){p(t[a])}),[t,a,n]);return t?r.a.createElement(we.a,{align:"left",key:t.day+"-"+a,padding:"none"},Boolean(o)?m:r.a.createElement(X.a,{id:a,className:c.textField,fullWidth:!1,inputProps:{style:{textAlign:"left"},day:t.day},value:m,onChange:function(e){return p(e.target.value)},onBlur:function(e){return function(e,t,a){var r=Object(Te.a)(n);r[a][t]=e,p(e),i("days",r),l()}(e.target.value,a,t.day-1)},onKeyDown:function(e){var t=e.target.closest("td"),a=t.parentNode,n=Array.from(a.children).indexOf(t);switch(e.keyCode){case 40:var r=a.nextSibling;null!==r&&r.children[n].querySelector("input").focus();break;case 38:var i=a.previousSibling;null!==i&&i.children[n].querySelector("input").focus();break;case 37:"TD"===t.previousElementSibling.tagName&&t.previousElementSibling.querySelector("input").focus();break;case 39:"TD"===t.nextElementSibling.tagName&&t.nextElementSibling.querySelector("input").focus()}}})):null},He=a(201),We=function(e){var t=e.expandColumns;return r.a.createElement(He.a,null,r.a.createElement(ke.a,null,r.a.createElement(we.a,null),r.a.createElement(we.a,null),F.map((function(e){return e.enabled||t?r.a.createElement(we.a,{key:"header-"+e.id,padding:"none"},e.description):null})),r.a.createElement(we.a,null,"Toelichting")))},Pe=a(216),Le=a(202),Be=a(203),Ae=a(204),Re=function(e){var t=e.input,a=e.save,n=e.cancel,i=e.readOnly,l=e.show,o=r.a.useState(t),c=Object(u.a)(o,2),s=c[0],d=c[1],m=function(){n()};return r.a.useEffect((function(){d(t)}),[t,l]),r.a.createElement(Pe.a,{open:l,onClose:m,"aria-labelledby":"form-dialog-title",fullWidth:!0,maxWidth:"md",id:"commentDialog"},r.a.createElement(Le.a,{id:"form-dialog-title"},"Toelichting"),r.a.createElement(Be.a,null,r.a.createElement(X.a,{autoFocus:!0,margin:"dense",id:"comment",value:s,onChange:function(e){d(e.target.value)},disabled:i,fullWidth:!0})),r.a.createElement(Ae.a,null,r.a.createElement(x.a,{onClick:m},"Annuleer"),r.a.createElement(x.a,{onClick:function(){a(s)},color:"primary"},"Bewaar")))},Me=F,Fe=Object(v.a)((function(e){return{tableContainer:{overflowX:"inherit"}}})),ze=function(e){var t=e.expandColumns,a=e.days,n=e.handleChange,i=e.save,l=e.readOnly,o=Fe(),c=function(e,t){var a="";return a+=e?" isWeekend":"",a+=t?" isPublicHoliday":""},s=r.a.useState(""),d=Object(u.a)(s,2),m=d[0],p=d[1],f=r.a.useState(!1),h=Object(u.a)(f,2),g=h[0],b=h[1],v=r.a.useState(0),y=Object(u.a)(v,2),E=y[0],k=y[1],w=function(e,t){var a=["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];return e?a[new Date(e).getDay()]:a[t]};return r.a.createElement(be.a,{component:ve.a,className:o.tableContainer},r.a.createElement(ye.a,{stickyHeader:!0,size:"small","aria-label":"simple table"},r.a.createElement(We,{expandColumns:t}),r.a.createElement(Ee.a,null,a.map((function(e,o){return r.a.createElement(ke.a,{key:e.day,className:c(e.isWeekend,e.isPublicHoliday)},r.a.createElement(we.a,{component:"th",scope:"row"},e.isPublicHoliday?r.a.createElement(je.a,{title:"Dit is een feestdag"},r.a.createElement("span",null,w(e.date,o))):w(e.date,o)),r.a.createElement(we.a,{component:"th",scope:"row"},e.day),Me.map((function(o,c){return o.enabled||t?r.a.createElement(Ie,{key:"".concat(o.id,"-").concat(c),row:e,column:o.id,handleChange:n,save:i,days:a,readOnly:l}):null})),r.a.createElement(we.a,null,r.a.createElement(x.a,{onClick:function(t){!function(e,t){p(e),k(t),b(!0)}(e.explanation,o)},id:"commentButton-"+o},r.a.createElement(Oe.a,{color:""===e.explanation?"disabled":"primary"}))))}))),r.a.createElement(Se,{expandColumns:t,days:a})),r.a.createElement(Re,{input:m,readOnly:l,save:function(e){a[E].explanation=e,b(!1),i()},cancel:function(){b(!1)},show:g}))},Ve=a(101),Ze=a.n(Ve),Ke={validateWeekend:function(e){var t=this.getTotalHoursPerDay(e);if(e.isWeekend&&t>0)return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"Weet je zeker dat je in het weekend hebt gewerkt op:"," "),r.a.createElement(Ze.a,{format:"DD/MM"},e.date))},validateTotalHoursOfMonth:function(e){var t=this,a=0,n=0;return e.forEach((function(e){e.isWeekend||(a+=t.getTotalHoursPerDay(e),n+=8)})),a<n?"Er zijn te weinig uren ("+a+") ingevuld ten opzichte van het aantal te werken uren deze maand ("+n+"). Klopt dat?":a>n?"Er zijn te veel uren ("+a+") ingevuld ten opzichte van het aantal te werken uren deze maand ("+n+"). Klopt dat?":""},getTotalHoursPerDay:function(e){return Number([Number(e.worked),Number(e.overtime),Number(e.sick),Number(e.holiday),Number(e.publicHoliday),Number(e.available),Number(e.education),Number(e.other),Number(e.standBy)].reduce((function(e,t){return e+t}),0))}},Ue={getDayOfTheWeek:function(e,t){return t?e.day-1:e.date instanceof Date?new Date(e.date).getDay():-1},isPublicHoliday:function(e){return Z.map((function(e){return new Date(e).getTime()})).includes(e.getTime())},isWeekend:function(e){return[0,6].includes(e.dayOfTheWeek)},parseDate:function(e){return e instanceof Date?new Date(e):e.toDate()instanceof Date?new Date(e.toDate()):new Date},initDays:function(e,t,a,n){var r=this;return e.map((function(e,i){var l=e;return t?(l.dayOfTheWeek=i,l.isWeekend=r.isWeekend(e),l):(l.date||(l.date=new Date(a,n-1,i)),l.date=r.parseDate(e.date),l.dayOfTheWeek=r.getDayOfTheWeek(e,t),l.isWeekend=r.isWeekend(e),l.isPublicHoliday=r.isPublicHoliday(e.date),l)}))}},Ge=function(e){Object(L.a)(a,e);var t=Object(B.a)(a);function a(){var e;Object(W.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={id:"",days:[],month:0,year:0,expandColumns:!0,client:"",project:"",profileId:"",profile:{id:"",displayName:"",microsoftId:"",email:"",isAdmin:!1},saved:!1,approved:!1,showValidationMessage:!1,validationMessages:[],isLoading:!1,isTemplate:!1},e.fetchMonth=Object(s.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({isLoading:!0}),t.next=3,R.getHoursForProfile(Number(e.state.month),Number(e.state.year),e.state.profileId);case 3:1===(a=t.sent).length?e.setState(Object(d.a)({},a[0],{id:a[0].id,approved:a[0].approved}),(function(){e.initData()})):e.setState({approved:!1,days:e.getDaysInMonth(e.state.month,e.state.year)},(function(){e.initData()})),e.setState({isLoading:!1});case 6:case"end":return t.stop()}}),t)}))),e.fetchTemplate=function(){var t=Object(s.a)(c.a.mark((function t(a){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({isLoading:!0}),R.getTemplate(a).then((function(t){if(t&&(null===t||void 0===t?void 0:t.exists)){var a=t.data();a&&e.setState({days:a.days,client:a.client,project:a.project,id:t.id},(function(){e.initData()}))}else e.getTemplateWeek();e.setState({isLoading:!1})})).catch((function(t){e.props.notification("Het is niet gelukt een template op te halen: "+t)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.initData=function(){var t=Ue.initDays(e.state.days,e.state.isTemplate,Number(e.state.year),Number(e.state.month));e.setState({days:t},(function(){e.isValid()}))},e.applyTemplate=Object(s.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({isLoading:!0}),R.getTemplate(e.state.profileId).then((function(t){if(t&&(null===t||void 0===t?void 0:t.exists)){var a=t.data();if(a){var n=a.days,r=e.state.days.map((function(e){var t=n.find((function(t){return e.dayOfTheWeek===t.day-1}));return e!==t&&Object.keys(e).forEach((function(a){""===e[a]&&(e[a]=t[a])})),e}));e.setState({isLoading:!1,days:r,client:a.client,project:a.project,saved:!0},(function(){return e.save()}))}}else e.props.notification("Er is nog geen template aangemaakt.");e.setState({isLoading:!1})})).catch((function(t){e.props.notification("Het is niet gelukt een template op te halen: "+t)}));case 2:case"end":return t.stop()}}),t)}))),e.handleInputChange=function(t,a){e.setState(Object(H.a)({},t,a),(function(){["month","year"].includes(t)&&(e.setState({isLoading:!0}),e.fetchMonth())}))},e.getTemplateWeek=function(){for(var t=[],a=1;a<=7;a++)t.push({day:a,dayOfTheWeek:a,isWeekend:1===a||7===a,worked:"",overtime:"",sick:"",holiday:"",publicHoliday:"",available:"",education:"",other:"",standBy:"",kilometers:"",explanation:""});return e.setState({days:t})},e.submitHours=function(){var t=e.state.year+"-"+e.state.month+"-"+e.state.profile.displayName,a={id:t,client:e.state.client,days:e.state.days,profile:e.state.profile,profileId:e.state.profileId,project:e.state.project,year:e.state.year,month:e.state.month,approved:e.state.approved};R.updateHours(t,a).then((function(){e.setState({saved:!0})})).catch((function(t){e.props.notification("Het is niet gelukt om de uren te bewaren: "+t)}))},e.submitTemplate=function(t,a,n,r){var i=t.map((function(e){return delete e.date,delete e.dayOfTheWeek,e}));R.updateTemplate(r.id,i,a,n,r.displayName).then((function(){e.props.notification("Template opgeslagen")})).catch((function(t){e.props.notification("Het is niet gelukt om het template te bewaren: "+t)}))},e.save=function(){if(e.setState({saved:!1}),e.state.isTemplate){var t=e.state,a=t.days,n=t.client,r=t.project,i=t.profile;e.submitTemplate(a,n,r,i)}else e.isValid(),e.submitHours()},e.isValid=function(){if(e.state.isTemplate)return!0;var t=[];e.state.days.forEach((function(e){var a=Ke.validateWeekend(e);a&&t.push(a)}));var a=Ke.validateTotalHoursOfMonth(e.state.days);return a&&t.push(a),e.setState({validationMessages:t}),!0},e.closeValidationMessage=function(t,a){"clickaway"!==a&&e.setState({showValidationMessage:!1})},e.getReport=function(t){e.setState({isLoading:!0}),M(e.state,t).then((function(){e.setState({isLoading:!1})})).catch((function(t){e.props.notification("Het is niet gelukt om een PDF te maken: "+t)}))},e.getCSV=function(){K(e.state)},e}return Object(P.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=(new Date).getFullYear(),a=(new Date).getMonth()+1,n=this.props,r=n.type,i=n.profile,l="template"===r;this.setState({isTemplate:l,profile:i,profileId:i.id,year:t,month:a},(function(){l?e.fetchTemplate(i.id):e.fetchMonth()}))}},{key:"componentWillUnmount",value:function(){var e=this;document.querySelector("input").removeEventListener("blur",(function(){return e.handleInputChange}))}},{key:"getDaysInMonth",value:function(e,t){for(var a=new Date(t,e,0).getDate(),n=[],r=1;r<=a;r++)n.push({day:r,date:new Date(t,e-1,r),worked:"",overtime:"",sick:"",holiday:"",publicHoliday:"",available:"",education:"",other:"",standBy:"",kilometers:"",explanation:""});return n}},{key:"render",value:function(){return this.props.profile.id?r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(he,{handleInputChange:this.handleInputChange,client:this.state.client,project:this.state.project,expandColumns:this.state.expandColumns,isTemplate:this.state.isTemplate,applyTemplate:this.applyTemplate,getReport:this.getReport,getCSV:this.getCSV,validationMessages:this.state.validationMessages,saved:this.state.saved,approved:this.state.approved}),this.state.isLoading?r.a.createElement(A.a,null):r.a.createElement(ze,{expandColumns:this.state.expandColumns,days:this.state.days,handleChange:this.handleInputChange,save:this.save,readOnly:this.state.approved})):null}}]),a}(n.Component),Je=a(209),qe=Object(v.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:"transparent"}}}));function Ye(){var e=qe();return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,null),r.a.createElement(Je.a,{component:"main",maxWidth:"xs"},r.a.createElement(f.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(C.a,{className:e.avatar},r.a.createElement("img",{src:"./Icon-green.svg",alt:"CODEZILLA logo",height:"100%",width:"100%"})),r.a.createElement(g.a,{id:"preloadTitle",component:"h1",variant:"h4"},"CODEZILLA Hours"),r.a.createElement(g.a,{id:"preloadSubTitle",component:"h2",variant:"subtitle1"},"Bezig met aanmelden..."))))}var Qe=a(213),Xe=a(211),$e=[{id:"name",numeric:!1,disablePadding:!1,label:"Naam"},{id:"client",numeric:!1,disablePadding:!1,label:"Klant"},{id:"project",numeric:!1,disablePadding:!1,label:"Project"},{id:"approved",numeric:!1,disablePadding:!0,label:"Akkoord"},{id:"worked",numeric:!0,disablePadding:!0,label:"Gewerkt"},{id:"overtime",numeric:!0,disablePadding:!0,label:"Overwerk"},{id:"sick",numeric:!0,disablePadding:!0,label:"Ziek"},{id:"holiday",numeric:!0,disablePadding:!0,label:"Verlof"},{id:"publicHoliday",numeric:!0,disablePadding:!0,label:"Feestdag"},{id:"available",numeric:!0,disablePadding:!0,label:"Beschikbaar"},{id:"education",numeric:!0,disablePadding:!0,label:"Opleiding"},{id:"other",numeric:!0,disablePadding:!0,label:"Overig"},{id:"standBy",numeric:!0,disablePadding:!0,label:"stand-by"},{id:"kilometers",numeric:!0,disablePadding:!1,label:"Km"}],_e=a(218);function et(e){var t=e.classes,a=e.onSelectAllClick,n=e.order,i=e.orderBy,l=e.numSelected,o=e.rowCount,c=e.onRequestSort;return r.a.createElement(He.a,null,r.a.createElement(ke.a,null,r.a.createElement(we.a,{padding:"checkbox"},r.a.createElement(Qe.a,{indeterminate:l>0&&l<o,checked:o>0&&l===o,onChange:a,inputProps:{"aria-label":"select all desserts"}})),$e.map((function(e){return r.a.createElement(we.a,{key:e.id,align:e.numeric?"right":"left",padding:e.disablePadding?"none":"default",sortDirection:i===e.id&&n,className:t.small},r.a.createElement(_e.a,{active:i===e.id,direction:i===e.id?n:"asc",onClick:(a=e.id,function(e){c(e,a)})},e.label,i===e.id?r.a.createElement("span",{className:t.visuallyHidden},"desc"===n?"sorted descending":"sorted ascending"):null));var a}))))}var tt=a(3),at=Object(v.a)((function(e){return{root:{paddingRight:e.spacing(1)},formControl:{marginLeft:e.spacing(2)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(j.e)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1"}}}));function nt(e){var t=e.numSelected,a=e.currentMonth,n=e.currentYear,i=e.onChangeDate,l=e.approve,o=at(),c=r.a.useState(a),s=Object(u.a)(c,2),d=s[0],m=s[1],p=r.a.useState(n),f=Object(u.a)(p,2),h=f[0],b=f[1];return r.a.createElement(O.a,{className:Object(tt.a)(o.root,Object(H.a)({},o.highlight,t>0))},t>0?r.a.createElement(g.a,{className:o.title,color:"inherit",variant:"subtitle1"},t," geselecteerd"):r.a.createElement(g.a,{className:o.title,variant:"h6",id:"tableTitle"},"Beheer"),t>0?r.a.createElement(x.a,{variant:"outlined",startIcon:r.a.createElement(_.a,null),onClick:function(){l()}},"Akkoord"):r.a.createElement(r.a.Fragment,null,r.a.createElement(U.a,{className:o.formControl},r.a.createElement(G.a,{id:"select-month-label"},"Maand"),r.a.createElement(J.a,{labelId:"select-month-label",id:"select-month-label",value:d,onChange:function(e){return t=Number(e.target.value),m(t),void i(t,h);var t}},z.map((function(e){return r.a.createElement(q.a,{value:e.id,key:e.id},e.description)})))),r.a.createElement(U.a,{className:o.formControl},r.a.createElement(G.a,{id:"select-year-label"},"Jaar"),r.a.createElement(J.a,{labelId:"select-year-label",id:"select-year-label",value:h,onChange:function(e){return t=Number(e.target.value),b(t),void i(d,t);var t}},V.map((function(e){return r.a.createElement(q.a,{value:e,key:e},e)}))))))}function rt(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0}var it=Object(v.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},small:{fontSize:"0.75rem"},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));function lt(e){var t=e.notification,a=it(),n=r.a.useState("asc"),i=Object(u.a)(n,2),l=i[0],o=i[1],d=r.a.useState("calories"),p=Object(u.a)(d,2),f=p[0],h=p[1],g=r.a.useState([]),b=Object(u.a)(g,2),v=b[0],y=b[1],E=r.a.useState(!0),k=Object(u.a)(E,2),w=k[0],j=k[1],N=r.a.useState([]),O=Object(u.a)(N,2),C=O[0],x=O[1],S=(new Date).getFullYear(),T=(new Date).getMonth()+1,D=function(){var e=Object(s.a)(c.a.mark((function e(a,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(!0),R.getHours(a,n).then((function(e){var t=e.docs.map((function(e){var t=e.data();return t.id=e.id,t}));x(t.map((function(e){return H(e),e})))})).catch((function(e){t("Niet gelukt om uren op te halen: "+e)})),j(!1);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),I=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(!0),R.updateHourList(C).then((function(){j(!1),t("Opgeslagen")})).catch((function(e){t("Niet gelukt om te bewaren: "+e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(e){$e.forEach((function(t){t.numeric&&(e[t.id]=function(e,t){var a=0;return e.forEach((function(e){a+=Number(e[t])})),a}(e.days,t.id))}))};return r.a.useEffect((function(){D(T,S)}),[T,S]),r.a.createElement("div",{className:a.root},r.a.createElement(ve.a,{className:a.paper},r.a.createElement(nt,{numSelected:v.length,currentMonth:T,currentYear:S,onChangeDate:function(e,t){D(e,t)},approve:function(){var e=C.map((function(e){return v.includes(e.id)?Object.assign({},e,{approved:!0}):e}));x(e),I()}}),r.a.createElement(be.a,null,r.a.createElement(ye.a,{className:a.table,"aria-labelledby":"tableTitle",size:"small","aria-label":"enhanced table"},r.a.createElement(et,{classes:a,numSelected:v.length,order:l,orderBy:f,onSelectAllClick:function(e){if(e.target.checked){var t=C.map((function(e){return e.id}));y(t)}else y([])},onRequestSort:function(e,t){o(f===t&&"asc"===l?"desc":"asc"),h(t)},rowCount:C.length}),w||0===C.length?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(Ee.a,null,function(e,t){var a=e.map((function(e,t){return[e,t]}));return a.sort((function(e,a){var n=t(e[0],a[0]);return 0!==n?n:e[1]-a[1]})),a.map((function(e){return e[0]}))}(C,function(e,t){return"desc"===e?function(e,a){return rt(e,a,t)}:function(e,a){return-rt(e,a,t)}}(l,f)).map((function(e,t){var n,i=(n=e.id,-1!==v.indexOf(n)),l="enhanced-table-checkbox-".concat(t);return r.a.createElement(ke.a,{hover:!0,onClick:function(t){return function(e,t){var a=v.indexOf(t),n=[];-1===a?n=n.concat(v,t):0===a?n=n.concat(v.slice(1)):a===v.length-1?n=n.concat(v.slice(0,-1)):a>0&&(n=n.concat(v.slice(0,a),v.slice(a+1))),y(n)}(0,e.id)},role:"checkbox","aria-checked":i,tabIndex:-1,key:e.id,selected:i},r.a.createElement(we.a,{padding:"checkbox",className:a.small},r.a.createElement(Qe.a,{checked:i,inputProps:{"aria-labelledby":l}})),r.a.createElement(we.a,{component:"th",id:l,scope:"row",className:a.small},r.a.createElement(Xe.a,{component:m.b,color:"secondary",to:"/admin/detail/"+e.id},e.profile.displayName)),r.a.createElement(we.a,{className:a.small},e.client),r.a.createElement(we.a,{className:a.small},e.project),r.a.createElement(we.a,{padding:"none",className:a.small},e.approved?r.a.createElement(_.a,{color:"primary",fontSize:"small"}):null),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.worked),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.overtime),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.sick),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.holiday),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.publicHoliday),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.available),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.education),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.other),r.a.createElement(we.a,{align:"right",padding:"none",className:a.small},e.standBy),r.a.createElement(we.a,{align:"right",className:a.small},e.kilometers))}))),r.a.createElement(Ce.a,null,r.a.createElement(ke.a,null,r.a.createElement(we.a,{padding:"checkbox"}),$e.map((function(e){return r.a.createElement(we.a,{align:"right",key:"footer-"+e.id,padding:e.disablePadding?"none":"default"},function(e){return e.numeric?C.map((function(t){return t[e.id]})).reduce((function(e,t){return Number(e)+Number(t)})):""}(e))})))))))))}var ot=a(102),ct=a.n(ot),st=a(103),ut=a.n(st),dt=Object(v.a)((function(e){return{alert:{color:"red"},label:{fontWeight:"bold",marginRight:e.spacing(2)},spacingLeft:{marginLeft:e.spacing(2)},spacingRight:{marginRight:e.spacing(2)},right:{marginLeft:"auto",display:"inline-flex",justifyContent:"flex-end",alignItems:"center"}}}));function mt(e){var t=e.notification,a=Object(p.f)().id,n=r.a.useState({profile:{id:"",isAdmin:!1,microsoftId:"",displayName:"",email:""},id:"",days:[],approved:!1}),i=Object(u.a)(n,2),l=i[0],o=i[1],f=r.a.useState(!0),h=Object(u.a)(f,2),b=h[0],v=h[1],y=dt(),E=function(){var e=Object(s.a)(c.a.mark((function e(a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v(!0),R.getHoursWithId(a).then((function(e){var t=e.data();t&&o({days:Ue.initDays(t.days,!1,t.year,t.month),id:t.id,profile:t.profile,approved:t.approved})})).catch((function(e){t("Niet gelukt om uren op te halen: "+e)})),v(!1);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(s.a)(c.a.mark((function e(a,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v(!0),R.updateHours(a,n).then((function(){v(!1),t("Opgeslagen")})).catch((function(e){t("Niet gelukt om te bewaren: "+e)}));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),w=function(){var e=!Boolean(null===l||void 0===l?void 0:l.approved);o(Object(d.a)({},l,{approved:e}));var t=l;t.approved=e,a&&k(a,t)};return r.a.useEffect((function(){a&&E(a)}),[a]),b?r.a.createElement(r.a.Fragment,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,null,r.a.createElement(x.a,{color:"primary",component:m.b,className:y.spacingRight,startIcon:r.a.createElement(ct.a,null),to:"/admin"},"Terug"),r.a.createElement(g.a,{className:y.label},"Naam:"),r.a.createElement(g.a,{className:y.spacingRight},l.profile.displayName),r.a.createElement(g.a,{className:y.label},"Klant:"),r.a.createElement(g.a,{className:y.spacingRight},l.client),r.a.createElement(g.a,{className:y.label},"Project:"),r.a.createElement(g.a,{className:y.spacingRight},l.project),r.a.createElement("div",{className:y.right},l.approved?r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{color:"primary",className:y.spacingRight}),r.a.createElement(g.a,{className:y.spacingRight},"Akkoord"),r.a.createElement(x.a,{variant:"outlined",startIcon:r.a.createElement(ut.a,null),onClick:w},"Herstel")):r.a.createElement(x.a,{variant:"contained",color:"primary",startIcon:r.a.createElement(_.a,null),onClick:w},"Akkoord"))),r.a.createElement(ze,{expandColumns:!0,days:l.days,readOnly:"true",handleChange:"",save:""}))}a(142).config();var pt=Object(b.a)({palette:{primary:{main:"#67d518"},secondary:{main:"#009CA6"}}}),ft=Object(v.a)((function(e){return{root:{},menuButton:{marginRight:36},hide:{display:"none"},toolbar:Object(d.a)({display:"flex",alignItems:"center",justifyContent:"center",padding:e.spacing(0,1)},e.mixins.toolbar),content:{flexGrow:1},title:{margin:e.spacing(1,1)}}}));function ht(){var e=ft(),t=r.a.useState({displayName:"",email:"",id:"",isAdmin:!1,microsoftId:""}),a=Object(u.a)(t,2),n=a[0],i=a[1],l=r.a.useState(!0),o=Object(u.a)(l,2),d=o[0],g=o[1],b=r.a.useState(""),v=Object(u.a)(b,2),E=v[0],k=v[1],j=function(e){k(e)},N=function(){w.auth().getRedirectResult().then((function(e){null!==e.user?O(e.user):function(){var e=new w.auth.OAuthProvider("microsoft.com");e.setCustomParameters({tenant:"45c0a280-6475-473d-a8ee-a5684b93879c"}),w.auth().signInWithRedirect(e)}()})).catch((function(e){j("Het is niet gelukt om in te loggen: "+e)}))};r.a.useEffect((function(){N()}),[]);var O=function(){var e=Object(s.a)(c.a.mark((function e(t){var a,n,r,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=w.firestore(),e.next=3,a.collection("profile").get();case 3:if(n=e.sent,r=n.docs.find((function(e){return e.data().microsoftId===t.uid}))){e.next=8;break}return C(t),e.abrupt("return");case 8:l=r.data(),i({id:r.id,isAdmin:Boolean(l.isAdmin),displayName:l.displayName,email:l.email,microsoftId:l.microsoftId}),g(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(e){var t=w.firestore(),a={displayName:e.displayName,microsoftId:e.uid,email:e.email};t.collection("profile").add(a).then((function(t){O(e)})).catch((function(e){j("Het is niet gelukt om een profiel op te halen: "+e)}))};return d?r.a.createElement(Ye,null):r.a.createElement(y.a,{theme:pt},r.a.createElement("div",{className:e.root},d?r.a.createElement(Ye,null):r.a.createElement(m.a,null,r.a.createElement(f.a,null),r.a.createElement(I,{profile:n}),r.a.createElement(p.c,null,r.a.createElement(p.a,{path:"/",exact:!0,component:function(){return r.a.createElement(Ge,{profile:n,type:"month",notification:j})}}),r.a.createElement(p.a,{path:"/template"},r.a.createElement(gt,{classes:e}),r.a.createElement(Ge,{type:"template",profile:n,notification:j})),n.isAdmin&&r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{path:"/admin",exact:!0,component:function(){return r.a.createElement(lt,{notification:j})}}),r.a.createElement(p.a,{path:"/admin/detail/:id",component:function(){return r.a.createElement(mt,{notification:j})}}))),r.a.createElement(h.a,{open:""!==E,autoHideDuration:6e3,onClose:function(e,t){"clickaway"!==t&&k("")},message:E,anchorOrigin:{vertical:"bottom",horizontal:"right"}})),r.a.createElement("script",{src:"https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"}),r.a.createElement("script",{src:"https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"}),r.a.createElement("script",{src:"https://www.gstatic.com/firebasejs/7.11.0/firebase-auth.js"}),r.a.createElement("script",{src:"https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"})))}var gt=function(e){var t=e.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{variant:"body1",className:t.title},"Maak hier een template voor je gemiddelde werkweek. Pas het template toe op de hele urenstaat met een klik op de knop."),r.a.createElement(g.a,{variant:"body2",className:t.title},"Uren die je al hebt ingevuld worden niet overschreven."))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(ht,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[118,1,2]]]);
//# sourceMappingURL=main.90912754.chunk.js.map