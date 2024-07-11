import './style.css'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import House from "./public/LittlestTokyo.glb";

const rendereer = new THREE.WebGLRenderer({ antialias: true})


const stats = new Stats();
document.body.appendChild( stats.dom )
let mixer;
const clock = new THREE.Clock();

const w = window.innerWidth
const h = window.innerHeight
rendereer.setPixelRatio(window.devicePixelRatio);
rendereer.setSize(w,h);
document.body.appendChild(rendereer.domElement);


const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);

camera.position.set( 31.556565697674476, 8.419087947266402,43.3527286667318);

const scene = new THREE.Scene();
const pmremGenerator = new THREE.PMREMGenerator( rendereer );
scene.background = new THREE.Color( 0xbfe3dd )
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( rendereer ), 0.04 ).texture;

// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1,1),
//   new THREE.MeshBasicMaterial({color:"red"})
// )
// scene.add(mesh)

const controls = new OrbitControls( camera, rendereer.domElement);
controls.update()
controls.enableDamping = true;
controls.enablePan = false;

rendereer.render( scene , camera);


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/gltf/' );

loader.setDRACOLoader( dracoLoader )
loader.load('tokyo.glb',function (gltf){
  const model = gltf.scene;
				model.position.set( 1, 1, 1);
				model.scale.set( 0.1, 0.1,0.1 );
				scene.add( model );
        mixer = new THREE.AnimationMixer( model );
				mixer.clipAction( gltf.animations[0] ).play();

				rendereer.setAnimationLoop( animate2 );

},function ( xhr ) {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
function ( error ) {

  console.log( 'An error happened',error );

}
)

// function animate(){
//   window.requestAnimationFrame(animate);
//   rendereer.render( scene , camera);
// }

// animate();

function animate2() {

  const delta = clock.getDelta();

  mixer.update( delta );

  controls.update();

  stats.update();
  rendereer.render( scene, camera );

}


window.onresize = function(){
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w/h;
  camera.updateProjectionMatrix()
  rendereer.setSize(w,h)
  controls.update()
}
