window.addEventListener('load', (event) => {

const stylesheets = [
  { 
	  name: "1177", 
	  path: "https://www.1177.se/build/1177/stylesheets/app.css", 
	  preload: "https://www.1177.se/build/1177/stylesheets/preload.css" 
  },
//{ 
//	  name: "umo", 
//	  path: "https://www.umo.se/build/umo/stylesheets/app.css", 
//	  preload: "https://www.umo.se/build/umo/stylesheets/preload.css" 
//},
];

function getCurrentSite() {
  if(!window.localStorage) return false;  
  return window.localStorage.getItem('inera_jsfiddle_current_site');
}

function setCurrentSite(site) {
  if(!window.localStorage) return false;  
  window.localStorage.setItem('inera_jsfiddle_current_site', site);
}

const CURRENT = getCurrentSite();

function loadCSS(path, id = "dynamic-css") {
  if(!path) return;
  const style   = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.id = id;
  style.href = path;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function clickHandler(e) {
  e.preventDefault();
  const name = e.target.id;
  document.getElementById('cssLinkWrapper').classList.remove('heavy');
  const links = document.querySelectorAll('.jsfiddle_css_theme');
  links.forEach(el => el.classList.remove('active'));
  
  const style = document.getElementById('dynamic-css');
  const preload = document.getElementById('preload-css');
  if(style) style.remove();
  if(preload) preload.remove();
	
  e.target.classList.add('active');
  setCurrentSite(e.target.innerText);

  loadCSS(getPreloadPathFromName(name), "preload-css");
  loadCSS(e.target.href);
}

	
const wrapper = document.createElement("div");
wrapper.id = "cssLinkWrapper";

if(stylesheets.length === 1) {
  loadCSS(getPreloadPathFromName(stylesheets[0].name), "preload-css");
  loadCSS(getPathFromName(stylesheets[0].name));
  wrapper.style.display = "none";
} else if(!CURRENT) {
  wrapper.classList.add('heavy');
} else {
  loadCSS(getPreloadPathFromName(CURRENT), "preload-css");
  loadCSS(getPathFromName(CURRENT));
}
	
document.body.appendChild(wrapper);

// add some css! 
const css = document.createElement('style');

css.innerHTML = `
  body {
    padding-top: 40px !important;
  }
  #cssLinkWrapper {
    box-sizing: content-box;
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    height: 40px;
    background-color: #111;
    border-bottom: 2px solid #111;
    line-height: 40px;
    font-size: 14px;
  }
  #cssLinkWrapper.heavy {
    background-color: hotpink;
    background-color: rgba(0, 0, 0, 0.7);
    top: 100px;
    padding: 20px;
    left: 50%;
    margin-left: -100px;
    right: auto;
    bottom: auto;
    width: 200px;
    font-size: 32px;
    border: 3px solid #111;
    border-radius: 20px;
    text-align: center;
  }
  .jsfiddle_css_theme {
    color: white;
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    font-size: inherit;
  }
  .jsfiddle_css_theme:focus,
	.jsfiddle_css_theme:hover {
  	color: hotpink;
  }
  .jsfiddle_css_theme.active {
  	color: #111;
    background-color: #f8f8f8;
  }
`;
document.body.appendChild(css);

function createLink(item) {
  const current = getCurrentSite();
  const a = document.createElement('a');
  const w = document.getElementById("cssLinkWrapper");	
  a.href = item.path;
  a.className = 'jsfiddle_css_theme';
  a.id = item.name;
  a.innerHTML = item.name;
  a.addEventListener("click", clickHandler);
  if(item.name === current) {
  	a.classList.add('active');
  }
  if(w) w.appendChild(a);
  else document.body.appendChild(a);
}

	
function getItemFromName(name) {
  return stylesheets.find(i => i.name === name);
}
	
function getPathFromName(name) {
  return getItemFromName(name).path;
}
	
function getPreloadPathFromName(name) {
  return getItemFromName(name).preload;
}	
	
stylesheets.forEach(createLink);

});
