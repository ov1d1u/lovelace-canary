import {
  VERTICAL_STACK_COMPACT_STYLE,
  VERTICAL_STACK_IN_CARD_STYLE,
} from "../const";
import { registerStackInCard } from "./stack-in-card";

const MODULE = "vertical-stack";
const ELEMENT = "hui-vertical-stack-card";

registerStackInCard(
  MODULE,
  ELEMENT,
  VERTICAL_STACK_IN_CARD_STYLE,
  VERTICAL_STACK_COMPACT_STYLE,
);
