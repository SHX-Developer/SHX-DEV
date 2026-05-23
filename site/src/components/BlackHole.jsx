import { useEffect, useRef } from 'react'

/*
 * Gargantua-style black hole rendered with a WebGL fragment shader.
 * Light rays are integrated along curved geodesics so the accretion disk
 * lenses over/under the event horizon. This mirrors blackhole.html, with the
 * orange disk palette replaced by the site's purple -> pink palette.
 * Ambient only: slow auto-rotation, no scroll/pointer hijacking.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_cam;
uniform vec2  u_mouse;
uniform float u_fov;

#define PI 3.14159265359

float hash(vec3 p){
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x){
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

vec3 starField(vec3 dir){
  vec3 col = vec3(0.0);
  for (int i = 0; i < 3; i++){
    float scale = 220.0 + float(i) * 360.0;
    vec3 p = dir * scale;
    vec3 ip = floor(p);
    float h = hash(ip + float(i) * 11.7);
    float thresh = 0.991 - float(i) * 0.001;
    if (h > thresh){
      vec3 fp = fract(p) - 0.5;
      float d = length(fp);
      float bright = smoothstep(0.5, 0.0, d);
      bright = pow(bright, 8.0);
      float tw = 0.6 + 0.4 * sin(u_time * (1.0 + h * 4.0) + h * 30.0);
      vec3 tint = mix(vec3(0.80, 0.72, 1.0), vec3(1.0, 0.78, 0.94), hash(ip + 3.3));
      col += bright * tw * tint * (0.8 + h);
    }
  }
  float neb = fbm(dir * 4.0 + 10.0);
  neb = smoothstep(0.55, 1.0, neb);
  vec3 nebCol = mix(vec3(0.08, 0.03, 0.12), vec3(0.20, 0.07, 0.22), fbm(dir * 8.0));
  col += nebCol * neb * 0.55;
  return col;
}

vec3 diskColor(vec3 pos, vec3 vel, float rs){
  float r = length(pos.xz);
  float inner = rs * 2.2;
  float outer = rs * 9.0;
  if (r < inner || r > outer) return vec3(0.0);

  float t = (r - inner) / (outer - inner);
  float ang = atan(pos.z, pos.x);
  float spin = u_time * (1.6 / pow(r / inner, 1.5));
  vec3 sp = vec3(cos(ang*3.0 + spin)*r, ang*2.0, sin(ang*3.0 + spin)*r);
  float leftDrift = u_time * 0.34;
  vec3 smokeFlow = vec3(pos.x * 0.42 - leftDrift, pos.z * 0.34 + spin * 0.12, r * 0.18);
  float smoke = fbm(smokeFlow) * 0.62 + fbm(smokeFlow * 1.85 + vec3(-leftDrift * 0.7, 2.0, 0.0)) * 0.38;
  float tex = fbm(vec3(ang * 3.0 + spin * 2.0 - leftDrift * 0.55, r * 1.2, spin));
  tex = mix(tex, smoke, 0.42);
  float bands = 0.6 + 0.4 * fbm(vec3(r * 6.0, ang * 8.0 - spin * 3.0 - leftDrift, 0.0));
  bands *= 0.82 + 0.24 * smoke;
  tex += dot(sp, sp) * 0.0;

  vec3 hot  = vec3(1.0, 0.90, 0.98);
  vec3 mid  = vec3(1.0, 0.40, 0.85);
  vec3 cool = vec3(0.52, 0.16, 0.92);
  vec3 col = mix(hot, mid, smoothstep(0.0, 0.45, t));
  col = mix(col, cool, smoothstep(0.4, 1.0, t));

  float bright = (1.0 - smoothstep(0.0, 1.0, t));
  bright *= 0.55 + 0.9 * tex;
  bright *= bands;
  bright *= 0.88 + 0.22 * smoothstep(0.25, 0.92, smoke);
  bright *= smoothstep(1.0, 0.85, t);
  bright *= smoothstep(0.0, 0.12, t);

  vec3 orbitDir = normalize(vec3(-pos.z, 0.0, pos.x));
  float doppler = dot(orbitDir, normalize(vel));
  float beam = clamp(1.0 + 0.9 * doppler, 0.25, 2.2);
  col = mix(col, col + vec3(0.12, 0.08, 0.32), max(0.0, doppler) * 0.6);
  col = mix(col, col * vec3(1.08, 0.70, 0.86), max(0.0, -doppler) * 0.5);

  return col * bright * beam * 2.4;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;

  float rs = 1.0;

  vec3 ro = u_cam;
  vec3 fwd = normalize(-ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  vec3 rd = normalize(fwd + (uv.x * right + uv.y * up) * u_fov);

  vec3 pos = ro;
  vec3 vel = rd;
  vec3 h = cross(pos, vel);
  float h2 = dot(h, h);

  vec3 color = vec3(0.0);
  float transmit = 1.0;
  bool captured = false;

  const int STEPS = 260;
  float dt = 0.16;

  for (int i = 0; i < STEPS; i++){
    float r = length(pos);
    if (r < rs){ captured = true; break; }
    if (r > 60.0) break;

    float step = dt * clamp(r * 0.18, 0.35, 2.2);
    vec3 prev = pos;

    vec3 acc = -1.5 * h2 * pos / pow(dot(pos, pos), 2.5);
    vel += acc * step;
    pos += vel * step;

    if (prev.y * pos.y < 0.0){
      float f = prev.y / (prev.y - pos.y);
      vec3 hit = mix(prev, pos, f);
      vec3 dc = diskColor(hit, vel, rs);
      float dens = clamp(length(dc) * 0.6, 0.0, 1.0);
      color += dc * transmit;
      transmit *= (1.0 - dens * 0.85);
    }
  }

  if (!captured){
    vec3 bg = starField(normalize(vel));
    color += bg * transmit;
  }

  color = color / (color + vec3(1.0));
  color = pow(color, vec3(0.4545));

  float vig = smoothstep(1.25, 0.2, length(uv));
  color *= 0.55 + 0.45 * vig;

  gl_FragColor = vec4(color, 1.0);
}
`

export default function BlackHole({ height = 600 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return undefined

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uCam = gl.getUniformLocation(prog, 'u_cam')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uFov = gl.getUniformLocation(prog, 'u_fov')

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr))
      const hpx = Math.max(1, Math.floor(wrap.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== hpx) {
        canvas.width = w
        canvas.height = hpx
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // pause rendering when the hero is scrolled out of view
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0.01 },
    )
    io.observe(wrap)

    let raf = 0
    const start = performance.now()
    const yaw = 0.0
    const pitch = 0.2
    const dist = 15.8

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      const t = (performance.now() - start) / 1000

      const cx = dist * Math.cos(pitch) * Math.sin(yaw)
      const cy = dist * Math.sin(pitch)
      const cz = dist * Math.cos(pitch) * Math.cos(yaw)

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform3f(uCam, cx, cy, cz)
      gl.uniform2f(uMouse, 0, 0)
      gl.uniform1f(uFov, 1.02)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="bh-wrap bh-cinematic bh-webgl"
      style={{ width: '100vw', maxWidth: '100vw', height }}
    >
      <div className="bh-fallback" aria-hidden="true">
        <div className="bh-fallback-disk bh-fallback-disk-back" />
        <div className="bh-fallback-core" />
        <div className="bh-fallback-ring" />
        <div className="bh-fallback-disk bh-fallback-disk-front" />
      </div>
      <canvas ref={canvasRef} className="bh-gl-canvas" aria-hidden="true" />
    </div>
  )
}
