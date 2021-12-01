const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var customRGB = {
  r: urlParams.get(`red`),
  g: urlParams.get(`green`),
  b: urlParams.get(`blue`)
}
var r;
var g;
var b;

switch (customRGB) {
    /* Check if a custom r, g, AND b color are being requested, otherwise set to default colors */
  case (this.r != undefined):
  case (this.g != undefined):
  case (this.b != undefined):
    r = this.r;
    g = this.g;
    b = this.b;
  default:
    /* fix later */
    r = 0;
    g = 0;
    b = 0;
}