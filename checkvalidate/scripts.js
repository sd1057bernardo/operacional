const scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function(content) {
    document.getElementById('barcode-result').innerHTML = `Scanned Barcode: ${content}`;
    // You can perform further actions with the scanned content here
});

Instascan.Camera.getCameras().then(function(cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function(error) {
    console.error(error);
});
