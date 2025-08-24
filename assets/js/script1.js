// ---------- Constants ----------
const gradeToValue = {'A+': 10, 'A': 9, 'B+': 8, 'B': 7,'C': 6, 'D': 5, 'E': 4, 'F': 0};
const creditOptions = [...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
const gradeOptions = Object.entries(gradeToValue)
  .map(([grade, value]) => `<option value="${value}">${grade}</option>`).join('');

  // ---------- Radio Button Logic ----------
document.querySelectorAll('input[name="calc-type"]').forEach((radio) => {
  radio.addEventListener('change', function () {
    document.getElementById('sgpa-container').style.display = 'none';
    document.getElementById('ygpa-container').style.display = 'none';
    document.getElementById('semester-input-section').style.display = 'none';
    document.getElementById('semesters-container').innerHTML = '';

    if (this.value === 'sgpa') {
      buildSGPA();
    } else if (this.value === 'ygpa') {
      buildYGPA();
    } else if (this.value === 'cgpa') {
      document.getElementById('semester-input-section').style.display = 'block';
      document.getElementById('num-semesters').dispatchEvent(new Event('input'));
    }
  });
});

// ---------- SGPA Form ----------
function buildSGPA() {
  const sgpaContainer = document.getElementById('sgpa-container');
  sgpaContainer.innerHTML = '';
  sgpaContainer.style.display = 'block';

  const block = document.createElement('div');
  block.classList.add('sgpa-block');
  block.innerHTML = `
    <h3>Semester (Odd/Even)</h3>
    <label>Number of Subjects:
      <select class="subject-count" id="sgpa-subject-count">
        ${[...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
      </select>
    </label>
    <div id="sgpa-subjects"></div>
  `;
  sgpaContainer.appendChild(block);

  document.getElementById('sgpa-subject-count').addEventListener('change', function() {
    const c = parseInt(this.value);
    const subContainer = document.getElementById('sgpa-subjects');
    subContainer.innerHTML = '';
    for (let j = 1; j <= c; j++) {
      const row = document.createElement('div');
      row.classList.add('subject-row');
      row.innerHTML = `
        <input type="text" placeholder="Course Name" />
        <select class="credit">
          <option value="">Credit</option>${creditOptions}
        </select>
        <select class="grade">
          <option value="">Grade</option>${gradeOptions}
        </select>
        <input type="text" class="credit-point" placeholder="Credit Point" readonly />
      `;
      subContainer.appendChild(row);

      // auto calculate credit point on change
      row.querySelector('.credit').addEventListener('change', ()=>updateCreditPoint(row));
      row.querySelector('.grade').addEventListener('change', ()=>updateCreditPoint(row));
    }
  });
  document.getElementById('sgpa-subject-count').dispatchEvent(new Event('change'));
}

function updateCreditPoint(row) {
  const credit = parseInt(row.querySelector('.credit').value) || 0;
  const grade = parseInt(row.querySelector('.grade').value) || 0;
  row.querySelector('.credit-point').value = credit * grade;
}


// ---------- YGPA Form ----------
function buildYGPA() {
  const ygpaContainer = document.getElementById('ygpa-container');
  ygpaContainer.innerHTML = '';
  ygpaContainer.style.display = 'block';

  ["Odd Semester", "Even Semester"].forEach((sem, idx) => {
    const block = document.createElement('div');
    block.classList.add('ygpa-block');
    block.innerHTML = `
      <h3>${sem}</h3>
      <div class="subject-row">
        <input type="number" class="sgpa" placeholder="Enter SGPA" step="0.01"/>
        <input type="number" class="credit" placeholder="Total Credit"/>
        <input type="text" class="credit-point" placeholder="Credit Point" readonly />
      </div>
    `;
    ygpaContainer.appendChild(block);

    const row = block.querySelector('.subject-row');
    row.querySelector('.sgpa').addEventListener('input', ()=>updateYGPA(row));
    row.querySelector('.credit').addEventListener('input', ()=>updateYGPA(row));
  });
}

function updateYGPA(row) {
  const sgpa = parseFloat(row.querySelector('.sgpa').value) || 0;
  const credit = parseInt(row.querySelector('.credit').value) || 0;
  row.querySelector('.credit-point').value = (sgpa * credit).toFixed(2);
}


// ---------- CGPA Slider logic ----------
const slider = document.getElementById("num-semesters");
const valueDisplay = document.getElementById("semester-value");
slider.addEventListener("input", function () {
  valueDisplay.textContent = this.value;
  const container = document.getElementById('semesters-container');
  container.innerHTML = '';
  const numSemesters = parseInt(this.value);
  if (isNaN(numSemesters)) return;
  for (let i = 1; i <= numSemesters; i++) {
    const block = document.createElement('div');
    block.classList.add('semester-block');
    block.innerHTML = `
      <h3>Semester ${i}</h3>
      <div class="subject-row">
        <input type="number" class="sgpa" placeholder="Enter SGPA" step="0.01"/>
        <input type="number" class="credit" placeholder="Total Credit"/>
        <input type="text" class="credit-point" placeholder="Credit Point" readonly />
      </div>
    `;
    container.appendChild(block);

    const row = block.querySelector('.subject-row');
    row.querySelector('.sgpa').addEventListener('input', ()=>updateYGPA(row));
    row.querySelector('.credit').addEventListener('input', ()=>updateYGPA(row));
  }
});