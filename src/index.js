import { Application } from "@hotwired/stimulus"
import NavController from "./controllers/nav_controller"

window.Stimulus = Application.start()

Stimulus.register("nav", NavController)
