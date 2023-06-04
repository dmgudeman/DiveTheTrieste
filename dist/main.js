(()=>{"use strict";var t={37:()=>{},30:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.crashSpritesL=e.crashSprites=e.spritesL=e.sprites=void 0,e.sprites=[{x:0,y:0,width:125,height:200},{x:135,y:0,width:135,height:200},{x:280,y:0,width:125,height:200},{x:410,y:0,width:140,height:200}],e.spritesL=[{x:30,y:0,width:125,height:200},{x:165,y:0,width:135,height:200},{x:310,y:0,width:125,height:200},{x:440,y:0,width:140,height:200}],e.crashSprites=[{x:40,y:20,width:200,height:250},{x:240,y:20,width:200,height:250},{x:440,y:20,width:200,height:250},{x:640,y:20,width:200,height:250}],e.crashSpritesL=[{x:100,y:0,width:800,height:1200},{x:900,y:0,width:800,height:1200},{x:1700,y:0,width:800,height:1200},{x:2500,y:0,width:800,height:1200}]},607:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.globalCockpit=e.HEIGHT=e.WIDTH=void 0;var n=s(483),o=i(s(768)),a=i(s(105)),r=i(s(958)),l=s(483),h=i(s(626));e.WIDTH=2*window.innerWidth,e.HEIGHT=2.05*window.innerHeight,e.globalCockpit={cockpit:null},document.addEventListener("DOMContentLoaded",(function(){console.log("WIDTH INDEX.TS",e.WIDTH),console.log("HEIGHT INDEX.TS",e.HEIGHT),localStorage.setItem("modalDisplayed",(!1).toString()),console.log("HEIGHT",e.HEIGHT),console.log("WIDTH",e.WIDTH);var t=document.getElementById("canvas1"),s=document.getElementById("canvas2"),i=document.getElementById("canvas3"),c=document.getElementById("gitHubButton"),d=document.getElementById("linkedInButton"),p=document.getElementById("musicNoteButton"),u=document.getElementById("trieste3Container"),g=document.getElementById("homeButton"),f=t.getContext("2d"),I=s.getContext("2d"),m=i.getContext("2d");t.width=e.WIDTH,t.height=e.HEIGHT,s.width=e.WIDTH,s.height=e.HEIGHT,i.width=e.WIDTH,i.height=e.HEIGHT;var T=a.default.getInstance(f),L=o.default.getInstance(f),_=new r.default({ctx:m,sub:L,ocean:T});e.globalCockpit.cockpit=_;var v=new h.default;c.addEventListener("click",(function(){window.location.href="https://github.com/dmgudeman"})),d.addEventListener("click",(function(){window.location.href="https://www.linkedin.com/in/davidmgudeman/"})),u.addEventListener("click",(function(){(0,n.showCanvas1)()})),g.addEventListener("click",(function(){(0,n.showCanvas2)()}));var E=document.getElementById("modal");window.addEventListener("click",(function(t){t.target===E&&(E.style.display="none")})),p.addEventListener("click",(function(t){}));var y=new Image;y.src="assets/openOcean.png",y.onload=function(){I.drawImage(y,0,0,s.width,s.height),y.style.zIndex="100";var t=new Image;t.src="assets/dtt6.png",t.onload=function(){I.drawImage(t,450,250,600,600)};I.fillStyle="#fff",I.fillRect(450,100,600,150),I.fillStyle="#4CAF50",I.font="bold 50px Arial",I.fillText("DIVE THE TRIESTE!",520,175)};var O=new Image;O.src="assets/instructions.png",O.onload=function(){I.drawImage(O,450,250,600,600),b()},f.canvas.addEventListener("mousedown",(function(e){(0,l.getCursorPosition)(t,e),_.draw(),(0,n.showCanvas3)(),b()}));var C=i.getBoundingClientRect();function b(){f.clearRect(0,0,t.width,t.height),T.draw(),L.draw(),requestAnimationFrame(b)}i.addEventListener("mousedown",(function(t){var e=t.clientX-C.left,s=t.clientY-C.top;e>300&&e<.7*i.width&&s>100&&s<.7*i.height&&_.draw()})),function t(){L.updateSprite(),requestAnimationFrame(t)}(),document.addEventListener("keydown",(function(t){"ArrowDown"===t.key||"Down"===t.key?v.newPos("down"):"ArrowLeft"===t.key||"Left"===t.key?v.newPos("left"):"ArrowRight"===t.key||"Right"===t.key?v.newPos("right"):"ArrowUp"===t.key||"Up"===t.key?v.newPos("up"):"Enter"===t.key?v.navigate("Enter"):"Escape"===t.key&&v.navigate("Escape")}))}))},805:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.pickImageArray=e.showZone=e.showLat=e.showDepth=e.showMouseAsSub=void 0;var n=s(915),o=s(607),a=i(s(105)),r=i(s(768)),l=i(s(456)),h=i(s(294));e.showMouseAsSub=function(t){var e=t.clientX-n.SUB_INITIAL_LAT_POS,s=t.clientY-n.INITIAL_Y_POSITION;console.log("X: "+e+", Y: "+s)},e.showDepth=function(){var t,e=a.default.getInstance(),s=r.default.getInstance(),i=n.SEA_DEPTH/o.HEIGHT,l=Math.abs(e.getY()-s.getY()+n.INITIAL_Y_POSITION);(t=l<500?Math.floor(2*l):Math.floor(i*l))<0&&(t=0);var h=document.getElementById("depth"),c=document.getElementById("IPDepthGauge");return h.innerHTML="Depth: ".concat(t," feet"),c.innerHTML="Depth: ".concat(t," ft"),t},e.showLat=function(){var t,e=a.default.getInstance(),s=r.default.getInstance(),i=new l.default,o=Math.ceil(Math.abs(n.DIST_CA_TO_TRENCH/i.getDistCAtoTrench())),h=Math.abs(e.getX()-s.getX()+n.SUB_INITIAL_LAT_POS);return t=Math.floor(Math.abs(h*o)),h<0&&(t=0),document.getElementById("IPLatGauge").innerHTML="Dist: ".concat(t," mi"),t},e.showZone=function(){var t=new h.default;console.log("zoneObject.id in BOUNDARY",t.upDateZoneObject().id);var e=t.upDateZoneObject().title;return document.getElementById("IPZoneGauge").innerHTML="".concat(e),e},e.pickImageArray=function(t,e,s){var i=t.sx+e.x+e.initialLateralPos,n=(t.sy+e.y+e.initialDepthPos)/s.canvas.height;return i/s.canvas.width<.5?n<.3?0:2:n<.25?1:n<.5?3:n<.75?5:4}},456:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=s(607),n=s(915),o=s(915),a=function(){function t(){var t=this;this.printCalcConstant=function(e,s,i){console.log("=".concat(i,"==============")),console.log("OorS",t.getOorS(e,s)),console.log("depthObjectName",t.getDepthObject(e)),console.log("========================"),console.log("                           ")},this.width=i.WIDTH,this.height=i.HEIGHT,this.textObjects=o.textObjects}return t.prototype.getOceanLatLimit=function(){return this.roundDownToNearestVel(-.45*this.width)},t.prototype.getFullLatLimit=function(){return this.roundDownToNearestVel(-.7*this.width)},t.prototype.getOceanVertLimit=function(){return this.roundDownToNearestVel(-.55*this.height)},t.prototype._getCompLat=function(t,e){return t.getX()-e.getX()+n.SUB_INITIAL_LAT_POS},t.prototype._getCompVert=function(t,e){return t.getY()-e.getY()+n.INITIAL_Y_POSITION},t.prototype._getZone=function(t,e){return t>this.roundDownToNearestVel(-.211*this.height)?t-e>2*o.VERTICAL_VELOCITY?n.EUPHOTIC_PELAGIC:n.EUPHOTIC_BENTHIC:t>this.roundDownToNearestVel(-.45*this.height)?t-e>2*o.VERTICAL_VELOCITY?n.DYSPHOTIC_PELAGIC:n.DYSPHOTIC_BENTHIC:t-e>1*o.VERTICAL_VELOCITY?n.APHOTIC_PELAGIC:n.APHOTIC_BENTHIC},t.prototype.getFullVertLimit=function(){return this.roundDownToNearestVel(-.95*this.height)},t.prototype.getDepthObject=function(t){try{return o.LAT_LIMITS_EXT.filter((function(e){return e.x<=t&&e.xll>=t}))[0]}catch(e){console.error("calcDepth did not work for lat = ",t)}},t.prototype.getDistCAtoTrench=function(){return o.LAT_LIMITS_EXT[10].x},t.prototype.getOorS=function(t,e){return t>=this.getOceanLatLimit()&&e>=this.getOceanVertLimit()?["O","O"]:t<this.getOceanLatLimit()&&e>=this.getOceanVertLimit()?["S","O"]:t>=this.getOceanLatLimit()&&e<this.getOceanVertLimit()?["O","S"]:t<this.getOceanLatLimit()&&e<this.getOceanVertLimit()?["S","S"]:void 0},t.prototype._calcDepthLimit=function(e){var s=(new t).getDepthObject(e);if(!s)return null;var i=s.xll,n=s.x,a=s.yll,r=s.y,l=e;if(0===s.id)return 21;i===n&&(n+=1);var h=(r-a)/(n-i),c=h*l+(a-h*i);return Math.floor(c/o.VERTICAL_VELOCITY)*o.VERTICAL_VELOCITY},t.prototype.roundDownToNearestVel=function(t){return Math.floor(t/o.VERTICAL_VELOCITY)*o.VERTICAL_VELOCITY},t.prototype.getTextObject=function(t){return o.textObjects[t]},t}();e.default=a},958:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(s(17)),o=function(){function t(t){this.ctx=t.ctx,this.canvas=this.ctx.canvas,this.ocean=t.ocean,this.sub=t.sub,this.x=t.x||0,this.y=t.y||0,this.w=t.width||window.innerWidth,this.h=t.height||window.innerHeight,this.cockpitImage=t.cockpitImage||document.getElementById("cockpit"),this.cockpitImageUrl=t.cockpitImageUrl||"assets/cockpit.png",this.imageUrls=t.imageUrls,this.underImageUrl=t.underImageUrl||"assets/life/ep/001_shark.jpg"}return t.prototype.draw=function(){var t=this,e=new Image,s=new n.default({ctx:this.ctx,sub:this.sub,ocean:this.ocean});e.src=s.pickRandomImage(),e.onload=function(){t.ctx.drawImage(e,.2*t.w,0,.7*t.w,.81*t.h);var s=new Image;s.src=t.cockpitImageUrl,s.onload=function(){t.ctx.drawImage(s,t.x,t.y,t.w,t.h),s.style.zIndex="55"}}},t}();e.default=o},915:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.LAT_LIMIT_06_1100_200=e.LAT_LIMIT_05_1000_200=e.LAT_LIMIT_04_860_500=e.LAT_LIMIT_03_720_380=e.LAT_LIMIT_02_620_480=e.LAT_LIMIT_01_220_420=e.LAT_LIMIT_00_0_0=e.APHOTIC_BENTHIC=e.APHOTIC_PELAGIC=e.DYSPHOTIC_BENTHIC=e.DYSPHOTIC_PELAGIC=e.EUPHOTIC_BENTHIC=e.EUPHOTIC_PELAGIC=e.STOP_SUB_VERTICAL=e.STOP_OCEAN_VERTICAL=e.STOP_SUB_LAT=e.STOP_OCEAN_LAT=e.SUB_INITIAL_LAT_POS=e.INITIAL_Y_POSITION=e.FULL_VERTICAL_LIMIT=e.FULL_LAT_LIMIT=e.OCEAN_LAT_LIMIT=e.OCEAN_DEPTH_LIMIT=e.APHOTIC_BENTHIC_BARRIER=e.D_A_BARRIER=e.E_D_BARRIER=e.CONT_SHELF_BENTHIC=e.B_P_BARRIER=e.RIGHT_EDGE_TRENCH=e.LEFT_EDGE_TRENCH=e.TRENCH_DEPTH=e.TRENCH_TOP=e.SHELF_DEPTH=e.SLOPE_DEPTH=e.SLOPE_LAT=e.INITIAL_DEPTH=e.INITIAL_LAT=e.VERTICAL_VELOCITY=e.LAT_VELOCITY=e.DIST_CA_TO_TRENCH=e.OCEAN_FLOOR=e.OCEAN_BOTTOM=e.SEA_DEPTH=e.DEPTH_CONT_SHELF=e.SURFACE=e.setHitBottomFlag=e.getHitBottomFlag=e.setCurrentCanvas=e.getCurrentCanvas=e.stopMessageAnimation=void 0,e.textObjects=e.LAT_LIMITS_EXT=e.LAT_LIMIT_08_1280_480=e.LAT_LIMIT_07_1200_460=void 0;var i=s(607);e.stopMessageAnimation={messFlag:!0};var n=2;e.getCurrentCanvas=function(){return n},e.setCurrentCanvas=function(t){1===t||2===t||3===t?n=t:console.error("Invalid canvas value. Please provide a value of 1, 2, or 3.")};var o=!1;e.getHitBottomFlag=function(){return o},e.setHitBottomFlag=function(t){o=t},e.SURFACE=100,e.DEPTH_CONT_SHELF=450,e.SEA_DEPTH=36161,e.OCEAN_BOTTOM=1560,e.OCEAN_FLOOR=1560,e.DIST_CA_TO_TRENCH=6e3,e.LAT_VELOCITY=20,e.VERTICAL_VELOCITY=20,e.INITIAL_LAT=80,e.INITIAL_DEPTH=25,e.SLOPE_LAT=190,e.SLOPE_DEPTH=300,e.SHELF_DEPTH=e.DEPTH_CONT_SHELF,e.TRENCH_TOP=500,e.TRENCH_DEPTH=e.OCEAN_BOTTOM,e.LEFT_EDGE_TRENCH=1400,e.RIGHT_EDGE_TRENCH=1800,e.B_P_BARRIER=200,e.CONT_SHELF_BENTHIC=e.DEPTH_CONT_SHELF-150,e.E_D_BARRIER=e.SURFACE+200,e.D_A_BARRIER=e.SURFACE+500,e.APHOTIC_BENTHIC_BARRIER=e.OCEAN_BOTTOM-400,e.OCEAN_DEPTH_LIMIT=820,e.OCEAN_LAT_LIMIT=null,e.FULL_LAT_LIMIT=-2200,e.FULL_VERTICAL_LIMIT=i.HEIGHT+100,e.INITIAL_Y_POSITION=80,e.SUB_INITIAL_LAT_POS=800,e.STOP_OCEAN_LAT="stop_ocean_lateral",e.STOP_SUB_LAT="stop_sub_lateral",e.STOP_OCEAN_VERTICAL="stop_ocean_vertical",e.STOP_SUB_VERTICAL="stop_sub_vertical",e.EUPHOTIC_PELAGIC=0,e.EUPHOTIC_BENTHIC=1,e.DYSPHOTIC_PELAGIC=2,e.DYSPHOTIC_BENTHIC=3,e.APHOTIC_PELAGIC=4,e.APHOTIC_BENTHIC=5,e.LAT_LIMIT_00_0_0=[0,0],e.LAT_LIMIT_01_220_420=[220,380],e.LAT_LIMIT_02_620_480=[620,420],e.LAT_LIMIT_03_720_380=[720,260],e.LAT_LIMIT_04_860_500=[860,460],e.LAT_LIMIT_05_1000_200=[1e3,160],e.LAT_LIMIT_06_1100_200=[1100,160],e.LAT_LIMIT_07_1200_460=[1200,420],e.LAT_LIMIT_08_1280_480=[1400,440],e.LAT_LIMITS_EXT=[{id:0,name:"INITIAL_POSITION",x:-0,xll:-0,y:-0,yll:-0,mvmtLat:"right"},{id:1,name:"SLOPE_LIMIT",x:-180,xll:-1,y:-400,yll:-1,mvmtLat:"right"},{id:2,name:"START_BUMP",x:-630,xll:-181,y:-475,yll:-401,mvmtLat:"left"},{id:3,name:"BUMP_PEAK",x:-720,xll:-631,y:-380,yll:-476,mvmtLat:"both"},{id:4,name:"END_BUMP",x:-800,xll:-721,y:-485,yll:-381,mvmtLat:"right"},{id:5,name:"START_DBL",x:-840,xll:-801,y:-460,yll:-486,mvmtLat:"right"},{id:6,name:"DBL_PEAK_1",x:-980,xll:-841,y:-200,yll:-461,mvmtLat:"left"},{id:7,name:"DBL_PEAK_2",x:-1120,xll:-981,y:-240,yll:-199,mvmtLat:"both"},{id:8,name:"END_DBL",x:-1180,xll:-1121,y:-450,yll:-239,mvmtLat:"right"},{id:9,name:"START_TRENCH",x:-1320,xll:-1181,y:-500,yll:-451,mvmtLat:"right"},{id:10,name:"TRENCH_BOTTOM_L",x:-1520,xll:-1321,y:-1560,yll:-501,mvmtLat:"right"},{id:11,name:"TRENCH_BOTTOM_R",x:-1640,xll:-1521,y:-1560,yll:-501,mvmtLat:"both"},{id:12,name:"END_TRENCH",x:-1740,xll:-1641,y:-480,yll:-1561,mvmtLat:"left"},{id:13,name:"END_POSITION",x:-2200,xll:-1741,y:-485,yll:-481,mvmtLat:"left"},{id:14,name:"OOB_RIGHT",x:-i.WIDTH,xll:-2201,y:-485,yll:-486,mvmtLat:"left"}],e.textObjects=[{id:e.EUPHOTIC_PELAGIC,title:"EUPHOTIC PELAGIC",text:"The uppermost layer of the open ocean sunlight can penetrate allowing photosynthesis to occur. Flora consists of phytoplankton, microscopic plant-like organisms that harness sunlight. These microscopic plants serve as the foundation of the marine food web, providing nourishment for a wide range of organisms. They contribute significantly to global oxygen production and carbon dioxide absorption, playing a vital role in regulating the Earth's climate. Fauna includes zooplankton, small fish, squid, and jellyfish. Many species undertake vertical migrations, moving closer to the surface during the night to feed on phytoplankton and descending to deeper depths during the day to avoid predators. Larger marine animals, such as whales and dolphins, often rely on the abundant food resources found in the euphotic pelagic zone.Commercial fisheries, providing a substantial portion of the world's seafood supply. It claims a major role in carbon sequestration balancing global ecosystem. "},{id:e.EUPHOTIC_BENTHIC,title:"EUPHOTIC BENTHIC",text:"The euphotic benthic zone is a crucial region in the ocean where sunlight reaches, allowing for photosynthesis. It extends from the ocean surface to around 200 meters deep, supporting diverse flora and fauna. Marine algae, seagrasses, and phytoplankton thrive in this zone, providing oxygen and serving as the foundation of the food web. Zooplankton, corals, and other invertebrates inhabit the benthic habitats, offering food and shelter to various species. Geographically, the euphotic benthic zone is prevalent in coastal areas, influencing adjacent ecosystems like coral reefs and seagrass meadows. It plays a vital role in carbon cycling, nutrient dynamics, and maintaining marine biodiversity. Preserving this zone is crucial for sustaining ocean health and the intricate balance of marine ecosystems."},{id:e.DYSPHOTIC_PELAGIC,title:"DYPHOTIC PELAGIC",text:"Here the flora is primarily phytoplankton and zooplankton and some diatoms. The fauna is fish include the lanternfish, hatchetfish, and dragonfishs. These fish have evolved large eyes and bioluminescent organs, to navigate and communicate in the dimly lit environment. Cephalopods, shrimp, and jellyfish, are also found in this zone, all adapted to low light. It serves as a crucial feeding ground for migratory species, including whales and large predatory fish, as they follow the vertical migration of zooplankton from the depths to the surface. Dead matter drifts down from the euphotic zone sustains sustaining a complex food web. Understanding the dysphotic pelagic zone is essential for comprehending the dynamics of the global carbon cycle. The zone plays a crucial role in the sequestration of carbon dioxide through the biological pump, where carbon is transported from the surface to the deep ocean through sinking particles. This process helps regulate atmospheric carbon levels and mitigates climate change."},{id:e.DYSPHOTIC_BENTHIC,title:"DYSPHOTIC BENTHIC",text:"Here sunlight barely penetrates and darkness prevails. The flora is algae, fungi, and bacteria that have adapted to obtain energy through CHEMOSYNTHESIS or by consuming organic matter settling from above.The fauna includes deep-sea fish, sea cucumbers, sea stars, sea anemones, corals, sponges, and crustaceans. Here is a refuge for numerous species that seek shelter from predators in shallower zones. It is important for nutrient recycling and maintaining the balance of carbon. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs), are employed to investigate this zone."},{id:e.APHOTIC_PELAGIC,title:"APHOTIC PELAGIC",text:"In the absence of sunlight, this zone has low temperatures, high pressure, and limited nutrient availability. Despite these challenges, the zone is not devoid of life. Unique and highly adapted organisms inhabit this realm, relying on alternative energy sources and survival strategies. In this zone, the primary producers are CHEMOSYNTHETIC bacteria that derive energy from inorganic compounds, such as hydrogen sulfide or methane. These bacteria serve as the foundation of the food chain, supporting a variety of organisms that are adapted to survive in extreme conditions. Deep-sea fish, cephalopods, and other invertebrates, some with bioluminescent abilities, are found here.The aphotic pelagic zone plays a significant role in the cycling of organic matteand the global carbon cycle. Organic particles, called marine snow, sink from the surface waters providing sustenance. The marine snow transports carbon from the surface to the deep ocean, sequestering it for long periods and influencing the planet's carbon balance."},{id:e.APHOTIC_BENTHIC,title:"APHOTIC BENTHIC",text:"There is no light. It is usually just above freezing and over 1000 times the pressure of the atmosphere. Most of this zone is nutrient poor however there is also the remarkable  presence of deep-sea vents. These hydrothermal vents are geological formations that spew forth mineral-rich, superheated water into the surrounding environment. They create a haven for unique ecosystems, sustained, again, not by sunlight but by chemosynthesis. Bacteria and other organisms near these vents convert chemicals, such as hydrogen sulfide, into energy, forming the basis of a food chain that supports a variety of organisms, including tube worms, clams, and unique species found nowhere else on Earth."}]},349:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=s(915),o=i(s(456)),a=function(){function t(){this.cssOne=["upperPelagic","upper","middle","middle","lower","lower"],this.edContainer=document.getElementById("edContainer")||null,this.edTitle=document.getElementById("edTitle")||null,this.edText=document.getElementById("edText")||null,this.textEls=[this.edContainer,this.edTitle,this.edText],this.textElStrings=["edContainer","edTitle","edText"],this.textElSuffixes=["EdContainer","EdTitle","EdText"],this.textElTypes=["id","title","text"],this.textObjects=n.textObjects,this.calcConstants=new o.default}return t.prototype.updateEdText=function(t,e){this.setEdStyle(t,e),this.setEdText(t)},t.prototype.setEdStyle=function(t,e){var s=this;this.clearAllEdElementsClassList(),this.textEls.length<1||(1===e?this.textEls.forEach((function(e,i){var n=s.textElStrings[i],o=s.cssOne[t]+"Style"+s.textElSuffixes[i];e&&e.classList.add(n),e&&e.classList.add(o)})):3===e&&(this.edContainer.classList.add("cockpitStyleEdContainer"),this.edTitle.classList.add("edTitle"),this.edTitle.classList.add("cockpitStyleEdTitle"),this.edText.classList.add("edText"),this.edText.classList.add("cockpitStyleEdText")))},t.prototype.initialEdSetup=function(){this.updateEdText(1,1)},t.prototype.setEdText=function(t){var e=this.calcConstants.getTextObject(t);this.edTitle&&(this.edTitle.textContent=e.title),this.edText&&(this.edText.textContent=e.text)},t.prototype.clearOneEdElementClassList=function(t){if(t)for(;t.classList.length>0;)t.classList.remove(t.classList.item(0))},t.prototype.clearAllEdElementsClassList=function(){var t=this;this.textEls.forEach((function(e){t.clearOneEdElementClassList(e)}))},t}();e.default=a},17:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(s(294)),o=function(){function t(t){this.ep=["./assets/life/ep/001.jpg","./assets/life/ep/002.jpeg","./assets/life/ep/003.jpeg","./assets/life/ep/004.jpeg","./assets/life/ep/005.webp","./assets/life/ep/006.jpeg","./assets/life/ep/007.jpeg","./assets/life/ep/008.jpeg","./assets/life/ep/009.jpeg","./assets/life/ep/010.jpeg","./assets/life/ep/011.jpg","./assets/life/ep/012.webp","./assets/life/ep/013.jpeg","./assets/life/ep/014.jpeg"],this.eb=["./assets/life/eb/001.jpeg","./assets/life/eb/002.jpeg","./assets/life/eb/003.jpeg","./assets/life/eb/004.jpeg","./assets/life/eb/005.jpeg","./assets/life/eb/006.jpeg","./assets/life/eb/007.jpeg","./assets/life/eb/008.jpeg","./assets/life/eb/009.jpeg","./assets/life/eb/010.jpeg","./assets/life/eb/011.jpeg","./assets/life/eb/012.jpeg","./assets/life/eb/013.webp","./assets/life/eb/014.jpeg"],this.dp=["./assets/life/dp/001.jpeg","./assets/life/dp/002.jpeg","./assets/life/dp/003.jpg","./assets/life/dp/004.jpeg","./assets/life/dp/005.jpeg","./assets/life/dp/006.jpeg","./assets/life/dp/007.jpeg","./assets/life/dp/008.jpeg","./assets/life/dp/009.png","./assets/life/dp/010.webp","./assets/life/dp/011.jpeg","./assets/life/dp/012.jpeg","./assets/life/dp/013.webp","./assets/life/dp/014.jpeg"],this.db=["./assets/life/db/001.png","./assets/life/db/002.jpeg","./assets/life/db/003.jpeg","./assets/life/db/004.jpeg","./assets/life/db/005.webp","./assets/life/db/006.webp","./assets/life/db/007.webp","./assets/life/db/008.webp","./assets/life/db/009.webp","./assets/life/db/010.jpeg","./assets/life/db/011.jpeg","./assets/life/db/012.webp","./assets/life/db/013.jpeg","./assets/life/db/014.jpeg"],this.ap=["./assets/life/ap/001.jpeg","./assets/life/ap/002.jpeg","./assets/life/ap/003.jpg","./assets/life/ap/004.jpeg","./assets/life/ap/005.webp","./assets/life/ap/006.jpeg","./assets/life/ap/007.jpeg","./assets/life/ap/008.jpeg","./assets/life/ap/009.jpeg","./assets/life/ap/010.jpeg","./assets/life/ap/011.webp","./assets/life/ap/012.jpeg","./assets/life/ap/013.jpeg","./assets/life/ap/014.jpeg","./assets/life/ap/015.jpeg","./assets/life/ap/016.jpeg"],this.ab=["./assets/life/ab/001.jpeg","./assets/life/ab/002.jpeg","./assets/life/ab/003.png","./assets/life/ab/004.jpeg","./assets/life/ab/005.jpeg","./assets/life/ab/006.jpeg","./assets/life/ab/007.jpeg","./assets/life/ab/008.jpeg","./assets/life/ab/009.webp","./assets/life/ab/010.jpeg","./assets/life/ab/011.jpeg","./assets/life/ab/012.jpeg","./assets/life/ab/013.jpeg","./assets/life/ab/014.jpeg"],this.ctx=t.ctx,this.ocean=t.ocean,this.sub=t.sub,this.images=[this.ep,this.eb,this.dp,this.db,this.ap,this.ab]}return t.prototype.pickRandomImage=function(){var t=(new n.default).upDateZoneObject().id,e=this.images[t];return e[Math.floor(Math.random()*e.length)]},t}();e.default=o},626:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(s(217)),o=s(915),a=s(483),r=i(s(105)),l=i(s(768)),h=i(s(294)),c=s(805),d=function(){function t(t){var e=this;this.closeModal=function(){window.addEventListener("click",(function(t){t.target===e.modal&&(e.modal.style.display="none",localStorage.setItem("modalDisplayed","true"))}))},this.dir=t,this.ocean=r.default.getInstance(),this.sub=l.default.getInstance(),this.modal=document.getElementById("modal"),this.move=new n.default(this.ocean,this.sub)}return t.prototype.navigate=function(t){var e=(0,o.getCurrentCanvas)();if("false"===localStorage.modalDisplayed&&this.addModalEventListener(t),"Enter"===t)switch(e){case 1:(0,a.showCanvas3)();break;case 2:case 3:(0,a.showCanvas1)();break;default:return}else if("Escape"===t)switch(e){case 1:case 3:(0,a.showCanvas2)();break;case 2:(0,a.showCanvas1)();break;default:return}},t.prototype.newPos=function(t){var e=new h.default;(0,c.showLat)(),(0,c.showDepth)(),(0,c.showZone)(),e.upDateZoneObject(),this.move.getMove(t),"left"!==t&&"right"!==t||this.sub.setLastLatDir(t)},t.prototype.addModalEventListener=function(t){var e=this;this.modal.style.display="block",localStorage.setItem("modalDisplayed","true"),this.modal.addEventListener("click",(function(){e.navigate(t),e.modal.style.display="none"}))},t}();e.default=d},217:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=s(915),o=i(s(456)),a=i(s(349)),r=i(s(294)),l=s(915),h=function(){function t(t,e,s){var i,h,c,d,p,u=this;this.getMove=function(t){var e=new r.default;u.setDir(t),u.upDateCoordinates(),u.checkToIncreaseVel(t),u.compVert<=u.varDepth?((0,l.setHitBottomFlag)(!0),u.configureHitBottomMove(t)):((0,l.setHitBottomFlag)(!1),u.getLatMove()),u.getVerticalMove();var s=e.upDateZoneObject().id,i=(0,l.getCurrentCanvas)();u.edText.updateEdText(s,i)},this.clearHitBottom=function(){document.getElementById("hitBottomContainer").classList.add("hide")},this.resetVelocities=function(){u.ocean.zeroVelRight(),u.ocean.zeroVelLeft(),u.ocean.zeroVelUp(),u.ocean.zeroVelDown(),u.sub.zeroVelRight(),u.sub.zeroVelLeft(),u.sub.zeroVelUp(),u.sub.zeroVelDown()},this.configureHitBottomMove=function(t){console.log("XXXXXXXXXXX)))))))))))))))))))))))");var e=u.depthObject.mvmtLat;"O"===u.OorS[1]?"right"===t?"right"!==e&&"both"!==e||u.moveOceanRight(u.latVel):"left"===t&&("left"!==e&&"both"!==e||u.moveOceanLeft(u.latVel)):"S"===u.OorS[1]&&(console.log(" IN SUB SECTION"),"right"===t?(console.log("    IN MOVE RIGHT"),"right"!==e&&"both"!==e||u.moveSubRight()):"left"===t&&(console.log("     IN MOVE LEFT"),"left"!==e&&"both"!==e||u.moveSubLeft()))},this.printCoordinates=function(t){console.log("=".concat(t,"==============")),console.log("OorS",u.OorS),console.log("COMP LAT VERT",u.compLat,u.compVert),console.log("OCEAN VERT LIMIT",u.oceanVertLimit),console.log("OCEAN LAT LIMIT",u.oceanLatLimit),console.log("VARDEPTH",Math.floor(u.varDepth)),console.log("OCEAN X, Y",u.ocean.getX(),u.ocean.getY()),console.log("SUB X, Y",u.sub.getX(),u.sub.getY()),console.log("depthObjectName",u.depthObject.name),console.log("========================"),console.log("                           ")},this.printStandard=function(t){console.log("".concat(t)),console.log("COMPLAT",u.compLat),console.log("COMPVERT",u.compVert),console.log("OCEAN Y",u.ocean.getY()),console.log("SUB Y",u.sub.getY()),console.log("VARIABLE DEPTH",u.varDepth),console.log("depthObjectName",u.depthObject.name),console.log("==============")},this.moveOceanRight=function(t){u.ocean.setX(u.ocean.getX()-t)},this.moveOceanLeft=function(t){u.ocean.setX(u.ocean.getX()+t)},this.moveSubRight=function(){u.sub.setX(u.sub.getX()+n.LAT_VELOCITY)},this.moveSubLeft=function(){u.sub.setX(u.sub.getX()-n.LAT_VELOCITY)},this.moveOceanUp=function(t){u.ocean.setY(u.ocean.getY()+t)},this.moveOceanDown=function(t){u.ocean.setY(u.ocean.getY()-t)},this.moveSubUp=function(){u.sub.setY(u.sub.getY()-n.VERTICAL_VELOCITY)},this.moveSubDown=function(){u.sub.setY(u.sub.getY()+n.VERTICAL_VELOCITY)},this.ocean=t,this.sub=e,this.dir=s||null,this.constants=new o.default||null,this.oceanLatLimit=null!==(i=this.constants.getOceanLatLimit())&&void 0!==i?i:null,this.oceanVertLimit=null!==(h=this.constants.getOceanVertLimit())&&void 0!==h?h:null,this.fullLatLimit=null!==(c=this.constants.getFullLatLimit())&&void 0!==c?c:null,this.compLat=null!==(d=this.ocean.getX()-this.sub.getX()+n.SUB_INITIAL_LAT_POS)&&void 0!==d?d:null,this.compVert=null!==(p=this.ocean.getY()-this.sub.getY()+n.INITIAL_Y_POSITION)&&void 0!==p?p:null,this.depthObject=this.constants.getDepthObject(this.compLat)||null,this.varDepth=this.constants._calcDepthLimit(this.compLat)||null,this.OorS=this.constants.getOorS(this.compLat,this.compVert)||null,this.increaseVelFlag="",this.latVel=n.LAT_VELOCITY,this.vertVel=n.VERTICAL_VELOCITY,this.edText=new a.default}return t.prototype.upDateCoordinates=function(){this.compLat=this.ocean.getX()-this.sub.getX()+n.SUB_INITIAL_LAT_POS,this.compVert=this.ocean.getY()-this.sub.getY()+n.INITIAL_Y_POSITION,this.oceanLatLimit=this.constants.getOceanLatLimit(),this.oceanVertLimit=this.constants.getOceanVertLimit(),this.fullLatLimit=this.constants.getFullLatLimit(),this.depthObject=this.constants.getDepthObject(this.compLat),this.varDepth=this.constants._calcDepthLimit(this.compLat),this.OorS=this.constants.getOorS(this.compLat,this.compVert)},t.prototype.getLatMove=function(){console.log("xxxxxxxxxxxxxx"),"O"==this.OorS[0]?(this.sub.setX(this.sub.getInitialLatPos()),this.compLat>0?this.moveOceanRight(this.latVel):this.compLat>-n.LAT_VELOCITY?"right"===this.dir&&this.moveOceanRight(this.latVel):this.compLat>=this.oceanLatLimit&&("right"===this.dir?this.moveOceanRight(this.latVel):"left"===this.dir&&this.moveOceanLeft(this.latVel))):"S"==this.OorS[0]&&(this.compLat>this.fullLatLimit?"right"===this.dir?this.moveSubRight():"left"===this.dir&&this.moveSubLeft():this.compLat<=this.fullLatLimit&&"left"===this.dir&&this.moveSubLeft())},t.prototype.getVerticalMove=function(){"O"==this.OorS[1]?(this.sub.setY(this.sub.getInitialVertPos()),this.compVert>0?this.moveOceanDown(this.vertVel):this.compVert>-n.VERTICAL_VELOCITY?"down"===this.dir&&this.moveOceanDown(this.vertVel):this.compVert>this.varDepth?"down"===this.dir?this.moveOceanDown(this.vertVel):"up"===this.dir&&this.moveOceanUp(this.vertVel):this.compVert<=this.varDepth+n.VERTICAL_VELOCITY&&"up"===this.dir&&this.moveOceanUp(this.vertVel)):(this.OorS[1]="S")&&(console.log("000000000"),this.compVert>this.oceanVertLimit+n.VERTICAL_VELOCITY?(console.log("this.varDepth + VERTICAL_VELOCITY ",this.varDepth+n.VERTICAL_VELOCITY),"down"===this.dir&&this.moveSubDown()):this.compVert>=this.varDepth?"down"===this.dir?(console.log("3333333"),this.moveSubDown()):"up"===this.dir&&(console.log("44444444"),this.moveSubUp()):this.compVert<this.varDepth+n.VERTICAL_VELOCITY&&"up"===this.dir&&(console.log("5555555"),this.moveSubUp()))},t.prototype.setDir=function(t){this.dir=t},t.prototype.checkToIncreaseVel=function(t){this.increaseVelFlag===t?("right"!==t&&"left"!==t||(this.latVel=2*n.LAT_VELOCITY),"up"!==t&&"down"!==t||(this.vertVel=2*n.VERTICAL_VELOCITY)):(this.latVel=n.LAT_VELOCITY,this.vertVel=n.VERTICAL_VELOCITY)},t}();e.default=h},105:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=s(607),n=s(915),o=function(){function t(t,e,s,n,o,a,r,l,h,c){this.ctx=t,this.x=e||0,this.y=s||0,this.width=n||i.WIDTH,this.height=o||i.HEIGHT,this.oceanImage=a||document.getElementById("crossSection"),this.velRight=r||0,this.velLeft=l||0,this.velUp=h||0,this.velDown=c||0}return t.getInstance=function(e,s,i,n,o,a,r,l,h,c){if(!t.instance){if(!e)throw new Error("A context must be provided when creating a new instance.");t.instance=new t(e,s,i,n,o,a,r,l,h,c)}return t.instance},t.prototype.draw=function(){this.ctx.drawImage(this.oceanImage,this.x,this.y,this.width,this.height)},t.prototype.getX=function(){return this.x},t.prototype.setX=function(t){this.x=t},t.prototype.getY=function(){return this.y},t.prototype.setY=function(t){this.y=t},t.prototype.getVelRight=function(){return this.velRight},t.prototype.setVelRight=function(){this.velRight=n.LAT_VELOCITY},t.prototype.getVelLeft=function(){return this.velLeft},t.prototype.setVelLeft=function(){this.velLeft=n.LAT_VELOCITY},t.prototype.getVelUp=function(){return this.velUp},t.prototype.setVelUp=function(){this.velUp=n.VERTICAL_VELOCITY},t.prototype.getVelDown=function(){return this.velDown},t.prototype.setVelDown=function(){this.velDown=n.VERTICAL_VELOCITY},t.prototype.setVelDownReg=function(t){this.velDown=t},t.prototype.zeroVelRight=function(){this.velRight=0},t.prototype.zeroVelLeft=function(){this.velLeft=0},t.prototype.zeroVelUp=function(){this.velUp=0},t.prototype.zeroVelDown=function(){this.velDown=0},t}();e.default=o},768:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=s(915),n=s(607),o=s(30),a=function(){function t(t,e,s,n,o,a,r,l,h,c,d,p,u){this.ctx=t,this.x=e||i.SUB_INITIAL_LAT_POS,this.y=s||i.INITIAL_Y_POSITION,this.w=n||120,this.h=o||120,this.velRight=a||0,this.velLeft=r||0,this.velUp=l||0,this.velDown=h||0,this.spritesImageSrc=c||"assets/sprites/sprite.png",this.sprites=d,this.currentFrame=p||0,this.lastFrameTime=u||0,this.initialLatPos=i.SUB_INITIAL_LAT_POS,this.initialVertPos=i.INITIAL_Y_POSITION,this.updateSprite=this.updateSprite.bind(this),this.lastLatDir="right",this.spriteSheet=new Image,this.spriteSheet.src=this.spritesImageSrc}return t.getInstance=function(e,s,n,a,r,l,h,c,d,p,u,g,f,I,m){if(void 0===s&&(s=i.SUB_INITIAL_LAT_POS),void 0===n&&(n=0),void 0===a&&(a=120),void 0===r&&(r=120),void 0===l&&(l=0),void 0===h&&(h=0),void 0===c&&(c=0),void 0===d&&(d=0),void 0===p&&(p="assets/sprites/sprite.png"),void 0===u&&(u=0),void 0===g&&(g=0),void 0===f&&(f="right"),void 0===I&&(I=i.SUB_INITIAL_LAT_POS),void 0===m&&(m=i.INITIAL_Y_POSITION),!t.instance){if(!e)throw new Error("A context must be provided when creating a new instance.");t.instance=new t(e,s,n,a,r,l,h,c,d,p,o.sprites,u,g)}return t.instance},t.prototype.getX=function(){return this.x},t.prototype.setX=function(t){this.x=t},t.prototype.getY=function(){return this.y},t.prototype.setY=function(t){this.y=t},t.prototype.getW=function(){return this.w},t.prototype.getH=function(){return this.h},t.prototype.getVelRight=function(){return this.velRight},t.prototype.setVelRight=function(){this.velRight=i.LAT_VELOCITY},t.prototype.getVelLeft=function(){return this.velLeft},t.prototype.setVelLeft=function(){this.velLeft=i.LAT_VELOCITY},t.prototype.getVelUp=function(){return this.velUp},t.prototype.setVelUp=function(){this.velUp=i.VERTICAL_VELOCITY},t.prototype.getVelDown=function(){return this.velDown},t.prototype.setVelDown=function(){this.velDown=i.VERTICAL_VELOCITY},t.prototype.zeroVelRight=function(){this.velRight=0},t.prototype.zeroVelLeft=function(){this.velLeft=0},t.prototype.zeroVelUp=function(){this.velUp=0},t.prototype.zeroVelDown=function(){this.velDown=0},t.prototype.getInitialLatPos=function(){return this.initialLatPos},t.prototype.getInitialVertPos=function(){return this.initialVertPos},t.prototype.setLastLatDir=function(t){this.lastLatDir=t},t.prototype.clear=function(){this.ctx.clearRect(0,0,n.WIDTH,n.HEIGHT)},t.prototype.draw=function(){this.updateSpriteData();var t=this.sprites[this.currentFrame];this.ctx.drawImage(this.spriteSheet,t.x,t.y,t.width,t.height,this.getX(),this.getY(),this.getW(),this.getH())},t.prototype.updateSprite=function(){this.updateSpriteData();var t=Date.now();if(t-this.lastFrameTime>100){var e=this.sprites[this.currentFrame];this.ctx.drawImage(this.spriteSheet,e.x,e.y,e.width,e.height,this.getX(),this.getY(),this.getW(),this.getH()),this.currentFrame++,this.currentFrame>=this.sprites.length&&(this.currentFrame=0),this.lastFrameTime=t,requestAnimationFrame(this.updateSprite)}},t.prototype.updateSpriteData=function(){(0,i.getHitBottomFlag)()?"right"===this.lastLatDir?(this.sprites=o.crashSprites,this.spritesImageSrc="assets/sprites/crashSprite.png",this.spriteSheet=new Image,this.spriteSheet.src=this.spritesImageSrc):"left"===this.lastLatDir&&(this.sprites=o.crashSpritesL,this.spritesImageSrc="assets/sprites/crashSpriteL.png",this.spriteSheet=new Image,this.spriteSheet.src=this.spritesImageSrc):"right"===this.lastLatDir?(this.sprites=o.sprites,this.spritesImageSrc="assets/sprites/sprite.png",this.spriteSheet=new Image,this.spriteSheet.src=this.spritesImageSrc):"left"===this.lastLatDir&&(this.sprites=o.spritesL,this.spritesImageSrc="assets/sprites/spriteL.png",this.spriteSheet=new Image,this.spriteSheet.src=this.spritesImageSrc)},t}();e.default=a},483:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.showCanvas3=e.showCanvas2=e.showCanvas1=e.getCursorPosition=e.clear=void 0;var n=s(607),o=s(915),a=s(607),r=i(s(349)),l=s(805);e.clear=function(t){t.clearRect(0,0,n.WIDTH,n.HEIGHT)},e.getCursorPosition=function(t,e){var s=t.getBoundingClientRect();e.clientX,s.left,e.clientY,s.top};var h=document.getElementById("canvas1"),c=document.getElementById("canvas2"),d=document.getElementById("canvas3"),p=document.querySelector(".gaugeContainer"),u=document.getElementById("instPanelContainer"),g=document.getElementById("trieste3Container"),f=document.getElementById("homeButton"),I=document.getElementById("musicNoteButton"),m=document.querySelector(".bubblesContainer"),T=(m.getElementsByClassName("bubble"),document.getElementById("edContainer"));new r.default,e.showCanvas1=function(){(0,o.setCurrentCanvas)(1),(0,l.showDepth)(),T.classList.remove("hideEd"),m.classList.add("hide"),"true"!==localStorage.getItem("modalDisplayed")&&(L.style.display="block"),h.style.display="block",c.style.display="none",d.style.display="none",p.classList.remove("hidegauge"),g.classList.add("hide"),I.classList.add("can1MN"),I.classList.remove("can2MN"),I.classList.remove("can3MN"),f.classList.add("can1home"),f.classList.remove("can2home"),f.classList.remove("can3home"),u.classList.add("hide")},e.showCanvas2=function(){(0,o.setCurrentCanvas)(2),h.style.display="none",c.style.display="block",d.style.display="none",p.classList.add("hidegauge"),g.classList.remove("hide"),I.classList.remove("can1MN"),I.classList.add("can2MN"),I.classList.remove("can3MN"),f.classList.remove("can1home"),f.classList.add("can2home"),f.classList.remove("can3home"),u.classList.add("hide"),T.classList.add("hide")},e.showCanvas3=function(){a.globalCockpit.cockpit.draw(),(0,o.setCurrentCanvas)(3),console.log("_CURRENT_CANVAS",(0,o.getCurrentCanvas)()),m.classList.add("hide"),h.style.display="none",c.style.display="none",d.style.display="block",d.style.cursor="pointer",p.classList.add("hidegauge"),g.classList.remove("hide"),I.classList.remove("can1MN"),I.classList.remove("can2MN"),I.classList.add("can3MN"),f.classList.remove("can1home"),f.classList.remove("can2home"),f.classList.add("can3home"),T.classList.forEach((function(t){T.classList.remove(t),u.classList.remove("hide")})),(0,l.showDepth)(),(0,l.showLat)(),(0,l.showZone)()};var L=document.getElementById("modal");document.getElementsByClassName("close")[0].addEventListener("click",(function(){L.style.display="none",localStorage.setItem("modalDisplayed","true")})),window.addEventListener("click",(function(t){t.target===L&&(L.style.display="none",localStorage.setItem("modalDisplayed","true"))}))},294:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=s(915),o=i(s(456)),a=i(s(105)),r=i(s(768)),l=function(){function t(){this.ocean=a.default.getInstance(),this.sub=r.default.getInstance(),this.calcConstants=new o.default,this.lat=this.calcConstants._getCompLat(this.ocean,this.sub)||0,this.vert=this.calcConstants._getCompVert(this.ocean,this.sub)||0,this.varDepth=this.calcConstants._calcDepthLimit(this.lat)||null,this.flag=null,this.oldFlag=null}return t.prototype.upDateZoneObject=function(){return this.varDepth=this.calcConstants._calcDepthLimit(this.lat),this.flag=this.calcConstants._getZone(this.vert,this.varDepth),this.oldFlag!==this.flag?(this.oldFlag=this.flag,console.log("this.flag updateZoneObject",this.flag),this.flag===n.EUPHOTIC_PELAGIC?n.textObjects[0]:this.flag===n.EUPHOTIC_BENTHIC?(console.log("JJJJJJJ",n.textObjects[1]),n.textObjects[1]):this.flag===n.DYSPHOTIC_PELAGIC?n.textObjects[2]:this.flag===n.DYSPHOTIC_BENTHIC?n.textObjects[3]:this.flag===n.APHOTIC_PELAGIC?n.textObjects[4]:this.flag===n.APHOTIC_BENTHIC?n.textObjects[5]:n.textObjects[this.flag]):n.textObjects[this.flag]},t}();e.default=l}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,s),o.exports}s(607),s(37)})();
//# sourceMappingURL=main.js.map