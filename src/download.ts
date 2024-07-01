const resume: Element = document.querySelector(".resumeContainer")!;

import 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'

html2pdf()
    .set({
        margin: 0,
        filename: 'Nabizadeh_CV.pdf',
        html2canvas: {scale: 2},
        image: {type: 'svg', quality: 0.98},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait', no_copy: false},
    })
    .from(resume)
    .save();
