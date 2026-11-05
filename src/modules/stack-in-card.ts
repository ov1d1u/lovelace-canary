import { LovelaceCard } from "custom-card-helpers";
import { NESTED_CARD_RESET_STYLE, NORMAL_STACK_IN_CARD_STYLE } from "../const";
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

export function registerStackInCard(
  module: string,
  element: string,
  stackStyle: string,
  compactStyle: string,
) {
  if (!moduleEnabled(module)) return;

  // Install the hook before ha-card loads: a stack can render before its cards.
  createModule<Config>(element, async function () {
    if (
      this._config?.in_card !== true ||
      !extensionEnabled(this._config, "in_card")
    ) {
      return;
    }

    // Make nested cards borderless right away, before anything is awaited,
    // so they never paint with their own border or background.
    const resetElement = document.createElement("style");
    resetElement.textContent = NESTED_CARD_RESET_STYLE;
    this.shadowRoot?.appendChild(resetElement);

    // Only reading ha-card's styles needs to wait for its definition.
    await customElements.whenDefined("ha-card");
    await this.updateComplete;

    const inCardStyle =
      stackStyle +
      ((customElements.get("ha-card") as CardWithStyles).styles?.cssText ?? "");

    // add ha-card appearance with normal, theme, or legacy compact spacing.
    const styleElement = document.createElement("style");
    styleElement.textContent =
      inCardStyle +
      (this._config.in_card_spacing === "compact"
        ? compactStyle
        : this._config.in_card_spacing === "theme"
          ? ""
          : NORMAL_STACK_IN_CARD_STYLE);

    // ha-card's styles include a 0.3s transition. Without this, the stack's
    // border would fade in from the text color, which is white in dark themes.
    const transition = this.style.transition;
    this.style.transition = "none";
    this.shadowRoot?.appendChild(styleElement);
    // Apply the new styles now, while transitions are off.
    getComputedStyle(this).borderTopColor;
    this.style.transition = transition;
  });
}
