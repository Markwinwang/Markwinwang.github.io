const regions = [
  {
    id: "hippocampus",
    name: "海马体",
    english: "Hippocampus",
    category: "快速索引系统",
    color: "#0f766e",
    position: [-0.25, -0.32, 0.72],
    scale: [0.95, 0.22, 0.18],
    summary: "新知识先在这里被快速绑定成 episode。它不是长期仓库，而是把时间、地点、概念、情绪和上下文做成可重放的索引。",
    function: "relational binding, indexing, pattern separation, pattern completion",
    analogy: "episodic memory index / vector store",
    tags: ["快速学习", "情景绑定", "模式分离", "模式补全"]
  },
  {
    id: "neocortex",
    name: "新皮层",
    english: "Neocortex",
    category: "长期世界模型",
    color: "#2563eb",
    position: [0, 0.08, 0],
    scale: [1.8, 1.04, 1.12],
    summary: "慢速、稳定、分布式地沉淀语义知识。反复调用和睡眠重放会把海马体依赖的记忆逐步整合进新皮层网络。",
    function: "semantic memory, abstraction, generalization, world model",
    analogy: "foundation model weights / long-term world model",
    tags: ["语义知识", "长期整合", "泛化", "世界模型"]
  },
  {
    id: "pfc",
    name: "前额叶",
    english: "Prefrontal Cortex",
    category: "注意与工作台",
    color: "#7c3aed",
    position: [0, 0.3, 1.15],
    scale: [0.75, 0.45, 0.25],
    summary: "前额叶帮助筛选什么值得进入记忆，并把信息放到工作记忆里进行比较、推理、组合和决策。",
    function: "attention gating, working memory, executive control",
    analogy: "context window + task manager",
    tags: ["注意筛选", "工作记忆", "执行控制", "目标导向"]
  },
  {
    id: "parietal",
    name: "顶叶网络",
    english: "Parietal Network",
    category: "工作记忆支架",
    color: "#0891b2",
    position: [0, 0.68, 0.12],
    scale: [0.95, 0.28, 0.36],
    summary: "顶叶和前额叶共同维持当前正在操作的信息，像认知桌面的空间支架，支持比较和心智旋转。",
    function: "maintenance, spatial attention, cognitive workspace",
    analogy: "active canvas / scratchpad",
    tags: ["空间注意", "认知桌面", "在线操作"]
  },
  {
    id: "amygdala",
    name: "杏仁核",
    english: "Amygdala",
    category: "情绪权重系统",
    color: "#dc2626",
    position: [0.46, -0.38, 0.62],
    scale: [0.26, 0.2, 0.24],
    summary: "杏仁核给记忆打情绪权重。恐惧、惊喜、奖励和羞耻会增强编码与巩固，也可能让记忆偏向核心情节而扭曲细节。",
    function: "emotional salience, threat, reward weighting",
    analogy: "priority weighting / reward signal",
    tags: ["情绪加权", "奖赏", "威胁", "显著性"]
  },
  {
    id: "basal",
    name: "基底节",
    english: "Basal Ganglia",
    category: "习惯与策略",
    color: "#b45309",
    position: [-0.55, -0.12, 0.34],
    scale: [0.34, 0.26, 0.3],
    summary: "基底节负责动作选择、强化学习和习惯化。技能从费力控制变成自动执行，离不开这套系统。",
    function: "habit policy, action selection, reinforcement learning",
    analogy: "RL policy / habit engine",
    tags: ["习惯", "强化学习", "动作选择", "自动化"]
  },
  {
    id: "cerebellum",
    name: "小脑",
    english: "Cerebellum",
    category: "误差校正系统",
    color: "#059669",
    position: [0, -0.72, -0.68],
    scale: [0.8, 0.36, 0.42],
    summary: "小脑处理误差校正、时序控制和精细协调。程序记忆中“练到不用想”的流畅感，很大一部分来自这里。",
    function: "error correction, timing, motor calibration",
    analogy: "motor controller / prediction error corrector",
    tags: ["技能校准", "误差修正", "时序", "协调"]
  },
  {
    id: "sensory",
    name: "感觉皮层",
    english: "Sensory Cortex",
    category: "多模态输入层",
    color: "#64748b",
    position: [0, 0.02, -1.05],
    scale: [1.05, 0.32, 0.2],
    summary: "视觉、听觉、触觉和语言输入先被转换成神经活动。记忆不是拍照，而是选择性压缩。",
    function: "multimodal encoding, feature extraction, perceptual trace",
    analogy: "multimodal input encoder",
    tags: ["视觉", "听觉", "语言", "选择性压缩"]
  }
];

const memoryTypes = [
  ["感觉记忆", "瞬时残影，快速衰减", "感觉皮层"],
  ["工作记忆", "当前正在操作的信息", "前额叶 / 顶叶"],
  ["情景记忆", "我经历过什么", "海马体 / 内侧颞叶"],
  ["语义记忆", "我知道什么", "新皮层"],
  ["程序记忆", "练到不用想的技能", "基底节 / 小脑"],
  ["情绪记忆", "恐惧、奖赏、偏好", "杏仁核"],
  ["习惯记忆", "自动化行为策略", "基底节"]
];

const journey = [
  ["01", "Encoding 编码", "外界输入转成神经活动", "sensory"],
  ["02", "Attention 注意", "重要、新颖、有情绪的信息被放行", "pfc"],
  ["03", "Working Memory", "在认知桌面上比较和推理", "parietal"],
  ["04", "Indexing 索引", "海马体绑定上下文和关系", "hippocampus"],
  ["05", "Separation 分离", "相似概念被切开，避免污染", "hippocampus"],
  ["06", "Completion 补全", "一个线索召回完整网络", "hippocampus"],
  ["07", "Consolidation", "睡眠重放推动新皮层整合", "neocortex"],
  ["08", "Reconsolidation", "每次回忆都会轻微重写", "pfc"]
];

const schemas = [
  {
    title: "新药项目框架",
    body: "target、MoA、患者选择、临床窗口、注册路径、商业化空间和 BD 稀缺性会成为挂钩点，新知识不再是碎片。"
  },
  {
    title: "AI 系统框架",
    body: "感觉输入像 multimodal encoder，工作记忆像 context window，海马体像 episodic index，新皮层像长期 world model。"
  },
  {
    title: "学习动作框架",
    body: "关联旧知识、切分相似概念、主动回忆、输出复述、间隔重访和睡眠巩固形成闭环。"
  }
];

const analogy = [
  ["感觉系统", "多模态输入"],
  ["注意力", "信息过滤器"],
  ["工作记忆", "context window"],
  ["海马体", "episodic memory index"],
  ["新皮层", "long-term world model"],
  ["杏仁核", "priority weighting"],
  ["基底节", "habit policy"],
  ["小脑", "error correction"],
  ["睡眠", "offline training"]
];

const knowledgeLane = [
  ["Episode", "先记住一次具体经历：在哪里看到、和什么旧知识相似、什么地方让人惊讶。"],
  ["Replay", "休息和睡眠中选择性重放关键神经模式，让新皮层有机会吸收。"],
  ["Schema", "当新知识能挂到既有框架上，系统巩固速度显著加快。"],
  ["World Model", "最终保留下来的不是原始录像，而是能指导未来判断的压缩模型。"]
];

let activeId = "hippocampus";
let scene;
let camera;
let renderer;
let raycaster;
let pointer;
let brainGroup;
let regionMeshes = new Map();
let labels = new Map();
let targetRotation = { x: -0.08, y: 0.22 };
let currentRotation = { x: -0.08, y: 0.22 };
let zoom = 4.8;
let isDragging = false;
let lastPointer = { x: 0, y: 0 };
let replayUntil = 0;
let pulses = [];
let fallbackState = null;

const $ = (selector) => document.querySelector(selector);

function mountLists() {
  const list = $("#regionList");
  list.innerHTML = regions.map((region) => `
    <button class="region-button" type="button" data-region="${region.id}">
      <span class="dot" style="background:${region.color}"></span>
      <span><strong>${region.name}</strong><small>${region.english}</small></span>
    </button>
  `).join("");

  const tabs = $("#memoryTabs");
  tabs.innerHTML = memoryTypes.map((item, index) => `
    <button class="memory-tab" type="button" data-memory="${index}">
      <span class="dot" style="background:${index % 2 ? "#2563eb" : "#0f766e"}"></span>
      <span><strong>${item[0]}</strong><small>${item[2]}</small></span>
    </button>
  `).join("");

  const flow = $("#flowMap");
  flow.innerHTML = journey.map((step, index) => `
    <button class="flow-node" type="button" data-region="${step[3]}" data-step="${index}">
      <i>${index + 1}</i>
      <span><strong>${step[1]}</strong><small>${step[2]}</small></span>
    </button>
  `).join("");

  const track = $("#journeyTrack");
  track.innerHTML = journey.map((step, index) => `
    <button class="journey-step" type="button" data-region="${step[3]}" data-step="${index}">
      <em>${step[0]}</em>
      <strong>${step[1]}</strong>
      <p>${step[2]}</p>
    </button>
  `).join("");

  const schemaControls = $("#schemaControls");
  schemaControls.innerHTML = schemas.map((schema, index) => `
    <button class="schema-button" type="button" data-schema="${index}">
      <strong>${schema.title}</strong>
    </button>
  `).join("");

  $("#knowledgeLane").innerHTML = knowledgeLane.map((item) => `
    <div class="knowledge-card">
      <strong>${item[0]}</strong>
      <p>${item[1]}</p>
    </div>
  `).join("");

  $("#analogyGrid").innerHTML = analogy.map((item) => `
    <div class="analogy-card">
      <strong>${item[0]}</strong>
      <p>${item[1]}</p>
    </div>
  `).join("");
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const regionButton = event.target.closest("[data-region]");
    if (regionButton) selectRegion(regionButton.dataset.region);

    const schemaButton = event.target.closest("[data-schema]");
    if (schemaButton) selectSchema(Number(schemaButton.dataset.schema));

    const memoryTab = event.target.closest("[data-memory]");
    if (memoryTab) selectMemory(Number(memoryTab.dataset.memory));
  });

  $("#replayBtn").addEventListener("click", startReplay);
  $("#focusBtn").addEventListener("click", () => selectRegion("hippocampus", true));
  $("#resetBtn").addEventListener("click", resetView);
}

function selectRegion(id, focus = false) {
  const region = regions.find((item) => item.id === id) || regions[0];
  activeId = region.id;

  $("#activeTitle").textContent = region.name;
  $("#activeCategory").textContent = region.category;
  $("#detailTitle").textContent = `${region.name} ${region.english}`;
  $("#detailSummary").textContent = region.summary;
  $("#detailFunction").textContent = region.function;
  $("#detailAnalogy").textContent = region.analogy;
  $("#detailTags").innerHTML = region.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  $("#canvasStatus").textContent = `${region.name} 已选中 · 拖拽旋转 · 点击脑区`;

  document.querySelectorAll("[data-region]").forEach((node) => {
    node.classList.toggle("active", node.dataset.region === region.id);
  });

  regionMeshes.forEach((mesh, meshId) => {
    const selected = meshId === region.id;
    mesh.material.opacity = selected ? 0.96 : 0.46;
    mesh.material.emissiveIntensity = selected ? 0.18 : 0.02;
    mesh.scale.setScalar(selected ? 1.08 : 1);
  });

  if (focus && region.position) {
    targetRotation.y = -region.position[0] * 0.8;
    targetRotation.x = region.position[1] * 0.18 - 0.08;
    zoom = region.id === "hippocampus" ? 4.25 : 4.8;
  }
}

function selectSchema(index) {
  const schema = schemas[index] || schemas[0];
  $("#schemaOutput").innerHTML = `<strong>${schema.title}</strong>${schema.body}`;
  document.querySelectorAll("[data-schema]").forEach((node) => {
    node.classList.toggle("active", Number(node.dataset.schema) === index);
  });
}

function selectMemory(index) {
  const item = memoryTypes[index] || memoryTypes[0];
  $("#schemaOutput").innerHTML = `<strong>${item[0]}</strong>${item[1]}。主要依赖：${item[2]}。`;
  document.querySelectorAll("[data-memory]").forEach((node) => {
    node.classList.toggle("active", Number(node.dataset.memory) === index);
  });
}

function initThree() {
  if (!window.THREE) {
    initFallback3d();
    return;
  }

  const canvas = $("#brainCanvas");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  brainGroup = new THREE.Group();
  scene.add(brainGroup);

  const ambient = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(2.8, 4.2, 4.4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8ec5ff, 0.9);
  fill.position.set(-3.2, 0.5, -2.8);
  scene.add(fill);

  createBrain();
  setupCanvasEvents(canvas);
  resize();
  window.addEventListener("resize", resize);
  animate();
}

function initFallback3d() {
  const canvas = $("#brainCanvas");
  const ctx = canvas.getContext("2d");
  fallbackState = { ctx, angle: 0.35, tilt: -0.12, dragging: false, last: { x: 0, y: 0 } };
  $("#fallback3d").style.display = "block";
  $("#fallback3d").innerHTML = "<strong>本地 3D 渲染模式</strong><span>Three.js CDN 暂不可用，已切换到可交互的本地脑图。</span>";

  function sizeFallback() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFallback();
  }

  canvas.addEventListener("pointerdown", (event) => {
    fallbackState.dragging = true;
    fallbackState.last = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!fallbackState.dragging) return;
    fallbackState.angle += (event.clientX - fallbackState.last.x) * 0.01;
    fallbackState.tilt += (event.clientY - fallbackState.last.y) * 0.004;
    fallbackState.tilt = Math.max(-0.45, Math.min(0.35, fallbackState.tilt));
    fallbackState.last = { x: event.clientX, y: event.clientY };
    drawFallback();
  });

  canvas.addEventListener("pointerup", (event) => {
    fallbackState.dragging = false;
    canvas.releasePointerCapture(event.pointerId);
    const picked = pickFallback(event);
    if (picked) selectRegion(picked, true);
  });

  window.addEventListener("resize", sizeFallback);
  sizeFallback();
}

function projectFallback(region) {
  const canvas = $("#brainCanvas");
  const rect = canvas.getBoundingClientRect();
  const [x, y, z] = region.position;
  const cos = Math.cos(fallbackState.angle);
  const sin = Math.sin(fallbackState.angle);
  const rx = x * cos - z * sin;
  const rz = x * sin + z * cos;
  const ty = y + fallbackState.tilt * rz;
  const scale = 1.08 + rz * 0.12;
  return {
    x: rect.width / 2 + rx * rect.width * 0.2,
    y: rect.height / 2 - ty * rect.height * 0.29,
    z: rz,
    scale
  };
}

function drawFallback() {
  if (!fallbackState) return;
  const canvas = $("#brainCanvas");
  const rect = canvas.getBoundingClientRect();
  const ctx = fallbackState.ctx;
  ctx.clearRect(0, 0, rect.width, rect.height);

  const cx = rect.width / 2;
  const cy = rect.height / 2 + 8;
  const gradient = ctx.createRadialGradient(cx, cy - 30, 40, cx, cy, Math.min(rect.width, rect.height) * 0.45);
  gradient.addColorStop(0, "rgba(219,234,254,0.84)");
  gradient.addColorStop(1, "rgba(15,118,110,0.08)");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(37,99,235,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx - 82, cy, rect.width * 0.18, rect.height * 0.28, -0.1, 0, Math.PI * 2);
  ctx.ellipse(cx + 82, cy, rect.width * 0.18, rect.height * 0.28, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const sorted = regions
    .filter((region) => region.id !== "neocortex")
    .map((region) => ({ region, p: projectFallback(region) }))
    .sort((a, b) => a.p.z - b.p.z);

  sorted.forEach(({ region, p }) => {
    const selected = region.id === activeId;
    const radius = selected ? 24 : 18;
    ctx.save();
    ctx.globalAlpha = selected ? 0.98 : 0.66;
    ctx.fillStyle = region.color;
    ctx.shadowColor = selected ? region.color : "rgba(15,23,42,0.16)";
    ctx.shadowBlur = selected ? 24 : 8;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, radius * p.scale * region.scale[0], radius * p.scale * Math.max(region.scale[1], 0.24), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.strokeStyle = "rgba(15,23,42,0.08)";
    ctx.lineWidth = 1;
    const label = region.name;
    ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
    const width = ctx.measureText(label).width + 16;
    roundRect(ctx, p.x - width / 2, p.y - 38, width, 24, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1e293b";
    ctx.fillText(label, p.x - width / 2 + 8, p.y - 22);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function pickFallback(event) {
  if (!fallbackState) return null;
  const rect = $("#brainCanvas").getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let best = null;
  let bestDistance = Infinity;
  regions.filter((region) => region.id !== "neocortex").forEach((region) => {
    const p = projectFallback(region);
    const distance = Math.hypot(x - p.x, y - p.y);
    if (distance < bestDistance && distance < 56) {
      bestDistance = distance;
      best = region.id;
    }
  });
  return best;
}

function createBrain() {
  const cortexMaterial = new THREE.MeshPhysicalMaterial({
    color: "#dbeafe",
    transparent: true,
    opacity: 0.16,
    roughness: 0.55,
    metalness: 0.02,
    transmission: 0.18,
    thickness: 1.2,
    side: THREE.DoubleSide
  });

  const left = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 40), cortexMaterial);
  left.scale.set(1.2, 0.78, 0.86);
  left.position.x = -0.46;
  brainGroup.add(left);

  const right = left.clone();
  right.position.x = 0.46;
  brainGroup.add(right);

  const midline = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 1.28, 1.72),
    new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.35 })
  );
  brainGroup.add(midline);

  regions.forEach((region) => {
    if (region.id === "neocortex") return;
    const geometry = new THREE.SphereGeometry(1, 40, 24);
    const material = new THREE.MeshStandardMaterial({
      color: region.color,
      emissive: region.color,
      emissiveIntensity: region.id === activeId ? 0.18 : 0.02,
      roughness: 0.38,
      metalness: 0.05,
      transparent: true,
      opacity: region.id === activeId ? 0.96 : 0.46
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...region.position);
    mesh.scale.set(...region.scale);
    mesh.userData.regionId = region.id;
    brainGroup.add(mesh);
    regionMeshes.set(region.id, mesh);
    createLabel(region);
  });

  const cortexHotspot = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 40),
    new THREE.MeshStandardMaterial({
      color: "#2563eb",
      transparent: true,
      opacity: 0.12,
      emissive: "#2563eb",
      emissiveIntensity: 0.04,
      roughness: 0.42
    })
  );
  cortexHotspot.scale.set(...regions.find((r) => r.id === "neocortex").scale);
  cortexHotspot.position.set(...regions.find((r) => r.id === "neocortex").position);
  cortexHotspot.userData.regionId = "neocortex";
  brainGroup.add(cortexHotspot);
  regionMeshes.set("neocortex", cortexHotspot);
  createLabel(regions.find((r) => r.id === "neocortex"));

  createConnection("sensory", "pfc");
  createConnection("pfc", "hippocampus");
  createConnection("hippocampus", "neocortex");
  createConnection("amygdala", "hippocampus");
  createConnection("basal", "cerebellum");
}

function createConnection(fromId, toId) {
  const from = regions.find((item) => item.id === fromId);
  const to = regions.find((item) => item.id === toId);
  const points = [
    new THREE.Vector3(...from.position),
    new THREE.Vector3((from.position[0] + to.position[0]) / 2, 0.75, (from.position[2] + to.position[2]) / 2),
    new THREE.Vector3(...to.position)
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const tube = new THREE.TubeGeometry(curve, 48, 0.008, 8, false);
  const mesh = new THREE.Mesh(
    tube,
    new THREE.MeshBasicMaterial({ color: "#94a3b8", transparent: true, opacity: 0.26 })
  );
  brainGroup.add(mesh);
}

function createLabel(region) {
  const label = document.createElement("div");
  label.className = "brain-label";
  label.textContent = region.name;
  $("#labelLayer").appendChild(label);
  labels.set(region.id, { element: label, position: new THREE.Vector3(...region.position) });
}

function setupCanvasEvents(canvas) {
  canvas.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastPointer = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    targetRotation.y += dx * 0.008;
    targetRotation.x += dy * 0.006;
    targetRotation.x = Math.max(-0.7, Math.min(0.7, targetRotation.x));
    lastPointer = { x: event.clientX, y: event.clientY };
  });

  canvas.addEventListener("pointerup", (event) => {
    isDragging = false;
    canvas.releasePointerCapture(event.pointerId);
    handlePick(event);
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoom += event.deltaY * 0.004;
    zoom = Math.max(3.4, Math.min(6.4, zoom));
  }, { passive: false });
}

function handlePick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([...regionMeshes.values()], false);
  if (hits[0]?.object?.userData?.regionId) {
    selectRegion(hits[0].object.userData.regionId, true);
  }
}

function resize() {
  if (!renderer) return;
  const canvas = renderer.domElement;
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function animate(time = 0) {
  requestAnimationFrame(animate);
  if (!renderer) return;

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
  brainGroup.rotation.x = currentRotation.x;
  brainGroup.rotation.y = currentRotation.y + Math.sin(time * 0.00024) * 0.05;
  camera.position.set(0, 0.1, zoom);
  camera.lookAt(0, 0, 0);

  if (time < replayUntil) animateReplay(time);
  updateLabels();
  renderer.render(scene, camera);
}

function updateLabels() {
  const rect = renderer.domElement.getBoundingClientRect();
  labels.forEach((label, id) => {
    const pos = label.position.clone();
    pos.applyMatrix4(brainGroup.matrixWorld);
    pos.project(camera);
    const x = (pos.x * 0.5 + 0.5) * rect.width;
    const y = (-pos.y * 0.5 + 0.5) * rect.height;
    label.element.style.left = `${x}px`;
    label.element.style.top = `${y}px`;
    label.element.style.opacity = id === activeId || pos.z < 0.98 ? "1" : "0.28";
  });
}

function animateReplay(time) {
  if (!pulses.length || time - pulses[pulses.length - 1].created > 420) {
    const geometry = new THREE.SphereGeometry(0.045, 16, 10);
    const material = new THREE.MeshBasicMaterial({ color: "#0f766e", transparent: true, opacity: 0.9 });
    const pulse = new THREE.Mesh(geometry, material);
    pulse.userData = { created: time };
    pulse.position.set(-0.25, -0.32, 0.72);
    brainGroup.add(pulse);
    pulses.push(pulse);
  }

  pulses = pulses.filter((pulse) => {
    const age = Math.min(1, (time - pulse.userData.created) / 1500);
    pulse.position.lerp(new THREE.Vector3(0, 0.14, -0.12), 0.035);
    pulse.scale.setScalar(1 + age * 3.8);
    pulse.material.opacity = 0.8 * (1 - age);
    if (age >= 1) {
      brainGroup.remove(pulse);
      pulse.geometry.dispose();
      pulse.material.dispose();
      return false;
    }
    return true;
  });
}

function startReplay() {
  replayUntil = performance.now() + 5200;
  document.body.classList.add("replay");
  selectRegion("hippocampus", true);
  setTimeout(() => document.body.classList.remove("replay"), 5200);
}

function resetView() {
  targetRotation = { x: -0.08, y: 0.22 };
  zoom = 4.8;
  selectRegion("hippocampus");
}

mountLists();
bindEvents();
selectRegion(activeId);
selectSchema(0);
initThree();
