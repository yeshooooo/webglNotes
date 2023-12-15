// 注意这里不能省略.js后缀，否则找不到
import initShaders from "./initShaders.js";
// 封装
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

// 1.vertexShader, fragmentShader
let vertexSource = `
void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
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

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1);
