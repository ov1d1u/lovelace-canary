export const DEFAULT_SECONDARY_INFO = [
  "entity-id",
  "last-changed",
  "last-updated",
  "last-triggered",
  "position",
  "tilt-position",
  "brightness",
];

// language=CSS
export const VERTICAL_STACK_IN_CARD_STYLE = `
    #root {
      gap: var(--vertical-stack-card-gap, var(--stack-card-gap, 8px));
    }
`;

// language=CSS
export const HORIZONTAL_STACK_IN_CARD_STYLE = `
    #root {
      gap: var(--horizontal-stack-card-gap, var(--stack-card-gap, 8px));
    }
`;

// language=CSS
export const COMPACT_STACK_IN_CARD_STYLE = `
    #root {
      gap: 0;
    }
`;

export const NO_CARD_STYLE = {
  boxShadow: "none",
  background: "none",
  border: "none",
};
