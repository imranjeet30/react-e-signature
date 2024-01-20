// ModalComponent.test.js
import React from "react";
import {
	render,
	fireEvent,
	screen,
} from "@testing-library/react";
import ModalComponent from "./ModalComponent";
import SignatureInput from "./SignatureInput";

jest.mock("./SignatureInput", () => {
	// MockedSignatureInput is a dummy component that you want to use instead
	const MockedSignatureInput = () => (
		<div data-testid='mocked-signature-input' />
	);
	return MockedSignatureInput;
});

// Mock SignaturePad module
jest.mock("signature_pad", () => {
	return {
		__esModule: true,
		default: jest.fn(() => ({
			penColor: "black",
			minWidth: 2,
			clear: jest.fn(),
		})),
	};
});

describe("ModalComponent", () => {
	it("should open the modal when the 'Sign' button is clicked", () => {
		render(<ModalComponent />);

		// Check that the mocked SignatureInput is not rendered
		expect(screen.queryByTestId("mocked-signature-input")).toBeNull();

		// Click the 'Sign' button
		fireEvent.click(screen.getByText("Sign"));
		// Check if the modal is now open
	});

	it("should switch tabs when 'Type' tab is selected", () => {
		render(<ModalComponent />);

		// Click the 'Sign' button to open the modal
		fireEvent.click(screen.getByText("Sign"));

		// Check if the modal is open
		expect(screen.getByText("Signature Preview")).toBeInTheDocument();

		// Click the 'Type' tab
		fireEvent.click(screen.getByText("Type"));

		// Check if the 'Type' tab is selected
		expect(screen.getByText("Type")).toHaveClass("react-tabs__tab--selected");
	});
});

describe("SignatureInput", () => {
	it("renders without crashing", () => {
		render(<SignatureInput />);
	});
});
