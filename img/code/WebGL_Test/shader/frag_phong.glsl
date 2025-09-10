#define MAX_DIRECTION_LIGHTS 4

precision mediump float;

struct dirLight 
{
    vec3 intensity;
    vec3 direction;
};

varying vec3 fragNormal;
varying vec2 fragTexCoord;

uniform vec3 ambientLight;
uniform dirLight directionLights[MAX_DIRECTION_LIGHTS];

uniform sampler2D samplerTex0;

void main()
{
    vec4 texel = texture2D(samplerTex0, fragTexCoord);
    vec3 normal_surface = normalize(fragNormal);

    vec3 illumination = ambientLight;
    for (int i = 0; i < MAX_DIRECTION_LIGHTS; i++) {
        vec3 intensity_directionalLight = directionLights[i].intensity;
        vec3 direction_directionalLight = normalize(directionLights[i].direction);

        illumination +=intensity_directionalLight * max(dot(normal_surface, direction_directionalLight), 0.0);
    }

    gl_FragColor = vec4(texel.rgb * illumination, texel.a);
}