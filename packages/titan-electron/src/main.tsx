import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/App.tsx"
import Providers from "@/Providers.tsx"
import { library } from "@fortawesome/fontawesome-svg-core"
import { all } from "@awesome.me/kit-5ece647f5e/icons"

library.add(...all)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
