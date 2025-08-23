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