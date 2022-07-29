exports.default = (ffi) => {
  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    for (const x of children) {
      el.append(x);
    }
    return el;
  }

  ffi.defun("rain.title", () => {
    const x = h("div", {style: `
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      background: #4f4f4f;
      display: flex;
      flex-direction: column-reverse;
      text-align: right;
      padding: 2rem;
      font-size: 2em;
      color: #fafafa;
      font-family: "PT Sans Caption", sans;
    `}, ["the sound of rain."]);
    return ffi.box(x);
  })

  ffi.defun("rain.fin", () => {
    const x = h("div", {style: `
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      display: flex;
      flex-direction: column-reverse;
      text-align: right;
      padding: 2rem;
      font-size: 2em;
      font-family: "Lora", serif;
      font-style: italic;
    `}, ["fin."]);
    return ffi.box(x);
  });

  class RainParticle {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0.2;
      this.vy = 0.6 + (Math.random()/2);
      this.node = h("div", {style: `
        position: absolute;
        top: 0px;
        left: 0px;
        width: 3px;
        height: 10px;
        background: #C0D8E3;
        transform: rotate(8deg);
      `}, []);
    }

    render() {
      this.node.style.top = `${Math.floor(this.y)}px`;
      this.node.style.left = `${Math.floor(this.x)}px`;
    }

    update(lag, w, h) {
      this.x -= this.vx * lag;
      this.y += this.vy * lag;
      if (this.x < 0 || this.y > h) {
        this.randomize(w, h);
      }
    }

    randomize(w, h) {
      this.x = Math.floor(Math.random() * (w + w/2));
      this.y = -Math.floor(Math.random() * h)
    }
  }

  ffi.defun("rain.rain", () => {
    const container = h("div", {style: `
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    `}, []);
    const particles = Array.from({length: 80}, () => new RainParticle());
    for (const x of particles) {
      x.randomize(720, 720);
      x.render();
      container.appendChild(x.node);
    }
    let prev = null;
    let connected = false;
    function tick(t) {
      if (!connected && container.parentNode) {
        connected = true;
      }
      if (!connected) {
        requestAnimationFrame(tick);
        return;
      }
      if (!container.parentNode) {
        return;
      }

      const h = container.offsetHeight;
      const w = container.offsetWidth;
      const lag = prev == null ? 0 : t - prev;
      prev = t;
      for (const x of particles) {
        x.update(lag, w, h);
        x.render();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return ffi.box(container);
  });

  ffi.defun("rain.black", () => {
    return ffi.box(h("div", {style: `
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: #2f2f2f;
    `}, []));
  })
}