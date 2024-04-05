import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["rotatable", "effectOrigin"]
  static classes = ["rotateDegrees"]

  connect() {
    console.log("rotation connect")
  }

  rotate() {
    console.log("rotating")
    this.rotatableTarget.classList.toggle(this.rotateClass)
  }

  reset(event) {
    if (this.hasEffectOriginTarget) {
      if (this.effectOriginTarget.contains(event.target)) {
        return
      }

      this.rotatableTarget.classList.remove(this.rotateClass)
    }
  }

  get rotateClass() {
    if (this.hasRotateDegreesClass) {
      return this.rotateDegreesClass
    }

    return "rotate-180"
  }
}
