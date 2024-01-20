import React, { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";
import SignatureAction from "./SignatureAction";

// SignatureInput component is used for capturing drawn signatures.
// It uses the SignaturePad library to provide signature drawing functionality.
const SignatureInput = ({ onSignatureChange }) => {
  // Refs to store SignaturePad and canvas elements
  const signaturePadRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize SignaturePad when the component mounts
    const canvas = canvasRef.current;
    const signaturePad = new SignaturePad(canvas);

    // Set the pen color and width (optional)
    signaturePad.penColor = "black";
    signaturePad.minWidth = 2;

    // Attach SignaturePad instance to the ref
    signaturePadRef.current = signaturePad;

    // Clear the signature pad when the component unmounts
    return () => {
		setTimeout(() => {
			signaturePad?.clear();
		  }, 1000);
    };
  }, []);

  // Render the SignatureInput component
  return (
    <div className='content'>
      {/* Canvas element for drawing the signature */}
      <canvas
	  	data-testid="signature-canvas"
        ref={canvasRef}
        width='600'
        height='200'
        className='signature-canvas'
      />

      {/* SignatureAction component for actions like clear and save */}
      <SignatureAction
        type={"pad"}
        signaturePadRef={signaturePadRef}
        onSignatureChange={onSignatureChange}
      />
    </div>
  );
};

// Export the SignatureInput component as the default export
export default SignatureInput;
