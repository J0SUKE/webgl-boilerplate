uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

uniform float uTime;
uniform float uHoverState;
uniform vec2 uHover;
uniform float uScrollSpeed;
uniform float uScale;

void main()
{
    vec3 newPos = position;

    newPos.z += 0.1*sin(uScrollSpeed*uv.y*2.0);

    newPos.x *= uScale;

    float dist = distance(vec2(newPos.x,newPos.y),uHover);

    vUv = uv;

    //vUv.x += uHoverState *0.01* sin((dist+vUv.y)*7.0 + uTime*6.0);
    newPos.x += uHoverState *0.01* sin((-dist+vUv.y)*5.0 + uTime*3.0);
    newPos.y += uHoverState *0.01* cos((-dist+vUv.x)*5.0 + uTime*3.0);
    vUv.y += uHoverState *0.01* cos((dist+vUv.x)*7.0 + uTime*6.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPos, 1.0);

}