let sequence = 0;
let style = document.getElementById("style");
let input = document.getElementById("input");
let bgcolor = document.getElementById("bgcolor");
let boxbgcolor = document.getElementById("boxbgcolor");
let pin = document.getElementById("pin");
let floating = document.getElementById("floating");
let body = document.body;
let head = document.head;

immediate.polifill();

new Behave({
	textarea: document.getElementById("input")
});

new Picker({
	parent: bgcolor,
	color: "#333",
	onChange: c => {
		bgcolor.style.background = c.rgbaString;
		body.style.background = c.rgbaString;
	},
});

new Picker({
	parent: boxbgcolor,
	color: "#f0f0f0",
	onChange: c => {
		boxbgcolor.style.background = c.rgbaString;
		body.querySelectorAll(".hljs").forEach(t => t.style.background = c.rgbaString);
	},
});

floating.addEventListener("mousedown",function(e) {
    if(e.target !== this) { return; }
    this.down = true;
    this.layerX = e.offsetX;
    this.layerY = e.offsetY;
});

window.addEventListener("mouseup", function(e) {
	if(floating.down) { floating.down = false; }
});

body.addEventListener("mousemove",function(e) {
    if(floating.down) {
        if(!body.classList.contains("unpinned")) {
            body.classList.add("unpinned");
        }
        floating.style.top = e.y - floating.layerY + "px";
        floating.style.left = e.x - floating.layerX + "px";
    }
});

style.addEventListener("change", function() {
	head.querySelector("link.loaded").remove();
	let css = document.createElement("link");
	css.href = `styles/${this.value}.css`;
	css.rel = "stylesheet";
	css.type = "text/css";
	css.classList.add("loaded");
	head.append(css);
	body.querySelectorAll(".hljs").forEach(t => t.style.background = "");
	boxbgcolor.style.background = "";
});

input.addEventListener("keyup", async function() {
	let val = this.value;
	let s = ++sequence;
	for(let block of body.querySelectorAll("pre code")) {
		if(s !== sequence) { break; }
		block.innerHTML = hljs.highlight(block.className,val).value;
		await new Promise(r => setImmediate(r));
	}
});

pin.addEventListener("click", function() {
	if(body.classList.contains("unpinned")) {
		for(let item of body.querySelectorAll("pre")) {
			if(item.offsetTop > window.scrollY + floating.offsetTop) {
				a = item
				item.parentElement.insertBefore(floating,item);
				break;
			}
		}
	}
	body.classList.toggle("unpinned");
});

(async () => {
	let css = document.createElement("link");
	css.href = "styles/default.css";
	css.rel = "stylesheet";
	css.type = "text/css";
	css.classList.add("loaded");
	head.appendChild(css);
	for(let lang of hljs.listLanguages()) {
		let aliases = hljs.getLanguage(lang).aliases || [];
		let block = document.createElement("pre");
		hljs.highlightBlock(block);
		block.innerHTML = `<lang>${lang}${aliases.length ? `<span> (${aliases.join("|")})</span>` : ""}</lang><code class="${lang}">${hljs.highlight(lang,input.value).value}</code>`;
		body.append(block);
		await new Promise(r => setImmediate(r));
	}
})();