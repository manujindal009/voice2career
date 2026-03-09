import { dbmsKnowledge } from "./dbms";
import { osKnowledge } from "./os";
import { cnKnowledge } from "./cn";
import { aptitudeKnowledge } from "./aptitude";
import { englishKnowledge } from "./english";
import { cloudKnowledge } from "./cloud";
import { oopKnowledge } from "./oop";
import { dsaKnowledge } from "./dsa";
import { systemDesignKnowledge } from "./systemDesign";
import { hrKnowledge } from "./hr";

export const knowledgeBase = [
  ...dbmsKnowledge,
  ...osKnowledge,
  ...cnKnowledge,
  ...aptitudeKnowledge,
  ...englishKnowledge,
  ...cloudKnowledge,
  ...oopKnowledge,
  ...dsaKnowledge,
  ...systemDesignKnowledge,
  ...hrKnowledge,
];