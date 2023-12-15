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

// 创建shader容器
let vertexShader = gl.createShader(gl.VERTEX_SHADER);
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// 把shader放进去
gl.shaderSource(vertexShader, vertexSource);
gl.shaderSource(fragmentShader, fragmentSource);
// 编译shader
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

// 2. program,由两个shader合成program

// 2.1 创建program
let program = gl.createProgram();
// 2.2 捆绑shader
// attach的时候会根据内容，自动判断shader类型
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
// 2.3 link,因为可以创建多个
gl.linkProgram(program);
gl.useProgram(program);

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0); // rgba
gl.clear(gl.COLOR_BUFFER_BIT);

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1);
