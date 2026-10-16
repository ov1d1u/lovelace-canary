import { LovelaceCard } from "custom-card-helpers";
import { NORMAL_STACK_IN_CARD_STYLE, NO_CARD_STYLE } from "../const";
import { createModule } from "../module";
import { extensionEnabled, moduleEnabled } from "../utils";

interface CardWithStyles extends LovelaceCard, CustomElementConstructor {
  styles?: {
    cssText: string;
  };
}

interface Config {
  in_card?: boolean;
  in_card_spacing?: "normal" | "theme" | "compact";
}

const applyStyles = async function (element) {
  // exit clause.
  if (!element) return;

  await element.updateComplete;

  if (element.tagName === "HA-CARD") {
    element.style.transition = "none";
    Object.assign(element.style, NO_CARD_STYLE);
    // flush css
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    element.offsetHeight;
    element.style.transition = "";
  }

  // depth search.
  if (element.firstElementChild) {
    await applyStyles(element.firstElementChild);
  }
  if (element.shadowRoot) {
    await applyStyles(element.shadowRoot.firstElementChild);
  }
  // breadth search.
  if (element.nextElementSibling) {
    await applyStyles(element.nextElementSibling);
  }
};

export function registerStackInCard(
  module: string,
  element: string,
  stackStyle: string,
  compactStyle: string,
) {
  if (!moduleEnabled(module)) return;

  // require ha-card to be defined so that we can take its style
  customElements.whenDefined("ha-card").then(() => {
    const inCardStyle =
      stackStyle +
      ((customElements.get("ha-card") as CardWithStyles).styles?.cssText ?? "");

    createModule<Config>(element, function () {
      if (
        this._config?.in_card === true &&
        extensionEnabled(this._config, "in_card")
      ) {
        // add ha-card appearance with normal, theme, or legacy compact spacing.
        const styleElement = document.createElement("style");
        styleElement.textContent =
          inCardStyle +
          (this._config.in_card_spacing === "compact"
            ? compactStyle
            : this._config.in_card_spacing === "theme"
              ? ""
              : NORMAL_STACK_IN_CARD_STYLE);
        this.shadowRoot?.appendChild(styleElement);

        // remove style from all ha-card child elements.
        const divElement = this.shadowRoot?.querySelector("#root");
        applyStyles(divElement);
      }
    });
  });
}
