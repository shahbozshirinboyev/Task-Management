import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

// Ensure you have a <div id="root"></div> in your index.html
const container = document.getElementById("root"); // Get the target container

if (container) {
	ReactDOM.createRoot(container).render( // Pass the container to createRoot
		<Suspense fallback={<div>Loading...</div>}>
			<BrowserRouter>
				<StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
					<App />
				</StyleSheetManager>
			</BrowserRouter>
		</Suspense>
	);
} else {
	console.error("Target container is not found. Make sure there is a <div id='root'></div> in your HTML.");
}
