// Importing necessary libraries and components
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignatureInput from "./SignatureInput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Form } from "react-bootstrap";
import html2canvas from "html2canvas";

// Importing styles and dependencies
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import TextArea from'./TextArea';

// Main component for the modal
function ModalComponent() {
  // State for controlling the modal's open/closed state
  const [show, setShow] = useState(false);

  // Functions to handle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // States for signature, text, and selected radio option
  const [signature, setSignature] = useState("");
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle radio button change
  const handleRadioChange = async (event) => {
    let value = event.target.value;
    const fonts = {
      1: "Monotype Corsiva",
      2: "Holligate Signature Demo",
      3: "Mrs Saint Delafield",
      4: "Great Vibes",
    };
    setSelectedOption(value);

    // Create a textarea element with specified attributes
    const elementToCapture = document.createElement("textarea");
    elementToCapture.placeholder = "Type signature";
    elementToCapture.id = "textArea";
    elementToCapture.cols = 78;
    elementToCapture.rows = 8;
    elementToCapture.name = "signature";
    elementToCapture.style.fontFamily = fonts[value];
    elementToCapture.className = `text-area`;
    elementToCapture.style.fontSize = `30px`;
    elementToCapture.style.fontWeight = `bold`;
    elementToCapture.style.width = "600px";
    elementToCapture.style.height = "180px";
    elementToCapture.innerHTML = text;

    // Replace the old textarea with the new one
    let oldElement = document.getElementById("textArea");
    oldElement.parentNode.replaceChild(elementToCapture, oldElement);

    // Use html2canvas to convert the text into an image
    const canvas = await html2canvas(elementToCapture);

    // Get the data URL of the image
    const imageSrc = canvas.toDataURL("image/png");

    // Set the image source in the state
    setSignature(imageSrc);
  };

  // Function to handle signature change
  const handleSignatureChange = (newSignature) => {
    setSignature(newSignature);
  };

  // Function to handle tab switch
  const handleTabSwitch = () => {
    setSignature("");
    setText("");
  };

  // Render the component
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        {/* Button to open the modal */}
        <Button variant='primary' onClick={handleShow}>
          Sign
        </Button>

        {/* Modal component */}
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Add Signature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {/* Tabs for Draw and Type */}
              <Tabs onSelect={handleTabSwitch}>
                <TabList>
                  <Tab>Draw</Tab>
                  <Tab>Type</Tab>
                </TabList>

                {/* Panels for Draw and Type */}
                <TabPanel>
                  <SignatureInput onSignatureChange={handleSignatureChange} />
                </TabPanel>
                <TabPanel>
                  <TextArea setText={setText} onSignatureChange={handleSignatureChange} />
                </TabPanel>
              </Tabs>
            </div>
            <div id='hiddenItem'></div>

            {/* Signature Preview */}
            <div className='preview'>
              <h2>Signature Preview</h2>
              {signature && <img src={signature} alt='Signature' />}
              {text && (
                <Form className='radio'>
                  {/* Radio buttons for font selection */}
                  {[1, 2, 3, 4].map((option) => (
                    <Form.Check
                      key={option}
                      type='radio'
                      className={`form-check-label${option}`}
                      aria-label={`option ${option}`}
                      label={text}
                      name='radioGroup'
                      value={option}
                      checked={selectedOption === option.toString()}
                      onChange={handleRadioChange}
                    />
                  ))}
                </Form>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Close button */}
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

// Export the component as the default export
export default ModalComponent;
