export const DEFAULT_SECONDARY_INFO = [
  "entity-id",
  "last-changed",
  "last-updated",
  "last-triggered",
  "position",
  "tilt-position",
  "brightness",
];

// :host outranks core #root rules in Lit's adopted stylesheets.
// Reset legacy margins when an older Canary copy has also injected styles.
// language=CSS
export const VERTICAL_STACK_IN_CARD_STYLE = `
    :host #root {
      gap: var(--vertical-stack-card-gap, var(--stack-card-gap, 8px));
    }
    :host #root > *:not(:first-child) {
      margin-top: 0;
    }
`;

// language=CSS
export const HORIZONTAL_STACK_IN_CARD_STYLE = `
    :host #root {
      gap: var(--horizontal-stack-card-gap, var(--stack-card-gap, 8px));
    }
    :host #root > *:not(:first-child) {
      margin-inline-start: 0;
    }
`;

// language=CSS
export const NORMAL_STACK_IN_CARD_STYLE = `
    :host #root {
      gap: 0;
    }
`;

// language=CSS
export const VERTICAL_STACK_COMPACT_STYLE = `
    :host #root > *:not(:first-child) {
      margin-top: -24px;
    }
`;

// language=CSS
export const HORIZONTAL_STACK_COMPACT_STYLE = `
    :host #root > *:not(:first-child) {
      margin-inline-start: -24px;
    }
`;

export const NO_CARD_STYLE = {
  boxShadow: "none",
  background: "none",
  border: "none",
};

// ha-card reads its look from these variables, and they inherit through
// shadow roots. Setting them on #root makes every nested card borderless
// from its first frame, even cards that load late. The stack's own
// ha-card look lives on :host, so it keeps the theme values.
// language=CSS
export const NESTED_CARD_RESET_STYLE = `
    :host #root {
      --ha-card-background: none;
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
      --ha-card-backdrop-filter: none;
    }
`;
