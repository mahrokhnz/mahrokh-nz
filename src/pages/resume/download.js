const resume = document.querySelector(".resumeContainer");

html2pdf()
    .set({
        margin: [-1, -2, -4, 10],
        filename: 'Nabizadeh_CV.pdf',
        html2canvas: {scale: 1},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait', no_copy: false},
    })
    .from(resume)
    .save();
