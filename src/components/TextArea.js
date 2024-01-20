// SignatureFromTextArea.js
import React, { useRef, useEffect } from "react";
import SignatureAction from "./SignatureAction";

// SignatureFromTextArea component captures a signature from a text area.
// It allows users to type a signature, convert it to an image, and perform actions like clear and save.
const SignatureFromTextArea = ({ onSignatureChange, setText }) => {
  // Ref to store the text area element
  const textAreaRef = useRef(null);

  // useEffect to update the text content when the text area changes
  useEffect(() => {
    // Update the text content in the parent component
    setText(textAreaRef?.current.value);
  }, [textAreaRef?.current]);

  // Render the SignatureFromTextArea component
  return (
    <div className='content'>
      {/* Text area element for typing the signature */}
      <textarea
        id='textArea'
        ref={textAreaRef}
        placeholder='Type signature'
        cols='78'
        rows='8'
        name='signature'
        className='text-area'
      />
      <br />

      {/* SignatureAction component for actions like clear and save */}
      <SignatureAction
        type={"text"}
        signaturePadRef={textAreaRef}
        onSignatureChange={onSignatureChange}
        setText={setText}
      />
    </div>
  );
};

// Export the SignatureFromTextArea component as the default export
export default SignatureFromTextArea;
