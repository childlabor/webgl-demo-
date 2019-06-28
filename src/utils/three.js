import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import * as dat from 'dat.gui'

export function threeDemo() {
  // 场景
  const scene = new THREE.Scene();

  // 相机
  // PerspectiveCamera（透视摄像机）（视野角度，长宽比，远剪切面，近剪切面）
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  // 控制相机在整个3D环境中的位置
  camera.position.set( 200, 300, 250 );
  // camera.position.set( 0, 0, 100 );
  // 控制相机的焦点位置，决定相机的朝向
  camera.lookAt( 55, 130, 35 );

  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.setClearColor(0xe6cbc0) // 设置背景的颜色
  renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  document.body.appendChild( renderer.domElement );

  // 几何图形（骨架）
  const geometry = new THREE.BoxGeometry( 60, 60, 60 );

  // 加载器
  // 天空盒 贴图
  // 图片像素必须是2的幂次方且所有图片一致, 图片资源必须是线上资源不能为本地图片
  const loader = new THREE.CubeTextureLoader();
  loader.setPath( 'https://raw.githubusercontent.com/836939563/printscreen/master/cubetexture/' );
  const textureCube = loader.load([
    'px.jpg',
    'nx.jpg',
    'py.png',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg'
  ]);
  scene.background = textureCube;
  // let texture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/836939563/printscreen/master/cubetexture/px.jpg")
  // material.map = texture

  // 材质（皮肤）
  const material = new THREE.MeshPhongMaterial( { envMap: scene.background } );
  // const material = new THREE.MeshLambertMaterial( { color: 0x7777ff } );

  // 物体对象（几何图形 + 材质）
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true
  cube.position.x = 25;
  cube.position.y = 100;
  cube.position.z = 5;
  // 加入到场景
  scene.add( cube );

  // 底部平面
  var planeGeometry = new THREE.PlaneGeometry(300,300);
  var planeMaterial = new THREE.MeshStandardMaterial({color: 0xafaf66});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = - 0.5 * Math.PI;
  plane.position.y = 0;
  // plane.position.z = -60;
  // 告诉底部平面需要接收阴影
  plane.receiveShadow = true;
  scene.add(plane)

  // 灯光
  scene.add(new THREE.AmbientLight(0x444444));
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set( 150, 250, 0);
  //告诉平行光需要开启阴影投射
  spotLight.castShadow = true;
  scene.add(spotLight)

  // controls
  const controls = new OrbitControls( camera, renderer.domElement );
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  // 递归渲染
  const animate = function () {
    requestAnimationFrame( animate );
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    // 运动
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  };

  //辅助工具
  var helper = new THREE.AxisHelper(300);
  scene.add(helper);
  // var helperCamera = new THREE.CameraHelper( camera );
  // scene.add( helperCamera );
  // var spotLightHelper = new THREE.SpotLightHelper( spotLight );
  // scene.add( spotLightHelper );

  // 事件监听
  function btnEvent() {
    document.getElementById('reset').addEventListener('click', ()=>{
      controls.reset()
    })
  }

  btnEvent()
  animate();
}