const CASES = [
  {
    id: "chest-pain",
    label: "急診胸痛站：52 歲男性胸悶冒汗",
    targetMinutes: 18,
    patient: {
      code: "A-052",
      ageSex: "52 歲男性",
      setting: "急診檢傷二級",
      chief: "胸悶 45 分鐘，伴隨冒汗與噁心",
      opening: "病人坐在急診床邊，手按胸口，回答簡短但清楚。",
      vitals: [
        ["血壓", "158/94 mmHg"],
        ["心跳", "106/min"],
        ["呼吸", "20/min"],
        ["血氧", "96% RA"]
      ],
      focus: ["辨識危急胸痛", "建立缺血性線索", "避免不安全檢查"]
    },
    actions: [
      {
        id: "pain-onset",
        type: "history",
        label: "胸痛起始、時間與誘因",
        minutes: 2,
        value: 12,
        essential: true,
        tags: ["ischemia", "timeline"],
        response: "45 分鐘前爬樓梯後出現壓迫性胸悶，休息後仍未緩解。"
      },
      {
        id: "pain-radiation",
        type: "history",
        label: "疼痛位置、放射與伴隨症狀",
        minutes: 2,
        value: 10,
        essential: true,
        tags: ["ischemia"],
        response: "胸骨後壓迫感，放射到左肩與下顎，伴隨冒汗與噁心。"
      },
      {
        id: "risk-factors",
        type: "history",
        label: "心血管危險因子",
        minutes: 2,
        value: 8,
        essential: true,
        tags: ["risk"],
        response: "高血壓、第二型糖尿病，父親 58 歲曾心肌梗塞。"
      },
      {
        id: "dissection-screen",
        type: "history",
        label: "撕裂痛、背痛與神經症狀",
        minutes: 2,
        value: 4,
        tags: ["rule-out"],
        response: "否認撕裂樣背痛、單側無力、暈厥或雙手血壓明顯差異。"
      },
      {
        id: "travel-history",
        type: "history",
        label: "近期旅遊與感染接觸",
        minutes: 2,
        value: 1,
        tags: ["context"],
        response: "近一個月無長途飛行、無發燒或明顯感染接觸。"
      },
      {
        id: "ecg",
        type: "exam",
        label: "12 導程心電圖",
        minutes: 4,
        value: 14,
        essential: true,
        tags: ["ecg", "ischemia"],
        response: "II、III、aVF ST 段上升，I、aVL 輕度 reciprocal change。"
      },
      {
        id: "troponin",
        type: "exam",
        label: "高敏感度 troponin 與基本抽血",
        minutes: 5,
        value: 10,
        essential: true,
        tags: ["biomarker"],
        response: "高敏感度 troponin I 升高；血糖 238 mg/dL，腎功能可接受。"
      },
      {
        id: "cxr",
        type: "exam",
        label: "床邊胸部 X 光",
        minutes: 4,
        value: 3,
        tags: ["rule-out"],
        response: "無氣胸或明顯縱膈腔擴大，心臟大小略大。"
      },
      {
        id: "echo",
        type: "exam",
        label: "床邊心臟超音波",
        minutes: 6,
        value: 4,
        tags: ["function"],
        response: "下壁局部壁運動異常，未見心包填塞。"
      },
      {
        id: "exercise-test",
        type: "exam",
        label: "安排運動心電圖",
        minutes: 10,
        value: -10,
        safety: -18,
        risk: true,
        tags: ["unsafe"],
        response: "病人仍在胸痛且 ECG 疑似急性缺血，運動測試不適當。"
      }
    ],
    differentials: [
      { id: "stemi", label: "ST 段上升型心肌梗塞", weight: 14, correct: true },
      { id: "nstemi", label: "非 ST 段上升型急性冠心症", weight: 5 },
      { id: "dissection", label: "主動脈剝離", weight: 4 },
      { id: "pe", label: "肺栓塞", weight: 3 },
      { id: "gerd", label: "胃食道逆流", weight: 1 },
      { id: "panic", label: "焦慮發作", weight: 0 }
    ],
    primaryOptions: [
      { id: "stemi", label: "ST 段上升型心肌梗塞" },
      { id: "pe", label: "肺栓塞" },
      { id: "gerd", label: "胃食道逆流" },
      { id: "panic", label: "焦慮發作" }
    ],
    coachRules: {
      early: "胸痛站先建立時間軸、症狀性質與危險因子，再用 ECG 和生物標記確認缺血證據。",
      signal: "壓迫性胸痛、冒汗、左肩/下顎放射、下壁 ST 段上升會把急性冠心症推到首位。",
      next: "若已看到 ST 段上升，推理重點應轉向急性處置優先順序與禁忌，而不是延後診斷的低收益檢查。"
    },
    facultyPearl: "這一站的核心是快速辨識高風險胸痛。完整問診很重要，但 ECG 與 troponin 是決定診斷路徑的關鍵證據。"
  },
  {
    id: "fever-cough",
    label: "內科發燒咳嗽站：24 歲女性呼吸喘",
    targetMinutes: 16,
    patient: {
      code: "B-024",
      ageSex: "24 歲女性",
      setting: "一般內科門診轉急診觀察",
      chief: "發燒、咳嗽三天，今天走路會喘",
      opening: "病人戴著口罩，說話可成句，偶爾咳嗽。",
      vitals: [
        ["體溫", "38.6°C"],
        ["心跳", "112/min"],
        ["呼吸", "24/min"],
        ["血氧", "93% RA"]
      ],
      focus: ["感染與低血氧評估", "區分肺炎與氣喘", "提出合理檢查"]
    },
    actions: [
      {
        id: "cough-character",
        type: "history",
        label: "咳嗽型態與痰液",
        minutes: 2,
        value: 9,
        essential: true,
        tags: ["infection"],
        response: "黃綠色痰，右胸深呼吸時會痛，夜間咳嗽加劇。"
      },
      {
        id: "dyspnea-severity",
        type: "history",
        label: "呼吸困難程度與活動耐受",
        minutes: 2,
        value: 8,
        essential: true,
        tags: ["severity"],
        response: "今天走一層樓就喘，平躺不會更嚴重，無下肢水腫。"
      },
      {
        id: "asthma-history",
        type: "history",
        label: "氣喘、過敏與吸入藥使用",
        minutes: 2,
        value: 5,
        tags: ["asthma"],
        response: "兒時過敏性鼻炎，無氣喘診斷，未使用吸入型藥物。"
      },
      {
        id: "exposure",
        type: "history",
        label: "群聚感染與疫苗史",
        minutes: 2,
        value: 5,
        tags: ["context"],
        response: "同住室友近期感冒；流感疫苗未接種，本週未快篩。"
      },
      {
        id: "lung-auscultation",
        type: "exam",
        label: "肺部聽診",
        minutes: 3,
        value: 10,
        essential: true,
        tags: ["lung"],
        response: "右下肺野 crackles，未聞及廣泛 wheezing。"
      },
      {
        id: "oxygen-response",
        type: "exam",
        label: "血氧與低流量氧氣反應",
        minutes: 3,
        value: 7,
        essential: true,
        tags: ["severity"],
        response: "鼻導管 2 L/min 後 SpO2 提升至 97%，呼吸窘迫減輕。"
      },
      {
        id: "cxr-pneumonia",
        type: "exam",
        label: "胸部 X 光",
        minutes: 4,
        value: 12,
        essential: true,
        tags: ["imaging", "infection"],
        response: "右下葉局部浸潤，無肋膜積液。"
      },
      {
        id: "cbc-crp",
        type: "exam",
        label: "CBC、CRP 與電解質",
        minutes: 5,
        value: 7,
        essential: true,
        tags: ["lab", "infection"],
        response: "WBC 14,200/uL、neutrophil 84%、CRP 68 mg/L。"
      },
      {
        id: "d-dimer",
        type: "exam",
        label: "D-dimer",
        minutes: 4,
        value: 1,
        tags: ["rule-out"],
        response: "臨床前測機率低，D-dimer 輕度上升但特異性不足。"
      },
      {
        id: "broad-ct",
        type: "exam",
        label: "立即安排全身電腦斷層",
        minutes: 14,
        value: -6,
        safety: -10,
        risk: true,
        tags: ["overuse"],
        response: "目前局部肺炎證據明確，全身電腦斷層不是初始必要檢查。"
      }
    ],
    differentials: [
      { id: "cap", label: "社區型肺炎", weight: 14, correct: true },
      { id: "influenza", label: "流感或其他病毒性呼吸道感染", weight: 4 },
      { id: "asthma", label: "氣喘急性惡化", weight: 3 },
      { id: "pe", label: "肺栓塞", weight: 2 },
      { id: "heart-failure", label: "心衰竭", weight: 1 },
      { id: "panic", label: "恐慌相關過度換氣", weight: 0 }
    ],
    primaryOptions: [
      { id: "cap", label: "社區型肺炎" },
      { id: "asthma", label: "氣喘急性惡化" },
      { id: "pe", label: "肺栓塞" },
      { id: "heart-failure", label: "心衰竭" }
    ],
    coachRules: {
      early: "發燒咳嗽站要先判斷感染證據、呼吸嚴重度與低血氧，再決定影像與抽血。",
      signal: "膿痰、肋膜性胸痛、局部 crackles、右下葉浸潤與發炎指標上升，支持社區型肺炎。",
      next: "若肺炎證據完整，鑑別仍需保留流感、氣喘與肺栓塞，但不宜用低收益高負擔檢查取代基本推理。"
    },
    facultyPearl: "這一站評估的不只是診斷名稱，也包括是否先辨識低血氧與病人嚴重度。"
  },
  {
    id: "ruq-pain",
    label: "腹痛站：36 歲女性右上腹痛",
    targetMinutes: 17,
    patient: {
      code: "C-036",
      ageSex: "36 歲女性",
      setting: "急診腹痛評估區",
      chief: "右上腹痛 12 小時，伴隨噁心",
      opening: "病人蜷曲躺著，指出右上腹最痛，生命徵象尚穩定。",
      vitals: [
        ["血壓", "122/76 mmHg"],
        ["心跳", "98/min"],
        ["體溫", "37.9°C"],
        ["血氧", "98% RA"]
      ],
      focus: ["腹痛定位", "膽道感染線索", "排除婦產與腸胃急症"]
    },
    actions: [
      {
        id: "pain-meal",
        type: "history",
        label: "疼痛位置、進食關聯與放射",
        minutes: 2,
        value: 11,
        essential: true,
        tags: ["biliary"],
        response: "晚餐油膩食物後開始右上腹痛，放射到右肩胛，持續未緩解。"
      },
      {
        id: "gi-symptoms",
        type: "history",
        label: "噁心、嘔吐、黃疸與排便",
        minutes: 2,
        value: 8,
        essential: true,
        tags: ["biliary"],
        response: "噁心嘔吐兩次，無明顯黃疸，排便正常，無黑便。"
      },
      {
        id: "pregnancy",
        type: "history",
        label: "月經與懷孕可能",
        minutes: 2,
        value: 7,
        essential: true,
        tags: ["safety"],
        response: "月經規則，最後一次月經三週前；仍需以尿液懷孕試驗確認。"
      },
      {
        id: "urinary",
        type: "history",
        label: "泌尿道症狀與背痛",
        minutes: 2,
        value: 3,
        tags: ["rule-out"],
        response: "無頻尿、解尿痛或側腰絞痛。"
      },
      {
        id: "murphy",
        type: "exam",
        label: "腹部理學檢查含 Murphy sign",
        minutes: 3,
        value: 12,
        essential: true,
        tags: ["biliary", "exam"],
        response: "右上腹壓痛，Murphy sign 陽性，無瀰漫性腹膜刺激。"
      },
      {
        id: "cbc-lft",
        type: "exam",
        label: "CBC、肝膽胰酵素",
        minutes: 5,
        value: 10,
        essential: true,
        tags: ["lab"],
        response: "WBC 13,600/uL；AST/ALT 輕度上升，bilirubin 正常，lipase 正常。"
      },
      {
        id: "urine-pregnancy",
        type: "exam",
        label: "尿液懷孕試驗與尿液分析",
        minutes: 4,
        value: 8,
        essential: true,
        tags: ["safety", "rule-out"],
        response: "懷孕試驗陰性；尿液無明顯感染或血尿。"
      },
      {
        id: "ruq-ultrasound",
        type: "exam",
        label: "右上腹超音波",
        minutes: 6,
        value: 14,
        essential: true,
        tags: ["imaging", "biliary"],
        response: "膽囊結石、膽囊壁增厚與 sonographic Murphy sign。"
      },
      {
        id: "appendix-ct",
        type: "exam",
        label: "優先安排闌尾電腦斷層",
        minutes: 10,
        value: -5,
        safety: -6,
        risk: true,
        tags: ["overuse"],
        response: "疼痛定位與理學檢查較支持膽囊病灶，闌尾 CT 不是第一線。"
      }
    ],
    differentials: [
      { id: "cholecystitis", label: "急性膽囊炎", weight: 14, correct: true },
      { id: "biliary-colic", label: "膽絞痛", weight: 5 },
      { id: "pancreatitis", label: "急性胰臟炎", weight: 3 },
      { id: "pyelonephritis", label: "急性腎盂腎炎", weight: 2 },
      { id: "ectopic", label: "子宮外孕", weight: 3 },
      { id: "appendicitis", label: "急性闌尾炎", weight: 1 }
    ],
    primaryOptions: [
      { id: "cholecystitis", label: "急性膽囊炎" },
      { id: "pancreatitis", label: "急性胰臟炎" },
      { id: "pyelonephritis", label: "急性腎盂腎炎" },
      { id: "ectopic", label: "子宮外孕" }
    ],
    coachRules: {
      early: "腹痛站請先定位疼痛、確認危險生命徵象，再依器官系統建立膽道、胰臟、泌尿與婦產鑑別。",
      signal: "油膩食物後右上腹痛、右肩胛放射、Murphy sign、白血球上升與超音波膽囊壁增厚，支持急性膽囊炎。",
      next: "女性腹痛即使膽道線索明顯，也要安全地確認懷孕可能，避免漏掉會改變處置的診斷。"
    },
    facultyPearl: "這一站重視腹痛定位與安全排除。好的答案會同時說明為何膽囊炎最可能，以及哪些危險診斷已被合理檢查。"
  }
];

const STORAGE_KEY = "cloud-hospital-training-records";

let state = {
  caseId: CASES[0].id,
  selectedActions: [],
  differentials: new Set(),
  primary: "",
  coachRequested: false,
  feedback: null
};

const elements = {
  caseSelect: document.querySelector("#caseSelect"),
  resetCase: document.querySelector("#resetCase"),
  patientVisual: document.querySelector("#patientVisual"),
  patientSummary: document.querySelector("#patientSummary"),
  evidenceMetric: document.querySelector("#evidenceMetric"),
  safetyMetric: document.querySelector("#safetyMetric"),
  timeMetric: document.querySelector("#timeMetric"),
  targetTime: document.querySelector("#targetTime"),
  chartLog: document.querySelector("#chartLog"),
  actionGroups: document.querySelector("#actionGroups"),
  coachButton: document.querySelector("#coachButton"),
  coachOutput: document.querySelector("#coachOutput"),
  differentialList: document.querySelector("#differentialList"),
  primaryDiagnosis: document.querySelector("#primaryDiagnosis"),
  submitCase: document.querySelector("#submitCase"),
  feedbackOutput: document.querySelector("#feedbackOutput"),
  recordRows: document.querySelector("#recordRows"),
  clearRecords: document.querySelector("#clearRecords")
};

function getCase() {
  return CASES.find((item) => item.id === state.caseId) || CASES[0];
}

function selectedActionObjects() {
  const currentCase = getCase();
  return state.selectedActions
    .map((id) => currentCase.actions.find((action) => action.id === id))
    .filter(Boolean);
}

function calculateMetrics() {
  const currentCase = getCase();
  const selected = selectedActionObjects();
  const essential = currentCase.actions.filter((action) => action.essential);
  const selectedEssential = essential.filter((action) => state.selectedActions.includes(action.id));
  const essentialScore = essential.reduce((sum, action) => sum + Math.max(action.value, 0), 0);
  const selectedScore = selectedEssential.reduce((sum, action) => sum + Math.max(action.value, 0), 0);
  const evidencePercent = essentialScore ? Math.round((selectedScore / essentialScore) * 100) : 0;
  const minutes = selected.reduce((sum, action) => sum + action.minutes, 0);
  const safety = Math.max(0, Math.min(100, 100 + selected.reduce((sum, action) => sum + (action.safety || 0), 0)));

  return { evidencePercent, minutes, safety, selectedEssential, essential };
}

function renderCaseSelect() {
  elements.caseSelect.innerHTML = CASES.map(
    (item) => `<option value="${item.id}">${item.label}</option>`
  ).join("");
  elements.caseSelect.value = state.caseId;
}

function renderPatient() {
  const currentCase = getCase();
  const { patient } = currentCase;
  elements.targetTime.textContent = `建議完成時間 ${currentCase.targetMinutes} 分鐘`;
  elements.patientSummary.innerHTML = `
    <div class="summary-title">
      <strong>${patient.code}</strong>
      <span>${patient.ageSex} · ${patient.setting}</span>
    </div>
    <p>${patient.opening}</p>
    <ul class="vitals-list">
      ${patient.vitals.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("")}
    </ul>
    <ul class="focus-list">
      ${patient.focus.map((item) => `<li><span>訓練重點</span><strong>${item}</strong></li>`).join("")}
    </ul>
  `;
  elements.patientVisual.dataset.case = currentCase.id;
}

function renderMetrics() {
  const metrics = calculateMetrics();
  elements.evidenceMetric.textContent = `${metrics.evidencePercent}%`;
  elements.safetyMetric.textContent = `${metrics.safety}`;
  elements.timeMetric.textContent = `${metrics.minutes} 分`;
}

function renderChart() {
  const selected = selectedActionObjects();
  if (!selected.length) {
    elements.chartLog.innerHTML = `<p class="empty-state">尚未選擇問診或檢查。請從右側工作站開始蒐集臨床線索。</p>`;
    return;
  }

  elements.chartLog.innerHTML = selected.map((action) => `
    <li>
      <strong>${action.label}</strong>
      <span>${action.response}</span>
    </li>
  `).join("");
}

function renderActions() {
  const currentCase = getCase();
  const groups = [
    ["history", "問診"],
    ["exam", "理學檢查與檢驗"]
  ];

  elements.actionGroups.innerHTML = groups.map(([type, label]) => {
    const actions = currentCase.actions.filter((action) => action.type === type);
    return `
      <section class="action-group">
        <h3>${label}</h3>
        <div class="action-stack">
          ${actions.map((action) => {
            const selected = state.selectedActions.includes(action.id);
            const risk = action.risk ? " is-risk" : "";
            return `
              <button class="action-button${selected ? " is-selected" : ""}${risk}" data-action="${action.id}" type="button">
                <span>${action.label}</span>
                <small>${action.minutes} 分</small>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderCoach() {
  const currentCase = getCase();
  const selected = selectedActionObjects();
  const metrics = calculateMetrics();
  const missing = metrics.essential
    .filter((action) => !state.selectedActions.includes(action.id))
    .map((action) => action.label);

  if (!state.coachRequested) {
    elements.coachOutput.innerHTML = `
      <p>${currentCase.coachRules.early}</p>
      <p>按下更新提示後，系統會依你已蒐集的線索產生下一步推理建議。</p>
    `;
    return;
  }

  const tags = new Set(selected.flatMap((action) => action.tags || []));
  const signals = selected
    .filter((action) => action.essential || (action.tags || []).some((tag) => ["imaging", "ecg", "lab"].includes(tag)))
    .slice(-4)
    .map((action) => action.response);

  const signalText = signals.length
    ? `<ul>${signals.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "<p>目前線索仍不足，先補足關鍵問診與基本檢查。</p>";

  const reasoning = tags.has("unsafe") || tags.has("overuse")
    ? "目前已出現檢查選擇風險。請回到病人穩定度、前測機率與檢查禁忌，重新排序下一步。"
    : currentCase.coachRules.signal;

  elements.coachOutput.innerHTML = `
    <p><strong>推理摘要：</strong>${reasoning}</p>
    ${signalText}
    <p><strong>下一步：</strong>${missing.length ? `優先補齊「${missing.slice(0, 2).join("、")}」。` : currentCase.coachRules.next}</p>
  `;
}

function renderDifferentials() {
  const currentCase = getCase();
  elements.differentialList.innerHTML = currentCase.differentials.map((dx) => {
    const selected = state.differentials.has(dx.id);
    return `
      <button class="dx-button${selected ? " is-selected" : ""}" data-dx="${dx.id}" type="button">
        ${dx.label}
      </button>
    `;
  }).join("");
}

function renderPrimaryOptions() {
  const currentCase = getCase();
  elements.primaryDiagnosis.innerHTML = currentCase.primaryOptions.map((option) => `
    <label class="primary-option${state.primary === option.id ? " is-selected" : ""}">
      <input type="radio" name="primaryDiagnosis" value="${option.id}" ${state.primary === option.id ? "checked" : ""}>
      <span>${option.label}</span>
    </label>
  `).join("");
}

function readRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 12)));
}

function renderFeedback() {
  if (!state.feedback) {
    elements.feedbackOutput.innerHTML = `
      <p>提交後會看到教師回饋、分數拆解與可改進的臨床推理步驟。</p>
    `;
    return;
  }

  const feedback = state.feedback;
  elements.feedbackOutput.innerHTML = `
    <div class="score-line">
      <div>
        <span>總分</span>
        <strong>${feedback.score}</strong>
      </div>
      <div>
        <span>等第</span>
        <strong>${feedback.grade}</strong>
      </div>
    </div>
    <p>${feedback.summary}</p>
    <ul>
      ${feedback.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

function renderRecords() {
  const records = readRecords();
  if (!records.length) {
    elements.recordRows.innerHTML = `
      <tr>
        <td colspan="5">尚無成績紀錄。</td>
      </tr>
    `;
    return;
  }

  elements.recordRows.innerHTML = records.map((record) => `
    <tr>
      <td>${record.time}</td>
      <td>${record.caseLabel}</td>
      <td>${record.score}</td>
      <td>${record.grade}</td>
      <td>${record.primaryLabel}</td>
    </tr>
  `).join("");
}

function calculateSubmission() {
  const currentCase = getCase();
  const metrics = calculateMetrics();
  const selected = selectedActionObjects();
  const selectedDx = currentCase.differentials.filter((dx) => state.differentials.has(dx.id));
  const unsafeActions = selected.filter((action) => action.risk);
  const correctPrimary = currentCase.differentials.find((dx) => dx.correct);
  const primaryOption = currentCase.primaryOptions.find((option) => option.id === state.primary);
  const missingEssential = metrics.essential.filter((action) => !state.selectedActions.includes(action.id));

  const evidencePoints = Math.round(metrics.evidencePercent * 0.42);
  const dxPoints = Math.min(18, selectedDx.reduce((sum, dx) => sum + dx.weight, 0));
  const primaryPoints = state.primary === correctPrimary.id ? 26 : state.primary ? 8 : 0;
  const safetyPoints = unsafeActions.length ? Math.max(0, 10 - unsafeActions.length * 5) : 10;
  const timePenalty = Math.max(0, metrics.minutes - currentCase.targetMinutes);
  const score = Math.max(0, Math.min(100, evidencePoints + dxPoints + primaryPoints + safetyPoints - timePenalty));
  const grade = score >= 88 ? "A" : score >= 76 ? "B" : score >= 64 ? "C" : "D";

  const points = [];
  points.push(`蒐證完整度 ${metrics.evidencePercent}%，使用 ${metrics.minutes} 分鐘。`);
  points.push(state.primary === correctPrimary.id
    ? "主要診斷與關鍵證據一致。"
    : `主要診斷仍需修正；本案例最應優先考慮「${correctPrimary.label}」。`);

  if (selectedDx.some((dx) => dx.correct)) {
    points.push("鑑別診斷清單有保留最重要的高機率診斷。");
  } else {
    points.push("鑑別診斷清單缺少最關鍵診斷，容易讓後續處置偏離。");
  }

  if (missingEssential.length) {
    points.push(`建議補強：${missingEssential.map((action) => action.label).slice(0, 3).join("、")}。`);
  } else {
    points.push("必要問診與檢查已完整覆蓋。");
  }

  if (unsafeActions.length) {
    points.push(`安全提醒：${unsafeActions.map((action) => action.label).join("、")} 不適合作為此情境的優先步驟。`);
  } else {
    points.push("檢查選擇未出現明顯安全或資源使用風險。");
  }

  return {
    score,
    grade,
    points,
    primaryLabel: primaryOption ? primaryOption.label : "未選擇",
    summary: currentCase.facultyPearl
  };
}

function submitCase() {
  const currentCase = getCase();
  const feedback = calculateSubmission();
  state.feedback = feedback;

  const records = readRecords();
  records.unshift({
    time: new Date().toLocaleString("zh-TW", { hour12: false }),
    caseLabel: currentCase.label,
    score: feedback.score,
    grade: feedback.grade,
    primaryLabel: feedback.primaryLabel
  });
  saveRecords(records);
  renderFeedback();
  renderRecords();
}

function resetCurrentCase() {
  state.selectedActions = [];
  state.differentials = new Set();
  state.primary = "";
  state.coachRequested = false;
  state.feedback = null;
  renderAll();
}

function switchCase(caseId) {
  state.caseId = caseId;
  resetCurrentCase();
}

function renderAll() {
  renderCaseSelect();
  renderPatient();
  renderMetrics();
  renderChart();
  renderActions();
  renderCoach();
  renderDifferentials();
  renderPrimaryOptions();
  renderFeedback();
  renderRecords();
}

function bindEvents() {
  elements.caseSelect.addEventListener("change", (event) => switchCase(event.target.value));
  elements.resetCase.addEventListener("click", resetCurrentCase);
  elements.coachButton.addEventListener("click", () => {
    state.coachRequested = true;
    renderCoach();
  });
  elements.submitCase.addEventListener("click", submitCase);
  elements.clearRecords.addEventListener("click", () => {
    saveRecords([]);
    renderRecords();
  });

  elements.actionGroups.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const actionId = button.dataset.action;
    if (!state.selectedActions.includes(actionId)) {
      state.selectedActions.push(actionId);
      state.feedback = null;
    }
    renderAll();
  });

  elements.differentialList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dx]");
    if (!button) return;
    const dxId = button.dataset.dx;
    if (state.differentials.has(dxId)) {
      state.differentials.delete(dxId);
    } else {
      state.differentials.add(dxId);
    }
    state.feedback = null;
    renderDifferentials();
    renderFeedback();
  });

  elements.primaryDiagnosis.addEventListener("change", (event) => {
    state.primary = event.target.value;
    state.feedback = null;
    renderPrimaryOptions();
    renderFeedback();
  });
}

bindEvents();
renderAll();
