"use client";
import React, { useCallback } from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = useCallback(
    (newValue: number[]) => {
      onChange?.(newValue[0]);
    },
    [onChange],
  );

  return (
    <RadixSlider.Root
      className={
        "relative flex items-center select-none touch-none w-full h-10"
      }
      defaultValue={[1]}
      value={[value]}
      max={1}
      step={0.1}
      onValueChange={handleChange}
      aria-label={"Volume"}
    >
      <RadixSlider.Track
        className={"bg-neutral-600 relative grow rounded-full h-[3px]"}
      >
        <RadixSlider.Range
          className={"absolute bg-white rounded-full h-full"}
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
