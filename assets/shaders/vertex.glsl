uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

uniform float uTime;

void main()
{
    vec3 newPos = position;

    float dist = distance(vec2(newPos.x,newPos.y),uHover);

    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPos, 1.0);

}