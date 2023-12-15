/**
 * 把所有的都封装在一起
 *
 */
export default function initShaders(gl, vertexSource, fragmentSource) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl,gl.FRAGMENT_SHADER, fragmentSource);
    let program = createProgram(gl,vertexShader, fragmentShader);
    if (program) {
        gl.useProgram(program)
        // 加这一段的目的是获取这一段program，因为在外面得不到program，挂载到外部的gl对象上，便于
        // 后续使用
        gl.program = program
        return true
    } else {
        return false
    }
}

/**
 * Create Shaders
 */
function createShader(gl, type, source) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    // 编译的时候可能会出问题，加入异常处理
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiled) {
        return shader
    } else {
        let error = gl.getShaderInfoLog(shader)
        console.log("compile shader err: " + error)
        // 因为错误的时候也会产生一个shader，为了防止内存泄漏，可以删除他
        gl.deleteShader(shader)
        return null
    }


}




// 2. program,由两个shader合成program

/**
 * create program
 */
function createProgram(gl, vertexShader, fragmentShader) {
    // 2.1 创建program
    let program = gl.createProgram();
    if (!program) return null
    // 2.2 捆绑shader
    // attach的时候会根据内容，自动判断shader类型
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 2.3 link,因为可以创建多个
    gl.linkProgram(program);
    // link program result
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked){
        // 2.4 use
        // use提升到initShader函数中使用
        //gl.useProgram(program);
        return program
    } else {
        let error = gl.getProgramInfoLog(program)
        console.log("link program error" + error)
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)


        return null
    }


}