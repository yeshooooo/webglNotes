// 注意这里不能省略.js后缀，否则找不到
import initShaders from "./initShaders.js";
// 封装
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

// 1.vertexShader, fragmentShader
let vertexSource = `
attribute vec2 a_position;
attribute float a_size;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = a_size;
}
`;

let fragmentSource = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

initShaders(gl, vertexSource, fragmentSource);

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0); // rgba
gl.clear(gl.COLOR_BUFFER_BIT);

// let position = [0.6, 0.0];

let x = 0;
let y = 0;
let n = 10000;

for (let i = 0; i < n; i++) {
  let r = i / 1000;
  x = Math.sin(i) * r;
  y = Math.cos(i) * r;
  let a_position = gl.getAttribLocation(gl.program, "a_position");
  gl.vertexAttrib2f(a_position, x, y);
  let a_size = gl.getAttribLocation(gl.program, "a_size");
  gl.vertexAttrib1f(a_size, r * 5);
  gl.drawArrays(gl.POINTS, 0, 1);
}
// // 1. 获取attribute内存的地址
// let location = gl.getAttribLocation(gl.program, "a_position");
// // 2.往里面赋值
// // gl.vertexAttrib2f(location, ...position); // 写法1
// // gl.vertexAttrib2fv(location, new Float32Array(position)); // 写法2传入的是数组
// gl.vertexAttrib2f(location, x, y);
// console.log(location);
// // 画一个点
// gl.drawArrays(gl.POINTS, 0, 1);
