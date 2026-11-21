(() => {
"use strict";
const cfg=window.EXFACTO_CONFIG||{}, products=cfg.products||[], CART_KEY="exfactoFragrancesCart";
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat(cfg.locale||"en-ZA",{style:"currency",currency:cfg.currency||"ZAR",minimumFractionDigits:2}).format(n);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const getCart=()=>{try{return JSON.parse(localStorage.getItem(CART_KEY)||"[]")}catch{return[]}};
const saveCart=cart=>{localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCount()};
const findProduct=id=>products.find(p=>p.id===id);
const updateCount=()=>{const n=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll(".bag-count").forEach(el=>el.textContent=n)};
const toast=msg=>{let t=$("site-toast");if(!t){t=document.createElement("div");t.id="site-toast";t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(window.__exfToast);window.__exfToast=setTimeout(()=>t.classList.remove("show"),2400)};
const card=p=>`<article class="product-card"><div class="product-image"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">${p.tag?`<span class="product-tag">${esc(p.tag)}</span>`:""}</div><div class="product-info"><h3>${esc(p.name)}</h3><p>${esc(p.size)} · ${esc(p.category==="men"?"For him":p.category==="women"?"For her":"Unisex")}</p><p class="product-notes">${esc(p.notes)}</p><div class="product-price">${p.price>0?money(p.price):"ENQUIRE FOR PRICE"}</div><div class="product-actions"><button class="mini-button" data-view="${esc(p.id)}">VIEW DETAILS</button><button class="mini-button" data-add="${esc(p.id)}">ADD TO BAG +</button></div></div></article>`;
const featured=$("featured-products");if(featured)featured.innerHTML=products.slice(0,4).map(card).join("");
let activeCategory="all";
const shop=$("shop-products"),search=$("product-search"),sort=$("sort-products");
const renderShop=()=>{
 if(!shop)return;
 const q=(search?.value||"").trim().toLowerCase();
 let list=products.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&[p.name,p.description,p.category,p.notes,p.tag].join(" ").toLowerCase().includes(q));
 if(sort?.value==="price-low")list.sort((a,b)=>a.price-b.price);
 if(sort?.value==="price-high")list.sort((a,b)=>b.price-a.price);
 if(sort?.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 shop.innerHTML=list.length?list.map(card).join(""):'<div class="empty-results"><h3>No fragrances found</h3><p>Try another search or choose a different collection.</p></div>';
 const count=$("product-count");if(count)count.textContent=`${list.length} ${list.length===1?"fragrance":"fragrances"} in this edit`;
};
if(shop){
 const params=new URLSearchParams(location.search),initial=params.get("for");
 if(["men","women","unisex"].includes(initial))activeCategory=initial;
 document.querySelectorAll(".gender-filter").forEach(b=>{const on=b.dataset.category===activeCategory;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));b.addEventListener("click",()=>{activeCategory=b.dataset.category;document.querySelectorAll(".gender-filter").forEach(x=>{const active=x===b;x.classList.toggle("active",active);x.setAttribute("aria-pressed",String(active))});renderShop()})});
 search?.addEventListener("input",renderShop);sort?.addEventListener("change",renderShop);renderShop();
}
$("home-search-button")?.addEventListener("click",()=>{const q=$("home-search").value.trim();location.href="shop.html"+(q?"?q="+encodeURIComponent(q):"")});
$("home-search")?.addEventListener("keydown",e=>{if(e.key==="Enter")$("home-search-button").click()});
if(shop&&search){const q=new URLSearchParams(location.search).get("q");if(q){search.value=q;renderShop()}}
const openDetails=id=>{const p=findProduct(id);if(!p)return;let modal=$("product-modal");if(!modal){modal=document.createElement("div");modal.id="product-modal";modal.className="product-modal";modal.innerHTML='<div class="modal-card"><button class="modal-close" aria-label="Close">×</button><img alt=""><div class="modal-copy"></div></div>';document.body.appendChild(modal);modal.addEventListener("click",e=>{if(e.target===modal||e.target.closest(".modal-close"))modal.classList.remove("open")})}modal.querySelector("img").src=p.image;modal.querySelector("img").alt=p.name;modal.querySelector(".modal-copy").innerHTML=`<p class="eyebrow">EXFACTO FRAGRANCES</p><h2>${esc(p.name)}</h2><p>${esc(p.size)} · ${esc(p.category==="men"?"For him":p.category==="women"?"For her":"Unisex")}</p><p>${esc(p.description)}</p><p><strong>${esc(p.notes)}</strong></p><p class="product-price">${p.price>0?money(p.price):"Enquire for price"}</p><button class="button button-dark" data-add="${esc(p.id)}">ADD TO BAG +</button>`;modal.classList.add("open")};
const renderCart=()=>{
 const root=$("cart-content");if(!root)return;
 const cart=getCart().filter(x=>findProduct(x.id));
 if(!cart.length){root.innerHTML='<div class="empty-state"><h2>Your bag is waiting.</h2><p class="muted">Explore the collection and find your next signature scent.</p><a class="button button-dark" href="shop.html">EXPLORE FRAGRANCES </a></div>';return}
 const subtotal=cart.reduce((s,x)=>s+findProduct(x.id).price*x.qty,0);
 root.innerHTML=cart.map(x=>{const p=findProduct(x.id);return `<div class="cart-row"><img src="${esc(p.image)}" alt="${esc(p.name)}"><div class="cart-row-info"><h3>${esc(p.name)}</h3><p>${esc(p.size)} · ${money(p.price)}</p><div class="cart-qty"><button data-qty="-1" data-id="${esc(p.id)}" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="1" data-id="${esc(p.id)}" aria-label="Increase quantity">+</button></div></div><strong>${money(p.price*x.qty)}</strong><button class="remove-item" data-remove="${esc(p.id)}" aria-label="Remove ${esc(p.name)}">×</button></div>`}).join("")+`<div class="cart-total"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><p class="form-note">Delivery fees and availability will be confirmed by Exfacto.</p><a class="button button-dark" href="checkout.html">CONTINUE TO CHECKOUT </a>`;
};
renderCart();
const summary=$("checkout-summary");
if(summary){const cart=getCart().filter(x=>findProduct(x.id));const total=cart.reduce((s,x)=>s+findProduct(x.id).price*x.qty,0);summary.innerHTML=cart.length?cart.map(x=>`<div class="summary-line"><span>${esc(findProduct(x.id).name)} × ${x.qty}</span><span>${money(findProduct(x.id).price*x.qty)}</span></div>`).join("")+`<div class="summary-line total"><strong>Subtotal</strong><strong>${money(total)}</strong></div>`:'<p class="muted">Your bag is empty. <a href="shop.html">Explore fragrances</a>.</p>';const submit=document.querySelector("#checkout-form button");if(submit)submit.disabled=!cart.length}
document.addEventListener("click",e=>{
 const view=e.target.closest("[data-view]");if(view){openDetails(view.dataset.view);return}
 const add=e.target.closest("[data-add]");if(add){const p=findProduct(add.dataset.add);if(!p)return;const cart=getCart(),item=cart.find(x=>x.id===p.id);if(item)item.qty++;else cart.push({id:p.id,qty:1});saveCart(cart);renderCart();toast(`${p.name} added to your bag.`);return}
 const remove=e.target.closest("[data-remove]");if(remove){saveCart(getCart().filter(x=>x.id!==remove.dataset.remove));renderCart();return}
 const qty=e.target.closest("[data-qty]");if(qty){const cart=getCart(),item=cart.find(x=>x.id===qty.dataset.id);if(item){item.qty+=Number(qty.dataset.qty);if(item.qty<1)saveCart(cart.filter(x=>x.id!==item.id));else saveCart(cart)}renderCart()}
});
$("checkout-form")?.addEventListener("submit",e=>{
 e.preventDefault();const cart=getCart().filter(x=>findProduct(x.id));if(!cart.length)return;
 const d=new FormData(e.currentTarget),items=cart.map(x=>{const p=findProduct(x.id);return `${p.name} (${p.category}) × ${x.qty} — ${money(p.price*x.qty)}`}).join("\n");
 const total=cart.reduce((s,x)=>s+findProduct(x.id).price*x.qty,0);
 const body=`Exfacto Fragrances — Order Enquiry\n\nName: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")}\nDelivery address: ${d.get("address")}\nNotes: ${d.get("notes")||"None"}\n\nOrder:\n${items}\n\nSubtotal: ${money(total)}\n\nPlease confirm stock, delivery fee and payment instructions.`;
 const feedback=$("checkout-feedback");
 if(cfg.whatsappNumber){window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(body)}`,"_blank","noopener");feedback.textContent="Your order enquiry has been prepared in WhatsApp. The order is only confirmed once Exfacto responds."}
 else{feedback.textContent="WhatsApp ordering is not connected yet. Add the confirmed business WhatsApp number in js/config.js. No order has been sent."}
});
$("contact-form")?.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget);if(cfg.contactEmail){const subject=encodeURIComponent("Enquiry from Exfacto website"),body=encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`);location.href=`mailto:${cfg.contactEmail}?subject=${subject}&body=${body}`;$("contact-feedback").textContent="Your email application has opened. Press Send to submit your enquiry."}else $("contact-feedback").textContent="Business email is not configured yet. Add the confirmed address in js/config.js."});
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
document.querySelectorAll("#year").forEach(el=>el.textContent=new Date().getFullYear());updateCount();
})();