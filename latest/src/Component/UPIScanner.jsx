import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import jsQR from "jsqr";
import "./UPIScanner.css";

const UPIScanner = ({ onScanSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [scanStatus, setScanStatus] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanningIntervalRef = useRef(null);

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      // Extract UPI ID from QR code data
      // UPI QR codes typically have format: upi://pay?pa=upiId&pn=Name&...
      let upiId = null;
      
      if (code.data.includes("upi://") || code.data.includes("UPI:")) {
        // Parse UPI QR code
        try {
          const urlStr = code.data.replace(/^UPI:/, "upi://");
          const url = new URL(urlStr);
          upiId = url.searchParams.get("pa");
        } catch (e) {
          // If URL parsing fails, try regex extraction
          const upiMatch = code.data.match(/pa=([\w.\-]+@[\w.\-]+)/) || code.data.match(/([\w.\-]+@[\w.\-]+)/);
          upiId = upiMatch ? upiMatch[1] : null;
        }
        
        // Fallback: try to extract UPI ID pattern directly
        if (!upiId) {
          const upiMatch = code.data.match(/([\w.\-]+@[\w.\-]+)/);
          upiId = upiMatch ? upiMatch[1] : null;
        }
      } else if (code.data.includes("@")) {
        // Direct UPI ID
        upiId = code.data;
      }

      if (upiId && upiId.includes("@")) {
        setScanStatus("QR code scanned successfully!");
        stopScanning();
        setTimeout(() => {
          onScanSuccess?.(upiId);
          setIsOpen(false);
          setScanStatus("");
        }, 1000);
      } else {
        setScanStatus("Invalid UPI QR code. Please scan a valid UPI QR code.");
      }
    }
  };

  const startScanning = async () => {
    try {
      setError("");
      setScanStatus("");
      setScanning(true);
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          // Start scanning loop
          scanningIntervalRef.current = setInterval(scanQRCode, 100); // Check every 100ms
        };
      }
    } catch (err) {
      setError("Camera access denied or not available. Please allow camera access to scan QR codes.");
      setScanning(false);
      console.error("Camera error:", err);
    }
  };

  const stopScanning = () => {
    if (scanningIntervalRef.current) {
      clearInterval(scanningIntervalRef.current);
      scanningIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setScanning(false);
    setScanStatus("");
  };

  const handleManualInput = () => {
    const upiId = prompt("Enter UPI ID manually:");
    if (upiId && upiId.includes("@")) {
      onScanSuccess?.(upiId);
      setIsOpen(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop scanning when scanner is closed
  useEffect(() => {
    if (!isOpen) {
      stopScanning();
    }
  }, [isOpen]);

  return (
    <div className="upi-scanner-container">
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="scanner-toggle-btn"
      >
        {isOpen ? "Hide Scanner" : "Scan QR Code"}
      </Button>

      {isOpen && (
        <div className="scanner-panel">
          <div className="scanner-header">
            <h6>UPI QR Code Scanner</h6>
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="close-scanner-btn"
            >
              ✕
            </Button>
          </div>

          <div className="scanner-content">
            {!scanning ? (
              <div className="scanner-placeholder">
                <div className="scanner-icon">📷</div>
                <p>Click "Start Scanner" to scan UPI QR code</p>
                <Button onClick={startScanning} className="start-scan-btn">
                  Start Scanner
                </Button>
                <div className="divider">OR</div>
                <Button variant="outline-secondary" onClick={handleManualInput}>
                  Enter UPI ID Manually
                </Button>
              </div>
            ) : (
              <div className="video-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="scanner-video"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div className="scanner-overlay">
                  <div className="scanner-frame"></div>
                </div>
                {scanStatus && (
                  <div className={`scan-status ${scanStatus.includes("success") ? "success" : "info"}`}>
                    {scanStatus}
                  </div>
                )}
                <div className="scanner-controls">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={stopScanning}
                  >
                    Stop Scanner
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleManualInput}
                  >
                    Enter Manually
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="scanner-error">{error}</div>
            )}

            <div className="scanner-instructions">
              <p><strong>Instructions:</strong></p>
              <ul>
                <li>Position the QR code within the frame</li>
                <li>Ensure good lighting for better scanning</li>
                <li>Hold your device steady</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UPIScanner;

