import { staticFile } from "remotion";
import { videoWidth } from "../../const";
import "./pokemon.css";

const SPRITE_SIZE = 32;
const FRAMES_PER_LOOP = 4;

const trainerFaceLeft = staticFile("/img/pokemon/trainer_face_left.png");
const trainerFaceRight = staticFile("/img/pokemon/trainer_face_right.png");
const trainerWalkLeft = staticFile("/img/pokemon/trainer_walk_left.png");
const trainerWalkRight = staticFile("/img/pokemon/trainer_walk_right.png");

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
