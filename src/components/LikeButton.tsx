"use client";
import React, { useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const [isLike, setIsLike] = useState(false);

  const Icon = useMemo(() => (isLike ? AiFillHeart : AiOutlineHeart), [isLike]);

  return (
    <button className={"hover:opacity-75 transition"}>
      <Icon color={isLike ? "#eab308" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
