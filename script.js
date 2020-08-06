const overlay = document.querySelector(".overlay");
const switchComponent = document.querySelector(".switch input");
const intMeter = document.querySelector("#intensity-meter");

let beamX = (beamY = intMeter.value);
let x, y;
let lights = false;

function lighten(e) {
  if (!e.target.classList.contains("overlay")) return;
  const { height, width } = e.target.getBoundingClientRect();
  x = (e.offsetX / width) * 100;
  y = (e.offsetY / height) * 100;
  overlay.style.cssText = `
    background-image:url("./assets/flashlight.png"),
    radial-gradient(${beamX}px ${beamY}px at ${x}% ${y}%, transparent, black);
    cursor: none;
    background-size:60px 60px,auto;
    background-position: calc(${x}% + 50px) calc(${y}% + 50px), 0 0;
  `;
}

function lightHandler(e) {
  lights = e.target.checked;
  if (lights) {
    overlay.style.cssText = `
      url("./assets/flashlight.png"),
      background-image:radial-gradient(100px 100px at center, transparent, black);
      background-size:auto,10px 10px;
    `;
    overlay.addEventListener("mousemove", lighten, true);
    // overlay.addEventListener("wheel", updateIntensity, { passive: true });
  } else {
    overlay.style = null;
    overlay.removeEventListener("mousemove", lighten, true);
    // overlay.removeEventListener("wheel", updateIntensity, { passive: true });
  }
}

function updateIntensity(e) {
  if (!lights) return alert("turn on torchlight first");
  beamX = beamY = e.target.value;
  overlay.style.cssText = `
    background-image:url("./assets/flashlight.png"),
    radial-gradient(${beamX}px ${beamY}px at ${x}% ${y}%, transparent, black);
    cursor: none;
    background-size:60px 60px,auto;
    background-position: calc(${x}% + 50px) calc(${y}% + 50px), 0 0;
  `;
}

function zoom(e) {
  if (!lights) return;
  e.preventDefault();
  if (parseInt(beamX) + e.deltaY >= 100 && parseInt(beamX) + e.deltaY <= 400) {
    console.log("mtwdsad");
    beamX = beamY = parseInt(beamX) + e.deltaY;
    console.log(beamX);
    overlay.style.cssText = `
    background-image:url("./assets/flashlight.png"),
    radial-gradient(${beamX}px ${beamY}px at ${x}% ${y}%, transparent, black);
    cursor: none;
    background-size:60px 60px,auto;
    background-position: calc(${x}% + 50px) calc(${y}% + 50px), 0 0;
  `;
  }
}

overlay.onwheel = zoom;

switchComponent.addEventListener("click", (e) => lightHandler(e));

intMeter.addEventListener("change", (e) => updateIntensity(e));
