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