precision mediump float;

varying vec2 fragTexCoord;

uniform sampler2D samplerTex0;

void main()
{
    gl_FragColor = texture2D(samplerTex0, fragTexCoord);
}