window.addEventListener('load', (event) => {

function loadCSS() {
  const style   = document.createElement('link');
  const path = e.target.href;
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.id = 'dynamic-css';
  style.href = path;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function clickHandler(e) {
  e.preventDefault();
  const el = document.getElementById('dynamic-css');
  if(el) el.remove();
  loadCSS(e.target.href);
}

	
const wrapper = document.createElement("div");
wrapper.id = "cssLinkWrapper";
wrapper.style.position = "fixed";
wrapper.style.top = "0";
wrapper.style.right = "0";
document.body.appendChild(wrapper);

function addListener(link) {
	link.addEventListener("click", clickHandler);
}

function createLink(item) {
  const a = document.createElement('a');
  const w = document.getElementById("cssLinkWrapper");	
  a.href = item.path;
  a.innerHTML = item.name;
  a.style.display = "inline-block";
  a.style.padding = "3px";
  a.style.fontSize = "12px";
  a.addEventListener("click", loadCSS);
  if(w) w.appendChild(a);
  else document.body.appendChild(a);
}

	
const stylesheets = [
	{ name: "umo", path: "https://www.umo.se/build/umo/stylesheets/app.css" }, 
	{ name: "1177", path: "https://www.1177.se/build/1177/stylesheets/app.css" }
];
	
stylesheets.forEach(createLink);

loadCSS(stylesheets[0].path);
	
});
