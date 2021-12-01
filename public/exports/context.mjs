class Context {
  windowCtx() {
    let ctx = window.AudioContext || window.webkitAudioContext;
    return ctx;
  };
  elementCtx(element) {
    let ctx = new AudioContext.createMediaElementSource(element);
    return ctx;
  };
  
}