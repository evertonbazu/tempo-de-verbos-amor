
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
  { id: 'preterito', label: 'Passado' },
  { id: 'futuro', label: 'Futuro' }
];

export const pronouns = [
  { id: 'eu', label: 'Eu' },
  { id: 'tu', label: 'Tu' },
  { id: 'ele', label: 'Ele/Ela/Você' },
  { id: 'nos', label: 'Nós' },
  { id: 'vos', label: 'Vós' },
  { id: 'eles', label: 'Eles/Elas/Vocês' }
];

export interface SentenceExample {
  sentence: string;
  verb: string;
  tense: TenseType;
}

export const sentences: SentenceExample[] = [
  { sentence: "O menino foi para a escola.", verb: "foi", tense: "preterito" },
  { sentence: "Maria estuda para a prova.", verb: "estuda", tense: "presente" },
  { sentence: "Eles viajarão nas férias.", verb: "viajarão", tense: "futuro" },
  { sentence: "Nós comemos pizza ontem.", verb: "comemos", tense: "preterito" },
  { sentence: "Eu trabalho em um escritório.", verb: "trabalho", tense: "presente" },
  { sentence: "Você lerá aquele livro amanhã.", verb: "lerá", tense: "futuro" },
  { sentence: "O cachorro corre no parque.", verb: "corre", tense: "presente" },
  { sentence: "Minha mãe preparou o jantar.", verb: "preparou", tense: "preterito" },
  { sentence: "Nós assistiremos ao filme à noite.", verb: "assistiremos", tense: "futuro" },
  { sentence: "Eles jogam futebol todos os sábados.", verb: "jogam", tense: "presente" },
  { sentence: "Ela comprou um presente para o amigo.", verb: "comprou", tense: "preterito" },
  { sentence: "Eu viajarei para o exterior no próximo ano.", verb: "viajarei", tense: "futuro" },
  { sentence: "O professor explica a matéria com clareza.", verb: "explica", tense: "presente" },
  { sentence: "Nós chegamos cedo ontem.", verb: "chegamos", tense: "preterito" },
  { sentence: "Você aprenderá uma nova língua.", verb: "aprenderá", tense: "futuro" },
  { sentence: "As crianças brincam no quintal.", verb: "brincam", tense: "presente" },
  { sentence: "Meu pai consertou o carro.", verb: "consertou", tense: "preterito" },
  { sentence: "Ela fará um bolo delicioso.", verb: "fará", tense: "futuro" },
  { sentence: "Nós estudamos juntos na biblioteca.", verb: "estudamos", tense: "presente" },
  { sentence: "O aluno respondeu à pergunta.", verb: "respondeu", tense: "preterito" },
  { sentence: "Eu irei ao médico amanhã.", verb: "irei", tense: "futuro" },
  { sentence: "O gato dorme no sofá.", verb: "dorme", tense: "presente" },
  { sentence: "Eles viajaram para a praia no verão passado.", verb: "viajaram", tense: "preterito" },
  { sentence: "Você vai gostar do presente.", verb: "vai gostar", tense: "futuro" },
  { sentence: "Nós lemos todos os dias.", verb: "lemos", tense: "presente" },
  { sentence: "Ela esqueceu o guarda-chuva.", verb: "esqueceu", tense: "preterito" },
  { sentence: "Eu estudarei para o exame.", verb: "estudarei", tense: "futuro" },
  { sentence: "O sol nasce no leste.", verb: "nasce", tense: "presente" },
  { sentence: "Eles assistiram ao jogo ontem.", verb: "assistiram", tense: "preterito" },
  { sentence: "Você viajará para o campo no feriado.", verb: "viajará", tense: "futuro" },
  { sentence: "Nós moramos perto da escola.", verb: "moramos", tense: "presente" },
  { sentence: "Ela leu um livro interessante.", verb: "leu", tense: "preterito" },
  { sentence: "Eu comprarei um carro novo.", verb: "comprarei", tense: "futuro" },
  { sentence: "O bebê chora quando tem fome.", verb: "chora", tense: "presente" },
  { sentence: "Eles correram na maratona.", verb: "correram", tense: "preterito" },
  { sentence: "Você fará um ótimo trabalho.", verb: "fará", tense: "futuro" },
  { sentence: "Nós escrevemos cartas para os amigos.", verb: "escrevemos", tense: "presente" },
  { sentence: "O aluno terminou a tarefa.", verb: "terminou", tense: "preterito" },
  { sentence: "Ela viajará para Paris.", verb: "viajará", tense: "futuro" },
  { sentence: "Eu gosto de música clássica.", verb: "gosto", tense: "presente" },
  { sentence: "Eles perderam o ônibus.", verb: "perderam", tense: "preterito" },
  { sentence: "Você encontrará seus amigos mais tarde.", verb: "encontrará", tense: "futuro" },
  { sentence: "O cachorro late alto.", verb: "late", tense: "presente" },
  { sentence: "Nós visitamos o museu ontem.", verb: "visitamos", tense: "preterito" },
  { sentence: "Ela ganhará o prêmio.", verb: "ganhará", tense: "futuro" },
  { sentence: "Eu tomo café todas as manhãs.", verb: "tomo", tense: "presente" },
  { sentence: "Eles chegaram atrasados.", verb: "chegaram", tense: "preterito" },
  { sentence: "Você estudará medicina.", verb: "estudará", tense: "futuro" },
  { sentence: "Nós jogamos xadrez à noite.", verb: "jogamos", tense: "presente" },
  { sentence: "Ela esqueceu o aniversário do amigo.", verb: "esqueceu", tense: "preterito" },
  { sentence: "Eu visitarei meus avós no domingo.", verb: "visitarei", tense: "futuro" },
  { sentence: "O menino desenha muito bem.", verb: "desenha", tense: "presente" },
  { sentence: "Eles assistiram ao filme no cinema.", verb: "assistiram", tense: "preterito" },
  { sentence: "Você viajará comigo?", verb: "viajará", tense: "futuro" },
  { sentence: "Nós cozinhamos juntos.", verb: "cozinhamos", tense: "presente" },
  { sentence: "Ela perdeu as chaves de casa.", verb: "perdeu", tense: "preterito" },
  { sentence: "Eu comprarei um presente para você.", verb: "comprarei", tense: "futuro" },
  { sentence: "O sol brilha forte hoje.", verb: "brilha", tense: "presente" },
  { sentence: "Eles ganharam o campeonato.", verb: "ganharam", tense: "preterito" },
  { sentence: "Você encontrará a solução.", verb: "encontrará", tense: "futuro" },
  { sentence: "Nós estudamos para as provas.", verb: "estudamos", tense: "presente" },
  { sentence: "Ela viajou para o interior.", verb: "viajou", tense: "preterito" },
  { sentence: "Eu farei um curso de inglês.", verb: "farei", tense: "futuro" },
  { sentence: "O bebê dorme tranquilo.", verb: "dorme", tense: "presente" },
  { sentence: "Eles comeram bolo na festa.", verb: "comeram", tense: "preterito" },
  { sentence: "Você irá ao cinema amanhã.", verb: "irá", tense: "futuro" },
  { sentence: "Nós gostamos de viajar.", verb: "gostamos", tense: "presente" },
  { sentence: "Ela assistiu à palestra.", verb: "assistiu", tense: "preterito" },
  { sentence: "Eu estudarei para o concurso.", verb: "estudarei", tense: "futuro" },
  { sentence: "O cachorro brinca com a bola.", verb: "brinca", tense: "presente" },
  { sentence: "Eles visitaram os avós no fim de semana.", verb: "visitaram", tense: "preterito" },
  { sentence: "Você comprará um carro novo?", verb: "comprará", tense: "futuro" },
  { sentence: "Nós lemos jornais todas as manhãs.", verb: "lemos", tense: "presente" },
  { sentence: "Ela ganhou um presente.", verb: "ganhou", tense: "preterito" },
  { sentence: "Eu viajarei para o sul do país.", verb: "viajarei", tense: "futuro" },
  { sentence: "O aluno estuda matemática.", verb: "estuda", tense: "presente" },
  { sentence: "Eles perderam o voo.", verb: "perderam", tense: "preterito" },
  { sentence: "Você fará a inscrição amanhã?", verb: "fará", tense: "futuro" },
  { sentence: "Nós escrevemos um artigo científico.", verb: "escrevemos", tense: "presente" },
  { sentence: "Ela leu o jornal ontem.", verb: "leu", tense: "preterito" },
  { sentence: "Eu comprarei flores para a festa.", verb: "comprarei", tense: "futuro" },
  { sentence: "O cachorro late todas as manhãs.", verb: "late", tense: "presente" },
  { sentence: "Eles chegaram cedo para a reunião.", verb: "chegaram", tense: "preterito" },
  { sentence: "Você estudará para a prova final.", verb: "estudará", tense: "futuro" },
  { sentence: "Nós moramos em uma cidade pequena.", verb: "moramos", tense: "presente" },
  { sentence: "Ela esqueceu o caderno em casa.", verb: "esqueceu", tense: "preterito" },
  { sentence: "Eu viajarei com meus amigos.", verb: "viajarei", tense: "futuro" },
  { sentence: "O menino desenha todos os dias.", verb: "desenha", tense: "presente" },
  { sentence: "Eles assistiram à peça de teatro.", verb: "assistiram", tense: "preterito" },
  { sentence: "Você viajará para o exterior?", verb: "viajará", tense: "futuro" },
  { sentence: "Nós cozinhamos para a família.", verb: "cozinhamos", tense: "presente" },
  { sentence: "Ela perdeu o ônibus de manhã.", verb: "perdeu", tense: "preterito" },
  { sentence: "Eu comprarei um ingresso para o show.", verb: "comprarei", tense: "futuro" },
  { sentence: "O sol brilha no céu azul.", verb: "brilha", tense: "presente" },
  { sentence: "Eles ganharam o sorteio.", verb: "ganharam", tense: "preterito" },
  { sentence: "Você encontrará uma solução.", verb: "encontrará", tense: "futuro" },
  { sentence: "Nós estudamos para o vestibular.", verb: "estudamos", tense: "presente" },
  { sentence: "Ela viajou para o exterior.", verb: "viajou", tense: "preterito" },
  { sentence: "Eu farei um intercâmbio.", verb: "farei", tense: "futuro" },
  { sentence: "O bebê dorme no berço.", verb: "dorme", tense: "presente" }
];

// Legacy functions maintained for backward compatibility
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

// New function to get random sentences
export const getRandomSentence = (): SentenceExample => {
  return sentences[Math.floor(Math.random() * sentences.length)];
};
