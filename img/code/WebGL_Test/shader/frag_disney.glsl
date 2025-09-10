#define PI 3.1415926535
#define MAX_DIRECTION_LIGHTS 4

precision mediump float;

struct dirLight 
{
    vec3 intensity;
    vec3 direction;
};

varying vec3 fragPos;
varying vec3 fragNormal;
varying vec2 fragTexCoord;

uniform vec3 eyePos;

uniform vec3 ambientLight;
uniform dirLight directionLights[MAX_DIRECTION_LIGHTS];

uniform vec3 matSpecular;
uniform vec3 matEmission;
uniform float matRoughness;
uniform float matMetallic;

uniform sampler2D samplerTex0;

void main()
{
    vec4 texel = texture2D(samplerTex0, fragTexCoord);
    vec3 normal_surface = normalize(fragNormal);
    vec3 normal_eye = normalize(eyePos - fragPos);

    float fresnel_F0 = length(matSpecular); // F_0
    float alpha2 = matRoughness * matRoughness * matRoughness * matRoughness; // alpha^2 = R^4
    float alpha_g = pow( (0.5 + matRoughness / 2.0), 2.0 ); // alpha_g = (0.5 + R/2)^2
    float doubleRoughness = 2.0 * matRoughness; // 2R
    float dot_eyeNormal = dot(normal_eye, normal_surface); // cos(theta_v) = w_o dot n

    // Render Equation
    // L_o = L_e + L_a
    vec3 illumination = matEmission + ambientLight;

    // + L_r
    // L_r = int_omega(f_r * L_i * (w_i dot n) ) dw_i
    for (int i = 0; i < MAX_DIRECTION_LIGHTS; i++) {
        vec3 intensity_light = directionLights[i].intensity;
        vec3 normal_light = normalize(directionLights[i].direction);

        // Safety Check
        if ( intensity_light == vec3(0.0,0.0,0.0) || normal_light == vec3(0.0,0.0,0.0) ) {
            break;
        }

        vec3 normal_half = normalize( normal_eye + normal_light ); // h = (w_o + w_i) / ||w_o + w_i||

        float dot_lightNormal = dot(normal_light, normal_surface); // cos(theta_l) = w_i dot n
        float dot_halfNormal = dot(normal_half, normal_surface); // cos(theta_h) = h dot n
        float dot_halfLight = dot(normal_half, normal_light); // cos(theta_d) = h dot w_i

        float fresnel_D90 = 0.5 + doubleRoughness * dot_halfLight * dot_halfLight; // F_D90 = 0.5 + 2R cos^2(theta_d)
        float fresnel_D90_sub1 = fresnel_D90 - 1.0; // F_D90 - 1
        vec3 diffuse = texel.rgb / PI * ( 1.0 + fresnel_D90_sub1 * pow( 1.0 - dot_lightNormal, 5.0) ) * ( 1.0 + fresnel_D90_sub1 * pow( 1.0 - dot_eyeNormal, 5.0) );

        float specular_GGX = alpha2 / (PI * pow( (alpha2-1.0) * dot_halfNormal * dot_halfNormal + 1.0, 2.0 ) );
        float specular_Fresnel = fresnel_F0 + (1.0-fresnel_F0) * pow( 1.0 - dot_halfLight, 5.0 );
        float x_GGX = dot_halfLight / ( alpha_g * sqrt( 1.0 - dot_halfLight * dot_halfLight) );  
        float specular_Smith = 1.0 / ( 0.5 + sqrt (1.0 + 1.0 / (x_GGX * x_GGX) ) / 2.0 );

        float denominator_lightNormal = dot_lightNormal < 0.0 ? min(dot_lightNormal, -0.1) : max(dot_lightNormal, 0.1);
        float specular = (specular_GGX * specular_Fresnel * specular_Smith) / (4.0 * dot_eyeNormal * denominator_lightNormal);

        vec3 illumination_component = intensity_light * diffuse * (1.0 - matMetallic) + specular * mix(intensity_light, matSpecular, matMetallic);

        // Shadows cannot be deeper than black
        illumination += vec3( max(illumination_component[0], 0.0), max(illumination_component[1], 0.0), max(illumination_component[2], 0.0) );
    }

    gl_FragColor = vec4(illumination, texel.a);
}