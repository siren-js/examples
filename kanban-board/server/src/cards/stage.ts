export enum Stage {
  ToDo = 'To-Do',
  Doing = 'Doing',
  Done = 'Done',
}

export function next(stage: Stage): Stage | undefined {
  if (stage === Stage.ToDo) return Stage.Doing;
  if (stage === Stage.Doing) return Stage.Done;
}

export function previous(stage: Stage): Stage | undefined {
  if (stage === Stage.Done) return Stage.Doing;
  if (stage === Stage.Doing) return Stage.ToDo;
}
