import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";
import * as Astronomy from "./astronomy-engine.js";
import { DateTime } from "./luxon.js";
const loader = new GLTFLoader();
const scene = new THREE.Scene();

// 获取日期时间输入框元素
const datetimeInput = document.getElementById("datetime-moon");
let datetime = DateTime.now().setZone("utc");

console.log(Astronomy.GeoMoon(-1000000));
console.log(Astronomy.GeoMoonState(-1000000));

// 设置日期输入框的值
datetimeInput.value = datetime.toISO().slice(0, 16);
datetime = datetime.toMillis();
const lon = document.getElementById("lon");
const lat = document.getElementById("lat");
const pa = document.getElementById("pa");
const sunLon = document.getElementById("sun-lon");
const sunLat = document.getElementById("sun-lat");
const horizon = document.getElementById("horizon");
const dist = document.getElementById("distance");

let isPlaying = true; // 控制动画是否正在播放
let includePA = true; //if position angle of axis is included
let includeShadow = false;
// 按钮点击事件处理函数
document.getElementById("toggleButton").addEventListener("click", function () {
  isPlaying = !isPlaying; // 切换播放状态
  // 根据播放状态修改按钮文本
  if (isPlaying) {
    this.textContent = "Pause";
    animate();
  } else {
    this.textContent = "Play";
  }
});
document.getElementById("setButton").addEventListener("click", function () {
  datetime = DateTime.fromISO(datetimeInput.value + "Z").setZone("utc");
  datetime = +datetime;
  updateOneframe(datetime);
});
document.getElementById("view").addEventListener("click", function () {
  updateFromLibration(
    Number(lon.value),
    Number(lat.value),
    Number(pa.value),
    Number(sunLon.value),
    Number(sunLat.value)
  );
});
const paExclude = document.getElementById("pa-exclude");
paExclude.addEventListener("click", function () {
  if (paExclude.checked) {
    includePA = false;
    horizon.innerText = "orbital plane of Moon";
    updateOneframe(datetime);
  } else {
    includePA = true;
    horizon.innerText = "equator";
    updateOneframe(datetime);
  }
});

// 创建辅助点的几何体和材质
const geometry = new THREE.SphereGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// Declare a variable to store the reference to the helper point
let helperPoint;
// Get the checkbox element
const checkboxHelper = document.getElementById("helper-point");
// Add an event listener for the "change" event
checkboxHelper.addEventListener("change", function () {
  if (checkboxHelper.checked) {
    // If the checkbox is checked, create the helper point and add it to the scene
    helperPoint = new THREE.Mesh(geometry, material);
    helperPoint.position.set(-2000, 0, 0);
    scene.add(helperPoint);
  } else {
    // If the checkbox is unchecked, remove the helper point from the scene
    if (helperPoint) {
      scene.remove(helperPoint);
      helperPoint = undefined; // Clear the reference
    }
  }
  updateOneframe(datetime);
});

// // 创建平行光
const defaultIntensity = 5;
const directionalLight = new THREE.DirectionalLight(0xffffff, 0); // 白色平行光
directionalLight.position.set(-100, 0, 0); // 设置光源的初始位置
// directionalLight.shadow.bias = -0.0005;
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, defaultIntensity);
scene.add(ambientLight);
const checkboxShadow = document.getElementById("shadow");
// Add an event listener for the "change" event
checkboxShadow.addEventListener("change", function () {
  if (checkboxShadow.checked) {
    includeShadow = true;
    // If the checkbox is checked, decrease ambience light, increase directional light
    directionalLight.intensity = defaultIntensity;
    ambientLight.intensity = 0.5;
  } else {
    // If the checkbox is unchecked, decrease directional light, increase amb light
    directionalLight.intensity = 0;
    ambientLight.intensity = defaultIntensity;
    includeShadow = false;
  }
  updateOneframe(datetime);
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 设置相机的位置和视点
const camera = new THREE.PerspectiveCamera(
  0.8, //fov of moon is 1/2 degree
  window.innerWidth / window.innerHeight,
  1,
  65536
);
camera.position.x = -38439.9; //distance 384399 km
camera.lookAt(new THREE.Vector3(0, 0, 0));

// renderer.render(scene, camera);

let model;
const textureLoader = new THREE.TextureLoader();
const displacement = textureLoader.load("./javascript/displacement.jpg");

loader.load(
  "Moon_1_3474.glb", //[-500,500]
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.scale.set(
      (1737.1 / 500) * 0.1,
      (1737.1 / 500) * 0.1,
      (1737.1 / 500) * 0.1
    ); // 你可以根据需要调整缩放比例， moon mean radius 1,737.10 km
    // 遍历模型的所有子对象，查找其中的所有 Mesh 对象
    // model.traverse((child) => {
    //   if (child.isMesh) {
    //     // 如果当前子对象是 Mesh 对象，即包含了一个或多个三角面片

    //     // 获取当前子对象的材质（可能是一个单独的材质，也可能是材质数组）
    //     let materials = child.material;

    //     // 将材质属性设置为需要的值
    //     if (Array.isArray(materials)) {
    //       // 如果当前子对象有多个材质
    //       for (let material of materials) {
    //         // 调整材质属性，比如设置颜色、透明度、反射率等
    //         material.color.set(0xff0000); // 设置颜色为红色
    //         material.opacity = 0.5; // 设置透明度为 0.5
    //         // 其他材质属性的调整
    //       }
    //     } else {
    //       // // materials.normalMap = normal;
    //       // materials.displacementMap = displacement;
    //       // materials.displacementScale = 10;
    //     }
    //   }
    // });

    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  if (isPlaying) {
    requestAnimationFrame(animate);
    // 如果模型加载成功
    datetime += 1800000;
    const newDate = DateTime.fromMillis(datetime).setZone("utc");
    datetimeInput.value = newDate.toISO().slice(0, 16);
    updateOneframe(datetime);
  }
}
function date2ut(date) {
  return (+date - 946728000000) / 86400000;
}
function updateOneframe(timeCal) {
  if (model) {
    const time = new Astronomy.AstroTime(date2ut(timeCal));
    // console.log(time);
    const libration = Astronomy.Libration(time);
    // 每帧旋转一定角度
    // const currentRotation = model.rotation.toArray(); // 将当前欧拉角转换为数组
    libration.elon = libration.elon + 0.0003401946904021133;
    libration.elat = libration.elat - 0.022385236696709897;

    lon.value = libration.elon.toFixed(3);
    lat.value = libration.elat.toFixed(3);
    let paValue = libration.position_angle_axis;
    if (paValue < 0) {
      paValue += 360;
    }
    pa.value = paValue.toFixed(3);
    sunLon.value = libration.sub_sun_lon.toFixed(3);
    sunLat.value = libration.sub_sun_lat.toFixed(3);

    dist.innerHTML = libration.dist_km.toFixed(1);
    camera.position.x = -libration.dist_km / 10;
    updateFromLibration(
      libration.elon,
      libration.elat,
      libration.position_angle_axis,
      libration.sub_sun_lon,
      libration.sub_sun_lat
    );
  }
}
function updateFromLibration(lon, lat, positionAngle, sunLon, sunLat) {
  const newLon = (lon / 180) * Math.PI;
  const newLat = (lat / 180) * Math.PI;
  model.rotation.set(0, -newLon, 0); // 更新模型的旋转
  model.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), newLat);
  if (includePA) {
    model.rotateOnWorldAxis(
      new THREE.Vector3(-1, 0, 0),
      (positionAngle / 180) * Math.PI
    );
  }
  // // 每次更新光源角度
  if (includeShadow) {
    // to xyz
    const local = Astronomy.VectorFromSphere(
      new Astronomy.Spherical(sunLat, sunLon, 1),
      0
    );
    // to three vector
    const localThree = new THREE.Vector3(-local.x, local.z, local.y);

    // 获取模型的世界变换矩阵的逆矩阵
    // const worldInverseMatrix = new THREE.Matrix4();
    // worldInverseMatrix.copy(model.matrixWorld).invert();

    // 将局部 X 轴方向向量转换到模型的局部坐标系中
    const rotatedLocalX = localThree.applyMatrix4(model.matrixWorld);

    // 输出旋转后的向量
    directionalLight.position.set(
      rotatedLocalX.x,
      rotatedLocalX.y,
      rotatedLocalX.z
    );
  }
  // const thetaIncrement = 3; // 每次增加的角度
  // const currentRotationLight = directionalLight.position.toArray(); // 将当前角度转换为数组
  // const newTheta = currentRotationLight[0] + thetaIncrement; // 计算新的角度
  // directionalLight.position.set(newTheta % 180, 2, 2); // 更新光源的位置
  renderer.render(scene, camera);
}
