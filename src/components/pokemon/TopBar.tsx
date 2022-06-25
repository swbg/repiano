import { videoWidth } from "../../const";
import trainerFaceLeft from "./assets/trainerFaceLeft.png";
import trainerFaceRight from "./assets/trainerFaceRight.png";
import trainerWalkLeft from "./assets/trainerWalkLeft.png";
import trainerWalkRight from "./assets/trainerWalkRight.png";
import "./pokemon.css";

const SPRITE_SIZE = 32;
const FRAMES_PER_LOOP = 4;

export const TopBar: React.FC<{ frame: number }> = ({ frame }) => {
  const maxAnimIndex =
    (Math.round(videoWidth / SPRITE_SIZE) + 4) * FRAMES_PER_LOOP;
  let animIndex = Math.floor(frame / 4);

  const isWalking =
    animIndex % FRAMES_PER_LOOP == 2 || animIndex % FRAMES_PER_LOOP == 3;

  let spriteSrc;
  if (Math.floor(animIndex / maxAnimIndex) % 2 == 0) {
    // Walk right
    spriteSrc = isWalking ? trainerWalkRight : trainerFaceRight;
    animIndex = animIndex % maxAnimIndex;
  } else {
    // Walk left
    spriteSrc = isWalking ? trainerWalkLeft : trainerFaceLeft;
    animIndex = maxAnimIndex - (animIndex % maxAnimIndex);
  }

  return (
    <div className="pokemonBar">
      <img
        className="pokemonTrainer"
        src={spriteSrc}
        width={SPRITE_SIZE}
        style={{
          left:
            (SPRITE_SIZE / FRAMES_PER_LOOP) * (animIndex - 2 * FRAMES_PER_LOOP),
        }}
      />
    </div>
  );
};
