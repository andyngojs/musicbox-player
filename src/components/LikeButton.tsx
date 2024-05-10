"use client";
import React, { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {twMerge} from "tailwind-merge";

interface LikeButtonProps {
  songId: string;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, className }) => {
  const [isLike, setIsLike] = useState(false);

  const Icon = useMemo(() => (isLike ? AiFillHeart : AiOutlineHeart), [isLike]);

  return (
    <button className={twMerge("hover:opacity-75 transition", className)}>
      <Icon color={isLike ? "#eab308" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
