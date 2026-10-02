// app.js - FINAL - 12 Themes + Optional Photo + NO PHOTO placeholder
let currentStep = 1;
let currentTemplate = 'pink';
const totalSteps = 6;
let photoBase64 = null;

function handlePhoto(e){
  const file = e.target.files[0];
  if(!file) return;

  // Only images, max 2MB
  if(!file.type.startsWith('image/')){
    alert('Please upload an image file');
    return;
  }
  if(file.size > 2 * 1024 * 1024){
    alert('Image too big - max 2MB please');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(ev){
    photoBase64 = ev.target.result;
    const smallImg = document.getElementById('smallImg');
    const previewBox = document.getElementById('photoPreviewSmall');
    if(smallImg) smallImg.src = photoBase64;
    if(previewBox) previewBox.style.display = 'block';
    saveAndPreview();
  };
  reader.readAsDataURL(file);
}

function saveAndPreview(){
  const getVal = (id) => {
    const el = document.getElementById(id);
    return el? el.value : '';
  };

  const data = {
    firstName: getVal('firstName'),
    lastName: getVal('lastName'),
    title: getVal('title'),
    location: getVal('location'),
    email: getVal('email'),
    phone: getVal('phone'),
    linkedin: getVal('linkedin'),
    github: getVal('github'),
    q1: getVal('q1'),
    q2: getVal('q2'),
    q3: getVal('q3'),
    bio: getVal('bio'),
    eduInstitution: getVal('eduInstitution'),
    eduQual: getVal('eduQual'),
    eduYear: getVal('eduYear'),
    eduAch: getVal('eduAch'),
    skills: getVal('skills'),
    proj1Name: getVal('proj1Name'),
    proj1Desc: getVal('proj1Desc'),
    proj1Tech: getVal('proj1Tech'),
    proj1Link: getVal('proj1Link'),
    proj2Name: getVal('proj2Name'),
    proj2Desc: getVal('proj2Desc'),
    proj2Tech: getVal('proj2Tech'),
    photo: photoBase64
  };

  localStorage.setItem('portfolioData', JSON.stringify(data));
  renderPreview(data);
}

function renderPreview(data){
  const preview = document.getElementById('livePreview');
  if(!preview) return;
  preview.className = 'preview-content template-' + currentTemplate;
  preview.innerHTML = getTemplateHTML(data, currentTemplate);
  const tplLabel = document.getElementById('currentTpl');
  if(tplLabel) tplLabel.innerText = currentTemplate;
}

function setTemplate(name){
  currentTemplate = name;
  const saved = JSON.parse(localStorage.getItem('portfolioData') || '{}');
  if(photoBase64) saved.photo = photoBase64;
  renderPreview(saved);
  localStorage.setItem('templateChoice', name);

  // Highlight selected
  document.querySelectorAll('.tpl').forEach(el => el.style.outline = 'none');
  const selected = document.querySelector(`.t-${name}`);
  if(selected) selected.style.outline = '3px solid #111';
}

function nextStep(){
  if(currentStep < totalSteps){
    document.getElementById('step'+currentStep).classList.remove('active');
    currentStep++;
    document.getElementById('step'+currentStep).classList.add('active');
    document.getElementById('stepNum').innerText = currentStep;
  }
}

function prevStep(){
  if(currentStep > 1){
    document.getElementById('step'+currentStep).classList.remove('active');
    currentStep--;
    document.getElementById('step'+currentStep).classList.add('active');
    document.getElementById('stepNum').innerText = currentStep;
  }
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('portfolioData') || '{}');

  // Restore inputs
  if(Object.keys(saved).length > 0){
    Object.keys(saved).forEach(k => {
      if(k === 'photo') return;
      const el = document.getElementById(k);
      if(el) el.value = saved[k];
    });
  }

  // Restore photo
  if(saved.photo){
    photoBase64 = saved.photo;
    const smallImg = document.getElementById('smallImg');
    const previewBox = document.getElementById('photoPreviewSmall');
    if(smallImg) smallImg.src = photoBase64;
    if(previewBox) previewBox.style.display = 'block';
  }

  currentTemplate = localStorage.getItem('templateChoice') || 'pink';
  renderPreview(saved);
};