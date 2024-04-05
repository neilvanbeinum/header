import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "toggleNavButton",
    "nav",
    "drillNav"
  ]

  static values = {
    navigationListItemIndex: Number
  }

  connect() {
    this.buttonState = "CLOSED"
  }

  toggle() {
    console.log(this.currentGroupValue)

    if (this.buttonState == "CLOSED") {
      this.toggleNavButtonTarget.textContent = "X"
      this.navTarget.classList.remove("hidden")
      this.buttonState = "OPEN"
    } else if (this.buttonState == "OPEN") {
      this.toggleNavButtonTarget.textContent = "="
      this.navTarget.classList.add("hidden")
      this.buttonState = "CLOSED"
    } else {
      this.toggleNavButtonTarget.textContent = "X"
      this.drillNavTarget.innerHTML = ""
      this.drillNavTarget.classList.add("hidden")
      this.drillNavTarget.classList.remove("md:flex")
      this.navTarget.classList.remove("hidden")
      this.buttonState = "OPEN"
    }
  }

  drillDownNavigation(event) {
    const target = event.target
    const navigationListItem = target.closest("li")
    const currentNavigationListItemIndex = Array.from(
      navigationListItem.parentNode.children
    ).indexOf(navigationListItem)

    const node = navigationListItem.querySelector("ol").cloneNode(true)

    this.navTarget.classList.add("hidden")

    if (this.drillNavTarget.childElementCount < 1) {
      this.drillNavTarget.appendChild(node)
      node.classList.remove("hidden")
      node.classList.add("md:flex")
      this.drillNavTarget.classList.remove("hidden")
      this.drillNavTarget.classList.add("md:flex")

      this.toggleNavButtonTarget.textContent = "<"
      this.buttonState = "DRILL"
    } else {
      if (this.navigationListItemIndex == currentNavigationListItemIndex) {
        this.drillNavTarget.innerHTML = ""
        this.drillNavTarget.classList.add("hidden")
        this.drillNavTarget.classList.remove("md:flex")
        this.navTarget.classList.remove("hidden")
      } else {
        this.drillNavTarget.innerHTML = ""

        this.drillNavTarget.appendChild(node)
        node.classList.remove("hidden")
        node.classList.add("md:flex")
        this.drillNavTarget.classList.remove("hidden")
        this.drillNavTarget.classList.add("md:flex")

        this.toggleNavButtonTarget.textContent = "<"
        this.buttonState = "DRILL"
      }
    }

    this.navigationListItemIndex = currentNavigationListItemIndex
  }
}
