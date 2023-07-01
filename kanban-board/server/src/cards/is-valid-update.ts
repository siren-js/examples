import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { Stage } from './stage';

export function isValidUpdate(card: Card, dto: UpdateCardDto): boolean {
  switch (card.stage) {
    case Stage.ToDo:
    case Stage.Done:
      return dto.stage === Stage.Doing;
    case Stage.Doing:
      return dto.stage === Stage.ToDo || dto.stage === Stage.Done;
    default:
      throw new Error('If you see this, something has gone horribly wrong!');
  }
}
