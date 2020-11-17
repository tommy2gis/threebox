function getRingMaterial(type = 0) {
  var ringShield = {
    uniforms: {
      color: {
        type: "c",
        value: new THREE.Color("#9999FF"),
      },
      time: {
        type: "f",
        value: 1.5,
      },
      type: {
        type: "f",
        value: type || 0,
      },
      num: {
        type: "f",
        value: 4,
      },
    },
    vertexShaderSource: `
            varying vec2 vUv;
            void main(){
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
    fragmentShaderSource: `
            uniform float time;
            uniform vec3 color;
            uniform float type;
            uniform float num;
            varying vec2 vUv;
            void main(){
                float alpha = 1.0;
                float dis = distance(vUv,vec2(0.5));//0-0.5
                if(dis > 0.5){
                    discard;
                }
                if(type ==0.0){
                        float y = (sin(6.0 * num *(dis-time)) + 1.0)/2.0;
                    alpha = smoothstep(1.0,0.0,abs(y-0.5)/0.5) * (0.5 -dis) * 2.;
                }else if(type ==1.0){
                        float step = fract(time* 4.)* 0.5;
                    if(dis<step){
                            // alpha = smoothstep(1.0,0.0,abs(step-dis)/0.15);
                        alpha =1.- abs(step-dis)/0.15;
                    }else{
                            alpha = smoothstep(1.0,0.0,abs(step-dis)/0.05);
                    }
                    alpha *= (pow((0.5 -dis)* 3.0,2.0));
                }
                gl_FragColor = vec4(color,alpha );
            }`,
  };
  let material = new THREE.ShaderMaterial({
    uniforms: ringShield.uniforms,
    defaultAttributeValues: {},
    vertexShader: ringShield.vertexShaderSource,
    fragmentShader: ringShield.fragmentShaderSource,
    blending: THREE.AdditiveBlending,
    depthWrite: !1,
    depthTest: !0,
    side: THREE.DoubleSide,
    transparent: !0,
    fog: !0,
  });
  return material;
}

function getShaderBarMaterial() {
  var vertexShader = [
    "varying vec3 vColor;",
    "varying vec3	vVertexNormal;",
    "varying vec2 vUv;",
    "varying float v_pz; ",
    "void main(){",
    "   v_pz = position.y; ", //获取顶点位置的y
    "	vVertexNormal	= normal;", //顶点法向量---内置  http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/renderers/webgl/WebGLProgram
    "   vColor = color;", //顶点颜色
    "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);", //顶点位置
    "}",
  ].join("\n");
  var fragmentShader = [
    "uniform float	boxH;", //立方体高度，uniform传入
    "varying vec3	vVertexNormal;", //顶点法向量，由顶点着色器传入--插值
    "varying vec3 vColor;", //顶点颜色，由顶点着色器传入--插值
    "varying vec2 vUv;", //纹理坐标，顶点着色器传入
    "varying float v_pz; ", //y的值，顶点着色器传入
    "float plot ( float pct){", //pct是box的高度，v_pz是y的值
    "return  smoothstep( pct-8.0, pct, v_pz) -", //（smoothstep(edge1,edge2,x)）smoothstep函数定义从0到1之间由edge1和edge2上下边界，x为输入值，返回插值
    "smoothstep( pct, pct+0.02, v_pz);", //不在0-1范围内的数会被归一化到0和1内，越界会被设为0/1
    "}",
    "void main(){",
    "float f1 = plot(boxH);", //以当前盒子的高度（光效），和y的值计算出颜色
    "vec4 b1 = mix(vec4(1.0,1.0,1.0,1.0),vec4(f1,f1,f1,1.0),0.8);",
    "gl_FragColor = mix(vec4(vColor,1.0),b1,f1);", //混合两种颜色
    "gl_FragColor = vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,0.9);", //重新设置片元颜色
    "}",
  ].join("\n");
  const ShaderBar = {
    uniforms: {
      boxH: { value: -10.0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const material = new THREE.ShaderMaterial({
    uniforms: ShaderBar.uniforms,
    vertexShader: ShaderBar.vertexShader,
    fragmentShader: ShaderBar.fragmentShader,
    vertexColors: ShaderBar, //暂时未理解该处作用
  });
  material.ShaderBar = ShaderBar;

  return material;
}

function getSphereMaterial() {
  let tx = new THREE.TextureLoader().load("images/wall1.png");
  tx.wrapS = THREE.RepeatWrapping;
  tx.wrapT = THREE.RepeatWrapping;
  var uniforms = {
    scale: { value: -1.0 },
    bias: { value: 1.0 },
    power: { value: 3.3 },
    glowColor: { value: new THREE.Color(0x00ffff) },
    textureMap: {
      value: tx,
    },
    repeat: {
      value: new THREE.Vector2(30.0, 15.0),
    },
    time: {
      value: 0.0,
    },
  };

  let shader = { vs: "", fs: "" };

  shader.vs = `  varying vec3 vNormal;
    varying vec3 vPositionNormal;
    varying vec2 vUv;
    void main() 
    {
        vUv = uv;
        vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
        vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`;

  shader.fs = `uniform vec3 glowColor;
    uniform float bias;
    uniform float power;
    uniform float scale;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    uniform sampler2D textureMap;
    uniform vec2 repeat;
    varying vec2 vUv;
    uniform float time;
    void main() 
    {
        float a = pow( bias + scale * abs(dot(vNormal, vPositionNormal)), power );
        //*(vec2(1.0,time))
        vec4 mapColor=texture2D( textureMap, vUv*repeat);
        gl_FragColor = vec4( glowColor*mapColor.rgb, a );
    }`;

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vs,
    fragmentShader: shader.fs,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  return material;
}

function getWallMaterial() {
  var uniforms = {
    time: { value: 1.5 },
    colorTexture: { value: new THREE.TextureLoader().load("images/wall.png") },
    colorTexture1: {
      value: new THREE.TextureLoader().load("images/wall1.png"),
    },
  };

  let shader = { vs: "", fs: "" };

  shader.vs = `varying vec2 vUv;
      varying vec3 fNormal;
      varying vec3 vPosition;
      void main()
      {
          vUv = uv;
          fNormal=normal;
          vPosition=position;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
      }`;

  shader.fs = `uniform float time;
      varying vec2 vUv;
      uniform sampler2D colorTexture;
      uniform sampler2D colorTexture1;
      varying vec3 fNormal;
      varying vec3 vPosition;
      void main( void ) {
          vec2 position = vUv;
          vec3 tempNomal= normalize(fNormal);
          float power=step(0.95,abs(tempNomal.y));
          vec4 colorb=texture2D(colorTexture1,position.xy);
          vec4 colora = texture2D(colorTexture,vec2(vUv.x,fract(vUv.y-time))); 
          if(power>0.95){
              gl_FragColor =colorb;
          }else{
              gl_FragColor =colorb+colorb*colora;      
          }         
      }`;
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vs,
    fragmentShader: shader.fs,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  return material;
}

function getConeMaterial(color) {
  var uniforms = {
    dtPyramidTexture: {
      value: new THREE.TextureLoader().load("images/wall1.png"),
    },
    time: {
      value: 0.0,
    },
    uColor: {
      value: new THREE.Color(color || "#5588aa"),
    },
  };

  let shader = { vs: "", fs: "" };

  shader.vs =
    "varying vec2 vUv;\n" +
    "void main(){\n" +
    "vUv = uv;\n" +
    "gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );\n" +
    "}\n";

  shader.fs =
    "uniform float time;\n" +
    "varying vec2 vUv;\n" +
    "uniform sampler2D dtPyramidTexture;\n" +
    "uniform vec3 uColor;\n" +
    "void main() {\n" +
    " vec2 st = vUv;\n" +
    " vec4 colorImage = texture2D(dtPyramidTexture, vec2(vUv.x,fract(vUv.y-time)));\n" +
    //'float alpha=mix(0.1,1.0,clamp((1.0-vUv.y) * uColor.a,0.0,1.0)) +(1.0-sign(vUv.y-time*0.001))*0.2*(1.0-colorImage.r);\n'+
    "vec3 diffuse =(1.0-colorImage.a)*vec3(0.8,1.0,0.0)+colorImage.rgb*vec3(0.8,1.0,0);\n" +
    "gl_FragColor = vec4(diffuse,0.7);\n" +
    "}\n";
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vs,
    fragmentShader: shader.fs,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  return material;
}

function getFireMaterial() {
  var uniforms = {
    uMap: {
      value: new THREE.TextureLoader().load("images/flame.png"),
    },
    uColor1: {
      value: new THREE.Color(0x961800),
    },
    uColor2: {
      value: new THREE.Color(0x4b5828),
    },
    uTime: {
      value: 0,
    },
  };

  let shader = { vs: "", fs: "" };

  shader.vs =
    "attribute vec4 orientation;  attribute vec3 offset;  attribute vec2 scale;  attribute float life;  attribute float random;  varying vec2 vUv;  varying float vRandom;  varying float vAlpha;  float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {      float oldRange = oldMax - oldMin;      float newRange = newMax - newMin;      return (((oldValue - oldMin) * newRange) / oldRange) + newMin;  }float pcurve(float x, float a, float b) {      float k = pow(a + b, a + b) / (pow(a, a) * pow(b, b));      return k * pow(x, a) * pow(1.0 - x, b);  }  void main() {      vUv = uv;      vRandom = random;      vAlpha = pcurve(life, 1.0, 2.0);      vec3 pos = position;      pos.xy *= scale * vec2(range(pow(life, 1.5), 0.0, 1.0, 1.0, 0.6), range(pow(life, 1.5), 0.0, 1.0, 0.6, 1.2));      vec4 or = orientation;      vec3 vcV = cross(or.xyz, pos);      pos = vcV * (2.0 * or.w) + (cross(or.xyz, vcV) * 2.0 + pos);      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  }";

  shader.fs =
    " uniform sampler2D uMap;  uniform vec3 uColor1;  uniform vec3 uColor2;  uniform float uTime;  varying vec2 vUv;  varying float vAlpha;  varying float vRandom;  void main() {      vec2 uv = vUv;      float spriteLength = 10.0;      uv.x /= spriteLength;      float spriteIndex = mod(uTime * 0.1 + vRandom * 2.0, 1.0);      uv.x += floor(spriteIndex * spriteLength) / spriteLength;      vec4 map = texture2D(uMap, uv);      gl_FragColor.rgb = mix(uColor2, uColor1, map.r);      gl_FragColor.a = vAlpha * map.a;  }";
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shader.vs,
    fragmentShader: shader.fs,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return material;
}
