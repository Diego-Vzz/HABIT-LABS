export type SetType = 'normal' | 'warmup' | 'failure';

export type RestTime = { 
    h: string; 
    m: string; 
    s: string; 
};

export type SetData = { 
    id: string; 
    kg: string; 
    reps: string; 
    type: SetType; 
    restTime: RestTime; 
    note?: string;
};

export type Exercise = {
    id: number;
    name: string;
    description: string;
};

export type SelectedExercise = Exercise & { sets: SetData[] };
