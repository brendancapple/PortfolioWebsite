const PI = 3.14159
const EPSILON = 0.000001

//
// Vec
//

/**
 * Magnitude of Vector
 * 
 * @param {vec} v Vector to find the magnitude
 * @return {float} Magnitude of v
 */
function magnitude_vec(v) {
    let mag = 0.0;
    for (i=0; i<v.length; i++)
        mag += (v[i] * v[i]);
    return Math.sqrt(mag);
}

/**
 * Normalize Vector
 * 
 * @param {vec} v Vector to Normalize
 * @returns {vec} Unit vector of v
 */
function normalize_vec(v) {
    let out = new Float32Array(v.length);
    let mag = magnitude_vec(v);
    for (i=0; i<v.length; i++)
        out[i] = v[i] / mag;
    return out;
}

/**
 * Sum all Values of Vector
 * 
 * @param {vec} v Vector
 * @returns {float} Sum of Values
 */
function sum_vec(v) {
    let sum = 0;
    for (i=0;i<v.length;i++)
        sum += v[i];
    return sum;
}

/**
 * Add Vectors
 * Vectors must be of the same size.
 * 
 * @param {vec} a Starting Vector
 * @param {vec} b Vector added to a
 * @returns {vec} Sum vector (a + b)
 */
function add_vec(a,  b) {
    let out = new Float32Array(a.length);
    for (i=0; i<a.length; i++)
        out[i] = a[i] + b[i];
    return out;
}

/**
 * Subtract Vectors
 * Vectors must be of the same size.
 * 
 * @param {vec} a Starting Vector
 * @param {vec} b Vector subtracted from a
 * @returns {vec} Difference vector (a - b)
 */
function subtract_vec(a,  b) {
    let out = new Float32Array(a.length);
    for (i=0; i<a.length; i++)
        out[i] = a[i] - b[i];
    return out;
}

/**
 * Scalar Multiply Vector
 * 
 * @param {vec} v Multiplied vector
 * @param {float} s Scalar value
 * @returns {vec} Product Vector (s * v)
 */
function scalarMultiply_vec(v, s) {
    let out = new Float32Array(v.length);
    for (i=0; i<v.length; i++)
        out[i] = v[i] * s;
    return out;
}

/**
 * Dot Multiply Vectors
 * 
 * @param {vec} a First Vector
 * @param {vec} b Second Vector
 * @returns {float} Dot Product (a * b)
 */
function dotMultiply_vec(a, b) {
    let sum = 0.0;
    for (i=0; i<a.length; i++)
        sum += (a[i] * b[i]);
    return sum;
}

//
// Vec2
//

/**
 * Cross Multiply Vec2
 * This is the magnitude of the cross product in 3D Space, as otherwise, a x b is undefined in 2D.
 * 
 * @param {vec2} a First Vector
 * @param {vec2} b Second Vector
 * @return {float} Scalar result
 */
function crossMultiply_vec2(a, b) {
    return (a[0] * b[1]) - (a[1] * b[0])
}

/**
 * 2D Vector
 * @module vec2
 */
var vec2 = Object.freeze({
    __proto__: null,
    magnitude: magnitude_vec,
    normalize: normalize_vec,
    sum: sum_vec,
    add: add_vec,
    subtract: subtract_vec,
    scalarMultiply: scalarMultiply_vec,
    dotMultiply: dotMultiply_vec,
    crossMultiply: crossMultiply_vec2
});


//
// Vec3
//

/**
 * Cross Multiply Vec3
 * 
 * @param {vec3} a First Vector
 * @param {vec3} b Second Vector
 * @returns {vec3} Cross Product (a x b)
 */
function crossMultiply_vec3(a,b) {
    return [
        (a[1] * b[2]) - (a[2] * b[1]),
        (a[2] * b[0]) - (a[0] * b[2]),
        (a[0] * b[1]) - (a[1] * b[0])
    ];
}

/**
 * Multiply a Vec3 by a Mat3
 * 
 * @param {vec3} v Vector
 * @param {mat3} A Matrix
 * @return {vec3} Output vector
 */
function matrixMultiply_vec3(v, A) {
    return [
        (v[0] * A[0]) + (v[1] * A[3]) + (v[2] * A[6]),
        (v[0] * A[1]) + (v[1] * A[4]) + (v[2] * A[7]),
        (v[0] * A[2]) + (v[1] * A[5]) + (v[2] * A[8])
    ];
}

/**
 * 3D Vector
 * @module vec3
 */
var vec3 = Object.freeze({
    __proto__: null,
    magnitude: magnitude_vec,
    normalize: normalize_vec,
    sum: sum_vec,
    add: add_vec,
    subtract: subtract_vec,
    scalarMultiply: scalarMultiply_vec,
    dotMultiply: dotMultiply_vec,
    crossMultiply: crossMultiply_vec3,
    matrixMultiply: matrixMultiply_vec3
});


//
// Mat
//

/**
 * Add Matrices
 * 
 * @param {mat} A First Matrix
 * @param {mat} B Second Matrix
 * @returns {mat} Matrix Sum (A + B)
 */
function add_mat(A,  B) {
    let O = new Float32Array(A.length);
    for (i=0; i<A.length; i++)
        O[i] = A[i] + B[i];
    return O;
}

/**
 * Subtract Matrices
 * 
 * @param {mat} A First Matrix
 * @param {mat} B Second Matrix
 * @returns {mat} Matrix Difference (A - B)
 */
function subtract_mat(A,  B) {
    let O = new Float32Array(A.length);
    for (i=0; i<A.length; i++)
        O[i] = A[i] - B[i];
    return O;
}

/**
 * Scalar Multiply Vector
 * 
 * @param {mat} A Multiplied matrix
 * @param {float} s Scalar value
 * @returns {vec} Product Vector (s * A)
 */
function scalarMultiply_mat(A, s) {
    let O = new Float32Array(A.length);
    for (i=0; i<A.length; i++)
        O[i] = A[i] * s;
    return O;
}

//
// Mat2
//

/**
 * Mat2 Determinant
 * 
 * @param {mat4} A Matrix
 * @returns {float} Determinant (det[A])
 */
function determinant_mat2(A) {
    return (A[0] * A[3]) - (A[1] * A[2]);
}

/**
 * Mat2 Inverse
 * 
 * @param {mat2} A Matrix
 * @returns {float} Inverse Matrix (A^-1)
 */
function inverse_mat2(A) {
    return scalarMultiply_mat([ A[3], -1*A[1], -1*A[2], A[0] ], 1.0/determinant_mat2(A) );
}

/**
 * Mat2 Multiplication
 * 
 * @param {mat2} A First Matrix
 * @param {mat2} B Second Matrix
 * @return {mat2} Product Matrix (A * B)
 */
function matrixMultiply_mat2(A, B) {
    return [
        (A[0] * B[0]) + (A[1] * B[2]), // 0
        (A[0] * B[1]) + (A[1] * B[3]), // 1

        (A[2] * B[0]) + (A[3] * B[2]), // 2
        (A[2] * B[1]) + (A[3] * B[3]) // 3
    ];
}

/**
 * Identity Mat2
 * 
 * @return {mat2} Identity Matrix
 */
function identity_mat2() {
    return [
        1.0, 0.0, 
        0.0, 1.0
    ];
}

/**
 * 2nd Order Matrix
 * @module mat2
 */
var mat2 = Object.freeze({
    __proto__: null,
    add: add_mat,
    subtract: subtract_mat,
    scalarMultiply: scalarMultiply_mat,
    matrixMultiply: matrixMultiply_mat2,
    determinant: determinant_mat2,
    invert: inverse_mat2,
    identity: identity_mat2
});


//
// Mat 3
//

/**
 * Mat3 Determinant
 * 
 * @param {mat3} A Matrix
 * @return {float} Determinant (det[A])
 */
function determinant_mat3(A) {
    return (
        ( A[0] * (A[4] * A[8] - A[5] * A[7]) ) +
        ( A[1] * (A[5] * A[6] - A[3] * A[8]) ) + 
        ( A[2] * (A[3] * A[7] - A[4] * A[6]) )
    );
}

/**
 * Mat3 Multiplication
 * 
 * @param {mat3} A First Matrix
 * @param {mat3} B Second Matrix
 * @returns {mat3} Product Matrix (A * B)
 */
function matrixMultiply_mat3(A, B) {
    return [
        (A[0] * B[0]) + (A[1] * B[3]) + (A[2] * B[6]), // 0
        (A[0] * B[1]) + (A[1] * B[4]) + (A[2] * B[7]), // 1
        (A[0] * B[2]) + (A[1] * B[5]) + (A[2] * B[8]), // 2

        (A[3] * B[0]) + (A[4] * B[3]) + (A[5] * B[6]), // 3
        (A[3] * B[1]) + (A[4] * B[4]) + (A[5] * B[7]), // 4
        (A[3] * B[2]) + (A[4] * B[5]) + (A[5] * B[8]), // 5

        (A[6] * B[0]) + (A[7] * B[3]) + (A[8] * B[6]), // 6
        (A[6] * B[1]) + (A[7] * B[4]) + (A[8] * B[7]), // 7
        (A[6] * B[2]) + (A[7] * B[5]) + (A[8] * B[8]) // 8
    ];
}

/**
 * Identity Mat3
 * 
 * @return {mat3} Identity Matrix
 */
function identity_mat3() {
    return [
        1.0, 0.0, 0.0, 
        0.0, 1.0, 0.0, 
        0.0, 0.0, 1.0
    ];
}

/**
 * 3rd Order Matrix
 * @module mat3
 */
var mat3 = Object.freeze({
    __proto__: null,
    add: add_mat,
    subtract: subtract_mat,
    scalarMultiply: scalarMultiply_mat,
    matrixMultiply: matrixMultiply_mat3,
    determinant: determinant_mat3,
    identity: identity_mat3
});


//
// Mat4
//

/**
 * Mat4 Determinant
 * 
 * @param {mat4} A Matrix
 * @return {float} Determinant (det[A])
 */
function determinant_mat4(A) {
    return (
        A[0] * determinant_mat3([A[5], A[6], A[7], A[9], A[10], A[11], A[13], A[14], A[15]]) -
        A[1] * determinant_mat3([A[4], A[6], A[7], A[8], A[10], A[11], A[12], A[14], A[15]]) +
        A[2] * determinant_mat3([A[4], A[5], A[7], A[8], A[9], A[11], A[12], A[13], A[15]]) -
        A[3] * determinant_mat3([A[4], A[5], A[6], A[8], A[9], A[10], A[12], A[13], A[14]])
    );
}

/**
 * Mat4 Multiplication
 * 
 * @param {mat4} A First Matrix
 * @param {mat4} B Second Matrix
 * @returns {mat4} Product Matrix (A * B)
 */
function matrixMultiply_mat4(A, B) {
    return [
        (A[0] * B[0]) + (A[1] * B[4]) + (A[2] * B[8]) + (A[3] * B[12]), // 0
        (A[0] * B[1]) + (A[1] * B[5]) + (A[2] * B[9]) + (A[3] * B[13]), // 1
        (A[0] * B[2]) + (A[1] * B[6]) + (A[2] * B[10]) + (A[3] * B[14]), // 2
        (A[0] * B[3]) + (A[1] * B[7]) + (A[2] * B[11]) + (A[3] * B[15]), // 3

        (A[4] * B[0]) + (A[5] * B[4]) + (A[6] * B[8]) + (A[7] * B[12]), // 4
        (A[4] * B[1]) + (A[5] * B[5]) + (A[6] * B[9]) + (A[7] * B[13]), // 5
        (A[4] * B[2]) + (A[5] * B[6]) + (A[6] * B[10]) + (A[7] * B[14]), // 6
        (A[4] * B[3]) + (A[5] * B[7]) + (A[6] * B[11]) + (A[7] * B[15]), // 7

        (A[8] * B[0]) + (A[9] * B[4]) + (A[10] * B[8]) + (A[11] * B[12]), // 8
        (A[8] * B[1]) + (A[9] * B[5]) + (A[10] * B[9]) + (A[11] * B[13]), // 9
        (A[8] * B[2]) + (A[9] * B[6]) + (A[10] * B[10]) + (A[11] * B[14]), // 10
        (A[8] * B[3]) + (A[9] * B[7]) + (A[10] * B[11]) + (A[11] * B[15]), // 11

        (A[12] * B[0]) + (A[13] * B[4]) + (A[14] * B[8]) + (A[15] * B[12]), // 12
        (A[12] * B[1]) + (A[13] * B[5]) + (A[14] * B[9]) + (A[15] * B[13]), // 13
        (A[12] * B[2]) + (A[13] * B[6]) + (A[14] * B[10]) + (A[15] * B[14]), // 14
        (A[12] * B[3]) + (A[13] * B[7]) + (A[14] * B[11]) + (A[15] * B[15]), // 15
    ];
}

/**
 * Identity Mat4
 * 
 * @return {mat4} Identity Matrix
 */
function identity_mat4() {
    return [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
}

/**
 * VIEW: Look At Point
 * 
 * @param {mat4} out Output matrix
 * @param {vec3} eye Camera Location
 * @param {vec3} center Point to Look At
 * @param {vec3} up Upwards Direction
 * @returns {mat4} VIEW Matrix
 */
function view_lookAt_vec4(eye, center, up) {
    let z = normalize_vec(subtract_vec(eye, center));
    let x = normalize_vec(crossMultiply_vec3(up, z));
    let y = normalize_vec(crossMultiply_vec3(z, x));

    let A = [ x[0], x[1], x[2], y[0], y[1], y[2], z[0], z[1], z[2] ];
    let v = matrixMultiply_vec3(eye, A);
    v = scalarMultiply_vec(v, -1);

    return [
        x[0], x[1], x[2], 0.0,
        y[0], y[1], y[2], 0.0,
        z[0], z[1], z[2], 0.0,
        v[0], v[1], v[2], 1.0,
    ];
}

/**
 * PROJ: Frustum Matrix
 * 
 * @param {float} fov Field of View in Radians
 * @param {float} aspect Aspect Ratio (width/height)
 * @param {vec2} range Range of distances viewable [near, far]
 * @returns {vec4} PROJ Matrix
 */
function proj_perspectiveFrustum_vec4(fov, aspect, range) {
    f = 1.0 / Math.tan(fov / 2.0);
    nf = range[0] - range[1];

    return [
        f / aspect, 0.0, 0.0,                               0.0,
        0.0,        f,   0.0,                               0.0,
        0.0,        0.0, sum_vec(range) / nf,                  -1.0,
        0.0,        0.0, (2.0 * range[0] * range[1]) / nf,  0.0
    ];
}

/**
 * Translate Mat4
 * 
 * @param {mat4} A The transformed matrix
 * @param {vec4} v The vector to move along
 * @returns {mat4} Rotated Matrix
 */
function translate_mat4(A, v) {
    let T = [
        1.0, 0.0, 0.0, v[0],
        0.0, 1.0, 0.0, v[1],
        0.0, 0.0, 1.0, v[2],
        0.0, 0.0, 0.0, 1.0
    ];
    return matrixMultiply_mat4(A, T);
}

/**
 * Scale Mat4
 * 
 * @param {mat4} A The transformed matrix
 * @param {vec4} v The vector to scale by
 * @returns {mat4} Scaled Matrix
 */
function scale_mat4(A, v) {
    let S = [
        v[0], 0.0,  0.0,  0.0,
        0.0,  v[1], 0.0,  0.0,
        0.0,  0.0,  v[2], 0.0,
        0.0,  0.0,  0.0,  1.0
    ];
    return matrixMultiply_mat4(A, S);
}

/**
 * Rotate Mat4 around an axis
 * 
 * @param {mat4} A The transformed matrix
 * @param {vec4} axis The axis to rotate around
 * @param {float} angle The angle to rotate by in Radians
 * @returns {mat4} Rotated Matrix
 */
function rotate_mat4(A, axis, angle) {
    let v = normalize_vec(axis);
    let v2 = [ v[0] * v[0], v[1] * v[1], v[2] * v[2] ];

    let s = Math.sin(angle), c = Math.cos(angle);
    let t = 1 - c;

    let R = [
        v2[0] + (1-v2[0])*c,    v[0]*v[1]*t - v[2]*s,   v[0]*v[2]*t + v[1]*s,   0.0,
        v[0]*v[1]*t + v[2]*s,   v2[1] + (1-v2[1])*c,    v[1]*v[2]*t - v[0]*s,   0.0,
        v[0]*v[2]*t - v[1]*s,   v[1]*v[2]*t + v[0]*s,   v2[2] + (1-v2[2])*c,    0.0,
        0.0,                    0.0,                    0.0,                    1.0
    ];
    return matrixMultiply_mat4(A, R);
}

/**
 * 4th Order Matrix
 * @module mat4
 */
var mat4 = Object.freeze({
    __proto__: null,
    add: add_mat,
    subtract: subtract_mat,
    scalarMultiply: scalarMultiply_mat,
    matrixMultiply: matrixMultiply_mat4,
    determinant: determinant_mat4,
    identity: identity_mat4,

    view_lookAt: view_lookAt_vec4,
    proj_perspective: proj_perspectiveFrustum_vec4,

    translate: translate_mat4,
    scale: scale_mat4,
    rotate: rotate_mat4
});