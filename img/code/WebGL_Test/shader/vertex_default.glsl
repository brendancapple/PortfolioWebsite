precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

void main() 
{
    fragColor = vertColor;

    // MVP Matrix in PVM order due to column-order matrices
    gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
}