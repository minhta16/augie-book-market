(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{323:function(e,t,a){e.exports=a(646)},328:function(e,t,a){},645:function(e,t,a){},646:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(31),l=a.n(r),o=(a(328),a(20)),s=a(21),c=a(23),u=a(22),m=a(24),h=a(16),d=a(66),p=a(132),b=a.n(p),f=a(131),g=a.n(f),E=a(82),v=a.n(E),y=a(86),k=a.n(y),O=a(85),j=a.n(O),w=a(51),x=a.n(w),S=a(83),I=a.n(S),C=a(128),N=a.n(C),D=a(53),P=a.n(D),B=a(19),L=a.n(B),T=a(129),F=a(54),H=a(130),A=a.n(H),U=a(183),K=a.n(U),z=a(133),R=a.n(z),W=a(35),q=a.n(W),M=a(17),Q=(a(192),a(329),a(264)),G=a.n(Q),J=a(266),X=a.n(J),$=a(265),V=a.n($),_=a(134),Y=a(119),Z=a.n(Y),ee=a(121),te=a.n(ee),ae=a(32),ne=a.n(ae),ie=a(120),re=a.n(ie),le=a(84),oe=a.n(le),se=a(41),ce=a.n(se),ue=a(259),me=a.n(ue),he=a(184),de=a.n(he);de.a.initializeApp({apiKey:"AIzaSyCalcsBPPiKqeweUkLttnlCX763LRP9jJ8",authDomain:"augie-book-market.firebaseapp.com",databaseURL:"https://augie-book-market.firebaseio.com",projectId:"augie-book-market",storageBucket:"augie-book-market.appspot.com",messagingSenderId:"596338877385"});var pe=de.a,be=a(50),fe=a.n(be),ge=a(182),Ee=a.n(ge),ve=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).classes=e,a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:this.classes.searchdiv},i.a.createElement(fe.a,{className:this.classes.input,onKeyUp:this.props.onKeyUp,placeholder:this.props.placeholder}),i.a.createElement(x.a,{className:this.classes.iconButton,onClick:this.props.onClick,"aria-label":"Search"},i.a.createElement(Ee.a,null))))}}]),t}(n.Component),ye=Object(M.withStyles)(function(e){return{root:{padding:"2px 4px",margin:"6px 6px",display:"flex",alignItems:"center",width:400},input:{marginLeft:8,flex:1},searchdiv:{position:"relative",float:"right"},iconButton:{padding:10},divider:{width:28,height:1,margin:4}}})(ve),ke=a(25),Oe=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).classes=e,a.database=pe.database().ref().child("books"),a.state={books:[],booksQuery:"",finishedPulling:!1},a.getDataFromFirebase=a.getDataFromFirebase.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"getDataFromFirebase",value:function(){var e=this;this.database.on("value",function(t){t.forEach(function(t){var a=t.val(),n={id:t.key,title:a.title,author:a.author,price:a.price,owner:a.owner};e.setState({books:[].concat(Object(_.a)(e.state.books),[n])})})})}},{key:"componentDidUpdate",value:function(e,t){!this.state.finishedPulling&&Array.isArray(this.state.books)&&this.state.books.length&&this.setState({finishedPulling:!0})}},{key:"componentDidMount",value:function(){this.getDataFromFirebase(),this.componentDidUpdate()}},{key:"render",value:function(){var e=this,t=this.state.booksQuery?me()(this.state.books.filter(function(t){return t.title.toLowerCase().includes(e.state.booksQuery.toLowerCase())||t.author.toLowerCase().includes(e.state.booksQuery.toLowerCase())})):this.state.books;return this.state.finishedPulling?i.a.createElement("div",null,i.a.createElement(ce.a,{className:this.classes.root},i.a.createElement(ye,{onKeyUp:function(t){e.setState({booksQuery:t.target.value})},placeholder:"Search"}),i.a.createElement(ke.b,{className:this.classes.divider}),i.a.createElement(Z.a,{className:this.classes.table},i.a.createElement(re.a,{className:this.classes.head},i.a.createElement(oe.a,null,i.a.createElement(ne.a,null,"Title"),i.a.createElement(ne.a,null,"Author"),i.a.createElement(ne.a,null,"Price"),i.a.createElement(ne.a,null,"Owner"),i.a.createElement(ne.a,null,"ID"))),i.a.createElement(te.a,null,t.map(function(e){return i.a.createElement(oe.a,{key:e.id},i.a.createElement(ne.a,{component:"th",scope:"row"},e.title),i.a.createElement(ne.a,null,e.author),i.a.createElement(ne.a,null,e.price),i.a.createElement(ne.a,null,e.owner),i.a.createElement(ne.a,null,e.id))}),console.log(t))))):i.a.createElement("div",null,"Loading...")}}]),t}(n.Component),je=Object(M.withStyles)(function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},root:{width:"100%",marginTop:3*e.spacing.unit,overflowX:"auto"},table:{minWidth:700}}})(Oe),we=a(261),xe=a.n(we),Se=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isSignedIn:!1,number:0,name:""},a.buttonHandler=a.buttonHandler.bind(Object(h.a)(Object(h.a)(a))),a.pushToFirebase=a.pushToFirebase.bind(Object(h.a)(Object(h.a)(a))),a.submitNameHandler=a.submitNameHandler.bind(Object(h.a)(Object(h.a)(a))),a.uiConfig={signInFlow:"popup",signInOptions:[pe.auth.GoogleAuthProvider.PROVIDER_ID,pe.auth.EmailAuthProvider.PROVIDER_ID],callbacks:{signInSuccess:function(){return!1}}},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;pe.auth().onAuthStateChanged(function(t){e.setState({isSignedIn:!!t})})}},{key:"buttonHandler",value:function(e){e.preventDefault(),this.setState({number:Math.floor(100*Math.random())})}},{key:"submitNameHandler",value:function(e){e.preventDefault();var t=document.getElementById("name").value;this.setState({name:t}),document.getElementById("name").value=""}},{key:"componentDidUpdate",value:function(e,t){this.state.number!==t.number&&this.pushToFirebase("number",this.state.number),this.state.name!==t.name&&this.pushToFirebase("name",this.state.name)}},{key:"pushToFirebase",value:function(e,t){pe.database().ref(e).push(t)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,this.state.isSignedIn?i.a.createElement("div",null,i.a.createElement("h1",null,"Logged In! Welcome ",pe.auth().currentUser.displayName),i.a.createElement(ke.a,{color:"primary",onClick:function(){return pe.auth().signOut()}},"Click to sign out")):i.a.createElement("div",null,i.a.createElement(xe.a,{uiConfig:this.uiConfig,firebaseAuth:pe.auth()})),i.a.createElement(ke.e,{label:"Name",id:"name",onKeyDown:function(t){13===t.keyCode&&e.submitNameHandler(t)}}),i.a.createElement(ke.a,{color:"primary",onClick:this.submitNameHandler},"Submit Name"),i.a.createElement("h1",null,this.state.number),i.a.createElement(ke.a,{color:"primary",onClick:this.buttonHandler},"Generate Random Number"))}}]),t}(n.Component),Ie=a(262),Ce=a(185),Ne=a.n(Ce),De=function(e){function t(e){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.helperText,a=e.label,n=e.labelKey,r=e.fullWidth,l=e.error,o=e.renderSuggestionProps,s=e.selectClosestMatch,c=e.suggestionLimit,u=e.suggestions,m=e.fuzzyKeys,h=e.classes;return i.a.createElement(Ne.a,Object.assign({helperText:t,label:a,labelKey:n,fullWidth:r,error:l,renderSuggestionProps:o,selectClosestMatch:s,suggestionLimit:c,suggestions:u,fuzzySearchOpts:Object(Ie.a)({},Ce.defaultProps.fuzzySearchOpts,{keys:m}),className:h.autosuggest},this.props))}}]),t}(n.Component),Pe=(Object(M.withStyles)({autosuggest:{}})(De),a(125)),Be=a.n(Pe),Le=a(127),Te=a.n(Le),Fe=a(126),He=a.n(Fe),Ae=a(122),Ue=a.n(Ae),Ke=a(123),ze=a.n(Ke),Re=a(124),We=a.n(Re),qe=a(263),Me=a.n(qe),Qe=Object(M.withStyles)({root:{border:"1px solid rgba(0,0,0,.125)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"}},expanded:{margin:"auto"}})(Ue.a),Ge=Object(M.withStyles)({root:{backgroundColor:"rgba(0,0,0,.03)",borderBottom:"1px solid rgba(0,0,0,.125)",marginBottom:-1,minHeight:56,"&$expanded":{minHeight:56}},content:{"&$expanded":{margin:"12px 0"}},expanded:{}})(function(e){return i.a.createElement(ze.a,e)});Ge.muiName="ExpansionPanelSummary";var Je=Object(M.withStyles)(function(e){return{root:{padding:2*e.spacing.unit}}})(We.a),Xe=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={price:0},a.props=e,a.onClickHandler=a.onClickHandler.bind(Object(h.a)(Object(h.a)(a))),a.pushToFirebase=a.pushToFirebase.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"pushToFirebase",value:function(e,t){pe.database().ref(e).push(t)}},{key:"componentDidUpdate",value:function(e,t){if(this.state.price!==t.price){var a=this.props;this.pushToFirebase("books",{title:a.title,author:a.author?a.author:"",isbn10:a.isbn10?a.isbn10:"",isbn13:a.isbn13?a.isbn13:"",snippet:a.snippet?a.snippet:"",thumbnail:a.thumbnail?a.thumbnail:"",price:this.state.price,owner:pe.auth().currentUser.displayName})}}},{key:"onClickHandler",value:function(e){e.preventDefault();var t=document.getElementById("price").value;this.setState({price:t}),document.getElementById("expansion-panel").expanded=!1}},{key:"render",value:function(){var e=this.props.classes,t=this.props;return i.a.createElement(Be.a,{className:e.card},i.a.createElement(Qe,{id:"expansion-panel",square:!0,className:e.expansionPanel},i.a.createElement(Ge,{expandIcon:i.a.createElement(Me.a,null)},i.a.createElement(L.a,{container:!0,spacing:8},i.a.createElement(L.a,{item:!0},i.a.createElement(He.a,{className:e.cover,image:t.thumbnail,title:t.title})),i.a.createElement("div",{className:e.details},i.a.createElement(Te.a,{className:e.content},i.a.createElement(L.a,{item:!0,xs:12},i.a.createElement(q.a,{component:"h5",variant:"h5"},t.title)),i.a.createElement(L.a,{item:!0,xs:12},i.a.createElement(q.a,{variant:"subtitle1",color:"textSecondary"},t.author)),i.a.createElement(L.a,{item:!0,xs:12},i.a.createElement(q.a,{variant:"subtitle2",color:"textSecondary"},t.snippet)),i.a.createElement(L.a,{item:!0,xs:12},i.a.createElement(q.a,{variant:"subtitle2",color:"textSecondary"},"ISBN10: ",t.isbn10)),i.a.createElement(L.a,{item:!0,xs:12},i.a.createElement(q.a,{variant:"subtitle2",color:"textSecondary"},"ISBN13: ",t.isbn13)))))),i.a.createElement(Je,null,i.a.createElement(L.a,{container:!0,spacing:8},i.a.createElement(L.a,{item:!0,xs:3},i.a.createElement(ke.e,{id:"price",label:"Price",className:e.input,placeholder:t.placeholder})),i.a.createElement(L.a,{item:!0,xs:3},i.a.createElement(P.a,{variant:"contained",size:"large",color:"primary",className:e.margin,onClick:this.onClickHandler},"Upload Listing"))))))}}]),t}(n.Component),$e=Object(M.withStyles)(function(e){return{card:{display:"flex"},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto",textAlign:"left"},cover:{width:170,height:280},selectDiv:{display:"inline-block"},expansionPanel:{width:"100%"}}})(Xe),Ve=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={query:"",items:[],loading:!1},a.classes=e,a.search=a.search.bind(Object(h.a)(Object(h.a)(a))),a.handleKeyPress=a.handleKeyPress.bind(Object(h.a)(Object(h.a)(a))),a.handleClick=a.handleClick.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleClick",value:function(e){e.preventDefault(),this.setState({items:[]}),this.search()}},{key:"handleKeyPress",value:function(e){console.log(e.key),"Enter"===e.key&&this.handleClick(e),this.setState({query:e.target.value.replace(/ /g,"").toLowerCase()})}},{key:"search",value:function(){var e=this,t="https://www.googleapis.com/books/v1/volumes?max-results=10&q=name:"+this.state.query+"&key=AIzaSyCalcsBPPiKqeweUkLttnlCX763LRP9jJ8";this.setState({loading:!0}),fetch(t,{method:"GET"}).then(function(e){return e.json()}).then(function(t){var a=t.items;for(var n in a){var i=a[n],r={id:i.id,title:i.volumeInfo.title,author:i.volumeInfo.authors?i.volumeInfo.authors[0]:"",thumbnail:i.volumeInfo.imageLinks?i.volumeInfo.imageLinks.thumbnail:"",isbn13:i.volumeInfo.industryIdentifiers&&i.volumeInfo.industryIdentifiers[0]?i.volumeInfo.industryIdentifiers[0].identifier:"",isbn10:i.volumeInfo.industryIdentifiers&&i.volumeInfo.industryIdentifiers[1]?i.volumeInfo.industryIdentifiers[1].identifier:"",snippet:i.searchInfo?i.searchInfo.textSnippet:""};e.setState({items:[].concat(Object(_.a)(e.state.items),[r]),loading:!1})}}),console.log(this.state.items)}},{key:"render",value:function(){var e=this,t=this.state.items;return i.a.createElement("div",null,i.a.createElement(ke.d,{className:this.classes.container},i.a.createElement(ke.f,{variant:"h2",style:{padding:"20px 20px",textAlign:"left"}},"Choose a book"),i.a.createElement(ke.b,null),i.a.createElement(ke.c,{container:!0,spacing:8,direction:"column",alignItems:"center",style:{minHeight:"50vh"}},i.a.createElement(ke.c,{item:!0,xs:11},i.a.createElement("div",{className:this.classes.margin},i.a.createElement(ye,{id:"book-query",label:"Book lookup",className:this.classes.textField,onKeyUp:function(t){return e.handleKeyPress(t)},onClick:function(t){return e.handleClick(t)},margin:"normal",placeholder:"Enter a book title"})),i.a.createElement("div",{className:"container"},i.a.createElement(ke.c,{container:!0,spacing:8},t.map(function(e,t){return i.a.createElement(ke.c,{item:!0,xs:12,className:"gridItem"},i.a.createElement($e,{title:e.title,author:e.author,thumbnail:e.thumbnail,isbn10:e.isbn10,isbn13:e.isbn13}))})))))))}}]),t}(n.Component),_e=Object(M.withStyles)(function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{align:"left",marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200},dense:{marginTop:19},menu:{width:200},margin:{margin:e.spacing.unit,align:"down"},gridItem:{height:"100%",display:"inline-block"}}})(Ve),Ye=[{path:"/home",name:"Home",icon:G.a,component:je},{path:"/new",name:"Add Listing",icon:V.a,component:_e},{path:"/account-detail",name:"Account Detail",icon:X.a,component:Se}],Ze=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(ke.f,{variant:"h1"},"Page not found!"))}}]),t}(n.Component),et=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleDrawerToggle=function(){a.setState(function(e){return{mobileOpen:!e.mobileOpen}})},a.state={mobileOpen:!1,isSignedIn:!1},a.handleDrawerToggle=a.handleDrawerToggle.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;pe.auth().onAuthStateChanged(function(t){e.setState({isSignedIn:!!t})})}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.theme,n=i.a.createElement("div",null,i.a.createElement("div",{className:t.toolbar}),i.a.createElement(I.a,null,Ye.map(function(e,t){return i.a.createElement(N.a,{button:!0,key:e.name,component:T.a,to:e.path},i.a.createElement(e.icon,null),i.a.createElement(A.a,{primary:e.name}))})),i.a.createElement(v.a,null));return i.a.createElement("div",{className:t.root},i.a.createElement(g.a,null),i.a.createElement(b.a,{position:"fixed",className:t.appBar},i.a.createElement(R.a,null,i.a.createElement(L.a,{container:!0,justify:"space-between"},i.a.createElement(L.a,{item:!0},i.a.createElement(x.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerToggle,className:t.menuButton},i.a.createElement(K.a,null)),i.a.createElement(q.a,{variant:"h6",color:"inherit",noWrap:!0},"Augie Book Market")),this.state.isSignedIn?i.a.createElement(L.a,{item:!0},i.a.createElement(L.a,{container:!0,style:{display:"flex"},spacing:8},i.a.createElement(L.a,{item:!0},i.a.createElement(q.a,{variant:"h6",color:"inherit",noWrap:!0},"Hi"," ",pe.auth().currentUser?pe.auth().currentUser.displayName:"","!")),i.a.createElement(L.a,{item:!0},i.a.createElement(P.a,{variant:"contained",color:"secondary"},"Log Out")))):i.a.createElement(L.a,{item:!0},i.a.createElement(P.a,{variant:"contained",color:"secondary"},"Sign In"))))),i.a.createElement("nav",{className:t.drawer},i.a.createElement(j.a,{smUp:!0,implementation:"css"},i.a.createElement(k.a,{container:this.props.container,variant:"temporary",anchor:"rtl"===a.direction?"right":"left",open:this.state.mobileOpen,onClose:this.handleDrawerToggle,classes:{paper:t.drawerPaper}},n)),i.a.createElement(j.a,{xsDown:!0,implementation:"css"},i.a.createElement(k.a,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},n))),i.a.createElement("main",{className:t.content},i.a.createElement("div",{className:t.toolbar}),i.a.createElement(F.d,null,Ye.map(function(e,t){return i.a.createElement(F.b,{key:t,path:e.path,component:e.component})}),i.a.createElement(F.b,{to:"/not-found",component:Ze}))))}}]),t}(i.a.Component),tt=Object(M.withStyles)(function(e){return{root:{display:"flex"},drawer:Object(d.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),appBar:Object(d.a)({marginLeft:240},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(240,"px)")}),menuButton:Object(d.a)({marginRight:20},e.breakpoints.up("sm"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:240},content:{flexGrow:1,padding:3*e.spacing.unit}}},{withTheme:!0})(et),at=a(33),nt=(a(645),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={user:[]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=Object(at.a)();return i.a.createElement("div",{className:"App"},i.a.createElement(F.c,{history:e},i.a.createElement(F.d,null,i.a.createElement(F.a,{exact:!0,from:"/",to:"/home"})),i.a.createElement(tt,null)))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(nt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[323,1,2]]]);
//# sourceMappingURL=main.db7e27ed.chunk.js.map