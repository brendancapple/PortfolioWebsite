// CONFIG
const MAX_MAX_DIRECTION_LIGHTS = 4;

const DEBUG = true;
var program;

// FUNCTIONS

/**
 * Function to run the scene in webgl
 * 
 * @param {WebGL Instance} gl Instance of WebGL
 * @param {canvas} window Canvas used as WebGL Window
 * @param {JSON} model Model to use
 * @param {{VERTEX: string, FRAG: string}} shaders Shaders used on model
 */
async function run_scene(gl, window, model, material, texture, shaders) {
    let window_width = window.width;
    let window_height = window.height;
    console.log(window_width);
    console.log(window_height);

    //
    // Render Options
    //

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);

    // 
    // Compile Shaders
    // 

    let vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    let fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertex_shader, shaders.VERTEX);
    gl.shaderSource(fragment_shader, shaders.FRAG);

    gl.compileShader(vertex_shader);
    if(!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
        console.error("ERROR comiling vertex shader", gl.getShaderInfoLog(vertex_shader));
        return;
    }

    gl.compileShader(fragment_shader);
    if(!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
        console.error("ERROR comiling fragment shader", gl.getShaderInfoLog(fragment_shader));
        return;
    }

    //
    // GPU Program
    //

    program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program', gl.getProgramInfoLog(program));
        return;
    }

    if (DEBUG) {
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program', gl.getProgramInfoLog(program));
            return;
        }
    }

    //
    // Create Buffer
    //

    let model_vertices = model.meshes[0].vertices;
    let model_indices = [].concat.apply([], model.meshes[0].faces);
    let model_texCoords = model.meshes[0].texturecoords[0];
    let model_normals = model.meshes[0].normals;
    
    console.log(model_vertices);
    console.log(model_indices);
    console.log(model_texCoords);
    console.log(model_normals);

    let model_vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, model_vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model_vertices), gl.STATIC_DRAW);

    let model_texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, model_texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model_texCoords), gl.STATIC_DRAW);

    let model_indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model_indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model_indices), gl.STATIC_DRAW);

    let model_normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, model_normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model_normals), gl.STATIC_DRAW);


    let model_positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, model_vertexBuffer);
    gl.vertexAttribPointer(
        model_positionAttribLocation, // Location
        3,  // Number of Elements
        gl.FLOAT, // Type of Elements
        gl.FALSE, // Normalized?
        3 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
        0 // Offset from the beginning of a vertex to this attribute
    );
    gl.enableVertexAttribArray(model_positionAttribLocation);

    let model_normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
    gl.bindBuffer(gl.ARRAY_BUFFER, model_normalBuffer);
    gl.vertexAttribPointer(
        model_normalAttribLocation, // Location
        3,  // Number of Elements
        gl.FLOAT, // Type of Elements
        gl.TRUE, // Normalized?
        3 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
        0 // Offset from the beginning of a vertex to this attribute
    );
    gl.enableVertexAttribArray(model_normalAttribLocation);

    let model_texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
    gl.bindBuffer(gl.ARRAY_BUFFER, model_texCoordBuffer);
    gl.vertexAttribPointer(
        model_texCoordAttribLocation, // Location
        2,  // Number of Elements
        gl.FLOAT, // Type of Elements
        gl.FALSE, // Normalized?
        2 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
        0 // Offset from the beginning of a vertex to this attribute
    );
    gl.enableVertexAttribArray(model_texCoordAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    //
    // Texturing
    //
    
    let model_texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, model_texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // JSON is flipped along y -- this reverses the issue

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // HORIZONTAL WRAP
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // VERTICAL WRAP
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);    // SHRINK
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);    // GROW

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, null);

    // 
    // Material
    // 

    gl.useProgram(program);

    let material_specularUniform = gl.getUniformLocation(program, 'matSpecular');
    let material_emissionUniform = gl.getUniformLocation(program, 'matEmission');
    let material_roughnessUniform = gl.getUniformLocation(program, 'matRoughness');
    let material_metallicUniform = gl.getUniformLocation(program, 'matMetallic');

    gl.uniform3fv(material_specularUniform, material.specular);
    gl.uniform3fv(material_emissionUniform, material.emission);
    gl.uniform1f(material_roughnessUniform, material.roughness);
    gl.uniform1f(material_metallicUniform, material.metallic);

    //
    // MVP Matrices
    //

    // Tell OpenGL what program is currently active
    gl.useProgram(program);

    let eye = [0.0, 0.0, 40.0];
    let eye_uniformLocation = gl.getUniformLocation(program, 'eyePos');
    console.log(eye);
    gl.uniform3fv(eye_uniformLocation, eye);

    let mModel_uniformLocation = gl.getUniformLocation(program, 'mModel');
    let mView_uniformLocation = gl.getUniformLocation(program, 'mView');
    let mProj_uniformLocation = gl.getUniformLocation(program, 'mProj');

    let mModel = new Float32Array( mat4.identity() );
    let mView = new Float32Array( mat4.view_lookAt(eye, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]) );
    let mProj = new Float32Array( mat4.proj_perspective(PI/4, window_width/window_height, [0.1, 1000.0]) );

    console.log(mModel);
    console.log(mView);
    console.log(mProj);

    gl.uniformMatrix4fv(mModel_uniformLocation, gl.FALSE, mModel);
    gl.uniformMatrix4fv(mView_uniformLocation, gl.FALSE, mView);
    gl.uniformMatrix4fv(mProj_uniformLocation, gl.FALSE, mProj);

    // 
    // Lighting
    //

    // Ambient
    let light_ambientLightIntensityUniform = gl.getUniformLocation(program, 'ambientLight');
    gl.uniform3f(light_ambientLightIntensityUniform, 0.05, 0.05, 0.1);

    // Directional
    var light_directionLights = [
        //                    INTENSITY,       DIRECTION
        light.directionLight([0.0, 0.5, 0.0], [0.0, 0.5, 1.5]),
        light.directionLight([0.5, 0.0, 0.0], [1.0, 0.5, 1.5]),
        light.directionLight([0.0, 0.0, 0.5], [-1.0, 0.5, 1.5]),
        light.directionLight([0.0, 0.0, 0.0], [0.0, 0.0, 0.0])
    ];

    for (i=0; i<light_directionLights.length; i++) {
        light_directionLights[i].intensityUniform = gl.getUniformLocation(program, `directionLights[${i}].intensity`);
        light_directionLights[i].directionUniform = gl.getUniformLocation(program, `directionLights[${i}].direction`);
        gl.uniform3fv(light_directionLights[i].intensityUniform, light_directionLights[i].intensity);
        gl.uniform3fv(light_directionLights[i].directionUniform, light_directionLights[i].direction);
    }
    console.log("DIRECTION LIGHTS");
    console.log(light_directionLights);
    


    //
    // Main Render Loop
    //

    let identityMatrix = mat4.identity();
    let angle = 0.0;

    let render_loop = function () {
        angle = 2 * PI * performance.now() / 1000 / 10;
        mModel = mat4.rotate(identityMatrix, [0.2, 1.0, 0.2], angle);
        mModel = mat4.rotate(mModel, [0.8, 0.0, -0.8], angle)
        gl.uniformMatrix4fv(mModel_uniformLocation, gl.FALSE, mModel);

        gl.clearColor(47/255, 50/255, 66/255, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, model_vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model_indexBuffer);
        gl.bindTexture(gl.TEXTURE_2D, model_texture);

        gl.drawElements(gl.TRIANGLES, model_indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render_loop);
    };
    requestAnimationFrame(render_loop);
}

// Light Updates
function updateLights() {
    light_directionLights = [
        //                    INTENSITY,       DIRECTION
        light.directionLight([parseFloat(document.getElementById("DL1_R").value), parseFloat(document.getElementById("DL1_G").value), parseFloat(document.getElementById("DL1_B").value)], 
                            [parseFloat(document.getElementById("DL1_X").value), parseFloat(document.getElementById("DL1_Y").value), parseFloat(document.getElementById("DL1_Z").value)]),
        light.directionLight([parseFloat(document.getElementById("DL2_R").value), parseFloat(document.getElementById("DL2_G").value), parseFloat(document.getElementById("DL2_B").value)], 
                            [parseFloat(document.getElementById("DL2_X").value), parseFloat(document.getElementById("DL2_Y").value), parseFloat(document.getElementById("DL2_Z").value)]),
        light.directionLight([parseFloat(document.getElementById("DL3_R").value), parseFloat(document.getElementById("DL3_G").value), parseFloat(document.getElementById("DL3_B").value)], 
                            [parseFloat(document.getElementById("DL3_X").value), parseFloat(document.getElementById("DL3_Y").value), parseFloat(document.getElementById("DL3_Z").value)]),
        light.directionLight([parseFloat(document.getElementById("DL4_R").value), parseFloat(document.getElementById("DL4_G").value), parseFloat(document.getElementById("DL4_B").value)], 
                            [parseFloat(document.getElementById("DL4_X").value), parseFloat(document.getElementById("DL4_Y").value), parseFloat(document.getElementById("DL4_Z").value)]),
    ];

    for (i=0; i<light_directionLights.length; i++) {
        light_directionLights[i].intensityUniform = gl.getUniformLocation(program, `directionLights[${i}].intensity`);
        light_directionLights[i].directionUniform = gl.getUniformLocation(program, `directionLights[${i}].direction`);
        gl.uniform3fv(light_directionLights[i].intensityUniform, light_directionLights[i].intensity);
        gl.uniform3fv(light_directionLights[i].directionUniform, light_directionLights[i].direction);
    }
    console.log("DIRECTION LIGHTS");
    console.log(light_directionLights);
}


// RUN CODE

// Run Upon Scene Initialization
var Init = function () {

    //
    // WebGL Initialization
    //

    var webgl_window = document.getElementById("webgl_window");
    gl = webgl_window.getContext("webgl");
    if (!gl) {
        console.log("WebGL Unsupported, Using Experimental Version")
        gl = webgl_window.getContext("experimental-webgl");
    } 
    if (!gl)
        alert("WebGL is not supported on your browser. Please use Chrome like a normal person.");
    
    // webgl_window.width = window.innerWdith;
    // webgl_window.height = window.innerHeight;
    // gl.viewport(0,0, window.innerWidth, window.innerHeight);

    // 
    // Load Resources
    //

    file.load_scene("img/code/WebGL_Test/assets/model/coffee.json", "img/code/WebGL_test/assets/mat/default_mat.json", "img/code/WebGL_test/assets/img/tex/coffee_tex.png", "img/code/WebGL_test/shader/vertex_disney.glsl", "img/code/WebGL_test/shader/frag_disney.glsl")
        .then( sceneResources => {
            if (DEBUG) {
                console.log(sceneResources.MODEL);
                console.log(sceneResources.MATERIAL);
                console.log(sceneResources.TEXTURE);
                console.log(sceneResources.SHADER.VERTEX);
                console.log(sceneResources.SHADER.FRAG);
            }
            
            run_scene(gl, webgl_window, sceneResources.MODEL, sceneResources.MATERIAL, sceneResources.TEXTURE, sceneResources.SHADER);
        });
};