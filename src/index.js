import { Client } from "@gradio/client";

// DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const captureBtn = document.getElementById('captureBtn');
const webcamElement = document.getElementById('webcam');
const depthCanvas = document.getElementById('depthCanvas');
const errorMessageElement = document.getElementById('errorMessage');
const captureIntervalSelect = document.getElementById('captureInterval');
const autoCaptureToggle = document.getElementById('autoCaptureToggle');
const fpsDisplay = document.getElementById('fpsDisplay');
const statusIndicator = document.getElementById('statusIndicator');
const loadingIndicator = document.getElementById('loadingIndicator');
const apiStats = document.getElementById('apiStats');

// Variables
let webcamStream;
let isRunning = false;
let depthCtx = depthCanvas.getContext('2d');
let captureInterval = 3000; // Default: 3 seconds
let lastCaptureTime = 0;
let captureTimeoutId = null;
let frameCount = 0;
let lastFpsUpdateTime = 0;
let apiCallCount = 0;
let gradioClient;
let isProcessing = false;

// Initialize the application
async function init() {
    // Set initial canvas size
    depthCanvas.width = 640;
    depthCanvas.height = 480;

    // Add event listeners
    startBtn.addEventListener('click', startWebcam);
    stopBtn.addEventListener('click', stopWebcam);
    captureBtn.addEventListener('click', processDepth);
    captureIntervalSelect.addEventListener('change', updateCaptureInterval);
    autoCaptureToggle.addEventListener('change', toggleAutoCapture);

    // Initial canvas state
    depthCtx.fillStyle = '#f0f0f0';
    depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);
    depthCtx.fillStyle = '#666';
    depthCtx.font = '20px Arial';
    depthCtx.textAlign = 'center';
    depthCtx.fillText('No depth map generated yet', depthCanvas.width / 2, depthCanvas.height / 2);

    // Initialize Gradio client
    try {
        updateStatus('Connecting to Depth Anywhere API...');
        gradioClient = await Client.connect("Albert-NHWang/Depth-Anywhere-App");
        updateStatus('Connected to Depth Anywhere API. Ready to start.');
        captureBtn.disabled = true; // Still disabled until webcam starts
    } catch (error) {
        console.error('Error connecting to Gradio API:', error);
        showError('Failed to connect to the Depth Anywhere API: ' + error.message);
        updateStatus('API Connection Failed');
    }
}

// Start webcam capture
async function startWebcam() {
    if (isRunning) return; // Prevent multiple instances

    try {
        webcamStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });

        webcamElement.srcObject = webcamStream;
        isRunning = true;

        // Update UI
        startBtn.disabled = true;
        stopBtn.disabled = false;
        captureBtn.disabled = false;
        updateStatus('Webcam running. Ready to process depth.');

        // Reset counters
        frameCount = 0;
        lastFpsUpdateTime = Date.now();

        // Start auto-capture if enabled
        if (autoCaptureToggle.checked && captureInterval > 0) {
            startAutoCapture();
        }

        // Start FPS counter
        requestAnimationFrame(updateFPS);
    } catch (err) {
        console.error('Error accessing webcam:', err);
        showError('Unable to access webcam. Make sure your camera is connected and permissions are granted.');
    }
}

// Stop webcam capture
function stopWebcam() {
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        webcamElement.srcObject = null;
        isRunning = false;

        // Update UI
        startBtn.disabled = false;
        stopBtn.disabled = true;
        captureBtn.disabled = true;
        updateStatus('Webcam stopped');

        // Stop auto-capture
        stopAutoCapture();

        // Reset captured canvas
        depthCtx.fillStyle = '#f0f0f0';
        depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);
        depthCtx.fillStyle = '#666';
        depthCtx.font = '20px Arial';
        depthCtx.textAlign = 'center';
        depthCtx.fillText('Webcam stopped', depthCanvas.width / 2, depthCanvas.height / 2);
    }
}

// Process depth from webcam frame
async function processDepth() {
    if (!isRunning || !gradioClient || isProcessing) return;

    isProcessing = true;
    loadingIndicator.style.display = 'block';

    // Create a temporary canvas to get the image data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = webcamElement.videoWidth;
    tempCanvas.height = webcamElement.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(webcamElement, 0, 0, tempCanvas.width, tempCanvas.height);

    try {
        updateStatus('Processing depth map...');

        // Get image as blob
        const imageBlob = await new Promise(resolve => {
            tempCanvas.toBlob(resolve, 'image/png');
        });

        // Send to Depth Anywhere API
        const startTime = Date.now();
        const result = await gradioClient.predict("/depth", {
            path: imageBlob
        });
        const processingTime = Date.now() - startTime;

        // Update API call stats
        apiCallCount++;
        apiStats.textContent = `API Calls: ${apiCallCount} | Last processing time: ${processingTime}ms`;

        // Display result in the canvas
        const depthImage = new Image();
        depthImage.onload = () => {
            depthCtx.clearRect(0, 0, depthCanvas.width, depthCanvas.height);
            depthCtx.drawImage(depthImage, 0, 0, depthCanvas.width, depthCanvas.height);

            // Add timestamp to the frame
            const timestamp = new Date().toLocaleTimeString();
            depthCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            depthCtx.fillRect(0, depthCanvas.height - 30, depthCanvas.width, 30);
            depthCtx.fillStyle = 'white';
            depthCtx.font = '14px Arial';
            depthCtx.textAlign = 'right';
            depthCtx.fillText(`Depth processed: ${timestamp}`, depthCanvas.width - 10, depthCanvas.height - 10);

            loadingIndicator.style.display = 'none';
            isProcessing = false;
        };
        depthImage.src = result.data;

        lastCaptureTime = Date.now();
        updateStatus(`Depth map generated successfully (${processingTime}ms)`);
    } catch (error) {
        console.error('Error processing with Depth Anywhere:', error);
        showError('Failed to process depth: ' + error.message);

        // Show error on canvas
        depthCtx.fillStyle = '#ffebee';
        depthCtx.fillRect(0, 0, depthCanvas.width, depthCanvas.height);
        depthCtx.fillStyle = '#d32f2f';
        depthCtx.font = '16px Arial';
        depthCtx.textAlign = 'center';
        depthCtx.fillText('Error processing depth map', depthCanvas.width / 2, depthCanvas.height / 2 - 10);
        depthCtx.fillText('See console for details', depthCanvas.width / 2, depthCanvas.height / 2 + 20);

        loadingIndicator.style.display = 'none';
        isProcessing = false;
    }
}

// Update the capture interval
function updateCaptureInterval() {
    captureInterval = parseInt(captureIntervalSelect.value);
    console.log('Updated capture interval:', captureInterval);

    // Restart auto-capture with new interval
    if (isRunning && autoCaptureToggle.checked) {
        stopAutoCapture();
        if (captureInterval > 0) {
            startAutoCapture();
        }
    }
}

// Toggle auto-capture
function toggleAutoCapture() {
    if (isRunning) {
        if (autoCaptureToggle.checked && captureInterval > 0) {
            startAutoCapture();
        } else {
            stopAutoCapture();
        }
    }
}

// Start auto-capture
function startAutoCapture() {
    if (captureTimeoutId) {
        clearTimeout(captureTimeoutId);
    }

    function captureLoop() {
        if (!isProcessing) {
            processDepth();
        }

        captureTimeoutId = setTimeout(captureLoop, captureInterval);
    }

    captureLoop();
    updateStatus('Auto-processing enabled');
}

// Stop auto-capture
function stopAutoCapture() {
    if (captureTimeoutId) {
        clearTimeout(captureTimeoutId);
        captureTimeoutId = null;
        updateStatus('Auto-processing disabled');
    }
}

// Update FPS counter
function updateFPS() {
    if (!isRunning) return;

    frameCount++;
    const now = Date.now();
    const elapsed = now - lastFpsUpdateTime;

    if (elapsed >= 1000) { // Update once per second
        const fps = Math.round((frameCount * 1000) / elapsed);
        fpsDisplay.textContent = `Webcam FPS: ${fps}`;

        frameCount = 0;
        lastFpsUpdateTime = now;
    }

    requestAnimationFrame(updateFPS);
}

// Update the status indicator
function updateStatus(status) {
    statusIndicator.textContent = status;
}

// Display error messages
function showError(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
    setTimeout(() => {
        errorMessageElement.style.display = 'none';
    }, 5000);
}

// Call init() to start the process when the page loads
window.onload = init;