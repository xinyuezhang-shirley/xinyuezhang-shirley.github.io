import specimenJson from "./specimen.json";
import { parsedFeaturesFromSpecimen, type ParsedFeatures } from "./lib/poeticFeatures";

export type MuseLabSpecimen = {
  title: string;
  poem: string;
  parsed: ParsedFeatures;
};

export const museLabSpecimen: MuseLabSpecimen = {
  title: specimenJson.title,
  poem: specimenJson.poem,
  parsed: parsedFeaturesFromSpecimen(specimenJson.poetic_features),
};
