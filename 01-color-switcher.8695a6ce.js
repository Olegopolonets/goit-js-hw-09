!function(){var t,e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]");console.log(o),e.addEventListener("click",(function(){t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),e.setAttribute("disabled",!0),o.removeAttribute("disabled",!1)}),1e3)})),o.addEventListener("click",(function(){clearInterval(t),e.removeAttribute("disabled",!0),o.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.8695a6ce.js.map
