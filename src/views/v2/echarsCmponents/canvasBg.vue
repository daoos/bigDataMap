<template>
    <div id="theme2">
        <div class="ball">
            <div class="ball-cube">
                <div class="x1"></div>
                <div class="x2"></div>
                <div class="x3"></div>
                <div class="x4"></div>
                <div class="x5"></div>
                <div class="x6"></div>
                <div class="x7"></div>
                <div class="x8"></div>
                <div class="x9"></div>
                <div class="y1"></div>
                <div class="y2"></div>
                <div class="y3"></div>
                <div class="y4"></div>
                <div class="y5"></div>
                <div class="y6"></div>
                <div class="y7"></div>
                <div class="y8"></div>
                <div class="y9"></div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "src/assets/css/theme2.scss";
</style>

<script>
import * as THREE from 'three'
window.THREE = THREE
export default {
  mounted() {
    var vertexHeight = 15000;
    var planeDefinition = 100;
    var planeSize = 1245000;
    var totalObjects = 50000;
    var frame = 0;

    var container = document.createElement("div");
    // var container = document.getElementById('bgCanvas');
    container.className = "bgCanvas";
    document.body.appendChild(container);

    var camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      400000
    );
    camera.position.z = 550000;
    camera.position.y = 10000;
    camera.lookAt(new THREE.Vector3(0, 6000, 0));

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x23233f, 1, 300000);

    var uniforms = {
      time: { type: "f", value: 0.0 }
    };

    var demo1 = `uniform float time;
varying vec3 vNormal;
        
void main(void) {
    vec3 v = position;
    vNormal = normal;
    v.z += cos(2.0 * position.x + (time)) * 4085.5;
    
    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(v, 1.0);
}`,
      demo2 = `varying vec3 vNormal;
uniform float time;  
void main(void) {
    vec3 light = vec3(0.1, .9, .1);

    light = normalize(light);

    float dProd = max(0.2, dot(vNormal, light));

    gl_FragColor = vec4(dProd, // R
                        dProd, // G
                        dProd, // B
                        1.0);  // A
}`;

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: demo1,
      fragmentShader: demo2,
      wireframe: true,
      fog: false
    });

    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(
        planeSize,
        planeSize,
        planeDefinition,
        planeDefinition
      ),
      material
    );
    plane.rotation.x -= Math.PI * 0.5;

    scene.add(plane);

    var geometry = new THREE.Geometry();

    for (var i = 0; i < totalObjects; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * planeSize - planeSize * 0.5;
      vertex.y = Math.random() * 100000 + 10000;
      vertex.z = Math.random() * planeSize - planeSize * 0.5;
      geometry.vertices.push(vertex);
    }

    var material = new THREE.ParticleBasicMaterial({ size: 200 });
    var particles = new THREE.ParticleSystem(geometry, material);

    scene.add(particles);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    render();

    function render() {
      requestAnimationFrame(render);
      camera.position.z -= 150;
      uniforms.time.value = frame;
      frame += 0.02;
      //  dateVerts();
      renderer.render(scene, camera);
    }
  }
};
</script>


