precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertNormal;
attribute vec2 vertTexCoord;

varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragTexCoord;

uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

void main() 
{
    vec4 modelPosition = mModel * vec4(vertPosition, 1.0);

    fragPos = modelPosition.xyz;
    fragNormal = (mModel * vec4(vertNormal, 0.0)).xyz;
    fragTexCoord = vertTexCoord;

    // MVP Matrix in PVM order due to column-order matrices
    gl_Position = mProj * mView * modelPosition;
}