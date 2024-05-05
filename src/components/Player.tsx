'use client'
import React from "react";
import {useAppSelector} from "@/redux/hooks";

interface PlayerProps {

}

const Player: React.FC<PlayerProps> = () => {
    const {queue} = useAppSelector((state) => state.player)

    return (
        <div>
            Player
        </div>
    )
}

export default Player