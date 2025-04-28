
export interface Conjugation {
  eu: string;
  tu: string;
  ele: string;
  nos: string;
  vos: string;
  eles: string;
}

export interface Verb {
  infinitive: string;
  translation: string;
  grupo: 'ar' | 'er' | 'ir' | 'irregular';
  conjugations: {
    presente: Conjugation;
    preterito: Conjugation;
    futuro: Conjugation;
  };
}

export type TenseType = 'presente' | 'preterito' | 'futuro';

export const tenses: {id: TenseType; label: string}[] = [
  { id: 'presente', label: 'Presente' },
  { id: 'preterito', label: 'Pretérito Perfeito' },
  { id: 'futuro', label: 'Futuro Simples' }
];

export const pronouns = [
  { id: 'eu', label: 'Eu' },
  { id: 'tu', label: 'Tu' },
  { id: 'ele', label: 'Ele/Ela/Você' },
  { id: 'nos', label: 'Nós' },
  { id: 'vos', label: 'Vós' },
  { id: 'eles', label: 'Eles/Elas/Vocês' }
];

export const verbs: Verb[] = [
  {
    infinitive: 'falar',
    translation: 'to speak',
    grupo: 'ar',
    conjugations: {
      presente: {
        eu: 'falo',
        tu: 'falas',
        ele: 'fala',
        nos: 'falamos',
        vos: 'falais',
        eles: 'falam'
      },
      preterito: {
        eu: 'falei',
        tu: 'falaste',
        ele: 'falou',
        nos: 'falamos',
        vos: 'falastes',
        eles: 'falaram'
      },
      futuro: {
        eu: 'falarei',
        tu: 'falarás',
        ele: 'falará',
        nos: 'falaremos',
        vos: 'falareis',
        eles: 'falarão'
      }
    }
  },
  {
    infinitive: 'comer',
    translation: 'to eat',
    grupo: 'er',
    conjugations: {
      presente: {
        eu: 'como',
        tu: 'comes',
        ele: 'come',
        nos: 'comemos',
        vos: 'comeis',
        eles: 'comem'
      },
      preterito: {
        eu: 'comi',
        tu: 'comeste',
        ele: 'comeu',
        nos: 'comemos',
        vos: 'comestes',
        eles: 'comeram'
      },
      futuro: {
        eu: 'comerei',
        tu: 'comerás',
        ele: 'comerá',
        nos: 'comeremos',
        vos: 'comereis',
        eles: 'comerão'
      }
    }
  },
  {
    infinitive: 'partir',
    translation: 'to leave',
    grupo: 'ir',
    conjugations: {
      presente: {
        eu: 'parto',
        tu: 'partes',
        ele: 'parte',
        nos: 'partimos',
        vos: 'partis',
        eles: 'partem'
      },
      preterito: {
        eu: 'parti',
        tu: 'partiste',
        ele: 'partiu',
        nos: 'partimos',
        vos: 'partistes',
        eles: 'partiram'
      },
      futuro: {
        eu: 'partirei',
        tu: 'partirás',
        ele: 'partirá',
        nos: 'partiremos',
        vos: 'partireis',
        eles: 'partirão'
      }
    }
  },
  {
    infinitive: 'ser',
    translation: 'to be',
    grupo: 'irregular',
    conjugations: {
      presente: {
        eu: 'sou',
        tu: 'és',
        ele: 'é',
        nos: 'somos',
        vos: 'sois',
        eles: 'são'
      },
      preterito: {
        eu: 'fui',
        tu: 'foste',
        ele: 'foi',
        nos: 'fomos',
        vos: 'fostes',
        eles: 'foram'
      },
      futuro: {
        eu: 'serei',
        tu: 'serás',
        ele: 'será',
        nos: 'seremos',
        vos: 'sereis',
        eles: 'serão'
      }
    }
  },
  {
    infinitive: 'ter',
    translation: 'to have',
    grupo: 'irregular',
    conjugations: {
      presente: {
        eu: 'tenho',
        tu: 'tens',
        ele: 'tem',
        nos: 'temos',
        vos: 'tendes',
        eles: 'têm'
      },
      preterito: {
        eu: 'tive',
        tu: 'tiveste',
        ele: 'teve',
        nos: 'tivemos',
        vos: 'tivestes',
        eles: 'tiveram'
      },
      futuro: {
        eu: 'terei',
        tu: 'terás',
        ele: 'terá',
        nos: 'teremos',
        vos: 'tereis',
        eles: 'terão'
      }
    }
  }
];

export const getRandomVerb = (): Verb => {
  return verbs[Math.floor(Math.random() * verbs.length)];
};

export const getRandomPronoun = (): string => {
  return pronouns[Math.floor(Math.random() * pronouns.length)].id;
};

