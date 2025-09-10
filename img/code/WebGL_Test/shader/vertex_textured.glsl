precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;

varying vec2 fragTexCoord;

uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

void main() 
{
    fragTexCoord = vertTexCoord;

    // MVP Matrix in PVM order due to column-order matrices
    gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
}