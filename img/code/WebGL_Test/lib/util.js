//
// File Loading
//

/**
 * Async Text Load from file
 * 
 * @param {string} url Location of Text File
 * @returns {string} Output Text
 */
async function load_textResource (url) {
    return await fetch(url).then( r => r.text() );
}

/**
 * Async Image Load from file
 * 
 * @param {string} url Location of Image File 
 * @returns {Image} Output Image
 */
async function load_imgResource (url) {
    const img = new Image();
    img.src = url;
    return img;
}

/**
 * Async JSON Load from file
 * 
 * @param {string} url Location of JSON File 
 * @returns {JSON} Output JSON
 */
async function load_jsonResource (url) {
    return load_textResource(url).then( text => {
        try {
            return JSON.parse(text);
        } catch (e) {
            alert("ERROR failure to parse json");
            console.error(e);
            return null;
        }
    });
}

/**
 * 
 * @param {string} vertex_url 
 * @param {string} frag_url 
 * @returns {string} Output Shaders
 */
async function load_shaderResource(vertex_url, frag_url) {
    return {
        VERTEX: await file.load_text(vertex_url), 
        FRAG:   await file.load_text(frag_url)
    };
}

/**
 * Load all Relevant Files for Scene
 * 
 * @param {string} model_url Model JSON Location
 * @param {string} mat_url Material JSON Location
 * @param {string} tex_url Texture Image Location
 * @returns {{MODEL: JSON, MATERIAL: JSON, TEXTURE: Image}} All relevant files
 */
async function load_objectResource(model_url, mat_url, tex_url) {
    return {
        MODEL: await file.load_json(model_url),
        MATERIAL: await file.load_json(mat_url),
        TEXTURE: await file.load_img(tex_url),
    };
}

/**
 * Load all Relevant Files for Scene
 * 
 * @param {string} model_url Model JSON Location
 * @param {string} mat_url Material JSON Location
 * @param {string} tex_url Texture Image Location
 * @param {string} vert_url Vertex Shader Location
 * @param {string} frag_url Fragment Shader Location
 * @returns {{MODEL: JSON, MATERIAL: JSON, TEXTURE: Image, SHADER: {VERTEX: string, FRAG: string}}} All relevant files
 */
async function load_sceneResource(model_url, mat_url, tex_url, vert_url, frag_url) {
    return {
        MODEL: await file.load_json(model_url),
        MATERIAL: await file.load_json(mat_url),
        TEXTURE: await file.load_img(tex_url),
        SHADER: await file.load_shaders(vert_url, frag_url)
    };
}

/**
 * File Loading Suff
 * @module file
 */
var file = Object.freeze({
    __proto__: null,
    load_text: load_textResource,
    load_json: load_jsonResource,
    load_img: load_imgResource,
    load_object: load_objectResource,
    load_shaders: load_shaderResource,
    load_scene: load_sceneResource
});



//
// Light Struct Constructors
//

/**
 * Struct Constructor for Direction Light
 * 
 * @param {vec3} intensity Color Intensity Vec3
 * @param {vec3} direction Direction Vec3
 * @returns 
 */
function directionLight(intensity, direction) {
    return { 
        intensityUniform: null, 
        directionUniform: null,
        intensity: new Float32Array(intensity),
        direction: new Float32Array(direction)
    };
}

/**
 * Lighting Suff
 * @module light
 */
var light = Object.freeze({
    __proto__: null,
    directionLight: directionLight
});