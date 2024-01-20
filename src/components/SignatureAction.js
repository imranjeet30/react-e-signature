import React from "react";
import html2canvas from "html2canvas";
import Button from "react-bootstrap/Button";

// SignatureAction component handles actions for clearing and saving a signature.
// It supports both drawing signatures and converting typed text to an image.
const SignatureAction = ({ signaturePadRef, onSignatureChange, type, setText }) => {
  // Handle clear action for the signature pad
  const handleClear = () => {
    const signaturePad = signaturePadRef.current;

    // Clear the signature or text based on the type
    if (type === "text") {
      signaturePadRef.current.value = "";
      setText("");
    } else {
      signaturePad.clear();
    }

    // Notify parent component about the cleared signature
    onSignatureChange("");
  };

  // Handle save action for the signature
  const handleSave = () => {
    // Choose the appropriate method based on the type
    if (type === "text") {
      handleTextTypeSign();
    } else {
      handleESign();
    }
  };

  // Convert typed text to an image using html2canvas
  const handleTextTypeSign = async () => {
    // Get the element containing the text (assumed with id 'textArea')
    let element = document.getElementById("textArea");
    element.style.fontFamily = "Monotype Corsiva";

    // Use html2canvas to convert the text into an image
    const canvas = await html2canvas(element);

    // Get the data URL of the image
    const imageSrc = canvas.toDataURL("image/png");

    // Set the image source in the state
    onSignatureChange(imageSrc);
  };

  // Handle saving a drawn signature using the signature pad
  const handleESign = () => {
    const signaturePad = signaturePadRef.current;

    // Get the data URL of the signature image
    const signatureData = signaturePad.toDataURL();

    // Set the signature image source in the state
    onSignatureChange(signatureData);
  };

  // Render the component with clear and save buttons
  return (
    <div className='action'>
      {/* Button to clear the signature */}
      <Button variant='primary' onClick={handleClear}>
        Clear
      </Button>

      {/* Button to save the signature */}
      <Button variant='success' onClick={handleSave}>
        Done
      </Button>
    </div>
  );
};

// Export the SignatureAction component as the default export
export default SignatureAction;
