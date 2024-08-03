'use client';

import { useEffect, useState } from 'react';
import {
  BodyBuild,
  EyeColor,
  EyeShape,
  FaceFeatures,
  FaceShape,
  HairColor,
  HairLength,
  Height,
  Influencer,
  Interest,
  SkinTone,
  Style,
  Tone,
} from '@/types';
import { GET } from '@/lib/fetch';
import Editor from '@/components/editor/editor';
import { updateAppearance, updatePersonality } from '@/actions';
import ToggleList from '@/components/editor/toggle-list';
import SelectInput from '@/components/editor/select-input';

type ParamsProps = {
  params: {
    id: string;
  };
};

const personalityDescription =
  'Adjust your influencer personality to better match their online presence and engagement style. Select the tones and interests that best describe their unique character traits and preferences.';
const appearanceDescription =
  "Transform your influencer's look to perfectly align with their online persona and engagement style. Choose the features and styles that highlight their distinctive physical editor and preferences.";

export default function InfluencerSettings({ params }: ParamsProps) {
  const { id } = params;
  const [influencer, setInfluencer] = useState<Influencer>();

  useEffect(() => {
    GET(`/influencer/${id}`, 'no-cache').then((data) => setInfluencer(data));
  }, [id]);

  if (influencer === undefined) return null;

  const { bodyBuild, eyeColor, eyeShape, faceFeatures, faceShape, hairColor, hairLength, height, skinTone, style } = influencer.appearance;

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-2">
          <Editor influencerId={id} title="Personality" description={personalityDescription} action={updatePersonality}>
            <ToggleList id="tone" label="Tone" enums={Tone} data={influencer.personality.tone} />
            <ToggleList id="interest" label="Interest" enums={Interest} data={influencer.personality.interest} />
          </Editor>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <Editor influencerId={id} title="Appearance" description={appearanceDescription} action={updateAppearance}>
            <div className="grid grid-cols-2 gap-2">
              <ToggleList className="col-span-2" id="face-features" label="Face Features" enums={FaceFeatures} data={faceFeatures} />
              <SelectInput className="col-span-2 md:col-span-1" id="body-build" label="Body Build" enums={BodyBuild} data={bodyBuild} />
              <SelectInput className="col-span-2 md:col-span-1" id="eye-color" label="Eye Color" enums={EyeColor} data={eyeColor} />
              <SelectInput className="col-span-2 md:col-span-1" id="eye-shape" label="Eye Shape" enums={EyeShape} data={eyeShape} />
              <SelectInput className="col-span-2 md:col-span-1" id="face-shape" label="Face Shape" enums={FaceShape} data={faceShape} />
              <SelectInput className="col-span-2 md:col-span-1" id="hair-color" label="Hair Color" enums={HairColor} data={hairColor} />
              <SelectInput className="col-span-2 md:col-span-1" id="hair-length" label="Hair Length" enums={HairLength} data={hairLength} />
              <SelectInput className="col-span-2 md:col-span-1" id="height" label="Height" enums={Height} data={height} />
              <SelectInput className="col-span-2 md:col-span-1" id="skin-tone" label="Skin Tone" enums={SkinTone} data={skinTone} />
              <SelectInput className="col-span-2 md:col-span-1" id="style" label="Style" enums={Style} data={style} />
            </div>
          </Editor>
        </div>
      </div>
    </>
  );
}