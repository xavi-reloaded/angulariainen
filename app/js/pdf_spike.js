/*
var url = 'http://cdn.mozilla.net/pdfjs/helloworld.pdf';
PDFJS.disableWorker = true;

var pdfDoc = null,
    pageNum = 1,
    scale = 0.8,
    canvas = document.getElementById('the-canvas');
//    ctx = canvas.getContext('2d');

//
// Get page info from document, resize canvas accordingly, and render page
//
function renderPage(num) {
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport
        };
        page.render(renderContext);
    });

    // Update page counters
    document.getElementById('page_num').textContent = pageNum;
    document.getElementById('page_count').textContent = pdfDoc.numPages;
}

//
// Go to previous page
//
function goPrevious() {
    if (pageNum <= 1)
        return;
    pageNum--;
    renderPage(pageNum);
}

//
// Go to next page
//
function goNext() {
    if (pageNum >= pdfDoc.numPages)
        return;
    pageNum++;
    renderPage(pageNum);
}

//
// Asynchronously download PDF as an ArrayBuffer
//
PDFJS.getDocument(url).then(function getPdfHelloWorld(_pdfDoc) {
    pdfDoc = _pdfDoc;
    renderPage(pageNum);
});

*/

